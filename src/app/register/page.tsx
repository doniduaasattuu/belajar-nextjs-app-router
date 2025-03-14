"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import GuestLayout from "../layouts/guest-layout";
import { Button } from "@/components/ui/button";
import { createUser } from "../actions/user-action";

const initialState = {
  message: "",
};

export default function Register() {
  const [state, formAction] = React.useActionState(createUser, initialState);

  return (
    <GuestLayout>
      <form action={formAction}>
        <Card className="min-w-[300px] max-w-[400px] mx-auto">
          <CardHeader>
            <CardTitle className="font-bold text-lg">Sign Up</CardTitle>
            <CardDescription>
              Enter your data below to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" name="email" required />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" name="name" required />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" name="password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" name="confirm_password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button className="w-full">Register</Button>
            {state?.message && <p className="text-red-500">{state.message}</p>}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link className="underline underline-offset-4" href="/login">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </GuestLayout>
  );
}
