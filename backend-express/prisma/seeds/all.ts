import prisma from '..';
import { 
  users,
  tasks,
  tasksData
} from './'

async function main() {

  // ============================================
  // Users
  // ============================================
  for( let i = 0; i < users.length; i++){
    const item = users[i]
    await prisma.user.create({
      data: item
    });
  }

  const a = await prisma.user.findMany()
  console.log(a)

  // ============================================
  // Tasks
  // ============================================
  for( let i = 0; i < tasks.length; i++){
    const item = tasks[i]
    await prisma.task.create({
      data: item
    });
  }

  const b = await prisma.task.findMany()
  console.log(b)

  // ============================================
  // Tasks Data
  // ============================================
  for( let i = 0; i < tasksData.length; i++){
    const item = tasksData[i]
    await prisma.taskData.create({
      data: item
    });
  }

  const c = await prisma.taskData.findMany()
  console.log(c)

  //
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  //https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany-preview