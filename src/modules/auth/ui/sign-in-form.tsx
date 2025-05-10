"use client";

import Link from "next/link";
import { type } from "arktype";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff, LoaderCircleIcon } from "lucide-react";

import img1 from "@/assets/form-1.png";
import img2 from "@/assets/form-2.png";
import img3 from "@/assets/form-3.png";
import img4 from "@/assets/form-4.png";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignInForm() {
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-baseline">
          <h1 className="text-4xl font-bold">Pixel</h1>
        </Link>
        <Button className="group" variant="ghost" asChild>
          <Link href="/sign-up">
            Register
            <ArrowRight
              className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </Button>
      </header>
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <SignInFormComponent />
      </main>
      <div className="flex items-center w-full justify-center">
        <Image src={img1} alt="img1" height={100} width={100} />
        <Image src={img2} alt="img1" height={100} width={100} />
        <Image src={img3} alt="img1" height={100} width={100} />
        <Image src={img4} alt="img1" height={100} width={100} />
      </div>
    </div>
  );
}

function SignInFormComponent() {
  const router = useRouter();

  const trpc = useTRPC();
  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: () => router.push("/home"),
    })
  );

  const UserSchema = type({
    email: "string.email < 100",
    password: "string >= 8",
  });

  type UserValues = typeof UserSchema.infer;

  const form = useForm({
    validators: { onBlur: UserSchema },
    defaultValues: {
      email: "",
      password: "",
    } as UserValues,

    onSubmit: ({ value }) => {
      login.mutate(value);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-12">
      <div className="">
        <h3 className="text-4xl font-bold mb-8 flex gap-3">
          Let's get you in{" "}
        </h3>

        <div className="space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Username Field */}

            <form.Field name="email">
              {({ state, handleChange, handleBlur }) => (
                <div className="space-y-1.5">
                  <div>
                    <Input
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      type="email"
                      placeholder="Email"
                      className="border-0 border-b shadow-none  border-gray-300 rounded-none px-0 py-2 text-lg focus-visible:ring-0 focus-visible:border-black"
                    />
                  </div>

                  {state.meta.isTouched && state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-500 pt-0.5">
                      {state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {({ state, handleChange, handleBlur }) => (
                <div className="space-y-1.5">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="border-0 border-b border-gray-300 shadow-none rounded-none px-0 py-2 text-lg focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      className="absolute top-0 right-0"
                      size="icon"
                      variant="ghost"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                  </div>

                  {state.meta.isTouched && state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-500 pt-0.5">
                      {state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="pt-4">
              <Button
                variant="sketch"
                disabled={login.isPending}
                className="rounded-full w-full"
              >
                {login.isPending ? (
                  <LoaderCircleIcon
                    className="-ms-1 animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
