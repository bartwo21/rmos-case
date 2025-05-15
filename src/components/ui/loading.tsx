import React from "react";
import { Spinner } from "./spinner";

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <Spinner size="lg" className="mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
