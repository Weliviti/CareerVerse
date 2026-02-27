import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import OurTeam from './pages/OurTeam';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import SimulationHub from './pages/SimulationHub';
import SimulationPlayer from './pages/SimulationPlayer';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import AIEvaluationLogs from './pages/admin/AIEvaluationLogs';
import SimulationLogs from './pages/admin/SimulationLogs';
import Settings from './pages/admin/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';
import { Toaster } from 'react-hot-toast';
import TeacherSimulation from './pages/TeacherSimulation';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route
            path="/simulation-hub"
            element={
              <ProtectedRoute>
                <SimulationHub />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulation/play/:type"
            element={
              <ProtectedRoute>
                <SimulationPlayer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher-simulation"
            element={
              <TeacherSimulation />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/logs/ai"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AIEvaluationLogs />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/logs/simulations"
            element={
              <AdminRoute>
                <AdminLayout>
                  <SimulationLogs />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* 404 - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;