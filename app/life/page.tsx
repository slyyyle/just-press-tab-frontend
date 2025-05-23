"use client"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"

export default function LifePage() {
  // Hardcoded life posts
  const lifePosts = [
    {
      id: 1,
      title: "The Day I Pressed Tab",
      excerpt: "COMING SOON!",
      date: "COMING SOON!",
      category: "Development",
    },
    {
      id: 2,
      title: "Ricing My Linux Setup",
      excerpt: "COMING SOON!",
      date: "COMING SOON!",
      category: "Development",
    },
    {
      id: 3,
      title: "From Visualizer to VST",
      excerpt: "COMING SOON!",
      date: "COMING SOON!",
      category: "Music",
    },
    {
      id: 4,
      title: "16-Bit Nostalgia: Sweet SNES",
      excerpt: "COMING SOON!",
      date: "COMING SOON!",
      category: "Gaming",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-16 px-4 feed-theme">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="Life" 
          subtitle="A catch all for everything else" 
          glowColor="text-[hsl(var(--primary))]"
        />

        {/* Life posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lifePosts.map((post) => (
            <div
              key={post.id}
              className="bg-card border-2 border-[hsl(var(--platform))] rounded-md overflow-hidden pixel-corners transition-transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-vt323 text-lg text-amber-300">{post.date}</span>
                  <span className="font-vt323 text-lg text-amber-300">{post.category}</span>
                </div>
                <h3 className="font-press-start-2p text-lg mb-3 text-amber-300">{post.title}</h3>
                <p className="font-vt323 text-xl mb-4 text-[hsl(var(--platform))]">{post.excerpt}</p>
                <Button 
                  variant="default" 
                  className="font-vt323 text-lg w-full bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="font-vt323 bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
          >
            COMING
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="font-vt323 bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
          >
            1
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="font-vt323 bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
          >
            2
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="font-vt323 bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
          >
            3
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="font-vt323 bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
          >
            SOON!
          </Button>
        </div>
      </div>
    </main>
  )
}

