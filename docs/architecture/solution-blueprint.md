# FinTrack AI — Solution Blueprint

**Versão:** 1.0  
**Data:** 06/11/2026  
**Status:** Architecture Baseline  
**Tipo:** Full Stack SaaS Application  
**Arquitetura:** Modular Monolith, preparada para evolução para Microservices.

---

## 1. Visão geral do produto

O FinTrack AI é uma plataforma de gestão financeira pessoal que permite aos usuários controlar receitas, despesas, contas, categorias, orçamentos e objetivos financeiros.

A aplicação contará com recursos de inteligência artificial para interpretar informações financeiras, categorizar despesas, identificar padrões de consumo e fornecer recomendações contextualizadas.

### Objetivo principal

Construir uma plataforma Full Stack moderna, segura, escalável e preparada para integração com serviços de inteligência artificial.

### Público-alvo

- Pessoas que desejam organizar suas finanças.
- Usuários que querem acompanhar receitas e despesas.
- Pessoas que desejam estabelecer metas financeiras.
- Usuários interessados em compreender seus hábitos de consumo.

### Princípios arquiteturais

1. Clean Architecture.
2. Domain-Driven Design (DDD).
3. SOLID.
4. Modular Monolith.
5. API First.
6. Security by Design.
7. Test-Driven Development quando aplicável.
8. Observability by Design.
9. Event-Driven Architecture.
10. AI Ready Architecture.

---

## 2. Escopo funcional

### 2.1 Gestão de usuários

- Cadastro de usuários.
- Login e logout.
- Recuperação de senha.
- Gerenciamento de perfil.
- Preferências regionais.
- Configurações de moeda e fuso horário.

### 2.2 Gestão financeira

- Cadastro de receitas.
- Cadastro de despesas.
- Cadastro de contas financeiras.
- Transferências entre contas.
- Categorias e subcategorias.
- Transações recorrentes.
- Histórico financeiro.
- Filtros por período e categoria.

### 2.3 Dashboard

- Saldo total.
- Receitas do mês.
- Despesas do mês.
- Resultado financeiro.
- Evolução mensal.
- Distribuição de gastos por categoria.
- Comparação entre períodos.
- Próximos vencimentos.

### 2.4 Planejamento financeiro

- Criação de orçamentos mensais.
- Definição de limites por categoria.
- Criação de objetivos financeiros.
- Acompanhamento de metas.
- Indicadores de evolução.

### 2.5 Relatórios

- Relatório mensal.
- Relatório anual.
- Despesas por categoria.
- Evolução de receitas.
- Evolução de despesas.
- Exportação CSV.

### 2.6 Inteligência artificial

- Classificação inteligente de despesas.
- Sugestão de categorias.
- Resumo financeiro mensal.
- Identificação de padrões de consumo.
- Assistente financeiro conversacional.
- Recomendações de organização financeira.

A IA será consultiva. Não poderá executar transferências, pagamentos ou movimentações financeiras.

### 2.7 Notificações

- Alertas de orçamento.
- Avisos de vencimento.
- Notificações de metas.
- Resumos financeiros periódicos.

---

## 3. Arquitetura da solução

### Modelo arquitetural

Modular Monolith com separação explícita dos domínios e dependências controladas.

O sistema será inicialmente implantado como uma aplicação backend principal, com worker independente para processamento assíncrono.

### Componentes

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend**
- Node.js
- NestJS
- Fastify Adapter
- REST API
- Clean Architecture
- DDD

**Persistência**
- PostgreSQL
- Prisma ORM
- Redis

**Mensageria**
- RabbitMQ
- BullMQ para jobs com Redis

**Inteligência Artificial**
- OpenAI API
- Camada de abstração de provedores
- Structured Outputs
- Controle de custos e tokens

**Infraestrutura**
- Docker
- GitHub Actions
- Microsoft Azure
- Terraform

**Observabilidade**
- OpenTelemetry
- Prometheus
- Grafana
- Pino

---

## 4. Bounded Contexts e módulos

### Identity
Responsável pela identidade, autenticação e autorização.

### User Management
Responsável pelo perfil e preferências dos usuários.

### Accounts
Responsável pelas contas financeiras e saldos.

### Transactions
Responsável pelas receitas, despesas e transferências.

### Budget
Responsável pelos orçamentos e limites financeiros.

### Goals
Responsável pelos objetivos e acompanhamento de metas.

### Analytics
Responsável pelos indicadores, relatórios e consolidação financeira.

### AI Assistant
Responsável pela interação com modelos de inteligência artificial.

### Notifications
Responsável pelos alertas e notificações.

Cada módulo terá responsabilidades próprias e interfaces explícitas de comunicação.

---

## 5. Stack tecnológica definitiva

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js 22 LTS ou superior |
| Linguagem | TypeScript |
| Frontend | Next.js App Router |
| UI | React 19.3 |
| Estilização | Tailwind CSS 4 |
| Componentes | shadcn/ui |
| Formulários | React Hook Form |
| Validação | Zod |
| Estado remoto | TanStack Query |
| Estado local | Zustand, quando necessário |
| Backend | NestJS |
| HTTP | Fastify |
| API | REST + OpenAPI |
| ORM | Prisma ORM 7 |
| Banco principal | PostgreSQL |
| Cache | Redis |
| Mensageria | RabbitMQ |
| Background Jobs | BullMQ |
| IA | OpenAI API |
| Testes backend | Jest + Supertest |
| Testes frontend | Vitest + Testing Library |
| E2E | Playwright |
| Monorepo | pnpm Workspaces + Turborepo |
| Containers | Docker |
| CI/CD | GitHub Actions |
| Infraestrutura | Terraform |
| Cloud | Microsoft Azure |
| Logs | Pino |
| Tracing | OpenTelemetry |
| Métricas | Prometheus + Grafana |

As versões devem ser fixadas no lockfile e atualizadas por meio de processos controlados. Não utilizaremos versões experimentais em produção.

---

## 6. Estrutura do monorepo

```text
fintrack-ai/
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   └── styles/
│   │   └── tests/
│   │
│   ├── api/
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   ├── shared/
│   │   │   ├── infrastructure/
│   │   │   ├── config/
│   │   │   └── main.ts
│   │   └── test/
│   │
│   └── worker/
│       └── src/
│
├── packages/
│   ├── contracts/
│   ├── database/
│   ├── ui/
│   ├── config/
│   ├── eslint-config/
│   └── typescript-config/
│
├── infrastructure/
│   ├── docker/
│   ├── terraform/
│   ├── azure/
│   └── monitoring/
│
├── docs/
│   ├── architecture/
│   ├── adr/
│   ├── api/
│   ├── diagrams/
│   └── security/
│
├── scripts/
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── tsconfig.base.json
└── README.md
```

---

## 7. Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF-001 | Cadastro de usuário | Alta |
| RF-002 | Autenticação e logout | Alta |
| RF-003 | Recuperação de senha | Alta |
| RF-004 | Cadastro de contas | Alta |
| RF-005 | Cadastro de receitas | Alta |
| RF-006 | Cadastro de despesas | Alta |
| RF-007 | Cadastro de categorias | Alta |
| RF-008 | Dashboard financeiro | Alta |
| RF-009 | Histórico de transações | Alta |
| RF-010 | Filtros por período | Alta |
| RF-011 | Transferências entre contas | Média |
| RF-012 | Orçamentos mensais | Média |
| RF-013 | Metas financeiras | Média |
| RF-014 | Relatórios financeiros | Média |
| RF-015 | Transações recorrentes | Média |
| RF-016 | Notificações | Média |
| RF-017 | Categorização por IA | Média |
| RF-018 | Assistente financeiro | Média |
| RF-019 | Exportação de dados | Média |
| RF-020 | Auditoria de operações | Alta |

---

## 8. Requisitos não funcionais

### Performance
- APIs de leitura com objetivo de p95 inferior a 300 ms em ambiente de referência.
- APIs de escrita com objetivo de p95 inferior a 500 ms em ambiente de referência.
- Paginação em consultas de coleções.
- Índices adequados para consultas financeiras.

### Segurança
- Senhas armazenadas com hash Argon2id.
- Autenticação segura.
- Access tokens de curta duração.
- Refresh tokens com rotação e revogação.
- Autorização por usuário e recurso.
- Proteção contra SQL Injection, XSS e CSRF conforme o fluxo utilizado.
- Rate limiting.
- Segredos fora do código-fonte.
- Auditoria de operações sensíveis.

### Disponibilidade
- Meta inicial de disponibilidade mensal de 99,5%, sujeita à infraestrutura contratada.
- Health checks.
- Estratégia de recuperação de falhas.
- Backups automatizados e testes de restauração.

### Escalabilidade
- Backend stateless.
- Processamento assíncrono.
- Cache distribuído.
- Separação entre API e workers.
- Possibilidade de extração futura de módulos.

### Manutenibilidade
- Clean Architecture.
- SOLID.
- Baixo acoplamento.
- Testes automatizados.
- Documentação técnica.
- ADRs.

### Privacidade
- Conformidade com LGPD.
- Minimização de dados.
- Isolamento dos dados por usuário.
- Política de retenção.
- Exportação e exclusão de dados conforme requisitos legais.

### Observabilidade
- Logs estruturados.
- Métricas técnicas e de negócio.
- Distributed tracing.
- Correlação por request ID.
- Monitoramento de erros.

---

## 9. Modelo de dados inicial

Entidades principais:

- User
- Account
- Transaction
- Category
- Budget
- FinancialGoal
- Notification
- AuditLog
- AIConversation
- AIMessage

### Regras de domínio

1. Toda transação pertence a um usuário.
2. Toda transação deve estar associada a uma conta.
3. Valores monetários não utilizarão ponto flutuante.
4. Valores serão armazenados em unidades monetárias menores (centavos), com tipo inteiro de precisão adequada.
5. Cada registro financeiro terá moeda explícita, inicialmente BRL.
6. Transferências devem gerar movimentações vinculadas e consistentes.
7. Dados de diferentes usuários nunca poderão ser compartilhados.
8. Operações financeiras sensíveis deverão ser auditáveis.
9. Correções de movimentações confirmadas devem preservar o histórico, preferencialmente por estorno e nova movimentação.

---

## 10. Estratégia de APIs

Prefixo: `/api/v1`

---

## 11. Estratégia de testes

- Unitários: Regras de domínio e casos de uso.
- Integração: Persistência, repositórios e transações.
- E2E: Fluxos ponta a ponta pela API e web.
- Contrato: Validação de compatibilidade com OpenAPI e Zod.
- Segurança: Autorização, multi-tenancy e validações de borda.

---

## 12. Roadmap de implementação

- **Fase 0:** Arquitetura e fundação (Concluída).
- **Fase 1:** Infraestrutura e backend (Em andamento).
- **Fase 2:** Identidade e segurança.
- **Fase 3:** Core financeiro.
- **Fase 4:** Frontend.
- **Fase 5:** Planejamento e relatórios.
- **Fase 6:** Processamento assíncrono e IA.
- **Fase 7:** DevOps e produção.

