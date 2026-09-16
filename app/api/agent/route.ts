import { NextResponse } from 'next/server';
import { agentRequestSchema, inspectInput, rateLimit } from '@/lib/security';
import { runOrchestrator } from '@/lib/orchestrator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clientKey(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: Request) {
  const limit = rateLimit(clientKey(req));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Réessayez plus tard.' },
      { status: 429, headers: { 'cache-control': 'no-store', 'retry-after': String(limit.retryAfter) } },
    );
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type application/json requis.' }, { status: 415 });
    }

    const body = await req.json();
    const parsed = agentRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    const inspection = inspectInput(parsed.data.input);
    if (inspection.suspicious) {
      return NextResponse.json(
        { error: 'La requête contient des signaux d’injection ou de contournement. Aucun outil externe n’est exécuté.' },
        { status: 400 },
      );
    }

    const result = await runOrchestrator(parsed.data.input);
    return NextResponse.json(result, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    console.error('agent route error', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Erreur interne contrôlée.' }, { status: 500, headers: { 'cache-control': 'no-store' } });
  }
}
