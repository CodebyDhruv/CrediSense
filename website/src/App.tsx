import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Assessments from "./pages/Assessments"
import Assessment from "./pages/Assessment"
import Intelligence from "./pages/Intelligence"
import Settings from "./pages/Settings"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="assessments">
            <Route index element={<Assessments />} />
            <Route path="new" element={<Assessment />} />
          </Route>
          <Route path="intelligence" element={<Intelligence />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
