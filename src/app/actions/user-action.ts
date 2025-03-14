"use server";

import prisma from "@/lib/prisma";
import { RegisterUserSchema } from "@/validation/user-validation";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsedData = RegisterUserSchema.parse(data);
    const { email, name, password } = parsedData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await prisma.user.count({
      where: {
        email: email,
      },
    });

    if (userExist >= 1) {
      return { success: false, message: "Email  already been taken" };
    }

    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    return redirect("/login");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }

    return { success: false, message: "Something went wrong." };
  }
}
