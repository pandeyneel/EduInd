import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentDirectory from './pages/StudentDirectory';
import StaffDirectory from './pages/StaffDirectory';
import AcademicHub from './pages/AcademicHub';
import FeeManagement from './pages/FeeManagement';
import DetailedStudentProfile from './pages/DetailedStudentProfile';
import ParentStudentPortal from './pages/ParentStudentPortal';
import Layout from './components/Layout';

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/student-directory" element={<StudentDirectory />} />
          <Route path="/student-directory/detail" element={<DetailedStudentProfile />} />
          <Route path="/staff-directory" element={<StaffDirectory />} />
          <Route path="/academic-hub" element={<AcademicHub />} />
          <Route path="/fee-management" element={<FeeManagement />} />
          <Route path="/parent-portal" element={<ParentStudentPortal />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
