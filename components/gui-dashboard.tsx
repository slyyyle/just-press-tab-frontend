"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Music, Code, FileText, Gamepad2, Brain, Zap, Disc, Layers, Hexagon, Sparkles } from "lucide-react"

export function GuiDashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hoverTile, setHoverTile] = useState<string | null>(null)
  const router = useRouter()

  // Handle escape key to exit active section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && activeSection) {
          setActiveSection(null)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeSection])

  const handleTileClick = (section: string) => {
    setActiveSection(section)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  const menuItems = [
    {
      title: "Music",
      icon: "🎵",
      description: "AI-powered music generation and production",
      path: "/music",
    },
    {
      title: "Gaming",
      icon: "🎮",
      description: "Game development and retro gaming projects",
      path: "/gaming",
    },
    {
      title: "Research",
      icon: "🔬",
      description: "AI/ML research and experiments",
      path: "/research",
    },
    {
      title: "Software",
      icon: "💻",
      description: "Software development and tools",
      path: "/software",
    },
    {
      title: "About",
      icon: "ℹ️",
      description: "About me and my projects",
      path: "/about",
    },
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-900 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzIxMmE0MiIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      {/* Main dashboard grid */}
      <div className="h-full w-full flex items-center justify-center p-8">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* Header - spans full width */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-3 bg-slate-800/60 backdrop-blur-md rounded-lg border border-slate-700/50 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  JPT
                </div>
                <div>
                  <h1 className="font-press-start-2p text-lg text-white">Just Press Tab</h1>
                  <p className="font-mono text-xs text-slate-400">CyberTab OS v1.0</p>
                </div>
              </div>
              <div className="font-mono text-sm text-slate-400">
                <span className="text-cyan-400">kyle.hammitt</span>@<span className="text-red-400">justpresstab.com</span>
              </div>
            </motion.div>

            <DashboardTile
              title="About"
              icon={<Hexagon className="h-6 w-6" />}
              color="blue"
              delay={0.1}
              onClick={() => router.push("/about")}
              onHover={() => setHoverTile("about")}
              onLeave={() => setHoverTile(null)}
              isHovered={hoverTile === "about"}
              description="The story behind Just Press Tab"
              imagePlaceholder="/bomberrunt.gif"
              imageAlt="Profile avatar"
            />

            <DashboardTile
              title="Resume"
              icon={<Brain className="h-6 w-6" />}
              color="purple"
              delay={0.2}
              onClick={() => router.push("/resume")}
              onHover={() => setHoverTile("research")}
              onLeave={() => setHoverTile(null)}
              isHovered={hoverTile === "research"}
              description="Somewhat explains what I do."
              imagePlaceholder="/weightlifting_wario.gif"
              imageAlt="Neural network visualization"
            />

            <DashboardTile
              title="MLOps/Dev"
              icon={<Code className="h-6 w-6" />}
              color="red"
              delay={0.3}
              onClick={() => router.push("/software")}
              onHover={() => setHoverTile("software")}
              onLeave={() => setHoverTile(null)}
              isHovered={hoverTile === "software"}
              description="Coding projects, tools, and development"
              imagePlaceholder="/smg4-typing.gif"
              imageAlt="Code editor screenshot"
            />

            <DashboardTile
              title="Music"
              icon={<Music className="h-6 w-6" />}
              color="cyan"
              delay={0.2}
              onClick={() => router.push("/music")}
              onHover={() => setHoverTile("music")}
              onLeave={() => setHoverTile(null)}
              isHovered={hoverTile === "music"}
              description="Production, theory, and engineering"
              imagePlaceholder="/mario_jackson.gif"
              imageAlt="Music production equipment"
            />

            <DashboardTile
              title="Gaming"
              icon={<Gamepad2 className="h-6 w-6" />}
              color="green"
              delay={0.5}
              onClick={() => router.push("/gaming")}
              onHover={() => setHoverTile("gaming")}
              onLeave={() => setHoverTile(null)}
              isHovered={hoverTile === "gaming"}
              description="Game reviews, development, and analysis"
              imagePlaceholder="/bulb_mirrored.gif"
              imageAlt="Retro game controller"
            />

            <DashboardTile
              title="Life"
              icon={<FileText className="h-6 w-6" />}
              color="yellow"
              delay={0.6}
              onClick={() => router.push("/life")}
              onHover={() => setHoverTile("life")}
              onLeave={() => setHoverTile(null)}
              isHovered={hoverTile === "life"}
              description="A catch all for everything else"
              imagePlaceholder="/ness_hanging.gif"
              imageAlt="Blog writing"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type DashboardTileProps = {
  title: string
  icon: React.ReactNode
  color: "red" | "cyan" | "purple" | "green" | "yellow" | "blue"
  delay: number
  onClick: () => void
  onHover: () => void
  onLeave: () => void
  isHovered: boolean
  description: string
  imagePlaceholder: string
  imageAlt: string
}

function DashboardTile({
  title,
  icon,
  color,
  delay,
  onClick,
  onHover,
  onLeave,
  isHovered,
  description,
  imagePlaceholder,
  imageAlt,
}: DashboardTileProps) {
  const colorClasses = {
    red: "from-red-500/20 to-red-600/20 border-red-500/30 hover:border-red-500/50 group-hover:text-red-400",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 hover:border-cyan-500/50 group-hover:text-cyan-400",
    purple:
      "from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-500/50 group-hover:text-purple-400",
    green: "from-green-500/20 to-green-600/20 border-green-500/30 hover:border-green-500/50 group-hover:text-green-400",
    yellow:
      "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 hover:border-yellow-500/50 group-hover:text-yellow-400",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-500/50 group-hover:text-blue-400",
  }

  const iconColorClasses = {
    red: "text-red-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    blue: "text-blue-400",
  }

  const glowClasses = {
    red: "shadow-red-500/20",
    cyan: "shadow-cyan-500/20",
    purple: "shadow-purple-500/20",
    green: "shadow-green-500/20",
    yellow: "shadow-yellow-500/20",
    blue: "shadow-blue-500/20",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "relative group cursor-pointer rounded-lg border overflow-hidden",
        "bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md",
        colorClasses[color],
        isHovered && "shadow-lg",
        isHovered && glowClasses[color],
      )}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className={cn("p-2 rounded-md bg-slate-900/50", iconColorClasses[color])}>{icon}</div>
          <Sparkles
            className={cn("h-4 w-4 opacity-0 transition-opacity", isHovered && "opacity-70", iconColorClasses[color])}
          />
        </div>

        <h3 className="font-press-start-2p text-sm text-white mb-2">{title}</h3>
        <p className="font-mono text-xs text-slate-400 mb-3 line-clamp-2">{description}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="w-20 h-20">
            <div className="w-full h-full rounded-md bg-slate-900/50 flex items-center justify-center text-slate-700">
              <img src={imagePlaceholder || "/placeholder.svg"} alt={imageAlt} className="w-full h-full object-cover" />
            </div>
          </div>

          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              "border",
              `border-${color}-500/50 text-${color}-400`,
            )}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Animated border effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
          "border border-dashed rounded-lg",
          `border-${color}-400/30`,
        )}
        style={{ padding: "1px" }}
      ></div>
    </motion.div>
  )
}

