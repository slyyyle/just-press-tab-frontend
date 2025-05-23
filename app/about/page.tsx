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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-mono text-cyan-400">The Problem (huh?)</h2>
            </div>

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
              All I did was "creatively write" to a chatbot, in the form of hundreds of prompts to
              teach me, refactor code, explain types, and demonstrate best practices.
            </p>

            <p className="text-slate-300 leading-relaxed mt-4 mb-4 text-center font-mono text-lg bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text">
              These AI tools may be inexplicable, but that's their strength.  
              <a href="/contact" className="hover:underline"></a>
            </p>

            <p className="text-slate-300 leading-relaxed">
              By relaxing our need for specific things to be true - we make our models harder to understand, but more
              capable of doing difficult things.  
            </p>
            <br />  

            <p className="text-slate-300 leading-relaxed"> 
              For now, that is the trade off - we are replacing explanatory power for utility.  It's an important distinction.{" "}
            </p>

            <p className="text-slate-300 leading-relaxed mt-4 text-center font-mono text-lg bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text">
              Semantics ARE everything, after all!
              <a href="/contact" className="hover:underline"></a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

