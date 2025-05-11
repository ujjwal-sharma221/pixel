import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";
import { SignInForm } from "@/modules/auth/ui/sign-in-form";

const SignInPage = async () => {
  const session = await caller.auth.session();
  if (session.user) redirect("/home");
  return (
    <div>
      <SignInForm />
    </div>
  );
};
export default SignInPage;
