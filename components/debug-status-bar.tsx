// components/debug-status-bar.tsx
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Terminal, Cpu, MemoryStickIcon as Memory, Disc, Wifi, Clock, Zap, Monitor } from 'lucide-react'
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useBgFx } from "@/components/bg_fx_handler"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DebugStatusBarProps {
  className?: string
  position?: "bottom" | "top"
  onToggleTerminalStyle?: () => void
  terminalStyle?: "classic" | "cyber"
}

export function DebugStatusBar({
  className,
  position = "bottom",
  onToggleTerminalStyle,
  terminalStyle = "cyber",
}: DebugStatusBarProps) {
  const [time, setTime] = useState("00:00:00")
  const [isClient, setIsClient] = useState(false)
  const { currentEffect, setCurrentEffect } = useBgFx()
  const pathname = usePathname()
  const router = useRouter()

  // Determine if we're on the root (landing) page
  const isRootPage = pathname === "/"
  const isTerminalPage = pathname.startsWith("/terminal")
  const isGuiPage = pathname.startsWith("/gui")

  // Update time and simulate changing system stats
  useEffect(() => {
    // Set isClient to true when component mounts (client-side only)
    setIsClient(true)
    
    const timer = setInterval(() => {
      setTime(new Date().toISOString().slice(11, 19))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 bg-black text-white text-sm p-1.5 font-mono border-slate-700/50 shadow-md",
        position === "bottom" ? "bottom-0 border-t" : "top-0 border-b",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-4 px-4 w-full">
        {/* <div className="flex items-center gap-1">
          <Cpu className="h-4 w-4 text-cyan-400" />
          <span className="text-slate-400">CPU:</span>
          <span className={cpuUsage > 50 ? "text-red-400" : "text-cyan-400"}>{cpuUsage}%</span>
        </div>

        <div className="flex items-center gap-1">
          <Memory className="h-4 w-4 text-purple-400" />
          <span className="text-slate-400">MEM:</span>
          <span className="text-purple-400">{memoryUsage.toFixed(1)} GB</span>
        </div>

        <div className="flex items-center gap-1">
          <Disc className="h-4 w-4 text-green-400" />
          <span className="text-slate-400">DISK:</span>
          <span className="text-green-400">{diskUsage.toFixed(1)} GB</span>
        </div>

        <div className="flex items-center gap-1">
          <Wifi className="h-4 w-4 text-yellow-400" />
          <span className="text-slate-400">NET:</span>
          <span className="text-yellow-400">{networkLatency} ms</span>
        </div> */}

        {/* Background Effect Toggle */}
        <div className="flex items-center gap-1">
          <Zap className="h-4 w-4 text-pink-400" />
          <span className="text-slate-400">BG_FX:</span>
          <Select value={currentEffect} onValueChange={setCurrentEffect}>
            <SelectTrigger className="h-6 min-w-[120px] text-xs bg-slate-800 border-slate-700 flex items-center justify-between">
              <SelectValue className="flex-1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Effect</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="text-slate-400">TIME:</span>
          {isClient ? (
            <span className="text-blue-400">{time}</span>
          ) : (
            <span className="text-blue-400">00:00:00</span>
          )}
        </div>

        {/* Navigation buttons */}
        {isTerminalPage && onToggleTerminalStyle && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-pink-400 hover:text-pink-300"
            onClick={onToggleTerminalStyle}
          >
            <Terminal className="h-3 w-3 mr-1" />
            {terminalStyle === "classic" ? "CLASSIC" : "CYBER"}
          </Button>
        )}

        {isTerminalPage && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-cyan-400 hover:text-cyan-400"
            onClick={() => router.push("/gui")}
          >
            <Monitor className="h-3 w-3 mr-1" />
            GUI Mode
          </Button>
        )}

        {isGuiPage && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-cyan-400 hover:text-cyan-300"
            onClick={() => router.push("/terminal")}
          >
            <Terminal className="h-3 w-3 mr-1" />
            Terminal Mode
          </Button>
        )}
      </div>
    </div>
  )
}
