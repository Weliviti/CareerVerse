import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Community from './pages/Community';
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
import TermsOfService from './pages/TermsOfService';
import ScrollToTop from './components/ScrollToTop';
import './App.css';
import { Toaster } from 'react-hot-toast';
import TeacherSimulation from './pages/TeacherSimulation';
import SimulationResults from './pages/SimulationResults';
import VerifyOTP from './pages/VerifyOTP';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

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
            path="/simulation/results"
            element={
              <ProtectedRoute>
                <SimulationResults />
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