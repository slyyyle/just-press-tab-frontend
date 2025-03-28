"use client"
import { Button } from "@/components/ui/button"
import { Gamepad2, Trophy, Code } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function GamingPage() {
  // Hardcoded gaming projects
  const gamingProjects = [
    {
      id: 1,
      title: "Game Reviews",
      description: "Reviews and analysis of indie and AAA games",
      icon: <Trophy className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Game Development",
      description: "Game development projects and tutorials",
      icon: <Code className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Retro Gaming",
      description: "Explorations of classic and retro games",
      icon: <Gamepad2 className="h-6 w-6" />,
    },
  ]

  // Featured games
  const featuredGames = [
    {
      id: 1,
      title: "Chrono Trigger",
      platform: "SNES",
      year: "1995",
      rating: 5,
      review: "A timeless classic that defined the JRPG genre with its innovative combat system and compelling story.",
    },
    {
      id: 2,
      title: "Hollow Knight",
      platform: "PC/Switch",
      year: "2017",
      rating: 5,
      review: "A masterpiece of the metroidvania genre with beautiful hand-drawn art and challenging gameplay.",
    },
    {
      id: 3,
      title: "Stardew Valley",
      platform: "Multi-platform",
      year: "2016",
      rating: 4,
      review: "A charming farming simulator that offers a relaxing escape with surprising depth and content.",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-16 px-4 gaming-theme">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <PageHeader 
          title="Gaming" 
          subtitle="Game reviews, development, and analysis" 
          description="This won't be active for awhile.  I'd like to game more again, I just haven't the time!"
          descriptionClassName="text-red-500"
        />

        {/* Gaming projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {gamingProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border-2 border-[hsl(var(--primary))] rounded-md overflow-hidden transition-transform hover:scale-105 pixel-corners"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-muted p-4 rounded-full mb-4 text-[hsl(var(--primary))]">{project.icon}</div>
                <h3 className="font-press-start-2p text-lg mb-3 text-[hsl(var(--primary))]">{project.title}</h3>
                <p className="font-vt323 text-xl mb-4 text-[hsl(var(--platform))]">{project.description}</p>
                <Button variant="default" className="font-vt323 text-lg mt-auto bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] hover:from-[hsl(var(--gradient-hover-from))] hover:to-[hsl(var(--gradient-hover-to))]">
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured game reviews */}
        <div className="bg-card border-2 border-[hsl(var(--primary))] rounded-md overflow-hidden p-6 mb-12 pixel-corners">
          <h2 className="font-press-start-2p text-2xl text-[hsl(var(--primary))] mb-6">Featured Game Reviews</h2>
          <div className="space-y-6">
            {featuredGames.map((game) => (
              <div key={game.id} className="p-4 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-press-start-2p text-lg text-[hsl(var(--primary))]">{game.title}</h4>
                  <div className="flex items-center">
                    <span className="font-vt323 text-sm text-[hsl(var(--platform))] mr-2">
                      {game.platform} ({game.year})
                    </span>
                    <div className="flex">
                      {Array.from({ length: game.rating }).map((_, i) => (
                        <Trophy key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-vt323 text-lg text-[hsl(var(--foreground))]">{game.review}</p>
                <div className="mt-3 flex justify-end">
                  <Button variant="default" size="sm" className="font-vt323 bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] hover:from-[hsl(var(--gradient-hover-from))] hover:to-[hsl(var(--gradient-hover-to))]">
                    Read Full Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game development showcase */}
        <div className="bg-card border-2 border-[hsl(var(--primary))] rounded-md overflow-hidden p-6 pixel-corners">
          <h2 className="font-press-start-2p text-xl text-[hsl(var(--primary))] mb-4">Game Development</h2>
          <div className="bg-background p-6 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-press-start-2p text-lg text-[hsl(var(--primary))] mb-3">Pixel Art Game Engine</h3>
                <p className="font-vt323 text-lg text-[hsl(var(--foreground))] mb-4">
                  A lightweight engine for creating retro-style pixel art games with modern rendering capabilities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Code className="h-4 w-4 text-[hsl(var(--primary))] mr-2" />
                    <span className="font-vt323 text-[hsl(var(--foreground))]">JavaScript / WebGL</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-[hsl(var(--primary))] mr-2" />
                    <span className="font-vt323 text-[hsl(var(--foreground))]">Featured in JS13K Games competition</span>
                  </div>
                </div>
                <Button variant="default" className="font-vt323 text-lg mt-4 bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] hover:from-[hsl(var(--gradient-hover-from))] hover:to-[hsl(var(--gradient-hover-to))]">
                  View Project
                </Button>
              </div>
              <div className="bg-card rounded-md p-4 flex items-center justify-center">
                <div className="w-full h-48 bg-black rounded-md flex items-center justify-center">
                  <p className="font-press-start-2p text-[hsl(var(--primary))] text-xs text-center">
                    [Game Engine Preview]
                    <br />
                    <span className="font-vt323 text-[hsl(var(--muted-foreground))]">16x16 pixel grid</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

