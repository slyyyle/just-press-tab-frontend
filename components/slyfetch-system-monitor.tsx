// components/slyfetch-system-monitor.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Monitor, Clock, Box, Cpu, HardDrive, MemoryStickIcon as Memory, Wifi, Server, Terminal, GitBranch } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SlyFetchSystemMonitorProps {
  className?: string
  darkMode?: boolean
  animate?: boolean
}

export function SlyFetchSystemMonitor({ className, darkMode = true, animate = true }: SlyFetchSystemMonitorProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [uptime, setUptime] = useState({ seconds: 0, minutes: 0, hours: 0 })
  const [startTime, setStartTime] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Fixed system specs
  const specs = {
    user: "visitor",
    hostname: "justpresstab",
    distro: "TabTerm OS x86_64",
    kernel: "Linux 6.13.7-3-tabterm",
    terminal: "TabTerm 2.1",
    shell: "zsh 5.9",
    cpu: "Neural Core i7 @ 4.2GHz",
    disk: "42.3 GiB / 1.79 TiB (2%)",
    memory: "3.2 GiB / 32.0 GiB (10%)",
    network: "192.168.1.2/24 (tab0)",
  }

  // Format uptime based on elapsed time
  const formatUptime = (uptime: { seconds: number; minutes: number; hours: number }) => {
    if (uptime.hours > 0) {
      return `${uptime.hours}:${uptime.minutes.toString().padStart(2, "0")}:${uptime.seconds
        .toString()
        .padStart(2, "0")}`
    } else if (uptime.minutes > 0) {
      return `${uptime.minutes} min${uptime.minutes !== 1 ? "s" : ""}, ${uptime.seconds} sec${
        uptime.seconds !== 1 ? "s" : ""
      }`
    } else {
      return `${uptime.seconds} sec${uptime.seconds !== 1 ? "s" : ""}`
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
      setCurrentDate(new Date().toISOString())
      setStartTime(new Date().toISOString())
      
      const timer = setInterval(() => {
        setCurrentDate(new Date().toISOString())
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    // Update the date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date().toISOString())

      // Calculate uptime
      const elapsedMs = isClient ? new Date().getTime() - new Date(startTime).getTime() : 0
      const totalSeconds = Math.floor(elapsedMs / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setUptime({ seconds, minutes, hours })
    }, 1000)

    // Animate in the content
    if (animate) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 300)

      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    } else {
      setIsLoaded(true)
      return () => clearInterval(interval)
    }
  }, [animate, startTime, isClient])

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Main info panel - adjusted padding and sizing */}
      <div
        className={cn(
          "rounded-md inline-flex items-center overflow-hidden",
          "bg-gradient-to-br p-[1px] from-cyan-500 via-purple-500 to-pink-500",
        )}
      >
        <div
          className={cn(
            "py-2 px-4 grid grid-cols-2 gap-x-6 gap-y-0.5 rounded-sm w-fit",
            darkMode ? "bg-slate-900" : "bg-slate-100",
          )}
        >
          {/* Left Column */}
          <div className="space-y-0.5">
            <InfoItem
              icon={<User size={14} />}
              label="user"
              value={specs.user}
              delay={100}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<Server size={14} />}
              label="hname"
              value={specs.hostname}
              delay={200}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<Clock size={14} />}
              label="uptime"
              value={isClient ? formatUptime(uptime) : "0 secs"}
              delay={300}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<Box size={14} />}
              label="distro"
              value={specs.distro}
              delay={400}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<GitBranch size={14} />}
              label="kernel"
              value={specs.kernel}
              delay={500}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-0.5">
            <InfoItem
              icon={<Monitor size={14} />}
              label="shell"
              value={specs.shell}
              delay={600}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<Cpu size={14} />}
              label="cpu"
              value={specs.cpu}
              delay={700}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<HardDrive size={14} />}
              label="disk"
              value={specs.disk}
              delay={800}
              isLoaded={isLoaded}
              darkMode={darkMode}
              highlight={specs.disk.includes("(2%)")}
            />
            <InfoItem
              icon={<Memory size={14} />}
              label="memory"
              value={specs.memory}
              delay={900}
              isLoaded={isLoaded}
              darkMode={darkMode}
              highlight={specs.memory.includes("(10%)")}
            />
            <InfoItem
              icon={<Wifi size={14} />}
              label="network"
              value={specs.network}
              delay={1000}
              isLoaded={isLoaded}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* Date and Time Footer - with gradient border */}
      <div
        className={cn(
          "mt-1 rounded-md overflow-hidden",
          "bg-gradient-to-br p-[1px] from-cyan-500 via-purple-500 to-pink-500",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center w-full px-4 py-1.5 text-xs",
            darkMode ? "bg-slate-900" : "bg-slate-100",
          )}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text font-medium whitespace-nowrap">
            Type{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              'help'
            </span>{" "}
            for commands
          </span>
          {isClient ? (
            <span className="font-mono text-green-400">
              {currentDate.replace('T', ' ').slice(0, 19)}
            </span>
          ) : (
            <span className="font-mono text-green-400">Loading date...</span>
          )}
        </div>
      </div>
    </div>
  )
}

// InfoItem props interface
interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  delay: number
  isLoaded: boolean
  darkMode: boolean
  highlight?: boolean
}

// Update InfoItem component
function InfoItem({ icon, label, value, delay, isLoaded, darkMode, highlight }: InfoItemProps) {
  // Extract percentage from value if it exists
  const percentageMatch = value.match(/(\d+)%/)
  const percentage = percentageMatch ? Number.parseInt(percentageMatch[1]) : null

  // Determine color based on percentage
  let valueColor = ""
  if (percentage !== null) {
    if (percentage < 10) valueColor = "text-cyan-400"
    else if (percentage < 30) valueColor = "text-blue-400"
    else if (percentage < 70) valueColor = "text-yellow-400"
    else valueColor = "text-red-400"
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 whitespace-nowrap text-xs",
        isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
        `transition-all duration-500 delay-&lsqb;${delay}ms&rsqb;`,
      )}
    >
      <div className={cn("flex-shrink-0 bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text")}>
        {icon}
      </div>
      <span className={cn("flex-shrink-0 w-14 font-mono bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text")}>
        {label}
      </span>
      <span className={cn("flex-shrink-0", highlight ? valueColor : "", darkMode ? "text-cyan-300" : "text-cyan-700")}>
        {value}
      </span>
    </div>
  )
}
