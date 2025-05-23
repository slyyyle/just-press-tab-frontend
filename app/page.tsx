"use client"

import { useRouter } from "next/navigation"
import { Terminal, Monitor } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const router = useRouter()
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
          Just Press Tab
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">
          Choose your preferred interface:
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => router.push("/terminal")}
          className="group relative px-8 py-6 bg-slate-900 rounded-lg border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          <div className="relative flex flex-col items-center gap-4">
            <Terminal className="w-12 h-12 text-cyan-400" />
            <div className="text-center">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Terminal Mode</h2>
              <p className="text-slate-400 text-sm">Command-line interface</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => router.push("/gui")}
          className="group relative px-8 py-6 bg-slate-900 rounded-lg border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          <div className="relative flex flex-col items-center gap-4">
            <Monitor className="w-12 h-12 text-purple-400" />
            <div className="text-center">
              <h2 className="text-xl font-bold text-purple-400 mb-2">GUI Mode</h2>
              <p className="text-slate-400 text-sm">Where you can click stuff</p>
            </div>
          </div>
        </button>
      </div>

      {/* Under Construction Link */}
      <button
        onClick={() => setIsPatchNotesOpen(true)}
        className="mt-8 text-red-400 hover:text-red-300 underline text-sm"
      >
        This site is under construction
      </button>
    </div>
  )
}

