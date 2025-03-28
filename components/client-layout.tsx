"use client"

import { useState } from "react"
import { DebugStatusBar } from "@/components/debug-status-bar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [terminalStyle, setTerminalStyle] = useState<"classic" | "cyber">("cyber")

  const handleTerminalStyleToggle = () => {
    setTerminalStyle(prev => prev === "classic" ? "cyber" : "classic")
  }

  return (
    <>
      <DebugStatusBar
        position="top"
        onToggleTerminalStyle={handleTerminalStyleToggle}
        terminalStyle={terminalStyle}
      />
      {children}
    </>
  )
} 