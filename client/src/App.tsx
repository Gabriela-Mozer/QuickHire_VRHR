import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"
import { JobDetails } from "./pages/JobDetails"
import { Applications } from "./pages/Applications"
import { CvUpload } from "./pages/CvUpload"
import { MatchAnalysis } from "./pages/MatchAnalysis"
import { Interview } from "./pages/Interview"
import { ReverseRecruitment } from "./pages/ReverseRecruitment"
import { InterviewComplete } from "./pages/InterviewComplete"

function App() {
  return (
  <AuthProvider>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute> <Layout><Home /></Layout> </ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute> <Layout><Applications /></Layout> </ProtectedRoute>} />
          <Route path="/job/:jobId" element={<ProtectedRoute> <Layout><JobDetails /></Layout> </ProtectedRoute>} />
          <Route path="/job/:jobId/apply" element={<ProtectedRoute> <Layout><CvUpload /></Layout> </ProtectedRoute>} />
          <Route path="/job/:jobId/match" element={<ProtectedRoute> <Layout><MatchAnalysis /></Layout> </ProtectedRoute>} />
          <Route path="/job/:jobId/interview" element={<ProtectedRoute> <Layout><Interview /></Layout> </ProtectedRoute>} />
          <Route path="/job/:jobId/reverse-recruitment" element={<ProtectedRoute> <Layout><ReverseRecruitment /></Layout> </ProtectedRoute>} />
          <Route path="/job/:jobId/complete" element={<ProtectedRoute> <Layout><InterviewComplete /></Layout> </ProtectedRoute>} />
          <Route path="*" element={<BlankPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  </AuthProvider>
  )
}

export default App