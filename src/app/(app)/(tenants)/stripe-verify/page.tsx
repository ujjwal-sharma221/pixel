"use client";

import { useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

const StipeVerifyPage = () => {
  const trpc = useTRPC();
  const { mutate: verify } = useMutation(
    trpc.checkout.verify.mutationOptions({
      onSuccess: (data) => (window.location.href = data.url),
      onError: (error) => (window.location.href = "/"),
    })
  );

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderPinwheel className="animate-spin text-muted-foreground" />
    </div>
  );
};
export default StipeVerifyPage;
