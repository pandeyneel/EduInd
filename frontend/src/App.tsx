import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentDirectory from './pages/StudentDirectory';
import StaffDirectory from './pages/StaffDirectory';
import AcademicHub from './pages/AcademicHub';
import FeeManagement from './pages/FeeManagement';
import DetailedStudentProfile from './pages/DetailedStudentProfile';
import ParentStudentPortal from './pages/ParentStudentPortal';
import Layout from './components/Layout';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import StudentDashboard from './pages/StudentDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute, RoleGuard } from './components/AuthGuard';

import './App.css';

// Root navigation router that redirects users according to active role session
const NavigateToDashboard = () => {
  const { user } = useAuth();
  if (user?.role === 'STUDENT') {
    return <Navigate to="/student/dashboard" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

function AppContent() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Central Guarded Sections */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        {/* 1. ADMIN ONLY CONSOLE */}
        <Route
          element={
            <RoleGuard allowedRoles={['ADMIN']}>
              <Layout>
                <Outlet />
              </Layout>
            </RoleGuard>
          }
        >
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/student-directory" element={<StudentDirectory />} />
          <Route path="/student-directory/detail" element={<DetailedStudentProfile />} />
          <Route path="/staff-directory" element={<StaffDirectory />} />
          <Route path="/academic-hub" element={<AcademicHub />} />
          <Route path="/fee-management" element={<FeeManagement />} />
          <Route path="/parent-portal" element={<ParentStudentPortal />} />
        </Route>

        {/* 2. STUDENT ONLY CONSOLE */}
        <Route
          element={
            <RoleGuard allowedRoles={['STUDENT']}>
              <Layout>
                <Outlet />
              </Layout>
            </RoleGuard>
          }
        >
          <Route path="/student/dashboard" element={<StudentDashboard activeTab="dashboard" />} />
          <Route path="/student/courses" element={<StudentDashboard activeTab="courses" />} />
          <Route path="/student/attendance" element={<StudentDashboard activeTab="attendance" />} />
          <Route path="/student/fees" element={<StudentDashboard activeTab="fees" />} />
          <Route path="/student/reports" element={<StudentDashboard activeTab="reports" />} />
          <Route path="/student/profile" element={<StudentDashboard activeTab="profile" />} />
        </Route>

        {/* Dynamic Route Redirection Helpers */}
        <Route path="/" element={<NavigateToDashboard />} />
        <Route path="*" element={<NavigateToDashboard />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
