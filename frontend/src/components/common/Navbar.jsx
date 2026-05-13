import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'Tutor',     path: '/tutor',     icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25' },
  { label: 'Quiz',      path: '/quiz',       icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z' },
  { label: 'Mind Map',  path: '/mindmap',    icon: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' },
  { label: 'Dashboard', path: '/dashboard',  icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      transition: 'background .3s, border-color .3s',
      background: scrolled ? 'rgba(8,10,15,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <nav style={{ maxWidth: 1320, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(59,130,246,0.3)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 17, color: 'var(--text-0)', letterSpacing: '-.02em' }}>
            Study<span style={{ color: 'var(--blue)' }}>AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV.map(({ label, path, icon }) => {
            const active = location.pathname === path
            return (
              <Link key={path} to={path} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 14px', borderRadius: 'var(--r-md)',
                fontSize: 13.5, fontWeight: 500, letterSpacing: '-.01em',
                color: active ? 'var(--text-0)' : 'var(--text-2)',
                background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                border: active ? '1px solid var(--border-md)' : '1px solid transparent',
                transition: 'all .18s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.background = 'transparent' }}}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon}/>
                </svg>
                {label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/tutor" style={{ textDecoration: 'none' }} className="desktop-nav">
            <button style={{
              padding: '8px 18px', borderRadius: 'var(--r-md)',
              background: 'linear-gradient(135deg, var(--blue), var(--violet))',
              border: 'none', color: '#fff', fontSize: 13.5, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '-.01em',
              boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset, 0 4px 16px rgba(59,130,246,0.25)',
              transition: 'opacity .18s, transform .18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Start for free
            </button>
          </Link>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(o => !o)} className="mobile-btn" style={{
            display: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-sm)', padding: '7px', cursor: 'pointer', color: 'var(--text-1)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen
                ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(8,10,15,0.97)', backdropFilter: 'blur(24px)',
          borderTop: '1px solid var(--border)', padding: '12px 28px 24px',
        }}>
          {NAV.map(({ label, path, icon }) => (
            <Link key={path} to={path} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '13px 0', textDecoration: 'none',
              color: location.pathname === path ? 'var(--blue)' : 'var(--text-1)',
              fontSize: 15, fontWeight: 500,
              borderBottom: '1px solid var(--border)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon}/>
              </svg>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:860px){
          .desktop-nav{display:none!important}
          .mobile-btn{display:flex!important}
        }
      `}</style>
    </header>
  )
}