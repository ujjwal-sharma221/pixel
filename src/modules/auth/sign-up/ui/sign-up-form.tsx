"use client";

import { type } from "arktype";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";

import FormImg1 from "@/assets/form-1.png";
import FormImg2 from "@/assets/form-2.png";
import FormImg3 from "@/assets/form-3.png";
import FormImg4 from "@/assets/form-4.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TextMorph } from "@/components/ui/text-morph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, LockIcon, MailIcon, User } from "lucide-react";

export function SignUpForm() {
  return (
    <div className="flex justify-between px-4 w-full h-screen bg-white">
      <div className="flex flex-col justify-between py-4">
        <Image src={FormImg1} alt="form-img-1" height={200} width={200} />
      </div>
      <div>
        <SignUpFormComponent />
      </div>
      <div className="flex flex-col justify-end py-4">
        <Image src={FormImg4} alt="form-img-1" height={200} width={200} />
      </div>
    </div>
  );
}

function SignUpFormComponent() {
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
      alert(JSON.stringify(value, null, 2));
    },
  });

  const [text, setText] = useState("there");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen dark:bg-gray-950 flex items-center justify-center p-4 selection:bg-primary/20 selection:text-primary bg-white">
      <Card className="w-full max-w-md bg-transparent border-none shadow-none">
        <CardHeader className="text-center p-0 pb-6 sm:pb-8">
          {/* Using h1 directly for better semantic control if CardTitle is too opinionated */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Hey
            <TextMorph className="font-medium text-primary mx-1">
              {text || "there"}
            </TextMorph>
            ! Let's get you started.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <form
            className="space-y-4" // Slightly tighter spacing for minimal feel
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Username Field */}
            <form.Field name="username">
              {({ state, handleChange, name, handleBlur }) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={name}
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize"
                  >
                    {name}
                  </Label>
                  <div className="relative">
                    <Input
                      id={name}
                      className="peer pe-10" // Removed shadow-sm
                      placeholder="Your unique username"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e.target.value);
                        setText(e.target.value);
                      }}
                      autoComplete="username"
                    />
                    <div className="text-muted-foreground/70 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                      <User size={16} aria-hidden="true" />
                    </div>
                  </div>
                  {state.meta.isTouched && state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-500 pt-0.5">
                      {state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email Field */}
            <form.Field name="email">
              {({ state, handleChange, name, handleBlur }) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={name}
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize"
                  >
                    {name}
                  </Label>
                  <div className="relative">
                    <Input
                      id={name}
                      className="peer pe-10"
                      type="email"
                      placeholder="you@example.com"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                      autoComplete="email"
                    />
                    <div className="text-muted-foreground/70 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                      <MailIcon size={16} aria-hidden="true" />
                    </div>
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
              {({ state, handleChange, name, handleBlur }) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={name}
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize"
                  >
                    {name}
                  </Label>
                  <div className="relative">
                    <Input
                      id={name}
                      className="peer pe-10"
                      value={state.value}
                      onBlur={handleBlur}
                      type={showPassword ? "text" : "password"}
                      placeholder="Choose a strong password"
                      onChange={(e) => handleChange(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground/70 absolute inset-y-0 end-0 flex items-center justify-center pe-3 hover:text-foreground focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={16} aria-hidden="true" />
                      ) : (
                        <Eye size={16} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {state.meta.isTouched && state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-500 pt-0.5">
                      {state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <Button
              // variant="default" // Or your primary button style
              className="w-full mt-6 py-2.5 text-sm font-semibold
                             bg-gray-900 text-white hover:bg-gray-800
                             dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              type="submit"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <a
              href="/terms" // Replace with your terms route
              className="font-medium text-primary hover:underline"
            >
              Terms & Conditions
            </a>
            .
          </p>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login" // Replace with your login route
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
