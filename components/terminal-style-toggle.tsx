"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Monitor, Terminal } from "lucide-react"

interface TerminalStyleToggleProps {
  className?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  onToggleStyle?: (style: "classic" | "cyber") => void
  currentStyle?: "classic" | "cyber"
}

export function TerminalStyleToggle({
  className,
  position = "bottom-right",
  onToggleStyle,
  currentStyle = "cyber",
}: TerminalStyleToggleProps) {
  const [style, setStyle] = useState<"classic" | "cyber">(currentStyle)

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
  }

  // Toggle terminal style
  const handleToggleStyle = () => {
    const newStyle = style === "classic" ? "cyber" : "classic"
    setStyle(newStyle)

    if (onToggleStyle) {
      onToggleStyle(newStyle)
    }
  }

  return (
    <div
      className={cn(
        "fixed bg-black/80 text-white text-xs p-2 font-mono z-50 rounded-sm border border-slate-700/50",
        positionClasses[position],
        className,
      )}
    >
      <div className="flex flex-wrap gap-x-3 mb-2">
        <span className="flex items-center">
          <span className="text-cyan-400 mr-1">Terminal Style:</span>
          <span className="text-slate-200">{style === "classic" ? "Classic" : "Cyber"}</span>
        </span>
      </div>

      {/* Terminal Style Toggle Button */}
      <Button
        size="sm"
        variant="outline"
        className="w-full text-xs bg-slate-800 border-cyan-500/50 hover:bg-slate-700 hover:text-cyan-300 flex items-center justify-center gap-2"
        onClick={handleToggleStyle}
      >
        {style === "classic" ? <Monitor size={14} /> : <Terminal size={14} />}
        Switch to {style === "classic" ? "Cyber" : "Classic"} Terminal
      </Button>
    </div>
  )
}

