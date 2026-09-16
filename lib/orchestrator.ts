import OpenAI from 'openai';
import { securitySystemPrompt } from './security';

const roles={research:'Recherche et vérification des faits.',analysis:'Analyse critique, contre-arguments et incertitudes.',security:'Contrôle de sécurité, injection, secrets et actions dangereuses.',source:'Contrôle de traçabilité et qualité des sources.'} as const;
export async function runOrchestrator(input:string){
  if(!process.env.OPENAI_API_KEY) return {answer:'Mode sécurisé local actif. Configure OPENAI_API_KEY pour activer le modèle distant.',agents:Object.keys(roles)};
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const agentBrief=Object.entries(roles).map(([k,v])=>`${k}: ${v}`).join('\n');
  const response=await client.responses.create({model:process.env.OPENAI_MODEL||'gpt-5.6-mini',instructions:`${securitySystemPrompt()}\nAgents disponibles:\n${agentBrief}\nCoordonne-les conceptuellement et produis une réponse factuelle, concise et traçable.`,input});
  return {answer:response.output_text,agents:Object.keys(roles)};
}
