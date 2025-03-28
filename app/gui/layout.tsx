import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Just Press Tab - GUI Mode",
  description: "Modern interface with interactive elements",
}

export default function GuiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      {children}
    </div>
  )
} 