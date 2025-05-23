"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Music,
  Code,
  BookOpen,
  FileText,
  ChevronRight,
  Terminal,
  Braces,
  Headphones,
  Cpu,
  Brain,
  Gamepad2,
  Trophy,
} from "lucide-react"

type NavCategory = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  sections: {
    id: string
    name: string
    icon: React.ReactNode
  }[]
}

export function GuiNavMenu({ onTerminalMode }: { onTerminalMode: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close menu when clicking outside
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setActiveCategory(null)
          setActiveSection(null)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const categories: NavCategory[] = [
    {
      id: "music",
      name: "Music",
      icon: <Music className="h-5 w-5" />,
      color: "text-cyan-400",
      sections: [
        { id: "production", name: "Production", icon: <Headphones className="h-4 w-4" /> },
        { id: "instruments", name: "Instruments", icon: <Music className="h-4 w-4" /> },
        { id: "research", name: "Research", icon: <BookOpen className="h-4 w-4" /> },
      ],
    },
    {
      id: "software",
      name: "Software",
      icon: <Code className="h-5 w-5" />,
      color: "text-red-400",
      sections: [
        { id: "projects", name: "Projects", icon: <Braces className="h-4 w-4" /> },
        { id: "tools", name: "Tools", icon: <Cpu className="h-4 w-4" /> },
        { id: "research", name: "Research", icon: <BookOpen className="h-4 w-4" /> },
      ],
    },
    {
      id: "learning",
      name: "Research",
      icon: <Brain className="h-5 w-5" />,
      color: "text-purple-400",
      sections: [
        { id: "ai", name: "AI & ML", icon: <Brain className="h-4 w-4" /> },
        { id: "papers", name: "Papers", icon: <FileText className="h-4 w-4" /> },
        { id: "experiments", name: "Experiments", icon: <Cpu className="h-4 w-4" /> },
      ],
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: <Gamepad2 className="h-5 w-5" />,
      color: "text-green-400",
      sections: [
        { id: "reviews", name: "Reviews", icon: <Trophy className="h-4 w-4" /> },
        { id: "development", name: "Development", icon: <Code className="h-4 w-4" /> },
        { id: "research", name: "Research", icon: <BookOpen className="h-4 w-4" /> },
      ],
    },
  ]

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null)
      setActiveSection(null)
    } else {
      setActiveCategory(categoryId)
      setActiveSection(null)
    }
  }

  const handleSectionClick = (categoryId: string, sectionId: string) => {
    setActiveSection(sectionId)
    // Navigate to the appropriate route
    router.push(`/${categoryId}/${sectionId}`)
  }

  const menuItems = [
    {
      name: "Music",
      path: "/music",
    },
    {
      name: "Gaming",
      path: "/gaming",
    },
    {
      name: "Research",
      path: "/research",
    },
    {
      name: "Software",
      path: "/software",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <div ref={menuRef} className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-full px-2 py-1.5 border border-slate-700/50 shadow-lg shadow-cyan-500/10"
      >
        <div className="flex items-center gap-1">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 font-mono text-sm transition-all",
                  activeCategory === category.id
                    ? `bg-slate-700/70 ${category.color}`
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50",
                )}
              >
                <span className={cn(category.color, "mr-2")}>{category.icon}</span>
                {category.name}
                {activeCategory === category.id && <ChevronRight className="ml-1 h-3 w-3 rotate-90" />}
              </Button>

              <AnimatePresence>
                {activeCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-md shadow-lg shadow-cyan-500/5 overflow-hidden"
                  >
                    <div className="p-1">
                      {category.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(category.id, section.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-sm font-mono text-sm flex items-center",
                            activeSection === section.id
                              ? `bg-slate-700/70 ${category.color}`
                              : "text-slate-300 hover:text-white hover:bg-slate-700/50",
                          )}
                        >
                          <span className="mr-2 opacity-70">{section.icon}</span>
                          {section.name}
                        </button>
                      ))}
                    </div>

                    {/* Syntax-like decorative elements */}
                    <div className="px-3 py-1.5 border-t border-slate-700/50 bg-slate-900/50 text-xs font-mono text-slate-500 flex items-center justify-between">
                      <span className="text-cyan-500">const</span> <span className="text-red-400">selected</span>{" "}
                      <span className="text-slate-400">=</span> <span className="text-green-400">'{category.id}'</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="h-5 mx-1 w-px bg-slate-700/50"></div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onTerminalMode}
            className="rounded-full px-3 py-1.5 font-mono text-sm text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <Terminal className="h-4 w-4 mr-2 text-red-400" />
            Terminal
          </Button>
        </div>
      </motion.div>

      {/* Breadcrumb path display */}
      {activeCategory && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute -bottom-8 left-0 right-0 text-center text-xs font-mono text-slate-400"
        >
          <span className="bg-slate-900/70 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-slate-800/50">
            <span className="text-cyan-500">~</span>
            <span className="text-slate-500">/</span>
            <span className="text-red-400">{activeCategory}</span>
            {activeSection && (
              <>
                <span className="text-slate-500">/</span>
                <span className="text-green-400">{activeSection}</span>
              </>
            )}
          </span>
        </motion.div>
      )}
    </div>
  )
}

