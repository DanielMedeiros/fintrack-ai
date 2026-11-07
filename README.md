# FinTrack AI

Plataforma de gestão financeira pessoal inteligente. Projeto Full Stack TypeScript com arquitetura de monólito modular, preparado para evolução incremental.

## Stack inicial

- Node.js 26 LTS
- pnpm Workspaces + Turborepo
- Next.js + React + TypeScript
- NestJS + Fastify
- Worker Node.js
- PostgreSQL + Redis via Docker Compose
- ESLint + Prettier

## Pré-requisitos

- Node.js 26 ou superior
- pnpm 10 ou superior
- Docker Engine / Docker Desktop com Docker Compose

Ative o pnpm via Corepack, caso disponível:

```bash
corepack enable
corepack prepare pnpm@10.22.0 --activate
```

## Configuração local

```bash
cp .env.example .env
pnpm install
docker compose up -d
```

## Executar aplicações

Em terminais separados:

```bash
pnpm --filter @fintrack/web dev
pnpm --filter @fintrack/api dev
pnpm --filter @fintrack/worker dev
```

- Web: http://localhost:3000
- API health: http://localhost:3001/api/v1/health
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Verificações

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

O primeiro `pnpm install` gera `pnpm-lock.yaml`. Inclua esse arquivo no Git para builds reproduzíveis.

## Infraestrutura

```bash
pnpm infra:up
pnpm infra:logs
pnpm infra:down
```

Os dados locais ficam em volumes Docker nomeados. Para apagar também os dados persistidos, use `docker compose down -v` (operação destrutiva).

## Estrutura

```text
apps/web       Next.js frontend
apps/api       NestJS HTTP API (Fastify)
apps/worker    Worker process
packages/*     Shared packages
docs/adr       Architecture Decision Records
infrastructure Docker and future cloud/IaC resources
```

## Health check

`GET /api/v1/health` retorna status básico da API. Nesta fase, o endpoint não verifica dependências externas; health/readiness checks de PostgreSQL e Redis serão adicionados quando a camada de infraestrutura da aplicação for implementada.

## Segurança

O `.env` é local e não deve ser commitado. As credenciais padrão do Compose são exclusivamente para desenvolvimento local; nunca as reutilize em ambientes compartilhados ou produção.

## Arquitetura

Consulte `docs/adr/` para as decisões arquiteturais iniciais.
