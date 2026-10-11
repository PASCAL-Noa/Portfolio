#!/bin/bash
# ==============================================================================
# Script de déploiement automatique Portfolio sur Ubuntu VPS (OVH)
# ==============================================================================
set -e

echo "🚀 Début du déploiement Portfolio..."

# 1. Vérification du fichier .env
if [ ! -f .env ]; then
    echo "⚠️ Le fichier .env n'existe pas. Création à partir de .env.production.example..."
    cp .env.production.example .env
    echo "❗ Veuillez éditer le fichier .env avec vos identifiants avant de relancer ./deploy.sh"
    exit 1
fi

# 2. Récupérer les dernières modifications Git
echo "📥 Récupération des dernières sources Git..."
git pull origin main

# 3. Compiler le frontend si nécessaire (pour l'hébergement tout-en-un)
if [ -d "frontend" ]; then
    echo "📦 Compilation du Frontend..."
    cd frontend
    npm install --silent
    npm run build
    cd ..
fi

# 4. Lancer et reconstruire les conteneurs Docker
echo "🐳 Lancement des conteneurs avec Docker Compose..."
docker compose pull || true
docker compose build --no-cache backend
docker compose up -d

# 5. Appliquer les migrations de base de données et initialiser les données si vierge
echo "🗄️ Application des migrations Prisma..."
sleep 5
docker compose exec -T backend npx prisma migrate deploy || true

echo "🌱 Synchronisation des données initiales (Seed)..."
docker compose exec -T backend npx tsx prisma/seed.ts || true

echo "✅ Déploiement terminé avec succès !"
echo "🌐 Statut des conteneurs :"
docker compose ps
