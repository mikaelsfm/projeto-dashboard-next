#!/bin/sh

echo "Gerando Prisma Client..."
npx prisma generate

echo "Executando migrations..."
npx prisma migrate deploy || npx prisma db push

echo "Populando o banco de dados..."
npx prisma db seed

echo "Iniciando o servidor..."
npm run dev