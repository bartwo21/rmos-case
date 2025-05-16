import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const HeroSection = () => {
  const t = useTranslations("hero");
  return (
    <div className="flex flex-col gap-4 text-left lg:p-20 p-12 bg-gradient-to-l from-blue-900 to-slate-900 text-white lg:rounded-bl-md lg:rounded-tl-md w-full lg:w-1/2 shadow-2xl">
      <h1
        className="bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text"
        style={{
          fontSize: "clamp(2.6rem, 5vw, 6rem)",
          lineHeight: "clamp(3.5rem, 6vw, 7rem)",
        }}
      >
        <span className="font-bold">{t("titleStart")}</span> {t("titleMiddle")}{" "}
        <span className="font-bold">{t("titleEnd")}</span>
      </h1>
      <p
        className="text-md text-gray-300 mt-8"
        style={{
          fontSize: "clamp(.7rem, 2vw, 1.5rem)",
          lineHeight: "clamp(1.1rem, 3vw, 2rem)",
        }}
      >
        {t("description")}
      </p>
      <Link href="/forecast">
        <Button className="py-6 lg:mt-20 mt-10 w-full" variant="default">
          {t("button")}
        </Button>
      </Link>
    </div>
  );
};
