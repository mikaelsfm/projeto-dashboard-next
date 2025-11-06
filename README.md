# **Dashboard App**

Projeto fullstack desenvolvido com **Next.js**, **Prisma** e **PostgreSQL**, executando em ambiente **Docker**.  
A aplicação fornece um painel administrativo com listagem de usuários, cadastro e associação entre **consultores** e **clientes**.

---

## **Pré-requisitos**

- **Docker** e **Docker Compose** instalados.  
- Porta **3007** livre (frontend/backend) e **5440** livre (PostgreSQL).

---

## **Estrutura**

- **Next.js** – Frontend e backend (rotas API).  
- **Prisma ORM** – Modelagem e migração do banco de dados.  
- **PostgreSQL** – Banco de dados persistente.  
- **Lucide React + Tailwind** – UI e ícones.

---

## **Como rodar o projeto**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/mikaelsfm/projeto-dashboard-next.git
   cd dashboard-app
   cd src
   ```

2. **Suba os containers**
   ```bash
   docker-compose up --build
   ```

   O serviço `postgres` será iniciado primeiro.  
   Quando estiver saudável, o container `web` executará automaticamente:
   - Migrations do Prisma  
   - Seed inicial com usuários mock  
   - Servidor Next.js na porta `3007`

3. **Acesse a aplicação**
   ```
   http://localhost:3007
   ```

---

## **Scripts úteis**

Dentro do container `web`, você pode executar:

```bash
# Aplicar migrations manualmente
npx prisma migrate deploy

# Popular o banco com dados de teste
npx prisma db seed

# Entrar no ambiente interativo do Prisma
npx prisma studio
```

---

## **Banco de Dados**

Conexão padrão:
```
postgresql://admin:123456@localhost:5440/dashboard_db
```

---

## **Estrutura dos serviços (docker-compose.yml)**

- `dashboard-db` → Banco PostgreSQL 16  
- `dashboard-app` → Aplicação Next.js + Prisma  

Ambos conectados via `dashboard-net` (rede bridge Docker).

---

## **Portas**

| Serviço | Porta local | Porta container |
|----------|--------------|----------------|
| PostgreSQL | 5440 | 5432 |
| Web App | 3007 | 3007 |

---

## **Fluxo de inicialização**

1. O container do banco sobe e passa no healthcheck.  
2. O container da aplicação executa o script `start.sh`:  
   - Executa migrations (`prisma migrate deploy || prisma db push`)  
   - Executa seed (`prisma db seed`)  
   - Inicia o servidor (`npm run dev`)