# AGENT-IA-GSM-SECURE

Plateforme web Next.js pour orchestrer des agents IA spécialisés avec des garde-fous de sécurité.

## Architecture initiale
- **Coordinator** : reçoit et valide la tâche.
- **Research** : collecte et vérifie les faits.
- **Analysis** : compare les éléments et cherche les contre-arguments.
- **Security** : détecte les tentatives d'injection et les opérations dangereuses.
- **Source** : contrôle la traçabilité et la qualité des sources.

Les agents sont conceptuellement séparés : une donnée externe n'est jamais considérée comme une instruction de priorité supérieure.

## Démarrage
```bash
npm install
cp .env.example .env.local
npm run dev
```

Définir `OPENAI_API_KEY` uniquement dans l'environnement de déploiement/local, jamais dans Git.

## État
Le dépôt contient la base sécurisée de l'application. Les connecteurs de recherche, les outils à privilèges et le déploiement doivent rester explicitement allowlistés avant activation.
