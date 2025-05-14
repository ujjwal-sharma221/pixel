"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Logo from "@/assets/logo.svg";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import CenterUnderline from "@/components/underline-center";

export function HomeNavbar() {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <nav className="w-full fixed flex items-center justify-between px-2 border-b-1 p-2 border-dashed">
      <div>
        <Image src={Logo} alt="logo" width={20} height={20}></Image>
      </div>
      {session.data?.user ? (
        <Button asChild variant="secondary" className="rounded-full group">
          <Link href="/admin">
            Dashboard
            <ArrowRightIcon
              className="-me-1  transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </Button>
      ) : (
        <div className="space-x-2">
          <Link prefetch href="/sign-in">
            <CenterUnderline label="Login" />
          </Link>
          <span>/</span>
          <Link prefetch href="/sign-up">
            <CenterUnderline label="Sign Up" />
          </Link>
        </div>
      )}
    </nav>
  );
}
