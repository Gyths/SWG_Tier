#!/bin/bash
# deploy.sh - Script de deployment automatizado

echo "🚀 Iniciando deployment..."

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Actualizar código
echo "📥 Actualizando código desde Git..."
git pull || { echo -e "${RED}❌ Error al actualizar código${NC}"; exit 1; }

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install || { echo -e "${RED}❌ Error al instalar dependencias${NC}"; exit 1; }

# Generar Prisma client
echo "🗄️  Generando Prisma client..."
npx prisma generate || { echo -e "${RED}❌ Error al generar Prisma${NC}"; exit 1; }

# Migrar base de datos (si hay cambios)
echo "🗄️  Aplicando migraciones de base de datos..."
npx prisma db push || { echo -e "${RED}❌ Error en migraciones${NC}"; exit 1; }

# Build de la aplicación
echo "🔨 Construyendo aplicación..."
npm run build || { echo -e "${RED}❌ Error al construir${NC}"; exit 1; }

# Reiniciar PM2
echo "♻️  Reiniciando aplicación..."
pm2 restart swg || { echo -e "${RED}❌ Error al reiniciar PM2${NC}"; exit 1; }

echo -e "${GREEN}✅ ¡Deployment completado exitosamente!${NC}"
echo "📊 Ver logs: pm2 logs burger-tracker"