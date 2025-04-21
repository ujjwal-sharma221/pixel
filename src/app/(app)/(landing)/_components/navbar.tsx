import Logo from "@/assets/logo.svg";
import LetterSwapForward from "@/components/ui/letter-swap-forward-anim";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-x-1">
        <Image src={Logo} alt="logo" width={40} height={40}></Image>
        <h1 className="text-3xl font-bold">Pixel</h1>
      </div>
      <div className="flex items-center gap-x-2">
        <Link href="/login">
          <LetterSwapForward
            label="Login"
            reverse={false}
            className="text-xl"
          />
        </Link>
        /
        <Link href="/signup">
          <LetterSwapForward
            label="Sign Up"
            reverse={false}
            className="text-xl"
          />
        </Link>
      </div>
    </nav>
  );
}
