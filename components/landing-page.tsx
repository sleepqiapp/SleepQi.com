"use client"

import { useEffect, useRef, useState, Fragment } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import {
  Moon, Volume2, Bell, Shield, Heart, Lock,
  ChevronDown, Menu, X, Sparkles, Zap, Star,
} from "lucide-react"

interface LandingPageProps {
  isVisible: boolean
}

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Science",  href: "#science" },
  { label: "Pricing",  href: "#pricing" },
]

const programs = [
  { label: "Circadian Reset",   desc: "Recalibrate your internal clock in 14 days",  icon: Moon },
  { label: "Deep Sleep Protocol", desc: "Unlock slow-wave sleep with targeted cues",  icon: Sparkles },
  { label: "Power Nap System",  desc: "Precision naps for afternoon performance",     icon: Zap },
  { label: "Jet-Lag Recovery",  desc: "Rapid timezone adaptation framework",          icon: Star },
]

const features = [
  { icon: Moon,    title: "Circadian Syncing",  desc: "Align your sleep schedule with your natural body clock for optimal rest and deep recovery." },
  { icon: Volume2, title: "Soundscapes",        desc: "Curated ambient audio environments scientifically designed to accelerate sleep onset." },
  { icon: Bell,    title: "Smart Alarms",       desc: "Wake during your lightest sleep phase — refreshed, never groggy." },
]

const safety = [
  { icon: Shield, title: "Privacy-First",   desc: "Your sleep data stays on your device. We never sell or share your personal information." },
  { icon: Heart,  title: "Guilt-Free UX",   desc: "No judgment, no streaks to break. Just supportive guidance on your sleep journey." },
  { icon: Lock,   title: "Secure by Design",desc: "End-to-end encryption and industry-standard security practices protect your data." },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: "-80px" },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
})

export function LandingPage({ isVisible }: LandingPageProps) {
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const heroRef   = useRef<HTMLElement>(null)
  const navRef    = useRef<HTMLElement>(null)

  // Track scroll for nav blur intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // GSAP entrance when intro completes
  useEffect(() => {
    if (!isVisible) return
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.2, ease: "power3.out" }
      )
    }
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
      )
    }
  }, [isVisible])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-background font-sans"
    >
      {/* ════════════════════════════════════════════════
          GLASSMORPHISM NAVBAR
      ════════════════════════════════════════════════ */}
      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-40"
        style={{ opacity: 0 }}
        role="banner"
      >
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? "glass-dark shadow-lg shadow-black/20" : "glass"
          } rounded-none`}
          style={{
            background: scrolled
              ? "rgba(20, 46, 50, 0.72)"
              : "rgba(20, 46, 50, 0.42)",
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="#" className="text-xl font-black tracking-tight text-white drop-shadow-sm" aria-label="SleepQi home">
            SleepQi
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex" role="menubar">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                role="menuitem"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {link.label}
              </a>
            ))}

            {/* Programs dropdown */}
            <div className="relative">
              <button
                onClick={() => setProgramsOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={programsOpen}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Programs
                <motion.span
                  animate={{ rotate: programsOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-dark absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-2xl p-3 shadow-2xl shadow-black/30"
                    role="menu"
                  >
                    {programs.map((p) => (
                      <a
                        key={p.label}
                        href="#"
                        role="menuitem"
                        className="flex items-start gap-3 rounded-xl p-3 transition-all duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                          <p.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{p.label}</p>
                          <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden rounded-full bg-primary/90 px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:block"
            >
              Get Started
            </a>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark overflow-hidden px-5 pb-5"
            >
              <div className="flex flex-col gap-1 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-1 border-t border-white/10 pt-2">
                  <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-widest text-white/40">Programs</p>
                  {programs.map((p) => (
                    <a
                      key={p.label}
                      href="#"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      <p.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      {p.label}
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  className="mt-2 rounded-full bg-primary/90 px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ════════════════════════════════════════════════
          HERO — image fades in as the intro dissolves
      ════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex h-screen min-h-[600px] items-end overflow-hidden pb-32"
        aria-label="Hero"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome_hero-6kpq14vW5h1wuiJeZTljrAdjlaDb2Q.png"
            alt="Serene twilight sky over rolling hills with wildflowers"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* gradient: transparent at top, fades to bg-background at bottom so content sections blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-10">
          <motion.h2
            {...fadeUp(0.3)}
            className="text-4xl font-black tracking-tight text-white text-shadow-soft sm:text-5xl md:text-6xl"
          >
            Sleep Better,<br />Live Better
          </motion.h2>
          <motion.p
            {...fadeUp(0.5)}
            className="mx-auto mt-5 max-w-xl text-lg text-white/85 sm:text-xl"
          >
            Transform your nights with science-backed behavioral optimization — no gadgets required.
          </motion.p>
          <motion.div {...fadeUp(0.7)} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Start Free Tonight
            </a>
            <a
              href="#features"
              className="glassmorphism rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════ */}
      <main className="relative z-10 bg-background">
        <section id="features" className="px-5 py-24 sm:px-8" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp()} className="mb-14 text-center">
              <h2 id="features-heading" className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Built Around Your Biology
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every feature is grounded in circadian science and behavioral research.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f, i) => (
                <motion.article
                  key={f.title}
                  {...fadeUp(i * 0.12)}
                  className="glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
                    <f.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SAFETY SECTION ── */}
        <section className="px-5 py-24 sm:px-8" aria-labelledby="safety-heading">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp()} className="mb-14 text-center">
              <h2 id="safety-heading" className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Your Safety, Our Priority
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Transparent, ethical design that puts your wellbeing first.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {safety.map((s, i) => (
                <motion.article
                  key={s.title}
                  {...fadeUp(i * 0.12)}
                  className="glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/30">
                    <s.icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-5 py-28 sm:px-8" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div {...fadeUp()}>
              <h2 id="cta-heading" className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Start Your Journey Tonight
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands who have transformed their sleep with SleepQi.
              </p>
              <a
                href="#"
                className="mt-8 inline-block rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Get Started Free
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <footer
        className="px-5 py-14 sm:px-8"
        style={{ background: "oklch(0.17 0.03 200)" }}
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs leading-relaxed text-foreground/60">
              <strong className="text-foreground/80">Medical Disclaimer:</strong> SleepQi is a
              behavioral optimization tool, not a medical device. Consult a healthcare
              professional for clinical sleep disorders. Information provided is for general
              informational purposes only and does not constitute medical advice.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 mb-6" aria-label="Legal">
            {["Privacy Policy", "Terms of Service", "Cookie Settings", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-foreground/50 transition-colors hover:text-foreground/80 focus:outline-none focus-visible:underline"
              >
                {l}
              </a>
            ))}
          </nav>
          <p className="text-center text-xs text-foreground/40">
            © {new Date().getFullYear()} SleepQi. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  )
}
