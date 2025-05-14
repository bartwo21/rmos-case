"use client";

import { useEffect } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/button";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  useEffect(() => {
    console.error("Yakalanan hata:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Something went wrong</h2>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-sm font-medium text-gray-300 mb-2">Error:</p>
            <pre className="text-sm text-red-300 bg-red-950/50 p-4 rounded overflow-auto whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={resetErrorBoundary}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-950"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
      onError={(error: Error) => {
        console.error("Yakalanan hata:", error);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
