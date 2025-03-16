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
              status: true,
            },
            {
              todo: "Learn NextJS App Router",
              status: true,
            },
            {
              todo: "Learn NextJS SSR",
              status: false,
            },
            {
              todo: "Learn NextJS ISR",
              status: false,
            },
            {
              todo: "Learn Docker Compose",
              status: false,
            },
            {
              todo: "Learn Git Branching Strategy",
              status: true,
            },
            {
              todo: "Learn Laravel Sanctum",
              status: true,
            },
            {
              todo: "Learn Flutter Internet",
              status: false,
            },
            {
              todo: "Learn Web Sockert",
              status: false,
            },
            {
              todo: "Learn Laravel Collection",
              status: true,
            },
            {
              todo: "Learn Typography Design",
              status: true,
            },
            {
              todo: "Learn RESTful API",
              status: true,
            },
            {
              todo: "Learn OpenAPI",
              status: false,
            },
            {
              todo: "Learn Oauth 2",
              status: false,
            },
            {
              todo: "Learn Laravel Validation",
              status: false,
            },
            {
              todo: "Learn NodeJS OOP",
              status: true,
            },
            {
              todo: "Learn React Server Components",
              status: false,
            },
            {
              todo: "Learn Dart Basic",
              status: true,
            },
            {
              todo: "Learn Laravel Breeze",
              status: true,
            },
            {
              todo: "Learn VPS Hosting",
              status: false,
            },
            {
              todo: "Learn Ethical Hacking",
              status: false,
            },
            {
              todo: "Learn Linux Ubuntu",
              status: false,
            },
            {
              todo: "Learn PostgreSQL",
              status: false,
            },
            {
              todo: "Learn Golang",
              status: false,
            },
            {
              todo: "Learn MySQL",
              status: true,
            },
            {
              todo: "Learn Java Programming Languange",
              status: true,
            },
            {
              todo: "Learn JSON Server",
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
