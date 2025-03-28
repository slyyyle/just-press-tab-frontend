import { cn } from "@/lib/utils"

interface PixelHeaderProps {
  title: string
  subtitle?: string
  size?: "large" | "medium" | "small"
  className?: string
}

export function PixelHeader({ title, subtitle, size = "large", className }: PixelHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1
        className={cn(
          "font-press-start-2p text-primary inline-block",
          size === "large" && "text-3xl md:text-4xl",
          size === "medium" && "text-2xl md:text-3xl",
          size === "small" && "text-xl md:text-2xl",
        )}
      >
        {title}
      </h1>

      {subtitle && <p className="font-vt323 text-2xl mt-2 text-muted-foreground">{subtitle}</p>}

      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-accent"></div>
        <div className="w-16 h-1 bg-secondary ml-2"></div>
        <div className="w-16 h-1 bg-primary ml-2"></div>
      </div>
    </div>
  )
}

