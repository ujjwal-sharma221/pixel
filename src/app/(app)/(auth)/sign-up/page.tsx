import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";
import { SignUpForm } from "@/modules/auth/ui/sign-up-form";

const SignUpPage = async () => {
  const session = await caller.auth.session();
  if (session.user) redirect("/home");

  return (
    <div>
      <SignUpForm />
    </div>
  );
};
export default SignUpPage;
