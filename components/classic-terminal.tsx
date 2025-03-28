"use client"

import type React from "react"
import { CyberTerminal } from "@/components/cyber-terminal"
import { cn } from "@/lib/utils"

type ClassicTerminalProps = {
  initialCommands?: Array<{
    command: string
    output: string
    isSystem?: boolean
    isError?: boolean
    isSuccess?: boolean
    isComponent?: boolean
    component?: React.ReactNode
    isHidden?: boolean
  }>
  className?: string
  onModeToggle?: (mode: "terminal" | "gui") => void
  onNavigate?: (path: string) => void
  onCommand?: (command: string, args: string[]) => { output: string; isSuccess: boolean; isError: boolean }
  fullHeight?: boolean
}

export function ClassicTerminal({
  initialCommands = [],
  className,
  onModeToggle,
  onNavigate,
  onCommand,
  fullHeight = false,
}: ClassicTerminalProps) {
  return (
    <div
      className={cn(
        "bg-black border-2 border-primary rounded-md overflow-hidden pixel-corners",
        fullHeight ? "h-full" : "h-[650px]",
        className,
      )}
    >
      <div className="bg-primary px-4 py-1 flex items-center">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
        </div>
        <div className="font-press-start-2p text-xs text-black">terminal@justpresstab:~</div>
      </div>

      <CyberTerminal
        initialCommands={initialCommands}
        onModeToggle={onModeToggle}
        onNavigate={onNavigate}
        onCommand={onCommand}
        fullHeight={true}
        className="h-[calc(100%-80px)] bg-black"
        customSettings={{
          textColor: "text-green-400",
          bgColor: "bg-black",
          rainSpeed: 10,
          rainOpacity: 0.3,
          rainColor1: "rgba(0, 255, 0, 0.9)",
          rainColor2: "rgba(0, 255, 0, 0.9)",
          fontSize: 10,
          bgAnimation: "none",
        }}
      />
    </div>
  )
}

