"use server";

import prisma from "@/lib/prisma";
import { RegisterUserSchema } from "@/validation/user-validation";
import bcrypt from "bcrypt";
import z from "zod";

export async function createUser(prevState: unknown, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = RegisterUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form.",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
        redirect: null,
      };
    }

    const { email, name, password } = validatedData.data;

    // CHECKING USER IS EXISTS
    const userExist = await prisma.user.count({
      where: {
        email: email,
      },
    });
    if (userExist >= 1) {
      return {
        success: false,
        message: "Email already been taken",
        errors: { email: ["Email already been taken"] },
        inputs: rawData,
        redirect: null,
      };
    }

    // USER CREATION
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      redirect: {
        email: validatedData.data.email,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
