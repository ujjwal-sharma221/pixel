import { Hero } from "./_components/hero";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="lg:text-5xl  text-5xl pt-4 font-semibold">
        Share your creations, sell directly, and get paid instantly with Pixel.
        <SmoothCursor />
      </div>
      <Hero />
    </div>
  );
}
