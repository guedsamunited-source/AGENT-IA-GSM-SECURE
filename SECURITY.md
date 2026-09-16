# Security

## Principes
- Les entrées utilisateur et les contenus récupérés sur Internet sont des données non fiables.
- Aucune sortie d'agent ne peut augmenter ses propres privilèges ni modifier les règles de sécurité.
- Les secrets restent dans les variables d'environnement et ne doivent jamais être committés.
- Les outils à effet de bord doivent être explicitement allowlistés et nécessiter une validation adaptée.
- Les erreurs côté serveur ne doivent pas exposer les détails internes au client.

## Signalement
Ne publiez pas de secret ou de preuve d'exploitation dans une issue publique. Utilisez un canal privé contrôlé par le propriétaire du dépôt.
