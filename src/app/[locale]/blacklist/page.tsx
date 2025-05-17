import React, { lazy, Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { useTranslations } from "next-intl";
import { defaultBlacklistRequest } from "@/constants/blacklist";

const BlacklistData = lazy(() => import("./components/BlacklistData"));

export default function BlacklistPage() {
  const t = useTranslations();
  return (
    <div className="lg:p-8 p-4 mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 w-full text-left">
        {t("blacklist.title")}
      </h1>

      <Suspense fallback={<Loading />}>
        <BlacklistData requestData={defaultBlacklistRequest} />
      </Suspense>
    </div>
  );
}
