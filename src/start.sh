#!/bin/sh
# start.sh

echo "Executando migrations do Prisma..."
npx prisma migrate deploy || npx prisma db push

echo "Populando o banco de dados..."
npx prisma db seed

echo "Iniciando o servidor..."
npm run dev