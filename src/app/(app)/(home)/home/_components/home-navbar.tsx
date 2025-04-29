import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/logo.svg";
import CenterUnderline from "@/components/underline-center";

export function HomeNavbar() {
  return (
    <nav className="w-full fixed flex items-center justify-between px-2 border-b-1 p-2 border-dashed">
      <div>
        <Image src={Logo} alt="logo" width={20} height={20}></Image>
      </div>
      <div className="space-x-2">
        <Link prefetch href="/sign-in">
          <CenterUnderline label="Login" />
        </Link>
        <span>/</span>
        <Link prefetch href="/sign-up">
          <CenterUnderline label="Sign Up" />
        </Link>
      </div>
    </nav>
  );
}
