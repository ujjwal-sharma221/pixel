"use client";

import Link from "next/link";
import { type } from "arktype";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff, LoaderCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextMorph } from "@/components/ui/text-morph";

export function SignUpForm() {
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-baseline">
          <h1 className="text-4xl font-bold">Pixel</h1>
        </Link>
        <Button className="group" variant="ghost" asChild>
          <Link href="/sign-in">
            Login
            <ArrowRight
              className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </Button>
      </header>
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-16">
          <h2 className="text-6xl font-bold mb-4">Hey There!</h2>
          <h2 className="text-6xl font-bold mb-8">Let&apos;s Get Started</h2>

          <div className="h-px bg-gray-200 w-full my-8"></div>

          <p className=" mb-8">
            This form only takes two minutes to complete and helps to create a
            account at Pixel. By registering for a pixel account you agree to
            our <span className="font-bold underline">terms</span> and{" "}
            <span className="font-bold underline">services</span>
          </p>
        </div>
        <SignUpFormComponent />
      </main>
    </div>
  );
}

function SignUpFormComponent() {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/home");
      },
    })
  );

  const UserSchema = type({
    email: "string.email < 100",
    password: "string >= 8",
    username: "string.alphanumeric >= 3",
  });

  type UserValues = typeof UserSchema.infer;

  const form = useForm({
    validators: { onBlur: UserSchema },
    defaultValues: {
      email: "",
      password: "",
      username: "",
    } as UserValues,

    onSubmit: ({ value }) => {
      register.mutate(value);
    },
  });

  const [text, setText] = useState("you");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-12">
      <div className="">
        <h3 className="text-4xl font-bold mb-8 flex gap-3">
          First off, a little about{" "}
          <span className="italic font-light">
            <TextMorph>{text}</TextMorph>
          </span>
        </h3>

        <div className="space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Username Field */}
            <form.Field name="username">
              {({ state, handleChange, handleBlur }) => (
                <div className="space-y-1.5">
                  <div>
                    <Input
                      value={state.value}
                      onChange={(e) => {
                        handleChange(e.target.value);
                        setText(e.target.value);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Username"
                      className="border-0 border-b shadow-none  border-gray-300 rounded-none px-0 py-2 text-lg focus-visible:ring-0 focus-visible:border-black"
                    />
                  </div>
                  {state.meta.isTouched && state.meta.errors.length > 0 ? (
                    <p className="text-xs text-red-600 dark:text-red-500 pt-0.5">
                      {state.meta.errors[0]?.message}
                    </p>
                  ) : (
                    <p
                      className={cn(
                        !state.value && "hidden",
                        "text-xs font-bold "
                      )}
                    >
                      Your domain will be{" "}
                      <span className="text-primary">{state.value}</span>
                    </p>
                  )}
                </div>
              )}
            </form.Field>

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
                disabled={register.isPending}
                className="rounded-full w-full"
              >
                {register.isPending ? (
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
