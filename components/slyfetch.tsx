"use client"

import { cn } from "@/lib/utils"
import { SlyFetchLogo } from "./slyfetch-logo"
import { SlyFetchColorPalette } from "./slyfetch-color-palette"
import { SlyFetchSystemMonitor } from "./slyfetch-system-monitor"
import { useState, useEffect } from "react"

// Color palette for the terminal
const colors = [
  "#000000", "#FF0000", "#00FF00", "#FFFF00",
  "#0000FF", "#FF00FF", "#00FFFF", "#FFFFFF",
  "#808080", "#FF8080", "#80FF80", "#FFFF80",
  "#8080FF", "#FF80FF", "#80FFFF", "#C0C0C0"
]

interface SlyFetchProps {
  className?: string
  darkMode?: boolean
  animate?: boolean
  logoIndex?: number
}

export function SlyFetch({ className, darkMode = true, animate = true, logoIndex = 0 }: SlyFetchProps) {
  const [isLoaded, setIsLoaded] = useState(!animate)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [animate])

  return (
    <div
      className={cn(
        "font-mono rounded-md inline-block",
        darkMode ? "text-cyan-400" : "text-cyan-600",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Main Components Row */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-fit">
          {/* ASCII Art */}
          <div className="flex-shrink-0">
            <SlyFetchLogo
              logoIndex={logoIndex}
              animate={animate}
              className="text-[10px] leading-[1.4] font-mono"
            />
          </div>

          {/* Color Palette */}
          <div className="flex-shrink-0">
            <SlyFetchColorPalette
              animate={animate}
            />
          </div>

          {/* System Monitor */}
          <div className="flex-shrink-0">
            <SlyFetchSystemMonitor
              darkMode={darkMode}
              animate={animate}
              className="text-xs"
            />
          </div>
        </div>

        {/* MOTD Section */}
        <div
          className={cn(
            "rounded-md overflow-hidden w-full",
            "bg-gradient-to-br p-[1px] from-cyan-500 via-purple-500 to-pink-500",
          )}
        >
          <div
            className={cn(
              "px-4 py-2 flex items-center gap-2 text-xs transition-all duration-500",
              darkMode ? "bg-slate-900" : "bg-slate-100",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text font-medium whitespace-nowrap">
              MOTD:
            </span>
            <p className="text-cyan-400">
              Welcome to Just Press Tab - A journey of discovery through gaming, music, AI, and code.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

