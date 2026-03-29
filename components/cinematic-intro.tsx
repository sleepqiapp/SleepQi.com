"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import gsap from "gsap"

// Deterministic particle data — no Math.random() to avoid hydration mismatch
function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id:       i,
        width:    ((i * 17 + 3) % 3) + 1,
        height:   ((i * 13 + 7) % 3) + 1,
        left:     (i * 37 + 11) % 100,
        top:      (i * 53 + 19) % 100,
        yDelta:   -(((i * 29 + 5) % 80) + 40),
        duration: ((i * 41 + 3) % 12) + 10,
        delay:    (i * 23 + 1) % 8,
      })),
    [count]
  )
}

interface CinematicIntroProps {
  onComplete: () => void
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [isExiting, setIsExiting] = useState(false)

  const particles   = useParticles(18)
  const controls    = useAnimation()

  // Always-mounted refs — never null when GSAP needs them
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const taglineRef  = useRef<HTMLParagraphElement>(null)
  const buttonRef   = useRef<HTMLButtonElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)

  // Entrance sequence via GSAP — elements start invisible via initial style
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.2 })

      // Title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.94, filter: "blur(8px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }
      )
      // Tagline staggered after title
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
        "-=0.7"
      )
      // Button bounces in last
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 24, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.3"
      )
    })
    return () => ctx.revert()
  }, [])

  // Scroll detection — if user scrolls, exit intro and go to landing page
  useEffect(() => {
    if (isExiting) return

    const handleScroll = () => {
      if (window.scrollY > 20) {
        handleContinue()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isExiting, handleContinue])

  const handleContinue = useCallback(async () => {
    if (isExiting) return
    setIsExiting(true)

    // 1. GSAP stagger-dissolve all text upward
    const tl = gsap.timeline()
    tl.to(buttonRef.current,  { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" })
    tl.to(taglineRef.current, { opacity: 0, y: -12, duration: 0.30, ease: "power2.in" }, "-=0.2")
    tl.to(titleRef.current,   { opacity: 0, y: -10, duration: 0.30, ease: "power2.in" }, "-=0.2")
    // Dissolve vignette — raw painting shows through
    tl.to(vignetteRef.current, { opacity: 0, duration: 1.0, ease: "power1.inOut" }, "-=0.1")
    await tl.then()

    // 2. Framer Motion fades the entire intro overlay out
    //    Landing page is already rendered beneath — zero white flash
    await controls.start({
      opacity: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    })

    onComplete()
  }, [isExiting, controls, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={controls}
    >
      {/* Background image — Ken-Burns slow zoom */}
      <motion.div
        className="absolute inset-0 w-full h-screen"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 7, ease: "easeOut" }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome_hero-6kpq14vW5h1wuiJeZTljrAdjlaDb2Q.png"
          alt="Serene twilight sky over rolling hills with wildflowers"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Vignette overlay — dissolved by GSAP on exit */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55"
      />

      {/* Hero text — always mounted, GSAP controls visibility */}
      <div
        className="relative z-10 flex w-full flex-col items-center px-6 text-center"
        style={{ marginTop: "22vh" }}
      >
        <h1
          ref={titleRef}
          className="font-sans text-6xl font-black tracking-tight text-white drop-shadow-lg sm:text-7xl lg:text-8xl"
          style={{ opacity: 0 }}
        >
          SleepQi
        </h1>

        <p
          ref={taglineRef}
          className="mt-4 text-lg font-medium tracking-wide text-white/85 sm:text-xl"
          style={{ opacity: 0 }}
        >
          Behavior-First Sleep Optimization
        </p>
      </div>

      {/* Enter button — always mounted */}
      <div className="absolute bottom-[14vh] z-10 flex flex-col items-center gap-4">
        <button
          ref={buttonRef}
          onClick={handleContinue}
          disabled={isExiting}
          aria-label="Enter SleepQi"
          className="glassmorphism cursor-pointer rounded-full px-12 py-4 text-sm font-semibold tracking-widest text-white/95 uppercase transition-all duration-300 hover:scale-105 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-40"
          style={{ opacity: 0 }}
        >
          Enter
        </button>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 3.5 }}
          className="text-xs tracking-[0.25em] text-white/50 uppercase"
        >
          scroll to discover
        </motion.span>
      </div>

      {/* Ambient motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width:  p.width,
              height: p.height,
              left:   `${p.left}%`,
              top:    `${p.top}%`,
            }}
            animate={{ y: [0, p.yDelta], opacity: [0, 0.5, 0] }}
            transition={{
              duration: p.duration,
              repeat:   Infinity,
              delay:    p.delay,
              ease:     "linear",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
