"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";

function authFormSchema(type: FormType) {
  return z.object({
    name: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(20, {
        message: "Username must be at most 20 characters.",
      }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });
  // .refine((data) => {
  //   if (type === "sign-in") {
  //     return data.email && data.password;
  //   }
  //   return data.username && data.email && data.password;
  // });
}

export default function AuthForm({ type }: { type: FormType }) {
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (type === "sign-up") {
        console.log("Sign up", values);
      } else {
        console.log("Sign in", values);
      }
    } catch (error) {
      console.log("Error submitting form", error);
      toast.error(`There was an error : ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">HireTone</h2>
        </div>

        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && <p>Name</p>}
            <p>Emai</p>
            <p>Password</p>
            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary m1-1"
          >
            {!isSignIn ? " Sign in" : " Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
