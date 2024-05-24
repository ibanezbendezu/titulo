import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <Link href="/">
         <Image
            src="/logo.svg"
            height={40}
            width={40}
            alt="Logo"
            className="dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            height={40}
            width={40}
            alt="Logo"
            className="hidden dark:block"
          />
        </Link>
        <Link href="/">
            <p className={cn("font-semibold", font.className)}>Hound</p>
        </Link>
    </div>
  );
};
