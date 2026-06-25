import type { Metadata } from "next"
import { Prompt, Inter } from "next/font/google"
import { Suspense } from "react"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const promptFont = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "ระบบจัดการหลังบ้าน",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      className={`${promptFont.variable} ${interFont.variable} font-sans`}
      suppressHydrationWarning
    >
      <body>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <ThemeProvider>
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
