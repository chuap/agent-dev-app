import { Suspense } from "react";
import type { Metadata } from "next";
import { Prompt, Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const promptFont = Prompt({
  weight: ['400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-heading',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "ระบบ E-Commerce | eCommerce" ,
  description: "ระบบ E-Commerce สำหรับการจัดการร้านค้าออนไลน์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${promptFont.variable} ${interFont.variable} font-sans`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Suspense fallback={<div className="h-16 border-b bg-background" />}>
          <Navbar />
          </Suspense>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
