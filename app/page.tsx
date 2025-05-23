"use client"

import { motion, AnimatePresence } from "framer-motion"
import { GuiDashboard } from "@/components/gui-dashboard"

export default function GuiPage() {
  return (
    <main className="relative min-h-screen">
      <div className="h-screen w-full relative overflow-hidden">
        <div className="scanlines absolute inset-0 z-10 pointer-events-none"></div>
        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            <motion.div
              className="absolute inset-0 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GuiDashboard />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
} 