# ADR-0004: Separar API HTTP e Worker como processos

- **Status:** Accepted
- **Data:** 2026-11-07

## Contexto
Tarefas demoradas e processamento assíncrono não devem bloquear requisições HTTP.

## Decisão
Manter a API NestJS e o worker como aplicações separadas no monorepo. Nesta fase, o worker é apenas um processo inicial; filas e consumidores serão adicionados em fase posterior.

## Consequências
- Escalonamento independente de API e worker.
- Menor risco de bloquear o ciclo HTTP.
- Contratos de eventos e idempotência serão necessários quando filas forem introduzidas.
