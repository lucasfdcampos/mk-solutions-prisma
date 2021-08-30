import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createPlan() {
  const plan = await prisma.plans.create({
    data: { name: 'Plano Prisma 2', available: true },
  });

  return plan;
}

interface Plan {
  id: string;
  name: string;
  available: boolean;
  created_at: Date;
  updated_at: Date;
}

async function readPlan(id: string) {
  const plan = await prisma.plans.findUnique({
    where: {
      id,
    },
  });

  //console.log(plan);
  return plan;
}

const id = '92a1fb0d-189d-48cc-9aa7-d6a95f862a46';

async function findAll() {
  const plans = await prisma.plans.findMany();

  //console.log(plans);
  return plans;
}

async function updatePlan(id: string) {
  const updatePlan = await prisma.plans.update({
    where: {
      id,
    },
    data: {
      name: 'Plano Prisma 1 - alterado',
      available: false,
    },
  });

  console.log(updatePlan);
}

async function deletePlan(id: string) {
  const deletePlan = await prisma.plans.delete({
    where: {
      id,
    },
  });

  console.log('deletado', deletePlan);
}

async function findAllByRawMode() {
  const result = await prisma.$queryRaw('SELECT * FROM plans');

  console.log(result);
}

async function findAllFilteringByRawMode() {
  const id = 'd4ad94e8-81d6-4a7b-8029-3a1b2b835bf3';

  const plan = await prisma.plans.findUnique({
    where: {
      id,
    },
  });

  if (plan) {
    // nao contem parantereses no $queryRaw
    const result =
      await prisma.$queryRaw`SELECT * FROM leads WHERE plan_id = ${plan.id};`;

    console.log(result);
  }
}

async function findAllFilteringByRawModeParameterized() {
  const id = 'd4ad94e8-81d6-4a7b-8029-3a1b2b835bf3';

  const plan = await prisma.plans.findUnique({
    where: {
      id,
    },
  });

  if (plan) {
    // nao contem parantereses no $queryRaw
    const result = await prisma.$queryRaw(
      'SELECT * FROM leads WHERE plan_id = $1',
      plan.id
    );

    console.log(result);
  }
}

findAllFilteringByRawModeParameterized();
