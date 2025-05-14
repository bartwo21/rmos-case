import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="flex flex-col gap-4 text-left p-20 bg-gradient-to-l from-blue-900 to-slate-900 text-white rounded-bl-md rounded-tl-md w-1/2 shadow-2xl">
      <h1 className="text-8xl bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text">
        <span className="font-bold">Powerfull</span> Tools Dashboard by{" "}
        <span className="font-bold">Rmos</span>
      </h1>
      <p className="text-md text-gray-300 mt-8">
        Awesome Dashboard with powerful tools for your business. Easily manage
        your business with our tools and make your life easier.
      </p>
      <Link href="/forecast">
        <Button className="py-6 mt-20 w-full" variant="default">
          Get Started
        </Button>
      </Link>
    </div>
  );
};
