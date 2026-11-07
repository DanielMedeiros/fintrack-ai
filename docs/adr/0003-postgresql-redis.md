# ADR-0003: PostgreSQL como persistência principal e Redis como infraestrutura auxiliar

- **Status:** Accepted
- **Data:** 2026-11-07

## Contexto

Dados financeiros exigem consistência transacional e persistência durável. Cache e coordenação de tarefas têm necessidades diferentes.

## Decisão

PostgreSQL será a fonte de verdade dos dados de negócio. Redis será usado para cache, coordenação e, futuramente, filas BullMQ. Nenhum dado financeiro confirmado dependerá exclusivamente do Redis.

## Consequências

- Consistência transacional centralizada no PostgreSQL.
- Redis poderá ser reiniciado sem perda do registro financeiro principal.
- Estratégias de invalidação de cache deverão ser definidas por domínio.
