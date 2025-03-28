import type React from "react"
import { cn } from "@/lib/utils"

interface PixelCardProps {
  children: React.ReactNode
  className?: string
}

export function PixelCard({ children, className }: PixelCardProps) {
  return (
    <div className={cn("bg-card border-2 border-primary rounded-md overflow-hidden pixel-corners", className)}>
      {children}
    </div>
  )
}

