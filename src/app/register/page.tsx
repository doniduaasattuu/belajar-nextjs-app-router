"use client";

import { useFormState } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import GuestLayout from "../../layouts/guest-layout";
import { Button } from "@/components/ui/button";
import { createUser } from "../../actions/user-action";
import CustomField from "@/components/custom-field";
import { CustomAlert } from "@/components/ui/custom-alert";

const initialState = {
  success: false,
  message: "",
  errors: {},
  inputs: {},
  redirect: null,
};

export default function RegisterPage() {
  const [state, formAction, pending] = useFormState(createUser, initialState);

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
            {state.success && state.redirect && (
              <div className="mb-3">
                <CustomAlert header="Success" message={state.message} />
              </div>
            )}

            <div className="grid w-full items-center gap-4">
              <CustomField
                defaultValue={state?.inputs?.email}
                error={state?.errors?.email}
                field="email"
              />
              <CustomField
                defaultValue={state?.inputs?.name}
                error={state?.errors?.name}
                field="name"
              />
              <CustomField
                error={state?.errors?.password}
                field="password"
                type="password"
              />
              <CustomField
                error={state?.errors?.confirm}
                field="confirm"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button disabled={pending} className="w-full">
              {pending ? "Processing..." : "Register"}
            </Button>

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
