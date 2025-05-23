"use client"

import { useState } from "react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [terminalStyle, setTerminalStyle] = useState<"classic" | "cyber">("cyber")

  const handleTerminalStyleToggle = () => {
    setTerminalStyle(prev => prev === "classic" ? "cyber" : "classic")
  }

  return (
    <>
      {children}
    </>
  )
} 