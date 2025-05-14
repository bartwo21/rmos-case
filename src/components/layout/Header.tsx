import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex items-center justify-between px-40 py-4 w-full">
      <Link href="/">
        <Image
          src="https://www.rmosyazilim.com/img/logo.png"
          alt="Rmos Logo"
          width={100}
          height={100}
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </div>
  );
}
