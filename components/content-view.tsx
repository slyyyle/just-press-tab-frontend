"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PixelCard } from "@/components/pixel-card"
import { PixelHeader } from "@/components/pixel-header"
import { Button } from "@/components/ui/button"
import { CategoryIcon } from "@/components/category-icon"

type ContentViewProps = {
  category?: string
  section?: string
}

const contentTypes = {
  music: {
    title: "Music",
    description: "AI-powered music generation and production",
    icon: "🎵",
  },
  gaming: {
    title: "Gaming",
    description: "Game development and retro gaming projects",
    icon: "🎮",
  },
  research: {
    title: "Research",
    description: "AI/ML research and experiments",
    icon: "🔬",
  },
  software: {
    title: "Software",
    description: "Software development and tools",
    icon: "💻",
  },
  about: {
    title: "About",
    description: "About me and my projects",
    icon: "ℹ️",
  },
};

export function ContentView({ category, section }: ContentViewProps) {
  const [activeTab, setActiveTab] = useState("featured")

  // Default content if no category/section specified
  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <PixelHeader title="Just Press Tab" subtitle="A learning journey" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategorySection
            title="Music"
            description="Production, instruments, and audio engineering experiments."
            icon="music"
          />
          <CategorySection
            title="Software"
            description="Coding projects, tools, and development resources."
            icon="dev"
          />
          <CategorySection
            title="Research"
            description="AI/ML experiments, papers, and learning resources."
            icon="ai"
          />
          <CategorySection title="Gaming" description="Game reviews, development, and analysis." icon="gaming" />
          <CategorySection
            title="Blog"
            description="Thoughts, tutorials, and explorations across all topics."
            icon="code"
          />
          <CategorySection
            title="About"
            description="The story behind Just Press Tab and the journey so far."
            icon="about"
          />
        </div>

        <div className="mt-16">
          <PixelHeader title="Recent Posts" size="medium" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <BlogPostCard
              title="The Day I Finally Pressed Tab"
              excerpt="How a simple keyboard shortcut changed my approach to learning and discovery."
              date="2023-05-15"
              category="Development"
            />
            <BlogPostCard
              title="Ricing My Linux Setup"
              excerpt="A deep dive into customizing my Linux environment for maximum productivity and style."
              date="2023-06-02"
              category="Development"
            />
            <BlogPostCard
              title="Building an AI Music Generator"
              excerpt="Combining my love for music and AI to create something new."
              date="2023-06-18"
              category="AI & ML"
            />
            <BlogPostCard
              title="16-Bit Nostalgia: Why SNES Games Still Matter"
              excerpt="Exploring the lasting impact of Super Nintendo games on modern game design."
              date="2023-07-01"
              category="Gaming"
            />
          </div>
        </div>
      </div>
    )
  }

  // Category-specific content
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center mb-2">
          <CategoryIcon category={category} className="w-8 h-8 mr-3" />
          <h1
            className={cn(
              "font-press-start-2p text-2xl md:text-3xl",
              category === "music" && "text-cyan-400",
              category === "software" && "text-red-400",
              category === "learning" && "text-purple-400",
              category === "gaming" && "text-green-400",
              category === "blog" && "text-yellow-400",
            )}
          >
            {getCategoryTitle(category)}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-slate-400 text-sm ml-11 mb-6"
        >
          {getSectionDescription(category, section)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 ml-11 mb-8"
        >
          <Button
            variant={activeTab === "featured" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("featured")}
            className="font-mono text-sm"
          >
            Featured
          </Button>
          <Button
            variant={activeTab === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("recent")}
            className="font-mono text-sm"
          >
            Recent
          </Button>
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("all")}
            className="font-mono text-sm"
          >
            All Items
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getContentItems(category, section, activeTab).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <ContentCard
              title={item.title}
              description={item.description}
              type={item.type}
              date={item.date}
              category={category}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CategorySection({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <PixelCard className="h-full transition-transform hover:scale-105">
      <div className="p-6 flex flex-col items-center text-center h-full">
        <CategoryIcon category={icon} className="w-16 h-16 mb-4" />
        <h3 className="font-press-start-2p text-lg mb-2 text-accent">{title}</h3>
        <p className="font-vt323 text-xl">{description}</p>
        <Button variant="outline" className="mt-auto font-vt323 text-lg">
          Explore
        </Button>
      </div>
    </PixelCard>
  )
}

function BlogPostCard({
  title,
  excerpt,
  date,
  category,
}: { title: string; excerpt: string; date: string; category: string }) {
  return (
    <PixelCard className="transition-transform hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-vt323 text-lg text-muted-foreground">{date}</span>
          <span className="font-vt323 text-lg text-secondary">{category}</span>
        </div>
        <h3 className="font-press-start-2p text-lg mb-3 text-primary">{title}</h3>
        <p className="font-vt323 text-xl mb-4">{excerpt}</p>
        <Button variant="default" className="font-vt323 text-lg">
          Read More
        </Button>
      </div>
    </PixelCard>
  )
}

function ContentCard({
  title,
  description,
  type,
  date,
  category,
}: {
  title: string
  description: string
  type: string
  date: string
  category: string
}) {
  return (
    <div
      className={cn(
        "bg-slate-900/80 border rounded-md overflow-hidden transition-all hover:scale-102 hover:shadow-md",
        category === "music" && "border-cyan-900/50 hover:shadow-cyan-500/10",
        category === "software" && "border-red-900/50 hover:shadow-red-500/10",
        category === "learning" && "border-purple-900/50 hover:shadow-purple-500/10",
        category === "gaming" && "border-green-900/50 hover:shadow-green-500/10",
        category === "blog" && "border-yellow-900/50 hover:shadow-yellow-500/10",
      )}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span
            className={cn(
              "text-xs font-mono px-2 py-0.5 rounded-full",
              category === "music" && "bg-cyan-900/30 text-cyan-400",
              category === "software" && "bg-red-900/30 text-red-400",
              category === "learning" && "bg-purple-900/30 text-purple-400",
              category === "gaming" && "bg-green-900/30 text-green-400",
              category === "blog" && "bg-yellow-900/30 text-yellow-400",
            )}
          >
            {type}
          </span>
          <span className="text-xs font-mono text-slate-500">{date}</span>
        </div>

        <h3
          className={cn(
            "font-mono font-bold text-lg mb-2",
            category === "music" && "text-cyan-400",
            category === "software" && "text-red-400",
            category === "learning" && "text-purple-400",
            category === "gaming" && "text-green-400",
            category === "blog" && "text-yellow-400",
          )}
        >
          {title}
        </h3>

        <p className="text-slate-300 text-sm mb-4 font-mono leading-relaxed">{description}</p>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "font-mono text-xs",
              category === "music" && "text-cyan-400 hover:text-cyan-300",
              category === "software" && "text-red-400 hover:text-red-300",
              category === "learning" && "text-purple-400 hover:text-purple-300",
              category === "gaming" && "text-green-400 hover:text-green-300",
              category === "blog" && "text-yellow-400 hover:text-yellow-300",
            )}
          >
            View Details →
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    music: "Music",
    software: "Software",
    learning: "Research & Learning",
    gaming: "Gaming",
    blog: "Blog",
  }
  return titles[category] || category
}

function getSectionDescription(category: string, section?: string): string {
  if (!section) return "Explore all content in this category"

  const descriptions: Record<string, Record<string, string>> = {
    music: {
      production: "Music production techniques, tools, and projects",
      instruments: "Instruments, hardware, and performance",
      research: "Research and learning resources for music",
    },
    software: {
      projects: "Software projects and applications",
      tools: "Development tools and utilities",
      research: "Research and learning resources for software development",
    },
    learning: {
      ai: "Artificial Intelligence and Machine Learning",
      papers: "Research papers and academic resources",
      experiments: "Experiments and practical applications",
    },
    gaming: {
      reviews: "Game reviews and analysis",
      development: "Game development projects and resources",
      research: "Research and learning resources for gaming",
    },
    blog: {
      all: "All blog posts across categories",
      featured: "Featured and highlighted content",
      archives: "Archived and historical posts",
    },
  }

  return descriptions[category]?.[section] || `${section} content for ${category}`
}

function getContentItems(
  category: string,
  section?: string,
  tab = "featured",
): Array<{
  title: string
  description: string
  type: string
  date: string
}> {
  // This would normally come from a database or API
  // Just providing sample data for demonstration

  const musicItems = [
    {
      title: "Ambient Soundscape Generator",
      description:
        "An interactive tool for creating ambient soundscapes using generative algorithms and sample manipulation.",
      type: "Project",
      date: "2023-08-15",
    },
    {
      title: "Modular Synthesis Basics",
      description:
        "A comprehensive guide to getting started with modular synthesis, from basic concepts to advanced patching techniques.",
      type: "Tutorial",
      date: "2023-07-22",
    },
    {
      title: "Harmonic Analysis Tool",
      description:
        "A web-based tool for analyzing harmonic structures in music, with visualization and audio playback.",
      type: "Tool",
      date: "2023-06-10",
    },
    {
      title: "The Evolution of Electronic Music",
      description:
        "Tracing the development of electronic music from early experiments to modern production techniques.",
      type: "Article",
      date: "2023-05-05",
    },
  ]

  const softwareItems = [
    {
      title: "Terminal-Based Task Manager",
      description:
        "A highly customizable CLI task manager built with Rust, featuring keyboard shortcuts and data visualization.",
      type: "Project",
      date: "2023-08-20",
    },
    {
      title: "Custom Neovim Configuration",
      description:
        "A detailed guide to setting up a powerful Neovim environment for development, with plugins and keybindings.",
      type: "Guide",
      date: "2023-07-15",
    },
    {
      title: "API Documentation Generator",
      description:
        "A tool for automatically generating comprehensive API documentation from code comments and type definitions.",
      type: "Tool",
      date: "2023-06-28",
    },
    {
      title: "Functional Programming Patterns",
      description: "Exploring practical applications of functional programming patterns in everyday development tasks.",
      type: "Article",
      date: "2023-05-12",
    },
  ]

  const learningItems = [
    {
      title: "Neural Network Visualization",
      description:
        "An interactive visualization tool for understanding how neural networks process and transform data.",
      type: "Tool",
      date: "2023-08-25",
    },
    {
      title: "Reinforcement Learning Playground",
      description: "A sandbox environment for experimenting with reinforcement learning algorithms on various tasks.",
      type: "Project",
      date: "2023-07-30",
    },
    {
      title: "Research Paper: Attention Mechanisms",
      description: "Analysis and implementation of attention mechanisms in transformer-based language models.",
      type: "Paper",
      date: "2023-06-15",
    },
    {
      title: "Machine Learning From First Principles",
      description: "Building an understanding of machine learning algorithms from mathematical foundations.",
      type: "Series",
      date: "2023-05-20",
    },
  ]

  const gamingItems = [
    {
      title: "Pixel Art Game Engine",
      description: "A lightweight engine for creating retro-style pixel art games with modern rendering capabilities.",
      type: "Project",
      date: "2023-08-10",
    },
    {
      title: "Game Design Document Template",
      description: "A comprehensive template for creating game design documents, with examples and best practices.",
      type: "Resource",
      date: "2023-07-05",
    },
    {
      title: "Procedural Level Generation",
      description: "Techniques and algorithms for generating game levels procedurally with balanced difficulty.",
      type: "Tutorial",
      date: "2023-06-22",
    },
    {
      title: "The Art of Game Feel",
      description: "Analyzing what makes games satisfying to play, from input responsiveness to visual feedback.",
      type: "Article",
      date: "2023-05-18",
    },
  ]

  const blogItems = [
    {
      title: "The Day I Finally Pressed Tab",
      description: "How a simple keyboard shortcut changed my approach to learning and discovery.",
      type: "Personal",
      date: "2023-08-30",
    },
    {
      title: "Ricing My Linux Setup",
      description: "A deep dive into customizing my Linux environment for maximum productivity and style.",
      type: "Tutorial",
      date: "2023-07-25",
    },
    {
      title: "Building an AI Music Generator",
      description: "Combining my love for music and AI to create something new and unexpected.",
      type: "Project",
      date: "2023-06-18",
    },
    {
      title: "16-Bit Nostalgia: Why SNES Games Still Matter",
      description: "Exploring the lasting impact of Super Nintendo games on modern game design.",
      type: "Analysis",
      date: "2023-05-10",
    },
  ]

  const categoryMap: Record<string, any[]> = {
    music: musicItems,
    software: softwareItems,
    learning: learningItems,
    gaming: gamingItems,
    blog: blogItems,
  }

  // Return appropriate items based on category and section
  let items = categoryMap[category] || blogItems

  // Filter by section if specified
  if (section && section !== "all") {
    // This is a simplified filter - in a real app, items would have a section property
    items = items.slice(0, 3) // Just showing fewer items as a simulation of filtering
  }

  // Filter by tab
  if (tab === "featured") {
    return items.slice(0, 3)
  } else if (tab === "recent") {
    return [...items].sort((a, b) => {
      // Ensure consistent date format for comparison
      const dateA = a.date
      const dateB = b.date
      return dateB.localeCompare(dateA)
    })
  }

  return items
}

