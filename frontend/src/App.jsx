import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AiTutorPage from './pages/AiTutorPage'
import QuizPage from './pages/QuizPage'
import MindMapPage from './pages/MindMapPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutor" element={<AiTutorPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/mindmap" element={<MindMapPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App