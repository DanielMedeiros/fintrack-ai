import { z } from 'zod';

// ==========================================
// Base & Error Schemas (RFC 7807 compatible)
// ==========================================
export const ApiErrorResponseSchema = z.object({
  statusCode: z.number().int(),
  error: z.string(),
  message: z.union([z.string(), z.array(z.string())]),
  timestamp: z.string().datetime(),
  path: z.string(),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

// ==========================================
// Health & Diagnostics
// ==========================================
export const ComponentHealthStatusSchema = z.enum(['up', 'down']);
export type ComponentHealthStatus = z.infer<typeof ComponentHealthStatusSchema>;

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  timestamp: z.string().datetime(),
  uptime: z.number(),
  version: z.string(),
  checks: z.object({
    database: z.object({
      status: ComponentHealthStatusSchema,
      latencyMs: z.number().optional(),
    }),
    redis: z.object({
      status: ComponentHealthStatusSchema,
      latencyMs: z.number().optional(),
    }),
  }),
});
export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;

// ==========================================
// Auth Schemas
// ==========================================
export const RegisterRequestSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z
    .string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter ao menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter ao menos um número'),
  fullName: z.string().min(2, 'Nome completo deve ter no mínimo 2 caracteres'),
  preferredCurrency: z.string().length(3).default('BRL'),
  timezone: z.string().default('America/Sao_Paulo'),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const TokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number().int(),
  tokenType: z.literal('Bearer'),
});
export type TokenResponse = z.infer<typeof TokenResponseSchema>;

// ==========================================
// Account Schemas
// ==========================================
export const AccountTypeSchema = z.enum([
  'CHECKING',
  'SAVINGS',
  'INVESTMENT',
  'CREDIT_CARD',
  'CASH',
]);
export type AccountType = z.infer<typeof AccountTypeSchema>;

export const CreateAccountSchema = z.object({
  name: z.string().min(2, 'Nome da conta deve ter pelo menos 2 caracteres'),
  type: AccountTypeSchema,
  initialBalance: z.number().int().default(0), // em centavos
  currency: z.string().length(3).default('BRL'),
});
export type CreateAccountInput = z.infer<typeof CreateAccountSchema>;

// ==========================================
// Category Schemas
// ==========================================
export const CategoryTypeSchema = z.enum(['INCOME', 'EXPENSE']);
export type CategoryType = z.infer<typeof CategoryTypeSchema>;

export const CreateCategorySchema = z.object({
  name: z.string().min(2, 'Nome da categoria deve ter no mínimo 2 caracteres'),
  type: CategoryTypeSchema,
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Cor inválida').optional(),
  parentId: z.string().optional(),
});
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

// ==========================================
// Transaction Schemas
// ==========================================
export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE', 'TRANSFER']);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const TransactionStatusSchema = z.enum(['PENDING', 'COMPLETED', 'CANCELED']);
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

export const CreateTransactionSchema = z.object({
  accountId: z.string().min(1, 'Conta é obrigatória'),
  categoryId: z.string().optional(),
  type: TransactionTypeSchema,
  amount: z.number().int().positive('O valor da transação deve ser positivo (em centavos)'),
  currency: z.string().length(3).default('BRL'),
  status: TransactionStatusSchema.default('COMPLETED'),
  issueDate: z.string().datetime(),
  settlementDate: z.string().datetime().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  notes: z.string().optional(),
  destinationAccountId: z.string().optional(), // obrigatório se type == TRANSFER
});
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;

