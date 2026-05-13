import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const API = 'http://127.0.0.1:5000'
const SUBJECTS    = ['Physics','Chemistry','Mathematics','Biology','History','Geography','Computer Science','Economics']
const DIFFICULTIES = ['Easy','Medium','Hard','JEE Level','NEET Level']

function optStyle(qIdx, oIdx, correct, answers, submitted) {
  const base = {
    width: '100%', padding: '12px 16px', marginBottom: 8, textAlign: 'left',
    borderRadius: 'var(--r-md)', fontSize: 14, fontFamily: 'var(--font)',
    cursor: submitted ? 'default' : 'pointer', transition: 'all .15s',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
    border: '1px solid var(--border)', background: 'var(--bg-2)', color: 'var(--text-1)',
  }
  if (!submitted) return answers[qIdx] === oIdx ? { ...base, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.35)', color: 'var(--text-0)' } : base
  if (oIdx === correct) return { ...base, background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.35)', color: '#6ee7b7' }
  if (answers[qIdx] === oIdx) return { ...base, background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }
  return { ...base, opacity: .35 }
}

export default function QuizPage() {
  const [topic,      setTopic]      = useState('')
  const [subject,    setSubject]    = useState('Physics')
  const [difficulty, setDifficulty] = useState('Medium')
  const [numQ,       setNumQ]       = useState(5)
  const [quiz,       setQuiz]       = useState(null)
  const [loading,    setLoading]    = useState(false)
  const [answers,    setAnswers]    = useState({})
  const [submitted,  setSubmitted]  = useState(false)
  const [score,      setScore]      = useState(0)
  const [error,      setError]      = useState('')

  const generate = async () => {
    if (!topic.trim()) return
    setLoading(true); setQuiz(null); setAnswers({}); setSubmitted(false); setError('')
    try {
      const res  = await fetch(`${API}/quiz`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic, subject, difficulty, num_questions: numQ }) })
      const data = await res.json()
      if (!data.questions || !Array.isArray(data.questions)) throw new Error('Invalid response. Please try again.')
      setQuiz(data)
    } catch (err) {
      setError(err.message?.includes('fetch') ? 'Cannot connect to backend. Ensure Flask is running on port 5000.' : err.message || 'Failed to generate quiz.')
    } finally { setLoading(false) }
  }

  const submit = () => {
    let c = 0; quiz.questions.forEach((q, i) => { if (answers[i] === q.correct) c++ })
    setScore(c); setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => { setQuiz(null); setAnswers({}); setSubmitted(false); setScore(0); setTopic(''); setError('') }

  const pct      = quiz ? Math.round((score / quiz.questions.length) * 100) : 0
  const answered = Object.keys(answers).length

  const scoreColor = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
  const scoreBg    = pct >= 70 ? 'rgba(16,185,129,0.07)' : pct >= 40 ? 'rgba(245,158,11,0.07)' : 'rgba(239,68,68,0.07)'
  const scoreBorder= pct >= 70 ? 'rgba(16,185,129,0.25)' : pct >= 40 ? 'rgba(245,158,11,0.25)' : 'rgba(239,68,68,0.25)'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '8%', left: '0%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,.05) 0%,transparent 70%)', filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '0%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,.05) 0%,transparent 70%)', filter: 'blur(1px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto', padding: '96px 20px 80px' }}>

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text-2)', marginBottom: 20, textDecoration: 'none', transition: 'color .15s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to home
        </Link>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 10, fontFamily: 'var(--mono)' }}>Quiz Engine</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.03em', marginBottom: 6 }}>Generate a quiz</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 14 }}>AI-generated MCQs via Groq · Llama 3.3 70B</p>
        </div>

        {error && (
          <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 'var(--r-md)', color: '#fca5a5', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            {error}
          </div>
        )}

        {/* Score card */}
        {submitted && (
          <div style={{ background: scoreBg, border: `1px solid ${scoreBorder}`, borderRadius: 'var(--r-xl)', padding: '32px 36px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font)', fontSize: 64, fontWeight: 700, color: scoreColor, letterSpacing: '-.04em', lineHeight: 1 }}>{pct}<span style={{ fontSize: 28 }}>%</span></div>
              <p style={{ color: 'var(--text-1)', fontSize: 14, marginTop: 8 }}>
                {score} of {quiz.questions.length} correct &nbsp;·&nbsp; {pct >= 70 ? 'Excellent work' : pct >= 40 ? 'Good effort' : 'Keep practicing'}
              </p>
            </div>
            <button onClick={reset} style={{ padding: '11px 24px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', border: 'none', borderRadius: 'var(--r-md)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }}>
              New quiz
            </button>
          </div>
        )}

        {/* Generator */}
        {!quiz && (
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '28px 28px', marginBottom: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
              {[
                { label: 'Subject', val: subject, set: setSubject, opts: SUBJECTS },
                { label: 'Difficulty', val: difficulty, set: setDifficulty, opts: DIFFICULTIES },
              ].map(({ label, val, set, opts }) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: 11, color: 'var(--text-2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 7, fontFamily: 'var(--mono)' }}>{label}</label>
                  <select value={val} onChange={e => set(e.target.value)} style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--border-md)', borderRadius: 'var(--r-sm)', color: 'var(--text-1)', padding: '10px 12px', fontFamily: 'var(--font)', fontSize: 13.5, outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                    {opts.map(o => <option key={o} value={o} style={{ background: '#111520' }}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10, fontFamily: 'var(--mono)' }}>
                <span>Questions</span>
                <span style={{ color: 'var(--emerald)', fontSize: 13 }}>{numQ}</span>
              </label>
              <input type="range" min={3} max={10} value={numQ} onChange={e => setNumQ(+e.target.value)} style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 7, fontFamily: 'var(--mono)' }}>Topic / Chapter</label>
              <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()}
                placeholder="e.g. Laws of Motion, Organic Chemistry, Integration…"
                style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--border-md)', borderRadius: 'var(--r-md)', color: 'var(--text-0)', padding: '11px 14px', fontFamily: 'var(--font)', fontSize: 14, outline: 'none', transition: 'border-color .15s' }}
                onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,.4)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-md)'}
              />
            </div>

            <button onClick={generate} disabled={loading || !topic.trim()} style={{
              width: '100%', padding: '13px', borderRadius: 'var(--r-md)',
              background: loading || !topic.trim() ? 'var(--bg-3)' : 'linear-gradient(135deg, #10b981, #06b6d4)',
              border: `1px solid ${loading || !topic.trim() ? 'var(--border)' : 'transparent'}`,
              color: loading || !topic.trim() ? 'var(--text-2)' : '#fff',
              fontSize: 14.5, fontWeight: 600, fontFamily: 'var(--font)',
              cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer',
              boxShadow: loading || !topic.trim() ? 'none' : '0 4px 20px rgba(16,185,129,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: '-.01em',
            }}>
              {loading
                ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} /> Generating questions…</>
                : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Generate {numQ} questions</>
              }
            </button>
          </div>
        )}

        {/* Questions */}
        {quiz && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-.02em' }}>{quiz.title}</h2>
              {!submitted && <button onClick={reset} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-2)', padding: '6px 14px', fontFamily: 'var(--font)', fontSize: 12.5, cursor: 'pointer' }}>New quiz</button>}
            </div>

            {quiz.questions.map((q, qi) => (
              <div key={qi} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '22px 24px', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)', color: '#fff', width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--mono)' }}>{qi + 1}</span>
                  <p style={{ color: 'var(--text-0)', fontSize: 14.5, lineHeight: 1.65, fontWeight: 500 }}>{q.question}</p>
                </div>
                <div>
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => !submitted && setAnswers(p => ({ ...p, [qi]: oi }))} style={optStyle(qi, oi, q.correct, answers, submitted)}>
                      <span style={{ flex: 1, textAlign: 'left' }}>{opt}</span>
                      {submitted && oi === q.correct && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}
                      {submitted && answers[qi] === oi && oi !== q.correct && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>}
                    </button>
                  ))}
                </div>
                {submitted && (
                  <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: 'var(--r-sm)' }}>
                    <span style={{ fontSize: 10.5, color: 'var(--blue)', fontWeight: 700, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Explanation — </span>
                    <span style={{ fontSize: 13, color: 'var(--text-1)' }}>{q.explanation}</span>
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <button onClick={submit} disabled={answered < quiz.questions.length} style={{
                width: '100%', padding: '13px', background: answered < quiz.questions.length ? 'var(--bg-2)' : 'linear-gradient(135deg,#10b981,#06b6d4)',
                border: `1px solid ${answered < quiz.questions.length ? 'var(--border)' : 'transparent'}`,
                borderRadius: 'var(--r-md)', color: answered < quiz.questions.length ? 'var(--text-2)' : '#fff',
                fontSize: 14.5, fontWeight: 600, fontFamily: 'var(--font)',
                cursor: answered < quiz.questions.length ? 'not-allowed' : 'pointer',
                marginTop: 8, transition: 'all .18s',
                boxShadow: answered < quiz.questions.length ? 'none' : '0 4px 20px rgba(16,185,129,0.25)',
              }}>
                Submit quiz &nbsp;({answered}/{quiz.questions.length} answered)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}