import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentDirectory from './pages/StudentDirectory';
import StaffDirectory from './pages/StaffDirectory';
import AcademicHub from './pages/AcademicHub';
import FeeManagement from './pages/FeeManagement';
import DetailedStudentProfile from './pages/DetailedStudentProfile';
import ParentStudentPortal from './pages/ParentStudentPortal';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/students" element={<StudentDirectory />} />
        <Route path="/students/detail" element={<DetailedStudentProfile />} />
        <Route path="/staff" element={<StaffDirectory />} />
        <Route path="/academic" element={<AcademicHub />} />
        <Route path="/fees" element={<FeeManagement />} />
        <Route path="/portal" element={<ParentStudentPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
