import prisma from '..';
import { 
  users,
} from './'

async function main() {

  //Users
  for( let i = 0; i < users.length; i++){
    const item = users[i]
    await prisma.user.create({
      data: item
    });
  }

  const a = await prisma.user.findMany()
  console.log(a)

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