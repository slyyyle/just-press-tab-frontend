import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle: string
  description?: string
  descriptionClassName?: string
  className?: string
  glowColor?: string
}

export function PageHeader({ title, subtitle, description, descriptionClassName, className, glowColor }: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h1 className={cn("font-press-start-2p text-5xl neon-text mb-4 pixel-art", glowColor)}>{title}</h1>

      <p className="font-vt323 text-2xl mb-6 text-[hsl(var(--platform))]">{subtitle}</p>
      
      {description && (
        <p className={cn("font-vt323 text-xl mb-6", descriptionClassName)}>{description}</p>
      )}

      <div className="flex justify-center gap-2">
        <div className="w-16 h-1 bg-[hsl(var(--primary))]"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--platform))]"></div>
        <div className="w-16 h-1 bg-[hsl(var(--platform))]"></div>
      </div>
    </div>
  )
}

