# ADR-0001: Adotar Modular Monolith como arquitetura inicial

- **Status:** Accepted
- **Data:** 2026-11-07

## Contexto

O produto precisa evoluir com velocidade sem assumir prematuramente a complexidade operacional de microsserviços.

## Decisão

Adotar um monólito modular no backend, organizado por domínios e com dependências explícitas. API e worker serão processos de execução separados, compartilhando o código de domínio por pacotes internos quando necessário.

## Consequências

- Menor custo operacional inicial.
- Transações locais mais simples.
- Limites de domínio precisam ser respeitados.
- Extração futura de serviços será possível mediante justificativa e contratos estáveis.
