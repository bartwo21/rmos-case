import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const HeroSection = () => {
  const t = useTranslations("hero");
  return (
    <div className="flex flex-col gap-4 text-left p-20 bg-gradient-to-l from-blue-900 to-slate-900 text-white rounded-bl-md rounded-tl-md w-1/2 shadow-2xl">
      <h1 className="text-8xl bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text">
        <span className="font-bold">{t("titleStart")}</span> {t("titleMiddle")}{" "}
        <span className="font-bold">{t("titleEnd")}</span>
      </h1>
      <p className="text-md text-gray-300 mt-8">{t("description")}</p>
      <Link href="/forecast">
        <Button className="py-6 mt-20 w-full" variant="default">
          {t("button")}
        </Button>
      </Link>
    </div>
  );
};
