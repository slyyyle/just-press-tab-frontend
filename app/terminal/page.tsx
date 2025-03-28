"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { TerminalWindow } from "@/components/terminal-window"
import { DebugStatusBar } from "@/components/debug-status-bar"
import { AppController } from "@/lib/app-controller"

export default function TerminalPage() {
  const [terminalVisible, setTerminalVisible] = useState(false)
  const [terminalStyle, setTerminalStyle] = useState<"classic" | "cyber">("cyber")
  const router = useRouter()
  const appController = useRef(new AppController()).current

  // Initial setup effect
  useEffect(() => {
    // Show terminal after initial render
    setTerminalVisible(true)
    // Set router in AppController
    appController.setRouter(router)
  }, [router])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Set default CSS variables for pixel rain
      document.documentElement.style.setProperty("--rain-speed", "10s")
      document.documentElement.style.setProperty("--rain-opacity", "0.6")
      document.documentElement.style.setProperty("--rain-color-1", "rgba(61, 210, 204, 0.9)")
      document.documentElement.style.setProperty("--rain-color-2", "rgba(255, 61, 177, 0.9)")
    }
  }, [terminalStyle])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  // Handle mode toggle
  const handleModeToggle = (mode: "terminal" | "gui") => {
    router.push(mode === "gui" ? "/gui" : "/terminal")
  }

  // Handle app commands from terminal
  const handleAppCommand = (command: string, args: string[]) => {
    return appController.handleCommand(command, args)
  }

  // Handle terminal style toggle
  const handleTerminalStyleToggle = (style: "classic" | "cyber") => {
    setTerminalStyle(style)
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

        {/* App background animation container */}
        <div
          className={`app-bg-container absolute inset-0 z-5 pointer-events-none ${appController.bgAnimation !== "none" ? `app-bg-${appController.bgAnimation}` : ""}`}
        ></div>

        {/* Debug status bar with terminal style toggle */}
        <DebugStatusBar
          position="top"
          onToggleTerminalStyle={() => handleTerminalStyleToggle(terminalStyle === "classic" ? "cyber" : "classic")}
          terminalStyle={terminalStyle}
        />

        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Terminal */}
          <div className={`z-20 transition-opacity duration-300 ${terminalVisible ? 'opacity-100' : 'opacity-0'}`}>
            {terminalVisible && (
              <TerminalWindow
                initialCommands={initialCommands}
                onNavigate={handleNavigate}
                onAppCommand={handleAppCommand}
                terminalStyle={terminalStyle}
                onModeToggle={handleModeToggle}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 