import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const API = 'https://studyai-backend-2ux9.onrender.com'

const PALETTE = ['#3b82f6','#7c3aed','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899','#84cc16']

const EXAMPLES = ['Photosynthesis','World War II',"Newton's Laws",'Cell Division','Trigonometry','Organic Chemistry']

function MindMap({ data }) {
  const [hov, setHov] = useState(null)
  const W = 920, H = 700, cx = W / 2, cy = H / 2

  const wrap = (label = '', max) => {
    const words = label.split(' ')
    const lines = []; let line = ''
    words.forEach(w => { if ((line + w).length > max) { lines.push(line.trim()); line = w + ' ' } else line += w + ' ' })
    if (line.trim()) lines.push(line.trim())
    return lines
  }

  const branches = data.branches || []
  const rootLines = wrap(data.topic, 13)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="rootGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
          <stop offset="100%" stopColor="rgba(124,58,237,0.12)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width={W} height={H} fill="#0d1018" rx={20} />

      {/* Dot grid */}
      {Array.from({ length: 14 }).map((_, r) =>
        Array.from({ length: 20 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 48 + 24} cy={r * 50 + 25} r={1} fill="rgba(255,255,255,0.03)" />
        ))
      )}

      {branches.map((branch, bi) => {
        const angle  = (2 * Math.PI * bi) / branches.length - Math.PI / 2
        const bx     = cx + 195 * Math.cos(angle)
        const by     = cy + 195 * Math.sin(angle)
        const color  = PALETTE[bi % PALETTE.length]
        const bLines = wrap(branch.topic, 10)
        const isHov  = hov === `b${bi}`
        const subs   = branch.subtopics || []

        return (
          <g key={bi}>
            {/* Root → branch connector */}
            <path
              d={`M ${cx} ${cy} Q ${(cx + bx) / 2 + (by - cy) * 0.1} ${(cy + by) / 2 + (bx - cx) * 0.1} ${bx} ${by}`}
              stroke={color} strokeWidth={isHov ? 2 : 1.5} strokeOpacity={isHov ? .6 : .25}
              fill="none" strokeDasharray={isHov ? 'none' : '5,4'}
            />

            {/* Subtopics */}
            {subs.map((sub, si) => {
              const spread = Math.PI / 2
              const sAngle = angle - spread / 2 + (spread / Math.max(1, subs.length - 1)) * si
              const sx     = bx + 130 * Math.cos(sAngle)
              const sy     = by + 130 * Math.sin(sAngle)
              const sLines = wrap(sub, 9)
              const isHovS = hov === `s${bi}-${si}`

              return (
                <g key={si}>
                  <line x1={bx} y1={by} x2={sx} y2={sy} stroke={color} strokeWidth={1} strokeOpacity={.2} strokeDasharray="3,3" />
                  <circle cx={sx} cy={sy} r={isHovS ? 32 : 29}
                    fill={`${color}10`} stroke={color}
                    strokeWidth={isHovS ? 1.5 : 1} strokeOpacity={isHovS ? .7 : .3}
                    style={{ cursor: 'pointer', transition: 'all .2s' }}
                    filter={isHovS ? 'url(#glow)' : 'none'}
                    onMouseEnter={() => setHov(`s${bi}-${si}`)}
                    onMouseLeave={() => setHov(null)}
                  />
                  {sLines.map((l, li) => (
                    <text key={li}
                      x={sx} y={sy + (li - (sLines.length - 1) / 2) * 11}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={color} fontSize={8.5}
                      fontFamily="Bricolage Grotesque, sans-serif" fontWeight={500}
                      style={{ pointerEvents: 'none' }}>
                      {l}
                    </text>
                  ))}
                </g>
              )
            })}

            {/* Branch node */}
            <circle cx={bx} cy={by} r={isHov ? 50 : 46}
              fill={`${color}14`} stroke={color}
              strokeWidth={isHov ? 2 : 1.5} strokeOpacity={isHov ? .9 : .45}
              style={{ cursor: 'pointer', transition: 'all .2s' }}
              filter={isHov ? 'url(#glow)' : 'none'}
              onMouseEnter={() => setHov(`b${bi}`)}
              onMouseLeave={() => setHov(null)}
            />
            {bLines.map((l, li) => (
              <text key={li}
                x={bx} y={by + (li - (bLines.length - 1) / 2) * 13}
                textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize={10.5}
                fontFamily="Bricolage Grotesque, sans-serif" fontWeight={700}
                style={{ pointerEvents: 'none' }}>
                {l}
              </text>
            ))}
          </g>
        )
      })}

      {/* Root node */}
      <circle cx={cx} cy={cy} r={68} fill="url(#rootGrad)" stroke="rgba(59,130,246,0.5)" strokeWidth={1.5} filter="url(#glow)" />
      <circle cx={cx} cy={cy} r={64} fill="rgba(13,16,24,0.6)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      {rootLines.map((l, li) => (
        <text key={li}
          x={cx} y={cy + (li - (rootLines.length - 1) / 2) * 16}
          textAnchor="middle" dominantBaseline="middle"
          fill="#f1f5f9" fontSize={13}
          fontFamily="Bricolage Grotesque, sans-serif" fontWeight={700}
          style={{ pointerEvents: 'none' }}>
          {l}
        </text>
      ))}
    </svg>
  )
}

export default function MindMapPage() {
  const [topic,   setTopic]   = useState('')
  const [mindMap, setMindMap] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const generate = async (t) => {
    const q = (t || topic).trim(); if (!q) return
    setLoading(true); setMindMap(null); setError('')
    try {
      const res  = await fetch(`${API}/mindmap`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic: q }) })
      const data = await res.json()
      if (!data.branches || !Array.isArray(data.branches)) throw new Error('Invalid response.')
      setMindMap(data)
    } catch (err) {
      setError(err.message?.includes('fetch') ? 'Cannot connect to backend. Ensure Flask is running on port 5000.' : err.message || 'Failed to generate mind map.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '12%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,.05) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '12%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.05) 0%,transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', padding: '96px 20px 80px' }}>

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text-2)', marginBottom: 20, textDecoration: 'none', transition: 'color .15s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to home
        </Link>

        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 10, fontFamily: 'var(--mono)' }}>Mind Maps</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.03em', marginBottom: 6 }}>Visualize any topic</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 14 }}>Transform dense subjects into structured visual knowledge maps</p>
        </div>

        {error && (
          <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 'var(--r-md)', color: '#fca5a5', fontSize: 13, display: 'flex', gap: 10 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            {error}
          </div>
        )}

        {/* Input */}
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '22px 24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()}
              placeholder="Enter any topic — e.g. Photosynthesis, French Revolution, Quantum Mechanics…"
              style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--border-md)', borderRadius: 'var(--r-md)', color: 'var(--text-0)', padding: '11px 14px', fontFamily: 'var(--font)', fontSize: 14, outline: 'none', minWidth: 220, transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,.4)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-md)'}
            />
            <button onClick={() => generate()} disabled={loading || !topic.trim()} style={{
              padding: '11px 22px', background: loading || !topic.trim() ? 'var(--bg-3)' : 'linear-gradient(135deg,#06b6d4,#3b82f6)',
              border: `1px solid ${loading || !topic.trim() ? 'var(--border)' : 'transparent'}`,
              borderRadius: 'var(--r-md)', color: loading || !topic.trim() ? 'var(--text-2)' : '#fff',
              fontSize: 14, fontWeight: 600, fontFamily: 'var(--font)', cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              boxShadow: loading || !topic.trim() ? 'none' : '0 4px 16px rgba(6,182,212,0.25)',
            }}>
              {loading
                ? <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />Generating…</>
                : <>Generate map <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
              }
            </button>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11.5, color: 'var(--text-2)', fontFamily: 'var(--mono)' }}>Try:</span>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => { setTopic(ex); generate(ex) }} disabled={loading} style={{ padding: '4px 11px', background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.18)', borderRadius: 100, color: 'rgba(34,211,238,.8)', fontSize: 12, fontFamily: 'var(--font)', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 500, transition: 'all .15s' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(6,182,212,0.14)' }}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(6,182,212,0.07)'}
              >{ex}</button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, border: '2px solid var(--border)', borderTopColor: 'var(--cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-2)', fontSize: 14, fontFamily: 'var(--mono)' }}>Constructing knowledge map…</p>
          </div>
        )}

        {/* Map */}
        {mindMap && !loading && (
          <div>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden', marginBottom: 16 }}>
              <MindMap data={mindMap} />
            </div>

            {/* Branch cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10, marginBottom: 16 }}>
              {mindMap.branches?.map((b, i) => (
                <div key={i} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderLeft: `2px solid ${PALETTE[i % PALETTE.length]}`, borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
                  <p style={{ color: PALETTE[i % PALETTE.length], fontWeight: 700, fontSize: 12.5, marginBottom: 8, letterSpacing: '-.01em' }}>{b.topic}</p>
                  {(b.subtopics || []).map((s, j) => (
                    <p key={j} style={{ color: 'var(--text-2)', fontSize: 12, marginBottom: 4, paddingLeft: 8, borderLeft: `1px solid ${PALETTE[i % PALETTE.length]}25` }}>
                      {s}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <button onClick={() => generate(mindMap.topic)} style={{ padding: '9px 20px', background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 'var(--r-sm)', color: 'rgba(34,211,238,.8)', fontSize: 13, fontFamily: 'var(--font)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 500, transition: 'all .15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(6,182,212,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(6,182,212,0.07)'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
              Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  )
}