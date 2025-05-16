import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Navbar";
import { ErrorBoundaryProvider } from "@/components/error-boundaries/GeneralErrorBoundary";
import Footer from "@/components/layout/Footer";
import { QueryProvider } from "./queryprovider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rmos - Frontend Case Study",
  description: "Rmos Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ErrorBoundaryProvider>
              <Header />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </ErrorBoundaryProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
