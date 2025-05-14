import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-129px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white px-4">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

      <p className="text-gray-300 text-center max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      <Link href="/">
        <Button
          variant="default"
          className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
