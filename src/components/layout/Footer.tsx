import { useTranslations } from "next-intl";
import React from "react";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="w-full h-12 bg-gray-100 mt-auto">
      <div className="container mx-auto h-full flex items-center justify-center">
        <p className="text-center text-gray-500">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
