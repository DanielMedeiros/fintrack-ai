# AGENTS.md — FinTrack AI Agent Guidelines & Skill Orchestration

Este documento define o guia de operação, regras de conduta, arquitetura e orquestração de **Agentes de IA** no repositório do **FinTrack AI**. 

Todos os agentes autônomos ou assistentes de código que operam neste projeto devem obrigatoriamente seguir as diretrizes descritas neste arquivo e carregar as **skills especializadas** localizadas no diretório [`skills`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills) conforme o contexto de cada tarefa.

---

## 1. Visão Geral do Projeto

O **FinTrack AI** é uma plataforma SaaS de gestão financeira pessoal de alta performance, projetada como um **Monólito Modular** preparado para evolução futura para microsserviços.

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod.
- **Backend:** Node.js, NestJS com Fastify Adapter, Clean Architecture, DDD, TypeScript.
- **Persistência & Dados:** PostgreSQL, Prisma ORM, Redis (cache e locks).
- **Assincronismo & Filas:** RabbitMQ (mensageria de eventos de domínio), BullMQ com Redis (background jobs).
- **Inteligência Artificial:** Provedores de LLM (OpenAI API / Gemini) para classificação financeira, detecção de padrões e assistente consultivo (**IA estritamente consultiva, sem execução autônoma de transações financeiras**).
- **Monorepo:** Organizado via pnpm Workspaces e Turborepo (`apps/web`, `apps/api`, `apps/worker`, `packages/*`).

---

## 2. Skills Especializadas do Projeto

Na pasta [`.agents/skills`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills) estão definidas as diretrizes sênior de engenharia:

| Skill | Localização | Especialidade Principal | Gatilhos de Uso |
| :--- | :--- | :--- | :--- |
| **`nodejs-senior`** | [`.agents/skills/nodejs-senior/SKILL.md`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills/nodejs-senior/SKILL.md) | Backend, Node.js, NestJS, APIs, Bancos de Dados, Filas, Concorrência, Segurança e Resiliência | APIs REST, regras de negócio do backend, persistência com Prisma, jobs BullMQ, RabbitMQ, autenticação/tokens, rate limiting, logs estruturados (Pino), testes de integração e unitários do backend. |
| **`front-end-senior`** | [`.agents/skills/front-end-senior/SKILL.md`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills/front-end-senior/SKILL.md) | Frontend, Next.js (App Router), React 19, TypeScript, UI/UX, Acessibilidade (WCAG) e Performance | Telas, componentes visuais, formulários com Zod/RHF, gerenciamento de estado (TanStack Query/Zustand), Server vs. Client Components, Tailwind CSS, shadcn/ui, Core Web Vitals, testes com Vitest/Playwright. |

---

## 3. Matriz de Orquestração: Como o Agente Deve Agir

Ao receber um prompt ou tarefa do usuário, o agente deve seguir este protocolo:

### 3.1 Classificação do Escopo da Tarefa

1. **Tarefa Exclusivamente Backend:**
   - Ativar e seguir rigorosamente as diretrizes da skill [`nodejs-senior`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills/nodejs-senior/SKILL.md).
   - Validar contratos de rotas, códigos de status HTTP, modelagem relacional, transações seguras no banco de dados, índices, tratamento de erros sem vazamento de detalhes internos e encerramento gracioso.

2. **Tarefa Exclusivamente Frontend:**
   - Ativar e seguir rigorosamente as diretrizes da skill [`front-end-senior`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills/front-end-senior/SKILL.md).
   - Respeitar a separação clara entre Server Components e Client Components (`"use client"`), cuidar de acessibilidade (foco, teclado, leitores de tela), estados de carregamento/erro/vazio e responsividade.

3. **Tarefa Full Stack / Criação de Funcionalidade Ponta a Ponta:**
   - **Passo 1 (Contratos):** Definir primeiro o contrato de dados e DTOs (API First), garantindo compatibilidade entre frontend e backend.
   - **Passo 2 (Backend):** Aplicar [`nodejs-senior`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills/nodejs-senior/SKILL.md) para modelar entidades de domínio, migrações, casos de uso, controllers e testes automatizados.
   - **Passo 3 (Frontend):** Aplicar [`front-end-senior`](file:///e:/Projetos_Pessoais/FINTRACK_IA/fintrack-ai/.agents/skills/front-end-senior/SKILL.md) para construir as interfaces, formulários com validação imediata, estados de query/mutação com TanStack Query e feedbacks visuais ao usuário.

4. **Revisões de Código (Code Review):**
   - Agrupar e classificar todo achado de revisão utilizando a taxonomia compartilhada por ambas as skills:
     - 🔴 **Crítico:** Risco imediato de segurança, vazamento/perda de dados ou indisponibilidade.
     - 🟠 **Alto:** Falha provável em produção, quebra de contrato ou barreira grave de acessibilidade.
     - 🟡 **Médio:** Fragilidade de manutenção, gargalo de desempenho ou experiência prejudicada.
     - 🟢 **Baixo:** Melhoria opcional de legibilidade ou refinamento cosmético.

---

## 4. Regras Inegociáveis de Engenharia no FinTrack AI

1. **Precisão Monetária Sem Ponto Flutuante:**
   - **NUNCA** utilize tipos de ponto flutuante (`float`, `double`, `number` com decimais) para armazenar ou calcular valores financeiros.
   - Armazene valores monetários como números inteiros na menor unidade monetária (ex.: **centavos** em `BigInt` ou `Int`), com código explícito da moeda (ex.: `BRL`).
2. **TypeScript Estrito:**
   - É proibido o uso de `any` sem justificativa técnica documentada.
   - Tipos estáticos em tempo de compilação não validam entradas em tempo de execução: **sempre** valide dados externos nas fronteiras do sistema usando **Zod** (inputs de API, parâmetros de query, formulários e respostas externas).
3. **Isolamento de Dados do Usuário (Multi-tenant):**
   - Toda transação, conta, categoria e meta financeira pertence a um usuário específico (`userId`).
   - Nenhuma query ao banco de dados ou rota da API pode permitir acesso cruzado entre usuários distintos.
4. **Papel da Inteligência Artificial:**
   - A IA do FinTrack AI é estritamente **consultiva** (sugestão de categorias, identificação de padrões, resumos).
   - A IA **nunca tem permissão** para realizar transferências, movimentações, liquidações ou exclusão de dados de forma autônoma.
5. **Segredos e Fronteira de Segurança:**
   - Nunca expor chaves de API, variáveis de ambiente privadas ou credenciais no código ou variáveis públicas enviadas ao navegador (prefixo `NEXT_PUBLIC_`).
   - Validações de segurança e autorização de acesso devem ser sempre efetuadas no servidor.

---

## 5. Padrão de Resposta dos Agentes

Sempre que implementar ou revisar código, organize a entrega na seguinte estrutura recomendada pelas skills:

1. **Resumo da Solução:** Breve contexto do que foi realizado e objetivos atingidos.
2. **Decisões e Trade-offs:** Por que determinada abordagem foi escolhida e alternativas descartadas.
3. **Implementação:** Código limpo, completo e pronto para uso (indicando caminhos dos arquivos e importações necessárias).
4. **Testes e Validação:** Cenários cobertos e passos para execução dos testes.
5. **Riscos, Segurança e Operação:** Aspectos de segurança, acessibilidade, observabilidade e impacto operacional.

