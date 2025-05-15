import React, { lazy, Suspense } from "react";
import { BlacklistRequestData } from "@/types/blacklist";
import { Loading } from "@/components/ui/loading";

const BlacklistData = lazy(() => import("./components/BlacklistData"));

const defaultBlackList: BlacklistRequestData = {
  db_Id: 9,
  Adi: "ALL?",
};

export default function page() {
  return (
    <div className="p-8 mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 w-full text-left">Blacklist</h1>

      <Suspense fallback={<Loading message="Loading Blacklist..." />}>
        <BlacklistData requestData={defaultBlackList} />
      </Suspense>
    </div>
  );
}
