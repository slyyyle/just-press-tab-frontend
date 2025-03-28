"use client"

import React, { createContext, useContext, ReactNode } from "react"

interface NoEffectContextType {
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
}

const NoEffectContext = createContext<NoEffectContextType | undefined>(undefined)

export function useNoEffect() {
  const context = useContext(NoEffectContext)
  if (context === undefined) {
    throw new Error("useNoEffect must be used within a NoEffectProvider")
  }
  return context
}

interface NoEffectProviderProps {
  children: ReactNode
}

export function NoEffectProvider({ children }: NoEffectProviderProps) {
  const [isEnabled, setIsEnabled] = React.useState(false)

  return (
    <NoEffectContext.Provider value={{ isEnabled, setIsEnabled }}>
      {children}
      {isEnabled && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {/* Clean background with no effects */}
        </div>
      )}
    </NoEffectContext.Provider>
  )
} 