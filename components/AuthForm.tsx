"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import FormField from "./FormField";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { handleFirebaseError } from "@/lib/utils";

function authFormSchema(type: FormType) {
  return z.object({
    name:
      type === "sign-up"
        ? z
            .string()
            .min(2, {
              message: "Username must be at least 2 characters.",
            })
            .max(20, {
              message: "Username must be at most 20 characters.",
            })
        : z.string().optional(),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });
}

export default function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [loading, setLoading] = useState(false);

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully, Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      const errorMessage = handleFirebaseError(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />

            <Button className="btn" type="submit" disabled={loading}>
              {loading
                ? "Loading..."
                : isSignIn
                ? "Sign in"
                : "Create an Account"}
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
