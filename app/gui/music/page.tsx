"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Music, Headphones, AudioWaveformIcon as Waveform, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Square } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { musicPageColorScheme } from "@/lib/color-schemes"

export default function MusicPage() {
  const router = useRouter()
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [globalVolume, setGlobalVolume] = useState(0.75) // Default 75% volume
  const [targetVolume, setTargetVolume] = useState(0.75) // For smooth transitions
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({})
  const [trackDurations, setTrackDurations] = useState<{ [key: number]: number }>({})
  const [currentTimes, setCurrentTimes] = useState<{ [key: number]: number }>({})
  const [isDragging, setIsDragging] = useState<{ [key: number]: boolean }>({})
  const [isVolumeDragging, setIsVolumeDragging] = useState(false)
  const volumeBarRef = useRef<HTMLDivElement>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isStopped, setIsStopped] = useState(false)
  const [selectedSection, setSelectedSection] = useState("Audio SoftDev")  // Default to first section

  const featuredTracks = [
    { id: 1, title: "Unwind (Remix)", genre: "Electronic", audioFile: "/unwind_remix.mp3" },
    { id: 2, title: "Life is...", genre: "Electronic", audioFile: "/life_is.mp3" },
    { id: 3, title: "Salt (Remix)", genre: "Electronic", audioFile: "/salt.mp3" },
    { id: 4, title: "May 8th", genre: "Reflective Hip Hop", audioFile: "/may_8.mp3" },
  ]

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
      }
      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
      }
      const handleEnded = () => {
        setPlayingTrackId(null)
        setCurrentTime(0)
      }

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('ended', handleEnded)

      return () => {
        // Cleanup event listeners
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('ended', handleEnded)
        // Stop playback when unmounting
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [playingTrackId])

  // Add smooth volume transition effect
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const currentVol = audio.volume
      const targetVol = targetVolume
      
      // Clear any existing fade interval
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }

      // If the difference is small, set immediately
      if (Math.abs(currentVol - targetVol) < 0.01) {
        audio.volume = targetVol
        return
      }

      // Calculate step size for smooth transition (20ms intervals)
      const stepSize = (targetVol - currentVol) / 10 // 200ms total transition
      let currentStep = 0

      fadeIntervalRef.current = setInterval(() => {
        currentStep++
        const newVolume = currentVol + (stepSize * currentStep)
        audio.volume = Math.max(0, Math.min(1, newVolume))
        
        if (currentStep >= 10) {
          audio.volume = targetVol
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
          }
        }
      }, 20)
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [targetVolume])

  // Add fade-in function
  const fadeInAudio = (audio: HTMLAudioElement, targetVolume: number) => {
    audio.volume = 0
    audio.play()
    
    const fadeInterval = 50 // 50ms steps
    const steps = 60 // 3000ms total (60 * 50ms = 3000ms)
    const stepSize = targetVolume / steps
    
    let currentStep = 0
    const fadeTimer = setInterval(() => {
      currentStep++
      audio.volume = Math.min(targetVolume, stepSize * currentStep)
      
      if (currentStep >= steps) {
        clearInterval(fadeTimer)
      }
    }, fadeInterval)
  }

  // Add function to handle track navigation
  const handleTrackNavigation = (direction: 'prev' | 'next') => {
    if (!playingTrackId) return
    
    const currentIndex = featuredTracks.findIndex(track => track.audioFile === featuredTracks[playingTrackId].audioFile)
    let newIndex: number
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : featuredTracks.length - 1
    } else {
      newIndex = currentIndex < featuredTracks.length - 1 ? currentIndex + 1 : 0
    }
    
    const nextTrack = featuredTracks[newIndex]
    if (nextTrack.audioFile) {
      togglePlayback(newIndex, nextTrack.audioFile)
    }
  }

  // Add stop function
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlayingTrackId(null)
      setCurrentTime(0)
      setIsStopped(true)
    }
  }

  // Modify togglePlayback to include fade-in
  const togglePlayback = (trackId: number, audioFile: string) => {
    setIsStopped(false)
    if (playingTrackId === trackId) {
      // If clicking the currently playing track, pause it
      if (audioRef.current) {
        audioRef.current.pause()
        setPlayingTrackId(null)
      }
    } else {
      // If clicking a different track, play it and stop the current one
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const newAudio = new Audio(audioFile)
      newAudio.volume = 0 // Start at 0 volume
      audioRef.current = newAudio
      setPlayingTrackId(trackId)
      setCurrentTime(0)
      
      // Start fade-in after a small delay to ensure audio is ready
      setTimeout(() => {
        fadeInAudio(newAudio, targetVolume)
      }, 100)
    }
  }

  // Add global play/pause handler
  const handleGlobalPlayPause = () => {
    if (!playingTrackId) {
      // If nothing is playing, start the first track
      const firstTrack = featuredTracks[0]
      if (firstTrack.audioFile) {
        togglePlayback(0, firstTrack.audioFile)
      }
    } else {
      // If something is playing, toggle it
      const currentTrack = featuredTracks.find(t => t.audioFile === featuredTracks[playingTrackId].audioFile)
      if (currentTrack?.audioFile) {
        togglePlayback(playingTrackId, currentTrack.audioFile)
      }
    }
  }

  const handleTimeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !playingTrackId) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    audioRef.current.currentTime = percentage * duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return
    const rect = volumeBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newVolume = Math.max(0, Math.min(1, x / rect.width))
    setTargetVolume(newVolume) // Update target volume instead of directly setting
  }

  const handleVolumeMouseDown = () => {
    setIsVolumeDragging(true)
  }

  const handleVolumeMouseUp = () => {
    setIsVolumeDragging(false)
  }

  // Add event listeners for volume dragging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e: MouseEvent) => {
        if (isVolumeDragging && volumeBarRef.current) {
          handleVolumeChange(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }
      const handleMouseUp = () => {
        setIsVolumeDragging(false)
      }
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [])

  // Hardcoded music projects
  const musicProjects = [
    {
      id: 1,
      title: "Audio SoftDev",
      description: "DSP learnings, tool creation, research",
      icon: <Waveform className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Production",
      description: "Music production, mixing, mastering",
      icon: <Music className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Current Tunes",
      description: "I have odd taste in music",
      icon: <Headphones className="h-6 w-6" />,
    },
  ]

  const handleExplore = (title: string) => {
    setSelectedSection(title)
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4 music-theme">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <PageHeader 
          title="Music" 
          subtitle="Production, instruments, and audio engineering" 
          className="text-primary"
        />

        {/* Music projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {musicProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border-2 border-primary rounded-md overflow-hidden transition-transform hover:scale-105 pixel-corners"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-muted p-4 rounded-full mb-4 text-primary">{project.icon}</div>
                <h3 className="font-press-start-2p text-lg mb-3 text-primary">{project.title}</h3>
                <p className="font-vt323 text-xl mb-4 text-[hsl(var(--platform))]">{project.description}</p>
                <Button 
                  variant="default" 
                  className="font-vt323 text-lg mt-auto bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] hover:from-[hsl(var(--gradient-hover-from))] hover:to-[hsl(var(--gradient-hover-to))] text-black"
                  onClick={() => handleExplore(project.title)}
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic content section */}
        <div className="bg-card border-2 border-primary rounded-md overflow-hidden pixel-corners p-6 mb-12">
          <h2 className="font-press-start-2p text-2xl mb-6 text-primary">{selectedSection}</h2>
          <div className="space-y-4">
            {selectedSection === "Audio SoftDev" && (
              <>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10">
                  <div>
                    <h4 className="font-vt323 text-2xl text-primary">Audio Plugin Development</h4>
                    <p className="font-vt323 text-lg text-[hsl(var(--platform))]">COMING SOON!</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10">
                  <div>
                    <h4 className="font-vt323 text-2xl text-primary">DSP Research</h4>
                    <p className="font-vt323 text-lg text-[hsl(var(--platform))]">COMING SOON!</p>
                  </div>
                </div>
              </>
            )}
            {selectedSection === "Production" && (
              <>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10">
                  <div>
                    <h4 className="font-vt323 text-2xl text-primary">DAW Tricks</h4>
                    <p className="font-vt323 text-lg text-[hsl(var(--platform))]">COMING SOON!</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10">
                  <div>
                    <h4 className="font-vt323 text-2xl text-primary">Sound Design</h4>
                    <p className="font-vt323 text-lg text-[hsl(var(--platform))]">COMING SOON!</p>
                  </div>
                </div>
              </>
            )}
            {selectedSection === "Current Tunes" && (
              <>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10">
                  <div>
                    <h4 className="font-vt323 text-2xl text-primary">Slyle's Selects</h4>
                    <p className="font-vt323 text-lg text-[hsl(var(--platform))]">COMING SOON!</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-colors hover:bg-primary/10">
                  <div>
                    <h4 className="font-vt323 text-2xl text-primary">Other stuff?</h4>
                    <p className="font-vt323 text-lg text-[hsl(var(--platform))]">COMING SOON!</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Featured tracks */}
        <div className="bg-card border-2 border-primary rounded-md overflow-hidden p-6 mb-12 pixel-corners">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-press-start-2p text-2xl mb-6 text-primary">Featured Tracks</h2>
            <div className="flex items-center bg-muted rounded-full px-4 py-2 gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTrackNavigation('prev')}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-primary/10"
                  disabled={!playingTrackId}
                >
                  <SkipBack className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={handleGlobalPlayPause}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-primary/10"
                  disabled={!featuredTracks[0].audioFile}
                >
                  {playingTrackId !== null ? (
                    <Pause className="w-5 h-5 text-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-foreground" />
                  )}
                </button>
                <button
                  onClick={handleStop}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-primary/10"
                  disabled={!playingTrackId}
                >
                  <Square className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={() => handleTrackNavigation('next')}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-primary/10"
                  disabled={!playingTrackId}
                >
                  <SkipForward className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="h-6 w-px bg-muted/80" /> {/* Divider */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-foreground" />
                <div 
                  ref={volumeBarRef}
                  className="w-32 h-2 bg-muted/80 rounded-full cursor-pointer relative"
                  onClick={handleVolumeChange}
                  onMouseDown={handleVolumeMouseDown}
                >
                  <div 
                    className="absolute h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${targetVolume * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {featuredTracks.map((track, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col p-4 rounded-md transition-all duration-300",
                  track.audioFile && "cursor-pointer hover:bg-muted/50",
                  track.audioFile && playingTrackId === index && "bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 border border-primary/40"
                )}
                onClick={track.audioFile ? () => togglePlayback(index, track.audioFile!) : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                      {track.audioFile ? (
                        playingTrackId === index ? (
                          <Pause className="h-5 w-5 text-primary" />
                        ) : (
                          <Play className="h-5 w-5 text-primary" />
                        )
                      ) : (
                        <Music className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-press-start-2p text-lg text-primary">{track.title}</h3>
                      <p className="font-vt323 text-sm text-[hsl(var(--platform))]">{track.genre}</p>
                    </div>
                  </div>
                  {track.audioFile && playingTrackId === index && (
                    <span className="font-vt323 text-sm text-foreground/60">{formatTime(currentTime)}</span>
                  )}
                </div>
                {track.audioFile && playingTrackId === index && (
                  <div className="space-y-1">
                    <div 
                      className="h-1 bg-muted rounded-full cursor-pointer relative"
                      onClick={handleTimeClick}
                    >
                      <div 
                        className="absolute h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button 
            variant="default" 
            size="lg" 
            className="font-press-start-2p text-sm transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] hover:from-[hsl(var(--gradient-hover-from))] hover:to-[hsl(var(--gradient-hover-to))]"
            onClick={() => router.push("/gui/music/disclaimer")}
          >
            View All Music Projects
          </Button>
        </div>
      </div>
    </main>
  )
} 