import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  MessageSquare,
  NotebookPen,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const INK = "#111111";
const PAPER = "#FFFFFF";
const MIST = "#F5F5F5";
const LINE = "#D9D9D9";
const ACCENT = "#2451E3";
const ACCENT_DIM = "#EEF1FD";

const fontDisplay = { fontFamily: "'Geist', 'Inter', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };

/* ---------- Reveal-on-scroll wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Animated predicted-score counter ---------- */
function ScoreCounter() {
  const target = 1490;
  const [value, setValue] = useState(1080);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    const from = 1080;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <span>{value}</span>;
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md"
      style={{ backgroundColor: "rgba(255,255,255,0.85)", borderBottom: `1px solid ${LINE}` }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: INK, ...fontDisplay }}
        >
          A
        </div>
        <span className="text-[15px] font-semibold tracking-tight" style={fontDisplay}>
          Ascent
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-[14px]" style={{ color: "#4B4B4B", ...fontBody }}>
        <a href="#features" className="hover:text-black transition-colors">Platform</a>
        <a href="#courses" className="hover:text-black transition-colors">Courses</a>
        <a href="#results" className="hover:text-black transition-colors">Results</a>
        <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
      </nav>
      <div className="flex items-center gap-3">
        <button
          className="hidden sm:inline text-[14px] font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: INK, ...fontBody }}
        >
          Log in
        </button>
        <button
          className="text-[14px] font-medium px-4 py-2 rounded-lg text-white transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: ACCENT, ...fontBody }}
        >
          Start Learning
        </button>
      </div>
    </header>
  );
}

/* ---------- Dashboard mockup (hero right side) ---------- */
function DashboardMock() {
  const modules = [
    { name: "Reading Comprehension", pct: 82 },
    { name: "Grammar & Usage", pct: 64 },
    { name: "Algebra & Functions", pct: 91 },
  ];

  return (
    <div
      className="rounded-2xl p-5 md:p-6 w-full"
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${LINE}`,
        boxShadow: "0 24px 60px -20px rgba(17,17,17,0.18)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[12px] uppercase tracking-wide" style={{ color: "#8A8A8A", ...fontBody }}>
            Predicted score
          </p>
          <p className="text-[34px] font-bold leading-none mt-1" style={{ color: INK, ...fontDisplay }}>
            <ScoreCounter />
          </p>
        </div>
        <div
          className="flex items-center gap-1 text-[13px] font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: ACCENT_DIM, color: ACCENT, ...fontBody }}
        >
          <TrendingUp size={14} />
          +120 pts
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {modules.map((m) => (
          <div key={m.name}>
            <div className="flex justify-between text-[13px] mb-1" style={{ color: "#3F3F3F", ...fontBody }}>
              <span>{m.name}</span>
              <span style={{ color: "#8A8A8A" }}>{m.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: MIST }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${m.pct}%`,
                  backgroundColor: ACCENT,
                  transition: "width 1.2s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: `1px solid ${LINE}` }}>
        <div>
          <p className="text-[18px] font-bold" style={{ color: INK, ...fontDisplay }}>32</p>
          <p className="text-[12px]" style={{ color: "#8A8A8A", ...fontBody }}>Day streak</p>
        </div>
        <div>
          <p className="text-[18px] font-bold" style={{ color: INK, ...fontDisplay }}>6</p>
          <p className="text-[12px]" style={{ color: "#8A8A8A", ...fontBody }}>Mocks taken</p>
        </div>
        <div>
          <p className="text-[18px] font-bold" style={{ color: INK, ...fontDisplay }}>74%</p>
          <p className="text-[12px]" style={{ color: "#8A8A8A", ...fontBody }}>Course done</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function Section({ id, children, bg = PAPER }) {
  return (
    <section id={id} className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: bg }}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <p
      className="text-[13px] font-semibold uppercase tracking-wider mb-3"
      style={{ color: ACCENT, ...fontBody }}
    >
      {children}
    </p>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { value: "12,400+", label: "Students taught" },
    { value: "+185", label: "Avg. score improvement" },
    { value: "48,000+", label: "Mock tests completed" },
    { value: "96%", label: "Reach their target score" },
  ];
  return (
    <Section bg={MIST}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <p className="text-[32px] md:text-[40px] font-bold" style={{ color: INK, ...fontDisplay }}>
              {s.value}
            </p>
            <p className="text-[14px] mt-1" style={{ color: "#5A5A5A", ...fontBody }}>
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const items = [
    { icon: Brain, title: "Adaptive learning", desc: "Every lesson and question recalibrates to what you actually need to practice next." },
    { icon: MessageSquare, title: "AI tutor", desc: "Ask why an answer is wrong, get a concept explained again, or request harder practice — instantly." },
    { icon: BarChart3, title: "Detailed analytics", desc: "See exactly which domains are costing you points, down to the question type." },
    { icon: Target, title: "Personal study plans", desc: "A daily plan built around your target score and test date, not a generic syllabus." },
    { icon: BookOpen, title: "Full-length mock tests", desc: "Timed, Digital-SAT-accurate mocks with instant scoring and score prediction." },
    { icon: NotebookPen, title: "Mistake notebook", desc: "Every missed question is saved automatically, with notes, until you've truly mastered it." },
  ];

  return (
    <Section id="features">
      <Reveal>
        <Eyebrow>Why Ascent</Eyebrow>
        <h2 className="text-[32px] md:text-[42px] font-bold max-w-xl leading-tight" style={{ color: INK, ...fontDisplay }}>
          Everything a serious score needs. Nothing that gets in the way.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {items.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={i * 70}>
              <div
                className="p-6 rounded-2xl h-full"
                style={{ backgroundColor: MIST, border: `1px solid ${LINE}` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: PAPER, border: `1px solid ${LINE}` }}
                >
                  <Icon size={17} style={{ color: ACCENT }} />
                </div>
                <h3 className="text-[16px] font-semibold mb-1.5" style={{ color: INK, ...fontDisplay }}>
                  {f.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#5A5A5A", ...fontBody }}>
                  {f.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const quotes = [
    { name: "Dilnoza A.", detail: "1340 → 1520", text: "The mistake notebook alone changed how I studied. I stopped repeating the same errors." },
    { name: "Jahongir T.", detail: "1180 → 1410", text: "Mock tests felt exactly like the real Digital SAT. The score prediction was within 10 points." },
    { name: "Amina K.", detail: "1290 → 1470", text: "The AI tutor explained grammar rules better than three tutors I'd tried before." },
  ];

  return (
    <Section id="results" bg={MIST}>
      <Reveal>
        <Eyebrow>Real results</Eyebrow>
        <h2 className="text-[32px] md:text-[42px] font-bold max-w-xl leading-tight" style={{ color: INK, ...fontDisplay }}>
          Students who studied differently, and scored differently.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 80}>
            <div className="p-6 rounded-2xl h-full" style={{ backgroundColor: PAPER, border: `1px solid ${LINE}` }}>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: "#2E2E2E", ...fontBody }}>
                "{q.text}"
              </p>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${LINE}` }}>
                <p className="text-[14px] font-semibold" style={{ color: INK, ...fontDisplay }}>{q.name}</p>
                <p className="text-[13px] font-medium" style={{ color: ACCENT, ...fontBody }}>{q.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <Section>
      <Reveal>
        <div
          className="rounded-3xl px-8 md:px-16 py-16 text-center"
          style={{ backgroundColor: INK }}
        >
          <h2 className="text-[30px] md:text-[40px] font-bold text-white mb-3" style={fontDisplay}>
            Your target score is closer than you think.
          </h2>
          <p className="text-[15px] mb-8 max-w-lg mx-auto" style={{ color: "#B8B8B8", ...fontBody }}>
            Start with a free diagnostic mock test and see your predicted score in minutes.
          </p>
          <button
            className="inline-flex items-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: ACCENT, ...fontBody }}
          >
            Start Learning <ArrowRight size={16} />
          </button>
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${LINE}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[13px]" style={{ color: "#8A8A8A", ...fontBody }}>
          © 2026 Ascent. All rights reserved.
        </p>
        <div className="flex gap-6 text-[13px]" style={{ color: "#8A8A8A", ...fontBody }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="px-6 md:px-12 pt-16 md:pt-24 pb-20" style={{ backgroundColor: PAPER }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div
            className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: ACCENT_DIM, color: ACCENT, ...fontBody }}
          >
            <Sparkles size={13} />
            Built for the Digital SAT
          </div>
          <h1
            className="text-[40px] md:text-[54px] font-bold leading-[1.08] mb-5"
            style={{ color: INK, ...fontDisplay }}
          >
            Study with precision.
            <br />
            Score with confidence.
          </h1>
          <p className="text-[16px] md:text-[17px] leading-relaxed mb-8 max-w-md" style={{ color: "#5A5A5A", ...fontBody }}>
            An adaptive SAT platform that learns how you learn — with AI tutoring, real mock exams, and analytics that actually tell you what to fix next.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              className="inline-flex items-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl text-white transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: ACCENT, ...fontBody }}
            >
              Start Learning <ArrowRight size={16} />
            </button>
            <button
              className="text-[15px] font-medium px-6 py-3 rounded-xl transition-colors hover:bg-gray-100"
              style={{ color: INK, border: `1px solid ${LINE}`, ...fontBody }}
            >
              Explore Courses
            </button>
          </div>
          <div className="flex items-center gap-2 text-[13px]" style={{ color: "#8A8A8A", ...fontBody }}>
            <CheckCircle2 size={15} style={{ color: ACCENT }} />
            No credit card required to start your diagnostic
          </div>
        </div>

        <Reveal delay={150}>
          <DashboardMock />
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div style={{ backgroundColor: PAPER, ...fontBody }} className="min-h-screen">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
