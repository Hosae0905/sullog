import prisma from "@/lib/db-prisma";

async function main() {
  const createUser = await prisma.user.create({
      data: {
          name: "Test User",
      }
  })

    console.log('Created user:', createUser);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})
