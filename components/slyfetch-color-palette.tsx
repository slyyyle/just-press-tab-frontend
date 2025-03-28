"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SlyFetchColorPaletteProps {
  className?: string
  animate?: boolean
}

export function SlyFetchColorPalette({ className, animate = true }: SlyFetchColorPaletteProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Colors for the color palette display - removed green, added more cyan/blue/purple tones
  const colors = [
    "bg-cyan-400",
    "bg-blue-400",
    "bg-teal-400",
    "bg-indigo-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-fuchsia-400",
    "bg-violet-400",
  ]

  useEffect(() => {
    // Animate in the content
    if (animate) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 300)

      return () => {
        clearTimeout(timer)
      }
    } else {
      setIsLoaded(true)
    }
  }, [animate])

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
        "transition-all duration-500 delay-&lsqb;1200ms&rsqb;",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        {colors.map((color, i) => (
          <div
            key={i}
            className={cn("w-3 h-3 rounded-full", color, "animate-pulse", `animation-delay-${(i + 1) * 100}`)}
          />
        ))}
      </div>
    </div>
  )
}

