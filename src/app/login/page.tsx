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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginUserSchema } from "@/validation/user-validation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Button } from "@/components/ui/button";

const loginFormSchema = LoginUserSchema;
type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setMessage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true);
    try {
      const email = values.email;
      const password = values.password;

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res?.error);
      }

      router.push("/");
    } catch (e) {
      setMessage((e as Error).message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleShowPassword = (e: boolean) => {
    setShowPassword(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="min-w-[330px] max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="font-bold text-xl">Sign In</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-3">
                <AlertDestructive message={error} />
              </div>
            )}
            <div className="grid w-full items-center gap-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show_password"
                  onCheckedChange={(e) => handleShowPassword(e as boolean)}
                />
                <label
                  htmlFor="show_password"
                  className="text-sm medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full">
              {isLoading ? "Submitting..." : "Login"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link className="underline underline-offset-4" href="/register">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
