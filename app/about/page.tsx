"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black opacity-80 pointer-events-none"></div>

      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/")}
          className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full px-3 py-1.5 text-sm font-mono text-slate-300 hover:text-white hover:bg-slate-700/50"
        >
          <ArrowLeft size={14} className="mr-1" />
          Back to Dashboard
        </Button>
      </div>

      {/* Page content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-mono bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Houston, We Have an Opportunity!
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 shadow-lg">
            <h2 className="text-2xl font-mono text-cyan-400 mb-6">The Problem (huh?)</h2>

            <p className="text-slate-300 leading-relaxed mb-4">
              My name is Kyle Hammitt, and I am an AI Software Engineer. 
              I created this website to showcase AI rather than just tell you about it.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              Three weeks ago, I knew nothing about front-end development, yet here we are. This site exists because I
              embraced AI as a collaborative tool rather than trying to master everything myself.
            </p>

            {/* Image related to AI perception */}
            <div className="w-[37.5%] mx-auto my-6 rounded-md overflow-hidden">
              <Image 
                src="/ai-movies.png"
                alt="AI in movies vs reality"
                width={800}
                height={160}
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="text-slate-300 leading-relaxed mb-4">
              I didn't meticulously handcraft this website—instead, I guided an algorithm through hundreds of prompts to
              teach me, refactor code, explain types, and demonstrate best practices. Technically I wrote it in the sense 
              people want to point to for merit.  It was a great teacher - I knew there would be bumps.
              
              These AI tools may be uninterpretable under the hood, but that's their strength.  We still have to coach in some capacity.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              By relaxing our need for specific things to work - we make our models harder to understand, but more
              capable of doing difficult things.  For now, that is the trade off - we are replacing explanatory power for utility.{" "}
              <br />
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text font-medium text-center block">
                It's an important distinction. Semantics are everything after all!
              </span>{" "}
            </p>

            <p className="text-slate-300 leading-relaxed mt-8 text-center font-mono text-lg bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text">
              Have fun!
              <a href="/contact" className="hover:underline"></a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

