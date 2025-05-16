import React from "react";
import { Spinner } from "./spinner";

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <Spinner size="lg" className="mb-4" />
    </div>
  );
};
