import React, { lazy, Suspense } from "react";
import { BlacklistRequestData } from "@/types/blacklist";
import { Loading } from "@/components/ui/loading";
import { useTranslations } from "next-intl";

const BlacklistData = lazy(() => import("./components/BlacklistData"));

const defaultBlackList: BlacklistRequestData = {
  db_Id: 9,
  Adi: "ALL?",
  tip: 9,
};

export default function BlacklistPage() {
  const t = useTranslations();
  return (
    <div className="lg:p-8 p-4 mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 w-full text-left">
        {t("blacklist.title")}
      </h1>

      <Suspense fallback={<Loading />}>
        <BlacklistData requestData={defaultBlackList} />
      </Suspense>
    </div>
  );
}
