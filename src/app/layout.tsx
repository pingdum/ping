import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";

import { Nav } from "./nav";
import { NavigationTracker } from "./navigation-tracker";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js by João Pedro Schmitz`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Nav />
        {children}
      </body>
      <GoogleAnalytics gaId="G-M31DVHBBZ7" />
      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>
    </html>
  );
}
