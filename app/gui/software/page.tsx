"use client"
import { Button } from "@/components/ui/button"
import { Code, Terminal, Cpu, ChevronDown, ChevronUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { slugify } from '@/lib/slugify'

export default function SoftwarePage() {
  const getInitialSection = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('software_selectedSection') || "Web Development";
    }
    return "Web Development";
  };
  const getInitialExpanded = (key: string) => {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem(key);
      return val === null || val === 'null' ? null : Number(val);
    }
    return null;
  };

  const [selectedSection, setSelectedSection] = useState(getInitialSection);
  const [expandedWebDev, setExpandedWebDev] = useState(() => getInitialExpanded('software_expandedWebDev'));
  const [expandedCliTools, setExpandedCliTools] = useState(() => getInitialExpanded('software_expandedCliTools'));
  const [expandedSystemCustom, setExpandedSystemCustom] = useState(() => getInitialExpanded('software_expandedSystemCustom'));

  // Persist state to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('software_selectedSection', selectedSection)
      localStorage.setItem('software_expandedWebDev', String(expandedWebDev))
      localStorage.setItem('software_expandedCliTools', String(expandedCliTools))
      localStorage.setItem('software_expandedSystemCustom', String(expandedSystemCustom))
    }
  }, [selectedSection, expandedWebDev, expandedCliTools, expandedSystemCustom])

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
      title: "AI Engineering",
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
      name: "Never Played Varsity",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "An AI explainable suite of machine learning algorithms and systems with backtesting functionality.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
    },
    {
      id: 2,
      name: "Slysearch",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "An AI powered search aggregator that is designed to be local, private, and powerfully yours.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
    },
    {
      id: 3,
      name: "VGTodo",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "A no frills todo app with minimal gamification, and easy data export for tracking long term productivity and brainstorming patterns.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
    },
  ]

  const cliToolsContent = [
    {
      id: 1,
      name: "RAG and Chain of Thought",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "AI tools sound made up.  Let me help you make sense of them like anything else in life.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
      extender: (
        <div className="mt-2 ml-6 p-2 bg-background rounded border border-dashed border-[hsl(var(--primary))]">
          <div className="flex flex-col divide-y divide-[hsl(var(--primary))]">
            {[
              "Wait what? That's not how you spell chatbot!",
              "RAG & CoT: The Dynamic Duo",
              "Modeling Chains of Thought After How I Solve Problems"
            ].map((articleTitle) => (
              <Link
                key={articleTitle}
                href={`/gui/software/ai-engineering/${slugify(articleTitle)}`}
                className="py-2 px-3 hover:bg-muted/70 rounded cursor-pointer transition font-vt323 text-[hsl(var(--platform))]"
              >
                {articleTitle}
              </Link>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: "Specialized Deep Learning",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "When you just can't talk through your problems with a chatbot, you have to get crafty.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
      extender: (
        <div className="mt-2 ml-6 p-2 bg-background rounded border border-dashed border-[hsl(var(--primary))]">
          <span className="font-vt323 text-[hsl(var(--platform))]">When you just can't talk through your problems with a chatbot, you have to get crafty.</span>
        </div>
      ),
    },
    {
      id: 3,
      name: "Tips, Tricks, & News",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "A more regular and candid look into how to use or grasp AI capability in your everyday life.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
      extender: (
        <div className="mt-2 ml-6 p-2 bg-background rounded border border-dashed border-[hsl(var(--primary))]">
          <span className="font-vt323 text-[hsl(var(--platform))]">A more regular and candid look into how to use or grasp AI capability in your everyday life.</span>
        </div>
      ),
    },
  ]

  const systemCustomContent = [
    {
      id: 1,
      name: "Hyprland Tweaks",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "How I make my computer work for me!",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
    },
    {
      id: 2,
      name: "Linux/Distro Optimizations",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "When rubber meets the road, and you really need a watchdog to kill everything in your task's path!",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
    },
    {
      id: 3,
      name: "Hardware Discussion",
      nameClass: "text-2xl text-[hsl(var(--primary))] font-bold",
      description: "Me insanely rambling about why my heavily customized computer's hardware is the issue, not me.",
      descriptionClass: "text-lg text-[hsl(var(--platform))]",
    },
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
                className="flex flex-col p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10 mb-2"
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedWebDev(expandedWebDev === item.id ? null : item.id)}>
                  <div>
                    <h4 className={`font-vt323 ${item.nameClass}`}>{item.name}</h4>
                    <p className={`font-vt323 ${item.descriptionClass}`}>{item.description}</p>
                  </div>
                  {expandedWebDev === item.id ? (
                    <ChevronUp className="h-6 w-6 text-[hsl(var(--primary))]" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-[hsl(var(--primary))]" />
                  )}
                </div>
                {expandedWebDev === item.id && (
                  <div className="mt-2 ml-6 p-2 bg-background rounded border border-dashed border-[hsl(var(--primary))]">
                    <span className="font-vt323 text-[hsl(var(--platform))]">Placeholder for nested content</span>
                  </div>
                )}
              </div>
            ))}
            {(selectedSection === "AI Engineering" || selectedSection === "CLI Tools") && cliToolsContent.map((item) => (
              <div
                key={item.id}
                className="flex flex-col p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10 mb-2"
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedCliTools(expandedCliTools === item.id ? null : item.id)}>
                  <div>
                    <h4 className={`font-vt323 ${item.nameClass}`}>{item.name}</h4>
                    <p className={`font-vt323 ${item.descriptionClass}`}>{item.description}</p>
                  </div>
                  {expandedCliTools === item.id ? (
                    <ChevronUp className="h-6 w-6 text-[hsl(var(--primary))]" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-[hsl(var(--primary))]" />
                  )}
                </div>
                {expandedCliTools === item.id && item.extender}
              </div>
            ))}
            {selectedSection === "System Customization" && systemCustomContent.map((item) => (
              <div
                key={item.id}
                className="flex flex-col p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10 mb-2"
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedSystemCustom(expandedSystemCustom === item.id ? null : item.id)}>
                  <div>
                    <h4 className={`font-vt323 ${item.nameClass}`}>{item.name}</h4>
                    <p className={`font-vt323 ${item.descriptionClass}`}>{item.description}</p>
                  </div>
                  {expandedSystemCustom === item.id ? (
                    <ChevronUp className="h-6 w-6 text-[hsl(var(--primary))]" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-[hsl(var(--primary))]" />
                  )}
                </div>
                {expandedSystemCustom === item.id && (
                  <div className="mt-2 ml-6 p-2 bg-background rounded border border-dashed border-[hsl(var(--primary))]">
                    <span className="font-vt323 text-[hsl(var(--platform))]">Placeholder for nested content</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

