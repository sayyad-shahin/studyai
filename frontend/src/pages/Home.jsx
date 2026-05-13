import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const FEATURES = [
  {
    icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
    title: 'AI Tutor',
    tag: 'Most Popular',
    desc: 'Deep concept explanations across Physics, Chemistry, Mathematics, Biology. Conversational, patient, and adaptive to your level.',
    accent: '#3b82f6',
    path: '/tutor',
  },
  {
    icon: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
    title: 'Mind Maps',
    tag: 'Visual Learning',
    desc: 'Transform complex topics into structured visual knowledge maps. See connections, not just facts.',
    accent: '#06b6d4',
    path: '/mindmap',
  },
  {
    icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z',
    title: 'Quiz Engine',
    tag: 'Test Yourself',
    desc: 'AI-generated MCQs, JEE-level problems, and NEET-style questions with step-by-step explanations.',
    accent: '#10b981',
    path: '/quiz',
  },
  {
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
    title: 'Analytics',
    tag: 'Track Progress',
    desc: 'Study streaks, subject-wise performance, quiz scores, and learning velocity — all in one place.',
    accent: '#f59e0b',
    path: '/dashboard',
  },
]

const STATS = [
  { val: '50K+',  label: 'Active Students' },
  { val: '10M+',  label: 'Questions Answered' },
  { val: '4.9',   label: 'Average Rating' },
  { val: '98%',   label: 'Success Rate' },
]

const SUBJECTS = ['Physics','Chemistry','Mathematics','Biology','History','Geography','English','Computer Science','Economics','Political Science','Organic Chemistry','Thermodynamics']

export default function Home() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]') || []
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(22px)'
      setTimeout(() => {
        el.style.transition = 'opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, i * 90 + 80)
    })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      <Navbar />

      {/* Ambient bg */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)', filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', top: '25%', right: '-5%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)', filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)', filter: 'blur(1px)' }} />
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)' }} />
      </div>

      {/* Hero */}
      <section ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '148px 28px 100px', textAlign: 'center' }}>

        <div data-reveal style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 8px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 100, marginBottom: 36 }}>
          <span style={{ padding: '2px 8px', background: 'var(--blue)', borderRadius: 100, fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '.06em', textTransform: 'uppercase' }}>New</span>
          <span style={{ fontSize: 12.5, color: 'rgba(147,197,253,.9)', fontWeight: 500 }}>Built for Maharashtra Board, JEE &amp; NEET students</span>
        </div>

        <h1 data-reveal style={{ fontFamily: 'var(--font)', fontSize: 'clamp(44px, 7.5vw, 92px)', fontWeight: 700, lineHeight: .98, letterSpacing: '-.04em', color: 'var(--text-0)', marginBottom: 0 }}>
          The AI study<br />
          <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 45%, #34d399 100%)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'gradient-x 5s ease infinite' }}>
            partner you need.
          </span>
        </h1>

        <p data-reveal style={{ marginTop: 28, fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--text-1)', maxWidth: 520, margin: '28px auto 0', lineHeight: 1.75 }}>
          Concept explanations, adaptive quizzes, visual mind maps, and deep progress analytics — powered by Groq AI.
        </p>

        <div data-reveal style={{ marginTop: 44, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/tutor">
            <button style={{
              padding: '13px 28px', borderRadius: 'var(--r-md)',
              background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
              border: 'none', color: '#fff', fontSize: 14.5, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '-.01em',
              boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 8px 32px rgba(59,130,246,0.3)',
              transition: 'transform .18s, box-shadow .18s',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.1) inset, 0 12px 40px rgba(59,130,246,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.1) inset, 0 8px 32px rgba(59,130,246,0.3)' }}
            >
              Start learning free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </Link>
          <Link to="/quiz">
            <button style={{
              padding: '13px 28px', borderRadius: 'var(--r-md)',
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-md)',
              color: 'var(--text-1)', fontSize: 14.5, fontWeight: 500,
              cursor: 'pointer', letterSpacing: '-.01em', transition: 'all .18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text-0)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-1)' }}
            >
              Take a sample quiz
            </button>
          </Link>
        </div>

        {/* Subject tags */}
        <div data-reveal style={{ marginTop: 60, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 680, margin: '60px auto 0' }}>
          {SUBJECTS.map(s => (
            <span key={s} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 100, fontSize: 11.5, color: 'var(--text-3)', letterSpacing: '-.005em', fontWeight: 500 }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-1)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font)', fontSize: 36, fontWeight: 700, letterSpacing: '-.04em', background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6, fontWeight: 500, letterSpacing: '.02em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 28px 120px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>Platform Features</p>
          <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.03em', lineHeight: 1.1 }}>
            Everything to ace<br /><span style={{ color: 'var(--text-2)' }}>your examinations</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <Link key={i} to={f.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-1)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', padding: '28px 28px 24px',
                cursor: 'pointer', transition: 'border-color .2s, transform .2s, box-shadow .2s',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,.4), 0 0 0 1px ${f.accent}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 28, right: 28, height: 1, background: `linear-gradient(90deg, transparent, ${f.accent}60, transparent)` }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: `${f.accent}14`, border: `1px solid ${f.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={f.icon}/>
                    </svg>
                  </div>
                  <span style={{ padding: '3px 10px', background: `${f.accent}12`, border: `1px solid ${f.accent}22`, borderRadius: 100, fontSize: 10.5, fontWeight: 600, color: f.accent, letterSpacing: '.04em', textTransform: 'uppercase' }}>{f.tag}</span>
                </div>

                <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.02em', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.7, marginBottom: 24 }}>{f.desc}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: f.accent }}>
                  Explore
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 28px 120px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(124,58,237,0.08) 50%, rgba(6,182,212,0.06) 100%)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-xl)',
          padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '48px 48px', borderRadius: 'var(--r-xl)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.03em', marginBottom: 16 }}>Ready to transform how you study?</h2>
            <p style={{ fontSize: 15, color: 'var(--text-1)', marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>Join 50,000+ students who use StudyAI to crack JEE, NEET, and Maharashtra Board exams.</p>
            <Link to="/tutor">
              <button style={{
                padding: '13px 32px', borderRadius: 'var(--r-md)',
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                border: 'none', color: '#fff', fontSize: 14.5, fontWeight: 600,
                cursor: 'pointer', boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
                transition: 'transform .18s', letterSpacing: '-.01em',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Get started — it's free
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', padding: '28px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: 12.5, color: 'var(--text-3)' }}>© 2026 StudyAI — Designed for Maharashtra Board, JEE, NEET &amp; Engineering students</p>
      </footer>
    </div>
  )
}