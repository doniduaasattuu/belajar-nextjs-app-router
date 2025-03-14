import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const doni = await prisma.user.upsert({
    where: { email: "doni@gmail.com" },
    update: {},
    create: {
      password: await bcrypt.hash("password", 10),
      email: "doni@gmail.com",
      name: "Doni Darmawan",
      todolists: {
        createMany: {
          data: [
            {
              todo: "Learn NextJS Authentication",
              status: false,
            },
            {
              todo: "Learn NextJS App Router",
              status: false,
            },
            {
              todo: "Learn NextJS SSR",
              status: false,
            },
            {
              todo: "Learn NextJS ISR",
              status: false,
            },
          ],
        },
      },
    },
  });
  console.log({ doni });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .then(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
