import type React from "react"
import type { Metadata } from "next"
import { Inter, VT323, Press_Start_2P } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
})
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
})

const navigation = [
  { name: "Music", href: "/music" },
  { name: "Gaming", href: "/gaming" },
  { name: "Research", href: "/research" },
  { name: "Software", href: "/software" },
  { name: "About", href: "/about" },
];

export const metadata: Metadata = {
  title: "Just Press Tab",
  description: "A modern terminal interface for the web",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${vt323.variable} ${pressStart2P.variable} font-sans bg-black text-green-400`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'