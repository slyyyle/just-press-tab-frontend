import type React from "react"
import { Gamepad2, Music, Brain, Code, Trophy, User, Terminal, Headphones, Cpu, PenTool } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryIconProps {
  category: string
  className?: string
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    gaming: <Gamepad2 className="w-full h-full" />,
    music: <Music className="w-full h-full" />,
    ai: <Brain className="w-full h-full" />,
    dev: <Terminal className="w-full h-full" />,
    sports: <Trophy className="w-full h-full" />,
    about: <User className="w-full h-full" />,
    audio: <Headphones className="w-full h-full" />,
    tech: <Cpu className="w-full h-full" />,
    art: <PenTool className="w-full h-full" />,
    code: <Code className="w-full h-full" />,
  }

  const lowerCategory = category.toLowerCase()
  const icon = iconMap[lowerCategory] || <Code className="w-full h-full" />

  return <div className={cn("bg-muted text-accent p-3 rounded-md pixel-corners", className)}>{icon}</div>
}

