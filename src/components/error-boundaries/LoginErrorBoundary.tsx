"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";

function LoginErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Giriş işlemi sırasında bir hata oluştu
      </h3>
      <p className="text-sm text-red-700 mb-4">
        Lütfen bilgilerinizi kontrol edip tekrar deneyin.
      </p>
      {process.env.NODE_ENV === "development" && (
        <p className="text-xs bg-red-100 p-2 rounded mb-4 font-mono">
          {error.message}
        </p>
      )}
      <Button
        onClick={resetErrorBoundary}
        variant="outline"
        className="border-red-500 text-red-500 hover:bg-red-50"
      >
        Tekrar Dene
      </Button>
    </div>
  );
}

export function LoginErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={LoginErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
      onError={(error) => {
        console.error("Login error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
