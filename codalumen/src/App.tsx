import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Code2,
  MousePointerClick,
  Play,
  Sparkles,
  Users,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import LiquidEther from "@/components/LiquidEther"

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return prefersReducedMotion
}

function useMagneticButtons(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".magnet"))

    if (magnets.length === 0) return

    const handleMove = (event: MouseEvent) => {
      magnets.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.05
        const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.05
        element.style.transform = `translate(${dx}px, ${dy}px)`
      })
    }

    const handleLeave = () => {
      magnets.forEach((element) => {
        element.style.transform = "translate(0, 0)"
      })
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
    }
  }, [enabled])
}

const heroSteps = [
  {
    icon: MousePointerClick,
    title: "Wähle dein Ziel",
    description: "Starte mit klaren Lernpfaden für Web, Data oder Automation.",
  },
  {
    icon: Code2,
    title: "Code. Test. Verstehe.",
    description: "Mini-Lektionen plus Live-Konsole geben dir sofort Feedback.",
  },
  {
    icon: CheckCircle2,
    title: "Baue dein Projekt",
    description: "In weniger als 6 Wochen steht dein erstes sichtbares Portfolio-Projekt.",
  },
]

const socialProof = [
  { label: "Lernende", value: "12.500+", icon: Users },
  { label: "Kursrating", value: "4.9/5", icon: Award },
  { label: "Completion", value: "87%", icon: CheckCircle2 },
]

const faqItems = [
  {
    value: "beginner",
    question: "Ist CodeLumen für absolute Beginner:innen geeignet?",
    answer:
      "Ja. Du benötigst keine Vorerfahrung – wir starten bei Null und führen dich mit Erklärvideos, Übungen und Sofort-Feedback durch die Grundlagen.",
  },
  {
    value: "zeit",
    question: "Wie viel Zeit muss ich investieren?",
    answer:
      "Plane 20 bis 30 Minuten pro Tag ein. Bereits nach der ersten Session baust du eine sichtbare Ausgabe in der Live-Konsole.",
  },
  {
    value: "support",
    question: "Gibt es Community-Support?",
    answer:
      "Ja. Du erhältst Zugang zu unserer betreuten Discord-Community mit täglichen Check-ins und wöchentlichen Q&A-Sessions.",
  },
]

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty("--scrollY", String(window.scrollY))
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useMagneticButtons(!prefersReducedMotion)

  return (
    <div className="min-h-dvh bg-slate-950 text-white selection:bg-brand-400/30">
      <AuroraBackdrop reduceMotion={prefersReducedMotion} />
      <header className="relative z-10">
        <Navigation />
        <HeroSection prefersReducedMotion={prefersReducedMotion} />
      </header>
      <main className="relative z-10 space-y-24 pb-24">
        <InteractiveLiquidSection prefersReducedMotion={prefersReducedMotion} />
        <HowItWorks />
        <LiveDemo prefersReducedMotion={prefersReducedMotion} />
        <Curriculum prefersReducedMotion={prefersReducedMotion} />
        <SocialProof />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

function AuroraBackdrop({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-70 blur-3xl" aria-hidden />
      {!reduceMotion ? (
        <LiquidEther
          className="pointer-events-none fixed inset-0"
          style={{ width: "100%", height: "100%" }}
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      ) : (
        <div className="absolute inset-0 bg-aurora" aria-hidden />
      )}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-[0.08]",
          !reduceMotion && "motion-safe:animate-glow",
        )}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform:
            "perspective(1000px) rotateX(45deg) translateY(calc(var(--scrollY,0)*0.2px))",
          transformOrigin: "center top",
        }}
      />
    </div>
  )
}

function Navigation() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
      <div className="font-display text-xl tracking-wide">CodeLumen</div>
      <div className="hidden items-center gap-3 text-sm text-white/70 md:flex">
        <a className="transition hover:text-white" href="#ablauf">
          Wie es funktioniert
        </a>
        <a className="transition hover:text-white" href="#curriculum">
          Curriculum
        </a>
        <a className="transition hover:text-white" href="#faq">
          FAQ
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="hidden md:inline-flex">
          Kursübersicht
        </Button>
        <Button className="magnet aurora-border rounded-xl px-5 py-2">
          Jetzt starten
        </Button>
      </div>
    </nav>
  )
}

function InteractiveLiquidSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="relative w-full">
      <div className="relative mx-auto h-[600px] w-full max-w-7xl overflow-hidden rounded-[40px] border border-white/10">
        {!prefersReducedMotion ? (
          <LiquidEther
            className="absolute inset-0"
            style={{ width: "100%", height: "100%" }}
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={120}
            isViscous
            viscous={28}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.6}
            isBounce={false}
            autoDemo
            autoSpeed={0.65}
            autoIntensity={2.4}
            takeoverDuration={0.35}
            autoResumeDelay={3500}
            autoRampDuration={0.75}
          />
        ) : (
          <div className="absolute inset-0 bg-aurora" aria-hidden />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-slate-950/70" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
          <Badge variant="outline" className="aurora-border inline-flex bg-slate-900/40 text-white/80">
            Interaktive Atmosphäre
          </Badge>
          <h2 className="max-w-3xl font-display text-3xl leading-tight md:text-5xl">
            Eintauchen, staunen und mit dem Flow lernen.
          </h2>
          <p className="max-w-2xl text-base text-white/80 md:text-lg">
            Die LiquidEther-Fläche reagiert dynamisch auf Mausbewegungen oder läuft automatisch in einer sanften Demo.
            Verwende sie als immersiven Hintergrund für deinen Hero-Bereich oder wichtige Call-to-Actions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="magnet aurora-border rounded-xl">
              Live Hintergrund aktivieren
            </Button>
            <Button size="lg" variant="secondary" className="bg-white/10">
              Einstellungen ansehen
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-8 pb-16 md:grid-cols-2">
      <div className="space-y-6">
        <Badge className="w-fit bg-white/10 text-white/80">
          CodeLumen — Dein erstes Licht im Code-Dschungel
        </Badge>
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          Coding für Anfänger:innen,
          <br />
          hell beleuchtet.
        </h1>
        <p className="text-lg text-white/80">
          Lerne Schritt für Schritt mit interaktiven Mini-Lektionen, Live-Konsole und klaren Zielen.
          Erlebe greifbare Fortschritte innerhalb der ersten 10 Minuten.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="magnet aurora-border rounded-xl">
            <Play className="mr-2 h-4 w-4" /> Live ausprobieren
          </Button>
          <Button size="lg" variant="secondary">
            Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 pt-6 sm:grid-cols-3">
          {heroSteps.map((step) => (
            <motion.div
              key={step.title}
              className="glass rounded-2xl p-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <step.icon className="mb-3 h-5 w-5 text-brand-300" />
              <div className="font-medium">{step.title}</div>
              <p className="mt-2 text-sm text-white/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <HeroConsole prefersReducedMotion={prefersReducedMotion} />
    </section>
  )
}

function HeroConsole({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [input, setInput] = useState("print('Hello CodeLumen! ✨')")
  const [output, setOutput] = useState("Hello CodeLumen! ✨")

  const preview = useMemo(() => input.trim().toLowerCase(), [input])

  useEffect(() => {
    const success = preview.includes("hello") || preview.includes("console.log") || preview.includes("print")
    if (success) {
      setOutput("Hello CodeLumen! ✨")
    } else if (preview.includes("error")) {
      setOutput("⚠️ Tipp: Konsolen-Ausgaben funktionieren mit console.log(...) ")
    } else if (preview.length === 0) {
      setOutput("Schreibe einen Ausdruck und tippe Enter.")
    } else {
      setOutput("🤖 Ich höre zu … Probiere console.log('Hi')")
    }
  }, [preview])

  return (
    <motion.div
      className="relative h-full w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute -inset-6 rounded-[36px] bg-aurora opacity-50 blur-3xl" aria-hidden />
      <div className="glass relative rounded-[28px] p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
          <span>Live-Konsole</span>
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="mt-4 grid gap-4">
          <div>
            <div className="text-xs text-white/60">Dein Code</div>
            <div className="mt-2 rounded-xl bg-black/50 p-4 font-mono text-sm text-brand-100">
              <input
                className="w-full bg-transparent text-brand-50 outline-none"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                aria-label="Mini Code Editor"
              />
            </div>
          </div>
          <Separator className="h-px w-full bg-white/10" />
          <div>
            <div className="text-xs text-white/60">Ausgabe</div>
            <div className="mt-2 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-4 font-mono text-sm text-emerald-200">
              {output}
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-white/50">
          Tippe <span className="text-white">console.log</span> oder <span className="text-white">print</span> und erlebe sofortiges Feedback.
        </p>
        {prefersReducedMotion && (
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Animationen reduziert
          </p>
        )}
      </div>
    </motion.div>
  )
}

function HowItWorks() {
  return (
    <section id="ablauf" className="mx-auto w-full max-w-6xl px-4">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="aurora-border inline-flex bg-slate-900/40">
            So läuft&apos;s
          </Badge>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">In drei Schritten zum ersten Projekt</h2>
        </div>
        <p className="max-w-xl text-base text-white/70">
          Kurze Lektionen, klare Ziele und ein Fokus auf sichtbare Ergebnisse – perfekt, wenn du neben Beruf oder Studium lernen möchtest.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {heroSteps.map((step, index) => (
          <RevealCard key={step.title} delay={index * 0.1}>
            <step.icon className="mb-4 h-6 w-6 text-brand-300" />
            <h3 className="font-display text-xl">{step.title}</h3>
            <p className="mt-3 text-sm text-white/70">{step.description}</p>
          </RevealCard>
        ))}
      </div>
    </section>
  )
}

function RevealCard({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="glass aurora-border rounded-3xl p-6"
    >
      {children}
    </motion.div>
  )
}

function LiveDemo({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [challengeInput, setChallengeInput] = useState("")
  const [status, setStatus] = useState("Noch keinen Versuch gestartet.")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (challengeInput.trim().toLowerCase() === "42") {
      setStatus("✅ Perfekt! Du hast die magische Zahl gefunden.")
    } else if (challengeInput.trim().length === 0) {
      setStatus("⚠️ Bitte gib eine Zahl ein.")
    } else {
      setStatus("Fast! Tipp: Die Antwort auf alles ist 42.")
    }
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div>
        <Badge variant="outline" className="bg-white/5">
          Live-Demo
        </Badge>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Probiere CodeLumen in 30 Sekunden aus</h2>
        <p className="mt-4 text-base text-white/70">
          In jeder Einheit erwartet dich eine kleine Challenge. Tippe die richtige Antwort ein und erhalte direkt Rückmeldung – so lernst du nicht nur theoretisch, sondern praktisch.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-white/60">
          <li>• Sofortiges Feedback nach jeder Eingabe.</li>
          <li>• Hinweise, wenn du einmal festhängst.</li>
          <li>• Erfolgserlebnisse, die motivieren dranzubleiben.</li>
        </ul>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        className="glass relative rounded-3xl p-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute -inset-4 rounded-[30px] bg-aurora opacity-40 blur-3xl" aria-hidden />
        <div className="relative space-y-4">
          <p className="text-sm text-white/70">Mini-Challenge: Wie lautet die Antwort auf alle Fragen des Universums?</p>
          <Input
            value={challengeInput}
            onChange={(event) => setChallengeInput(event.target.value)}
            placeholder="Deine Antwort"
            inputMode="numeric"
            aria-label="Antwort eingeben"
          />
          <Button type="submit" className="magnet aurora-border rounded-xl w-full">
            Antwort prüfen
          </Button>
          <p className="text-sm text-white/60">{status}</p>
          {!prefersReducedMotion && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          )}
          <p className="text-xs text-white/40">Diese Demo speichert keine Eingaben – probiere dich einfach aus.</p>
        </div>
      </motion.form>
    </section>
  )
}

function Curriculum({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const modules = [
    { title: "Foundations", level: "HTML, CSS & Logik" },
    { title: "Interaktion", level: "JavaScript Basics" },
    { title: "Dein erstes Projekt", level: "Mini-App mit React" },
  ]

  return (
    <section id="curriculum" className="mx-auto w-full max-w-6xl px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="bg-white/5">
            Curriculum
          </Badge>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">Lernpfad mit Tiefgang – ohne Überforderung</h2>
        </div>
        <p className="max-w-xl text-base text-white/70">
          Jede Sektion endet mit einem Mini-Projekt. Du lernst fokussiert, anwendungsorientiert und in klaren Etappen.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {modules.map((module) => (
          <TiltCard key={module.title} title={module.title} level={module.level} enableTilt={!prefersReducedMotion} />
        ))}
      </div>
    </section>
  )
}

function TiltCard({ title, level, enableTilt }: { title: string; level: string; enableTilt: boolean }) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enableTilt) return
    const card = cardRef.current
    if (!card) return

    const handleMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const rotateX = ((y / rect.height - 0.5) * 6).toFixed(2)
      const rotateY = (-(x / rect.width - 0.5) * 6).toFixed(2)
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleLeave = () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)"
    }

    card.addEventListener("mousemove", handleMove)
    card.addEventListener("mouseleave", handleLeave)

    return () => {
      card.removeEventListener("mousemove", handleMove)
      card.removeEventListener("mouseleave", handleLeave)
    }
  }, [enableTilt])

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition will-change-transform"
      style={{ transform: "perspective(800px) rotateX(0deg) rotateY(0deg)" }}
    >
      <div className="absolute inset-0 bg-aurora opacity-20" aria-hidden />
      <div className="relative space-y-4">
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="text-sm text-white/60">{level}</p>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 bg-brand-400" aria-hidden />
        </div>
        <p className="text-xs text-white/50">Mini-Project &amp; Review inklusive</p>
      </div>
    </div>
  )
}

function SocialProof() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <Badge variant="outline" className="bg-white/5">
            Social Proof
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl">Gemeinsam lernen, gemeinsam wachsen</h2>
          <p className="text-base text-white/70">
            CodeLumen verbindet motivierte Beginner:innen mit Mentor:innen und einer aktiven Community. Deine Fragen bleiben nicht unbeantwortet – versprochen.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {socialProof.map((item) => (
            <Card key={item.label} className="glass aurora-border rounded-2xl p-5 text-center">
              <item.icon className="mx-auto mb-3 h-6 w-6 text-brand-300" />
              <div className="text-2xl font-semibold">{item.value}</div>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto w-full max-w-4xl px-4">
      <div className="text-center">
        <Badge variant="outline" className="bg-white/5">
          FAQ
        </Badge>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Antworten auf häufige Fragen</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
          Transparenz ist uns wichtig. Hier findest du die Antworten, die Beginner:innen am häufigsten stellen.
        </p>
      </div>
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <Accordion type="single" collapsible>
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="pb-4">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 text-center">
      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-10">
        <div className="absolute -inset-10 bg-aurora opacity-30 blur-3xl" aria-hidden />
        <div className="relative space-y-6">
          <h2 className="font-display text-3xl md:text-4xl">Bereit, dein erstes Licht anzuknipsen?</h2>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            Sichere dir deinen Platz und starte mit einem kostenlosen Onboarding inklusive persönlichem Lernfahrplan.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="magnet aurora-border rounded-xl">
              Kostenlos starten
            </Button>
            <Button size="lg" variant="secondary">
              Beratungsgespräch buchen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-4 pb-12">
      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} CodeLumen. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <a className="transition hover:text-white" href="#">
            Impressum
          </a>
          <a className="transition hover:text-white" href="#">
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  )
}
