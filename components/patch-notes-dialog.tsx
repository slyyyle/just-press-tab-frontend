"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface PatchNotesDialogProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = "updates" | "status"

export function PatchNotesDialog({ isOpen, onClose }: PatchNotesDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("status")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Just Press Tab - Patch Notes v0.1</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "status"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Status
          </button>
          <button
            onClick={() => setActiveTab("updates")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "updates"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Updates
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === "status" ? (
            <>
              {/* Terminal Mode */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Terminal Mode</h3>
                <ul className="mt-2 space-y-2 text-slate-400">
                  <li>• Current implementation is a simulated terminal</li>
                  <li>• Building a custom Rust shell for enhanced functionality</li>
                  <li>• Evaluating integration possibilities with the new shell</li>
                  <li>• Not sure the shell will work well, but Terry Davis says it's fun and I want to learn...RIP Troubled King</li>
                </ul>
              </div>

              {/* GUI Mode */}
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">GUI Mode</h3>
                <ul className="space-y-2 text-slate-400">
                  <li>• About - Finished!</li>
                  <li>• SoftDev - Styled, Dummy Content!</li>
                  <li>• MLOps - Styled, Dummy Content!</li>
                  <li>• Music - Styled, Music Plays, Needs Content!</li>
                  <li>• RSS/Feed - Styled, Dummy Content!</li>
                  <li>• Gaming - Needs rethinking! Don't game tons!</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="text-lg font-semibold text-pink-400">v0.1.0 (2024-03-27)</h4>
                <ul className="list-disc list-inside text-slate-300">
                  <li>Initial release of Just Press Tab</li>
                  <li>Added terminal and GUI modes</li>
                  <li>Implemented basic navigation and customization</li>
                  <li>Added fun terminal effects and animations</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400">Recent Changes</h4>
                <ul className="list-disc list-inside text-slate-300">
                  <li>Removed blog section and related components</li>
                  <li>Removed file system terminal simulation</li>
                  <li>Simplified cyber terminal interface</li>
                  <li>Added patch notes dialog with clickable under construction link</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400">Coming Soon</h4>
                <ul className="list-disc list-inside text-slate-300">
                  <li>Music section with AI-powered generation</li>
                  <li>Gaming projects and retro game development</li>
                  <li>AI/ML research and experiments</li>
                  <li>Software development tools and utilities</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 