"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CyberTerminal, type CustomizationSettings } from "@/components/cyber-terminal"
import { ClassicTerminal } from "@/components/classic-terminal"
import { cn } from "@/lib/utils"

type TerminalWindowProps = {
  onModeToggle: (mode: "terminal" | "gui") => void
  onNavigate: (path: string) => void
  onAppCommand?: (command: string, args: string[]) => { output: string; isSuccess: boolean; isError: boolean }
  className?: string
  initialCommands?: Array<{
    command: string
    output: string
    isSystem?: boolean
    isError?: boolean
    isSuccess?: boolean
  }>
  terminalStyle?: "cyber" | "classic"
}

export function TerminalWindow({
  onModeToggle,
  onNavigate,
  onAppCommand,
  className,
  initialCommands = [],
  terminalStyle = "cyber",
}: TerminalWindowProps) {
  const [customSettings, setCustomSettings] = useState<CustomizationSettings>({
    textColor: "text-cyan-400",
    bgColor: "bg-slate-800",
    rainSpeed: 10,
    rainOpacity: 0.3,
    rainColor1: "rgba(61, 210, 204, 0.9)",
    rainColor2: "rgba(255, 61, 177, 0.9)",
    fontSize: 10,
    bgAnimation: "none",
  })

  const handleCustomize = (settings: CustomizationSettings) => {
    setCustomSettings(settings)

    // Apply rain settings to CSS variables
    if (settings.rainSpeed) {
      document.documentElement.style.setProperty("--rain-speed", `${20 - settings.rainSpeed}s`)
    }
    if (settings.rainOpacity) {
      document.documentElement.style.setProperty("--rain-opacity", settings.rainOpacity.toString())
    }
    if (settings.rainColor1 && settings.rainColor2) {
      document.documentElement.style.setProperty("--rain-color-1", settings.rainColor1)
      document.documentElement.style.setProperty("--rain-color-2", settings.rainColor2)
    }
  }

  const handleCommand = (command: string, args: string[]) => {
    // Check if it's an app command
    if (command.startsWith("app.") && onAppCommand) {
      return onAppCommand(command, args)
    }

    return {
      output: `Unknown command: ${command}`,
      isSuccess: false,
      isError: true,
    }
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty("--rain-speed", `${20 - customSettings.rainSpeed}s`)
      document.documentElement.style.setProperty("--rain-opacity", customSettings.rainOpacity.toString())
      document.documentElement.style.setProperty("--rain-color-1", customSettings.rainColor1)
      document.documentElement.style.setProperty("--rain-color-2", customSettings.rainColor2)
    }
  }, [customSettings])

  return (
    <div
      className={cn(
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg border border-primary/30 rounded-sm w-[900px] h-[700px]",
        className,
      )}
    >
      {terminalStyle === "cyber" ? (
        <CyberTerminal
          initialCommands={initialCommands}
          onModeToggle={onModeToggle}
          onNavigate={onNavigate}
          onCommand={handleCommand}
          fullHeight={true}
          onCustomize={handleCustomize}
          className={cn(customSettings.bgColor, "h-full")}
        />
      ) : (
        <ClassicTerminal
          initialCommands={initialCommands}
          onModeToggle={onModeToggle}
          onNavigate={onNavigate}
          onCommand={handleCommand}
          fullHeight={true}
        />
      )}
    </div>
  )
} 