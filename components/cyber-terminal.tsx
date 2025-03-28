"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { SlyFetch } from "@/components/slyfetch"
import { PatchNotesDialog } from "@/components/patch-notes-dialog"

type Command = {
  command: string
  output: string
  isSystem?: boolean
  isError?: boolean
  isSuccess?: boolean
  isComponent?: boolean
  component?: React.ReactNode
  isHidden?: boolean
}

type TerminalProps = {
  initialCommands?: Command[]
  className?: string
  onModeToggle?: (mode: "terminal" | "gui") => void
  onNavigate?: (path: string) => void
  onCommand?: (command: string, args: string[]) => { output: string; isSuccess: boolean; isError: boolean }
  fullHeight?: boolean
  onCustomize?: (settings: CustomizationSettings) => void
  customSettings?: CustomizationSettings
}

export type CustomizationSettings = {
  textColor: string
  bgColor: string
  rainSpeed: number
  rainOpacity: number
  rainColor1: string
  rainColor2: string
  fontSize: number
  bgAnimation: string
}

export function CyberTerminal({
  initialCommands = [],
  className,
  onModeToggle,
  onNavigate,
  onCommand,
  fullHeight = false,
  onCustomize,
  customSettings: initialCustomSettings,
}: TerminalProps) {
  const [history, setHistory] = useState<Command[]>([])
  const [input, setInput] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [showPatchNotes, setShowPatchNotes] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const defaultSettings: CustomizationSettings = {
    textColor: "text-cyan-400",
    bgColor: "bg-slate-800",
    rainSpeed: 10,
    rainOpacity: 0.3,
    rainColor1: "rgba(61, 210, 204, 0.9)",
    rainColor2: "rgba(255, 61, 177, 0.9)",
    fontSize: 10,
    bgAnimation: "none",
  }

  const [customSettings, setCustomSettings] = useState<CustomizationSettings>({
    ...defaultSettings,
    ...initialCustomSettings,
  })

  // Add this state for scrollbar visibility
  const [showScrollbar, setShowScrollbar] = useState(false)

  // Add these refs and handlers for scrollbar behavior
  const hasScrolled = useRef(false)
  const mouseLeftTerminal = useRef(false)

  const handleScroll = useCallback(() => {
    if (!hasScrolled.current) {
      hasScrolled.current = true
      setShowScrollbar(true)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseLeftTerminal.current = true
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (mouseLeftTerminal.current) {
      setShowScrollbar(true)
      mouseLeftTerminal.current = false
    }
  }, [])

  useEffect(() => {
    if (initialCommands.length > 0) {
      const displayInitialCommands = async () => {
        for (const cmd of initialCommands) {
          await new Promise((resolve) => setTimeout(resolve, 500))
          setHistory((prev) => [...prev, cmd])
        }
      }

      displayInitialCommands()
    }
  }, [initialCommands])

  // Ensure terminal scrolls to bottom after new output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setCursorPosition(e.target.selectionStart || 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()

      // Tab completion logic
      const commands = [
        "help",
        "clear",
        "nerd_mode=0",
        "nerd_mode=1",
        "slyfetch"
      ]

      const inputWords = input.split(" ")
      const lastWord = inputWords[inputWords.length - 1]

      const matches = commands.filter((cmd) => cmd.startsWith(lastWord))

      if (matches.length === 1) {
        if (inputWords.length === 1) {
          setInput(matches[0])
        } else {
          inputWords[inputWords.length - 1] = matches[0]
          setInput(inputWords.join(" "))
        }
      } else if (matches.length > 1) {
        // Show available completions
        setHistory((prev) => [
          ...prev,
          {
            command: input,
            output: `Possible completions: ${matches.join(", ")}`,
            isSystem: true,
          },
        ])
      }
    }

    if (e.key === "Enter") {
      e.preventDefault()
      handleCommand()
    }
  }

  const handleCommand = () => {
    if (!input.trim()) return

    let output = ""
    const cmd = input.trim().toLowerCase()
    let isSystem = false
    let isError = false
    let isSuccess = false
    let isComponent = false
    let component = null

    if (cmd === "help") {
      output = `
Available Commands:
- help          Show this help message
- clear         Clear the terminal
- nerd_mode=0   Switch to GUI mode

NOTE: I had to strip the fun terminal stuff, because I quickly broke my website.  It will be BACK!
      `
      isSystem = true
    } else if (cmd === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (cmd === "slyfetch") {
      isComponent = true
      component = <SlyFetch animate={false} className="my-2 ml-0 pl-0" />
    } else if (cmd === "nerd_mode=1") {
      output = "Switching to terminal-only mode..."
      isSuccess = true
      if (onModeToggle) onModeToggle("terminal")
    } else if (cmd === "nerd_mode=0") {
      output = "Switching to GUI mode..."
      isSuccess = true
      if (onModeToggle) onModeToggle("gui")
    } else {
      output = `Command not found: ${input}`
      isError = true
    }

    setHistory((prev) => [
      ...prev,
      {
        command: input,
        output,
        isSystem,
        isError,
        isSuccess,
        isComponent,
        component,
      },
    ])
    setInput("")
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Ensure terminal scrolls to bottom after command execution
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 10)
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden terminal-container",
        fullHeight ? "h-full" : "h-[650px]",
        customSettings?.bgColor || "bg-slate-800",
        className,
        "rounded-sm", // Slightly rounded corners
        showScrollbar ? "show-scrollbar" : "hide-scrollbar",
      )}
      onClick={focusInput} // Make sure this is here
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Terminal background with gradient */}
      <div className="absolute inset-0 terminal-bg z-0"></div>

      {/* Background animation layer */}
      {customSettings?.bgAnimation !== "none" && (
        <div
          className={`absolute inset-0 z-1 opacity-10 pointer-events-none terminal-bg-${customSettings.bgAnimation}`}
        ></div>
      )}

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className={cn("px-5 py-5 font-mono overflow-y-auto relative z-10 h-full", customSettings?.textColor || "text-cyan-400")}
        style={{ fontSize: `${customSettings?.fontSize || 10}pt` }}
        onScroll={handleScroll}
      >
        <div className="min-h-full pb-5">
          {/* Welcome display with SlyFetch */}
          <div className="mb-6">
            <SlyFetch animate={true} className="my-2" />
            <div className={cn("whitespace-pre-wrap pl-4 opacity-90 text-blue-300 text-center")}>
              Welcome to Just Press Tab Terminal! Type "help" to see available commands.
            </div>
            <div 
              className={cn("whitespace-pre-wrap pl-4 mt-2 opacity-90 text-red-500 font-bold text-center cursor-pointer hover:text-red-400")} 
              onClick={() => setShowPatchNotes(true)}
            >
              ⚠️ This site is under construction! ⚠️
            </div>
          </div>

          {/* Command history */}
          {history.map((item, index) => (
            !item.isHidden && (
              <div key={index} className="mb-3 leading-relaxed">
                <div className="flex">
                  <span className={cn("mr-2 opacity-90", customSettings?.textColor, item.isSystem && "text-pink-400")}>
                    $
                  </span>
                  <span className="text-slate-200">{item.command}</span>
                </div>
                {item.isComponent && item.component ? (
                  <div className="pl-0 ml-0">{item.component}</div>
                ) : (
                  <div
                    className={cn(
                      "whitespace-pre-wrap pl-4 opacity-90",
                      item.isError && "text-red-400",
                      item.isSuccess && "text-green-400",
                      item.isSystem && "text-blue-300",
                      !item.isError && !item.isSuccess && !item.isSystem && "text-slate-300",
                    )}
                  >
                    {item.output}
                  </div>
                )}
              </div>
            )
          ))}
          <div className="flex items-center mt-1">
            <span className={cn("mr-2 opacity-90", customSettings?.textColor)}>$</span>
            <span className="text-slate-200">{input}</span>
            <span className="terminal-cursor ml-0.5 text-cyan-400">|</span>
          </div>
          {/* This should be somewhere in your terminal content */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="opacity-0 absolute w-0 h-0" // Hidden but functional
            autoFocus
          />
        </div>
      </div>
      {showPatchNotes && <PatchNotesDialog isOpen={showPatchNotes} onClose={() => setShowPatchNotes(false)} />}
    </div>
  )
}

