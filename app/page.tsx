"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CinematicIntro } from "@/components/cinematic-intro"
import { LandingPage } from "@/components/landing-page"
import { CookieConsent } from "@/components/cookie-consent"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {/* Landing page is ALWAYS mounted — never causes a white flash */}
      <LandingPage isVisible={introComplete} />

      {/* Intro sits on top at z-50 and fades away; landing page is already rendered */}
      <AnimatePresence>
        {!introComplete && (
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {introComplete && <CookieConsent />}
    </>
  )
}
