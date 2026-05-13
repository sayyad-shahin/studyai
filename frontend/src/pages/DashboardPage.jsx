import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

// ── Real date calculation ──────────────────────────────────────────────
const today    = new Date()
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

// Last 7 days ending today
const WEEK = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today)
  d.setDate(today.getDate() - (6 - i))
  return {
    label:   DAY_NAMES[d.getDay()],
    isToday: i === 6,
    isPast:  i < 6,
  }
})

// Which of the 7 days were "studied"
// 0=6days ago, 1=5days ago ... 5=yesterday, 6=today
const STUDIED = new Set([0, 1, 2, 4, 5, 6])
// Index 3 (4 days ago) was a missed day — change these to match reality

// ── Static demo data ───────────────────────────────────────────────────
const ACTIVITY = [
  { type:'tutor',   topic:"Newton's Laws of Motion",  time:'2 hours ago',  score:null, color:'#3b82f6' },
  { type:'quiz',    topic:'Organic Chemistry — 8/10',  time:'4 hours ago',  score:80,   color:'#10b981' },
  { type:'mindmap', topic:'World War II',               time:'Yesterday',    score:null, color:'#06b6d4' },
  { type:'quiz',    topic:'Integration — 6/10',         time:'2 days ago',   score:60,   color:'#f59e0b' },
  { type:'tutor',   topic:'Cell Division (Meiosis)',    time:'3 days ago',   score:null, color:'#7c3aed' },
]

const SUBJECTS = [
  { name:'Physics',     pct:78, color:'#3b82f6', sessions:12 },
  { name:'Chemistry',   pct:65, color:'#7c3aed', sessions:9  },
  { name:'Mathematics', pct:85, color:'#10b981', sessions:16 },
  { name:'Biology',     pct:45, color:'#f59e0b', sessions:6  },
]

const QUICK = [
  {
    label:'AI Tutor', sub:'Ask anything', path:'/tutor', color:'#3b82f6',
    iconPath:'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  },
  {
    label:'Quiz', sub:'Test yourself', path:'/quiz', color:'#10b981',
    iconPath:'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z',
  },
  {
    label:'Mind Map', sub:'Visualize topics', path:'/mindmap', color:'#06b6d4',
    iconPath:'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
  },
]

const TYPE_ICON = {
  tutor:   'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  quiz:    'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z',
  mindmap: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
}

function Icon({ path, size = 16, color = 'currentColor', stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={path}/>
    </svg>
  )
}

export default function DashboardPage() {
  // Calculate streak count dynamically
  const streakCount = [...STUDIED].filter(i => WEEK[i]).length

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Navbar />

      {/* Ambient bg */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'5%', right:'8%', width:450, height:450, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,.04) 0%,transparent 70%)' }}/>
      </div>

      <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'96px 20px 80px' }}>

        {/* ── Page header ── */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:36, flexWrap:'wrap', gap:20 }}>
          <div>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12.5, color:'var(--text-2)', marginBottom:12, textDecoration:'none', transition:'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
            >
              <Icon path="M19 12H5M12 5l-7 7 7 7" size={13} stroke={2.5}/>
              Home
            </Link>
            <h1 style={{ fontSize:30, fontWeight:700, color:'var(--text-0)', letterSpacing:'-.03em', marginBottom:4 }}>Dashboard</h1>
            <p style={{ color:'var(--text-2)', fontSize:13.5 }}>Track your learning progress and performance</p>
          </div>

          {/* Live streak badge */}
          <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:'var(--r-lg)', padding:'16px 28px', textAlign:'center', minWidth:120 }}>
            <div style={{ fontSize:34, fontWeight:800, color:'#f59e0b', letterSpacing:'-.03em', fontFamily:'var(--font)', lineHeight:1 }}>{streakCount}</div>
            <div style={{ fontSize:10, color:'rgba(245,158,11,.55)', fontFamily:'var(--mono)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.1em', marginTop:7 }}>day streak</div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:12, marginBottom:20 }}>
          {[
            { label:'Topics Studied', val:'47', color:'#3b82f6', iconPath:'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25' },
            { label:'Quizzes Taken',  val:'23', color:'#10b981', iconPath:'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z' },
            { label:'Avg. Score',     val:'74%', color:'#7c3aed', iconPath:'M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0' },
            { label:'Study Hours',    val:'38h', color:'#f59e0b', iconPath:'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
          ].map((s, i) => (
            <div key={i} style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'20px 22px', borderTop:`2px solid ${s.color}`, transition:'transform .18s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width:34, height:34, borderRadius:10, background:`${s.color}14`, border:`1px solid ${s.color}22`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                <Icon path={s.iconPath} size={16} color={s.color}/>
              </div>
              <div style={{ fontSize:28, fontWeight:700, color:s.color, letterSpacing:'-.03em', fontFamily:'var(--font)', lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:11.5, color:'var(--text-2)', marginTop:6, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Middle row ── */}
        <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:14, marginBottom:14 }}>

          {/* Subject progress */}
          <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'24px 26px' }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'var(--text-0)', letterSpacing:'-.02em', marginBottom:22 }}>Subject Progress</h2>
            {SUBJECTS.map((s, i) => (
              <div key={i} style={{ marginBottom:18 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:s.color, boxShadow:`0 0 6px ${s.color}60` }}/>
                    <span style={{ fontSize:13.5, color:'var(--text-1)', fontWeight:500 }}>{s.name}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                    <span style={{ fontSize:11.5, color:'var(--text-2)', fontFamily:'var(--mono)' }}>{s.sessions} sessions</span>
                    <span style={{ fontSize:13.5, fontWeight:700, color:s.color, fontFamily:'var(--mono)', minWidth:36, textAlign:'right' }}>{s.pct}%</span>
                  </div>
                </div>
                <div style={{ height:5, background:'var(--bg-3)', borderRadius:10, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${s.pct}%`, background:s.color, borderRadius:10, boxShadow:`0 0 10px ${s.color}50`, transition:'width 1.2s cubic-bezier(.22,1,.36,1)' }}/>
                </div>
              </div>
            ))}
          </div>

          {/* ── Weekly Streak — FIXED with real dates ── */}
          <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'24px 26px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:'var(--text-0)', letterSpacing:'-.02em' }}>Weekly Streak</h2>
              <span style={{ fontSize:11, color:'var(--text-2)', fontFamily:'var(--mono)' }}>
                Today: <span style={{ color:'#f59e0b', fontWeight:600 }}>{DAY_NAMES[today.getDay()]}</span>
              </span>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6, marginBottom:20 }}>
              {WEEK.map((day, i) => {
                const studied = STUDIED.has(i)
                const isToday = day.isToday
                return (
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{
                      width:'100%', aspectRatio:'1', borderRadius:8, marginBottom:8,
                      background: studied
                        ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                        : 'var(--bg-3)',
                      border: isToday
                        ? '2px solid rgba(245,158,11,0.8)'
                        : studied ? 'none' : '1px solid var(--border)',
                      boxShadow: isToday
                        ? '0 0 12px rgba(245,158,11,0.4)'
                        : studied ? '0 2px 8px rgba(245,158,11,0.3)' : 'none',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all .2s', position:'relative',
                    }}>
                      {studied && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                          stroke="#fff" strokeWidth="3" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                      {/* Today pulse ring */}
                      {isToday && !studied && (
                        <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(245,158,11,0.5)', animation:'pulse 2s ease-in-out infinite' }}/>
                      )}
                    </div>
                    <span style={{
                      fontSize:9.5,
                      color: isToday ? '#f59e0b' : studied ? 'var(--text-1)' : 'var(--text-3)',
                      fontFamily:'var(--mono)', fontWeight: isToday ? 700 : 600,
                      letterSpacing:'.02em',
                    }}>
                      {day.label}
                    </span>
                    {/* Today dot indicator below label */}
                    {isToday && (
                      <div style={{ width:4, height:4, borderRadius:'50%', background:'#f59e0b', margin:'3px auto 0' }}/>
                    )}
                  </div>
                )
              })}
            </div>

            <div style={{ padding:'14px 16px', background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.18)', borderRadius:'var(--r-md)' }}>
              <p style={{ fontWeight:700, color:'#f59e0b', fontSize:14, marginBottom:4 }}>{streakCount}-day streak active</p>
              <p style={{ fontSize:12, color:'rgba(245,158,11,.5)' }}>
                Today is {DAY_NAMES[today.getDay()]} — keep it going!
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:14 }}>

          {/* Quick start */}
          <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'22px 20px' }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'var(--text-0)', letterSpacing:'-.02em', marginBottom:16 }}>Quick Start</h2>
            {QUICK.map((ql, i) => (
              <Link key={i} to={ql.path} style={{ textDecoration:'none', display:'block', marginBottom:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'var(--r-md)', cursor:'pointer', transition:'all .18s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${ql.color}30`; e.currentTarget.style.background='var(--bg-3)'; e.currentTarget.style.transform='translateX(3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-2)'; e.currentTarget.style.transform='translateX(0)' }}
                >
                  <div style={{ width:36, height:36, borderRadius:10, background:`${ql.color}14`, border:`1px solid ${ql.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon path={ql.iconPath} size={16} color={ql.color}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13.5, color:'var(--text-0)', fontWeight:600, marginBottom:1 }}>{ql.label}</p>
                    <p style={{ fontSize:12, color:'var(--text-2)' }}>{ql.sub}</p>
                  </div>
                  <Icon path="M9 18l6-6-6-6" size={14} color="var(--text-3)" stroke={2.5}/>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent activity */}
          <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'22px 24px' }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'var(--text-0)', letterSpacing:'-.02em', marginBottom:16 }}>Recent Activity</h2>
            {ACTIVITY.map((act, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom: i < ACTIVITY.length-1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${act.color}12`, border:`1px solid ${act.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon path={TYPE_ICON[act.type]} size={15} color={act.color}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13.5, color:'var(--text-1)', fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom:2 }}>{act.topic}</p>
                  <p style={{ fontSize:11.5, color:'var(--text-2)', fontFamily:'var(--mono)' }}>{act.time}</p>
                </div>
                {act.score !== null && (
                  <div style={{ padding:'3px 10px', background: act.score>=70 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border:`1px solid ${act.score>=70 ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`, borderRadius:100, fontSize:12, fontWeight:700, fontFamily:'var(--mono)', color: act.score>=70 ? '#10b981' : '#f59e0b', flexShrink:0 }}>
                    {act.score}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}