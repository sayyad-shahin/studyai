import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const API = 'http://127.0.0.1:5000'

const EXAMPLES = [
  "Explain Newton's Laws of Motion with examples",
  "How does photosynthesis work step by step?",
  "Derive the quadratic formula",
  "Explain DNA replication in detail",
]

const SUBJECTS = ['Physics','Chemistry','Mathematics','Biology','History','Computer Science','Geography','Economics']

function fmt(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#93c5fd;font-weight:600">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:#cbd5e1">$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(59,130,246,0.15);color:#93c5fd;padding:2px 7px;border-radius:5px;font-family:var(--mono);font-size:.85em">$1</code>')
    .replace(/^### (.*$)/gim, '<h3 style="font-size:15px;font-weight:600;color:#f1f5f9;margin:18px 0 6px;letter-spacing:-.01em">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size:17px;font-weight:700;color:#f1f5f9;margin:22px 0 8px;letter-spacing:-.02em">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size:20px;font-weight:700;color:#f1f5f9;margin:24px 0 10px;letter-spacing:-.03em">$1</h1>')
    .replace(/^\- (.*$)/gim, '<li style="margin-bottom:5px;color:#94a3b8;padding-left:4px">$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 20, animation: 'fade-in .3s ease' }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: 12, alignSelf: 'flex-start', marginTop: 2,
          boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '76%',
        padding: isUser ? '11px 16px' : '16px 20px',
        background: isUser
          ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(124,58,237,0.15))'
          : 'var(--bg-2)',
        border: isUser ? '1px solid rgba(59,130,246,0.25)' : '1px solid var(--border)',
        borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
      }}>
        {!isUser && (
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'var(--mono)' }}>STUDYAI</p>
        )}
        <div className="prose" style={{ fontSize: 14.5, lineHeight: 1.8, color: isUser ? '#cbd5e1' : '#94a3b8' }}
          dangerouslySetInnerHTML={{ __html: fmt(msg.content) }} />
      </div>
    </div>
  )
}

function Thinking() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', marginBottom: 16 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', animation: 'bounce-dot 1.3s ease infinite', animationDelay: `${i * .18}s` }} />
        ))}
        <span style={{ fontSize: 12, color: 'var(--text-2)', marginLeft: 6, fontFamily: 'var(--mono)' }}>generating response…</span>
      </div>
    </div>
  )
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hello. I'm your AI Tutor — trained for Indian curriculum including Maharashtra Board, JEE, and NEET.\n\nAsk me any concept, derivation, or problem. I'll explain it clearly with examples.",
  }])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('Physics')
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const send = async (text) => {
    const q = (text || input).trim()
    if (!q || loading) return
    const updated = [...messages, { role: 'user', content: q }]
    setMessages(updated)
    setInput('')
    setLoading(true)
    try {
      const res  = await fetch(`${API}/explain`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic: q, subject, history: updated }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error || 'No response received.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Cannot connect to backend. Please ensure `python app.py` is running on port 5000.' }])
    } finally { setLoading(false) }
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, width: '100%', margin: '0 auto', padding: '88px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, height: '100vh' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text-2)', textDecoration: 'none', transition: 'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Home
            </Link>
            <span style={{ color: 'var(--border-md)', fontSize: 12 }}>|</span>
            <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.02em', margin: 0 }}>AI Tutor</h1>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{
              background: 'var(--bg-2)', border: '1px solid var(--border-md)',
              borderRadius: 'var(--r-sm)', color: 'var(--text-1)',
              padding: '7px 12px', fontFamily: 'var(--font)', fontSize: 13,
              cursor: 'pointer', outline: 'none', appearance: 'none',
            }}>
              {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#111520' }}>{s}</option>)}
            </select>
            <button onClick={() => setMessages([{ role: 'assistant', content: 'Conversation cleared. Ask me a new topic.' }])} style={{ padding: '7px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-2)', fontSize: 12.5, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'border-color .15s, color .15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.color = 'var(--text-1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
            >Clear chat</button>
          </div>
        </div>

        {/* Example chips */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 }}>
          {EXAMPLES.map((t, i) => (
            <button key={i} onClick={() => send(t)} disabled={loading} style={{
              padding: '5px 12px', background: 'rgba(59,130,246,0.07)',
              border: '1px solid rgba(59,130,246,0.18)', borderRadius: 100,
              color: 'rgba(147,197,253,.8)', fontSize: 12, fontFamily: 'var(--font)',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .15s', fontWeight: 500,
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'rgba(59,130,246,0.14)'; e.currentTarget.style.color = '#93c5fd' }}}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.07)'; e.currentTarget.style.color = 'rgba(147,197,253,.8)' }}
            >{t}</button>
          ))}
        </div>

        {/* Status bar */}
        <div style={{ marginBottom: 12, padding: '7px 14px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 'var(--r-sm)', fontSize: 11.5, color: 'rgba(110,231,183,.7)', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s ease-in-out infinite' }} />
          Backend: Flask + Groq (Llama 3.3 70B) — run <code style={{ background: 'rgba(255,255,255,.06)', padding: '1px 5px', borderRadius: 4 }}>python app.py</code> in /backend
        </div>

        {/* Chat window */}
        <div style={{
          flex: 1, background: 'var(--bg-1)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-xl)', padding: '20px 20px 8px',
          overflowY: 'auto', marginBottom: 12,
          minHeight: 0,
        }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {loading && <Thinking />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          background: 'var(--bg-1)', border: '1px solid var(--border-md)',
          borderRadius: 'var(--r-xl)', padding: '12px 14px',
          display: 'flex', gap: 10, alignItems: 'flex-end',
          transition: 'border-color .2s',
        }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
        >
          <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Ask any topic — e.g. Explain Faraday's law of electromagnetic induction"
            rows={2} style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-0)', fontSize: 14, fontFamily: 'var(--font)',
              resize: 'none', lineHeight: 1.6, paddingTop: 2,
            }}
          />
          <button onClick={() => send()} disabled={loading || !input.trim()} style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: loading || !input.trim() ? 'var(--bg-3)' : 'linear-gradient(135deg, #3b82f6, #7c3aed)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            transition: 'all .18s',
            boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(59,130,246,0.3)',
          }}>
            {loading
              ? <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            }
          </button>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 11, fontFamily: 'var(--mono)', marginTop: 8 }}>Enter to send &nbsp;·&nbsp; Shift+Enter for new line</p>
      </div>
    </div>
  )
}