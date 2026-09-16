'use client';
import { useState } from 'react';

export default function Home() {
  const [input,setInput]=useState(''); const [busy,setBusy]=useState(false); const [result,setResult]=useState('');
  async function run(){setBusy(true);setResult('');try{const r=await fetch('/api/agent',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({input})});const data=await r.json();setResult(data.answer??data.error??'Réponse indisponible.')}catch{setResult('Erreur réseau.')}finally{setBusy(false)}}
  return <main><div className="card"><span className="pill">GSM • Secure Multi-Agent</span><h1>Agent IA sécurisé</h1><p>Un orchestrateur central délègue les tâches à des agents spécialisés, applique des contrôles anti-injection et sépare les instructions utilisateur des données externes.</p><textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Décris la tâche à effectuer…" maxLength={12000}/><button onClick={run} disabled={busy||!input.trim()}>{busy?'Analyse en cours…':'Lancer les agents'}</button><div className="status">{result||'Prêt. Les sorties externes sont traitées comme des données non fiables.'}</div></div></main>
}