"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TerminalPage() {
  const [terminalVisible, setTerminalVisible] = useState(false)
  const [terminalStyle, setTerminalStyle] = useState<"classic" | "cyber">("cyber")
  const router = useRouter()

  // Initial setup effect
  useEffect(() => {
    // Show terminal after initial render
    setTerminalVisible(true)
  }, [])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  // Update the initialCommands to only clear the screen
  const initialCommands = [
    {
      command: "clear",
      output: "",
      isSystem: true,
      isHidden: true,
    },
  ]

  return (
    <main className="relative min-h-screen pt-6">
      <div className="h-screen w-full relative overflow-hidden">
        <div className="scanlines absolute inset-0 z-10 pointer-events-none"></div>

        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Terminal */}
          <div className={`z-20 transition-opacity duration-300 ${terminalVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
    </main>
  )
} 