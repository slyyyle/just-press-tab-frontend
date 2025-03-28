"use client"
import { cn } from "@/lib/utils"

interface AsciiLogoProps {
  className?: string
  color?: string
  animate?: boolean
}

export function AsciiLogo({ className = "", color = "text-cyan-400", animate = true }: AsciiLogoProps) {
  // Pre-defined ASCII art for the logo
  const asciiArt = [
    "     _  _   _  ___  _____",
    " _ _| || | | |/ __||_   _|",
    "| | | || |_| |\\__ \\  | |",
    "|_| |_||____/ |___/  |_|",
    "",
    "     ___  ___  ___  ___  ___",
    " _ _| _ \\| _ \\| __|| __|| __|",
    "| | |  _/|   /| _| | _| | _|",
    "|_| |_|  |_|_\\|___||___||___|",
    "",
    "                  _____  _    ___",
    "                 |_   _|/ \\  | _ )",
    "                   | | / _ \\ | _ \\",
    "                   |_|/_/ \\_\\|___/",
  ]

  return (
    <div className={cn("font-mono flex items-center justify-center", className, color)}>
      <pre
        className={cn(
          "whitespace-pre transition-all duration-700",
          animate ? (animate ? "opacity-100" : "opacity-0") : "opacity-100",
        )}
      >
        {asciiArt.map((line, i) => (
          <div
            key={i}
            className={cn(
              "leading-tight",
              // Right-align the TAB part (last 4 lines)
              i >= 10 ? "text-right" : "",
            )}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}

