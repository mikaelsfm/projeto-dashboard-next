# **Dashboard App**

Projeto fullstack desenvolvido com **Next.js**, **Prisma** e **PostgreSQL**.  
A aplicação fornece um painel administrativo com listagem de usuários, cadastro e associação entre **consultores** e **clientes**.


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
   cd projeto-dashboard-app
   cd src
   ```

2. **Acesse a aplicação**
   ```
   https://projeto-dashboard-next-gamma.vercel.app
   ```
---

3. **Para rodar local**
   ```bash
   localhost:3007/
   ```


## **Scripts úteis**

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

Supabase:
```
postgresql://postgres.ngynfyseuzesjojbmxpm:<SENHA_DO_BANCO>@aws-1-us-east-1.pooler.supabase.com:5432/postgres
```
---