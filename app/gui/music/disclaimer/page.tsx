"use client"


import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function MusicDisclaimerPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
          <h1 className="text-2xl font-bold mb-6 text-center text-red-500">⚠️ Content Warning ⚠️</h1>
          
          <div className="space-y-4 text-slate-300">
            <p>
              The music content you are about to view contains material that is Not Safe For Work (NSFW).
              This content represents a creative exploration of different personas and contexts, and should not be interpreted as a reflection of my professional identity.
            </p>
            
            <p>
              What you will find here is an exercise in method acting and creative expression, exploring various musical styles and themes that may be explicit or controversial in nature.
            </p>
            
            <p className="font-bold text-yellow-500">
              This content is intended for mature audiences only and should be approached with an understanding of its artistic and experimental nature.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => window.open("https://soundcloud.com/s-l-y-l-e", "_blank")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
          >
            I Understand and Wish to Continue
          </Button>
        </div>
      </div>
    </div>
  )
} 