# ADR-0002: Adotar monorepo com pnpm Workspaces e Turborepo

- **Status:** Accepted
- **Data:** 2026-11-07

## Contexto
Frontend, API, worker e pacotes compartilhados precisam evoluir com ferramentas e convenções consistentes.

## Decisão
Utilizar pnpm Workspaces para gerenciamento do workspace e Turborepo para orquestração e cache de tarefas.

## Consequências
- Dependências e scripts centralizados.
- Compartilhamento explícito por packages.
- Builds coordenados e potencialmente cacheáveis.
- É necessário manter limites entre aplicações e bibliotecas.
