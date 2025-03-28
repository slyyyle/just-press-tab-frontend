"use client"
import { Button } from "@/components/ui/button"
import { Code, Terminal, Cpu } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

export default function SoftwarePage() {
  const [selectedSection, setSelectedSection] = useState("Web Development")  // Default to Web Development

  // Hardcoded software projects
  const softwareProjects = [
    {
      id: 1,
      title: "Web Development",
      description: "My front. My back.\nMy website AND my stack.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "CLI Tools",
      description: "Any terminal enjoyers in the chat?",
      icon: <Terminal className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "System Customization",
      description: "You dirty procrastinator, you",
      icon: <Cpu className="h-6 w-6" />,
    },
  ]

  const webDevContent = [
    {
      id: 1,
      name: "COMING SOON!",
      stars: 42,
      language: "TypeScript",
      description: "COMING SOON!",
    }
  ]

  const cliToolsContent = [
    {
      id: 1,
      name: "COMING SOON!",
      stars: 142,
      language: "Rust",
      description: "COMING SOON!",
    }
  ]

  const systemCustomContent = [
    {
      id: 1,
      name: "COMING SOON!",
      stars: 167,
      language: "Shell",
      description: "COMING SOON!",
    }
  ]

  const handleExplore = (title: string) => {
    setSelectedSection(title)
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4 software-theme">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <PageHeader 
          title="Software" 
          subtitle="Coding projects, tools, and development" 
          className="text-primary"
        />

        {/* Software projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {softwareProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border-2 border-primary rounded-md overflow-hidden pixel-corners transition-transform hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-muted p-4 rounded-full mb-4 text-[hsl(var(--primary))]">{project.icon}</div>
                <h3 className="font-press-start-2p text-lg mb-3 text-[hsl(var(--primary))]">{project.title}</h3>
                <p className="font-vt323 text-xl mb-4 text-[hsl(var(--platform))]">
                  {project.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < project.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <Button 
                  variant="default" 
                  className="font-vt323 text-lg mt-auto bg-gradient-to-r from-[hsl(var(--platform))] to-[hsl(var(--primary))] hover:from-[hsl(var(--platform)_/_90%)] hover:to-[hsl(var(--primary)_/_90%)] text-primary-foreground"
                  onClick={() => handleExplore(project.title)}
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured repositories */}
        <div className="bg-card border-2 border-primary rounded-md overflow-hidden pixel-corners p-6 mb-12">
          <h2 className="font-press-start-2p text-2xl mb-6 text-[hsl(var(--primary))]">{selectedSection}</h2>
          <div className="space-y-4">
            {selectedSection === "Web Development" && webDevContent.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10"
              >
                <div>
                  <h4 className="font-vt323 text-2xl text-[hsl(var(--primary))]">{item.name}</h4>
                  <p className="font-vt323 text-lg text-[hsl(var(--platform))]">{item.description}</p>
                </div>
              </div>
            ))}
            {selectedSection === "CLI Tools" && cliToolsContent.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10"
              >
                <div>
                  <h4 className="font-vt323 text-2xl text-[hsl(var(--primary))]">{item.name}</h4>
                  <p className="font-vt323 text-lg text-[hsl(var(--platform))]">{item.description}</p>
                </div>
              </div>
            ))}
            {selectedSection === "System Customization" && systemCustomContent.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10"
              >
                <div>
                  <h4 className="font-vt323 text-2xl text-[hsl(var(--primary))]">{item.name}</h4>
                  <p className="font-vt323 text-lg text-[hsl(var(--platform))]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

