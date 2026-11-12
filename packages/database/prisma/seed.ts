import { PrismaClient, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

const defaultCategories = [
  // Despesas
  { name: 'Alimentação', type: CategoryType.EXPENSE, icon: 'utensils', color: '#f97316' },
  { name: 'Moradia', type: CategoryType.EXPENSE, icon: 'home', color: '#3b82f6' },
  { name: 'Transporte', type: CategoryType.EXPENSE, icon: 'car', color: '#eab308' },
  { name: 'Saúde', type: CategoryType.EXPENSE, icon: 'heart-pulse', color: '#ef4444' },
  { name: 'Educação', type: CategoryType.EXPENSE, icon: 'graduation-cap', color: '#8b5cf6' },
  { name: 'Lazer', type: CategoryType.EXPENSE, icon: 'sparkles', color: '#ec4899' },
  { name: 'Assinaturas e Serviços', type: CategoryType.EXPENSE, icon: 'credit-card', color: '#06b6d4' },
  { name: 'Outras Despesas', type: CategoryType.EXPENSE, icon: 'tag', color: '#64748b' },

  // Receitas
  { name: 'Salário', type: CategoryType.INCOME, icon: 'wallet', color: '#10b981' },
  { name: 'Rendimentos e Investimentos', type: CategoryType.INCOME, icon: 'trending-up', color: '#14b8a6' },
  { name: 'Freelance / Serviços', type: CategoryType.INCOME, icon: 'briefcase', color: '#6366f1' },
  { name: 'Outras Receitas', type: CategoryType.INCOME, icon: 'arrow-down-left', color: '#22c55e' },
];

async function main() {
  console.log('Populando categorias padrão do sistema...');

  for (const cat of defaultCategories) {
    const existing = await prisma.category.findFirst({
      where: {
        userId: null,
        name: cat.name,
        type: cat.type,
      },
    });

    if (!existing) {
      await prisma.category.create({
        data: {
          name: cat.name,
          type: cat.type,
          icon: cat.icon,
          color: cat.color,
          userId: null, // Categoria global do sistema
        },
      });
      console.log(`[Seed] Categoria criada: ${cat.name} (${cat.type})`);
    }
  }

  console.log('Seed de categorias concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

