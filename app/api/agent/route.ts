import { NextResponse } from 'next/server';
import { agentRequestSchema, inspectInput } from '@/lib/security';
import { runOrchestrator } from '@/lib/orchestrator';

export async function POST(req:Request){
  try{
    const body=await req.json(); const parsed=agentRequestSchema.safeParse(body);
    if(!parsed.success) return NextResponse.json({error:'Requête invalide.'},{status:400});
    const inspection=inspectInput(parsed.data.input);
    if(inspection.suspicious) return NextResponse.json({error:'La requête contient des signaux d’injection ou de contournement. Aucun outil externe n’est exécuté.'},{status:400});
    const result=await runOrchestrator(parsed.data.input);
    return NextResponse.json(result,{headers:{'cache-control':'no-store'}});
  }catch(error){console.error('agent route error',error);return NextResponse.json({error:'Erreur interne contrôlée.'},{status:500});}
}
