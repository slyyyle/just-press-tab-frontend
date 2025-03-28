"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { NoEffectProvider } from "./providers/bgfx_no_effect_provider"

export type BackgroundEffect = "none"

interface BgFxContextType {
  currentEffect: BackgroundEffect
  setCurrentEffect: (effect: BackgroundEffect) => void
}

const BgFxContext = createContext<BgFxContextType | undefined>(undefined)

export function useBgFx() {
  const context = useContext(BgFxContext)
  if (context === undefined) {
    throw new Error("useBgFx must be used within a BgFxHandler")
  }
  return context
}

interface BgFxHandlerProps {
  children: ReactNode
}

export function BgFxHandler({ children }: BgFxHandlerProps) {
  const [currentEffect, setCurrentEffect] = React.useState<BackgroundEffect>("none")

  const renderEffectProvider = () => {
    switch (currentEffect) {
      case "none":
        return <NoEffectProvider>{children}</NoEffectProvider>
      default:
        return <NoEffectProvider>{children}</NoEffectProvider>
    }
  }

  return (
    <BgFxContext.Provider value={{ currentEffect, setCurrentEffect }}>
      {renderEffectProvider()}
    </BgFxContext.Provider>
  )
} 