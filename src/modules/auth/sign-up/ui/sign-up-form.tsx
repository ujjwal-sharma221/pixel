import Image from "next/image";

import FormImg1 from "@/assets/form-1.png";
import FormImg2 from "@/assets/form-2.png";
import FormImg3 from "@/assets/form-3.png";
import FormImg4 from "@/assets/form-4.png";

export function SignUpForm() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1">Form Component</div>
      <div className="flex-1 flex items-center justify-center px-4 w-full">
        <Image src={FormImg1} alt="form-img-1" height={200} width={200} />
        <Image src={FormImg2} alt="form-img-1" height={200} width={200} />
        <Image src={FormImg3} alt="form-img-1" height={200} width={200} />
        <Image src={FormImg4} alt="form-img-1" height={200} width={200} />
      </div>
    </div>
  );
}
