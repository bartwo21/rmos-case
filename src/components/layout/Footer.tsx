import React from "react";

export default function Footer() {
  return (
    <footer className="w-full h-12 bg-gray-100 mt-auto">
      <div className="container mx-auto h-full flex items-center justify-center">
        <p className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} RMOS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
