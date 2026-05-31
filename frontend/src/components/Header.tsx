import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Bell,
  MessageSquareCode,
  User,
  History,
  Command,
  HelpCircle,
  Settings,
  Menu
} from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Determine dynamic page titles and greetings
  const getHeaderInfo = () => {
    const name = user ? user.name : 'User';
    
    switch (currentPath) {
      case '/dashboard':
        return {
          title: 'Overview',
          subtitle: `Good Morning, Admin. Today's snapshot of system performance.`
        };
      case '/student/dashboard':
        return {
          title: 'Student Hub',
          subtitle: `Good Morning, ${name}. Here is your academic overview.`
        };
      case '/student/courses':
        return {
          title: 'My Courses',
          subtitle: 'Monitor active curriculum topics, teachers, and current marks.'
        };
      case '/student/attendance':
        return {
          title: 'My Attendance',
          subtitle: 'Review comprehensive classroom registries and attendance logs.'
        };
      case '/student/fees':
        return {
          title: 'Fee Statement',
          subtitle: 'View transaction ledgers, itemized tuition statements, and paid invoices.'
        };
      case '/student/reports':
        return {
          title: 'Academic Reports',
          subtitle: 'Inspect teacher comments, term reviews, and overall grade points.'
        };
      case '/student/profile':
        return {
          title: 'My Profile',
          subtitle: 'Update contact details, manage avatars, and verify residential listings.'
        };
      case '/student-directory':
        return {
          title: 'Student Directory',
          subtitle: 'View and manage all registered student profiles.'
        };
      case '/student-directory/detail':
        return {
          title: 'Student Profile',
          subtitle: 'Detailed academic record and performance analysis.'
        };
      case '/staff-directory':
        return {
          title: 'Staff Directory',
          subtitle: 'Manage teachers, instructors, and administrator logs.'
        };
      case '/academic-hub':
        return {
          title: 'Academic Hub',
          subtitle: 'Configure courses, active curriculum terms, and class timetables.'
        };
      case '/fee-management':
        return {
          title: 'Fee Management',
          subtitle: 'Outstanding collections, billing statistics, and transaction ledgers.'
        };
      case '/parent-portal':
        return {
          title: 'Parent Portal',
          subtitle: 'Academic checkups, homework deadlines, and classroom notices.'
        };
      default:
        return {
          title: 'EduInd Console',
          subtitle: 'Welcome to your smart educational dashboard.'
        };
    }
  };

  const headerInfo = getHeaderInfo();

  const handleSignOut = () => {
    setShowProfileMenu(false);
    logout();
    navigate('/login');
  };

  // Determine avatar initials
  const getInitials = () => {
    if (!user) return 'US';
    const parts = user.name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-8 z-30 shrink-0">
      {/* Page Title & Hamburger Grid */}
      <div className="flex items-center gap-3">
        {/* Responsive Hamburger Toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/85 rounded-xl transition-all outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h2 className="font-display-lg text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
            {headerInfo.title}
          </h2>
          <p className="font-body-sm text-[10px] sm:text-xs text-slate-400 font-medium mt-1 select-none hidden sm:block">
            {headerInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Global Controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Sleek Search */}
        <div className="relative w-48 xl:w-64 hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search console..."
            className="w-full pl-10 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/50 text-[9px] font-bold text-slate-400 border border-slate-200 select-none pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Messages */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all relative">
            <MessageSquareCode className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-50 rounded-full ring-2 ring-white"></span>
          </button>

          {/* History / Audit Log */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all hidden sm:flex">
            <History className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* User Account / Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition-all outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs shadow-sm shrink-0 uppercase">
              {getInitials()}
            </div>
            <div className="hidden md:flex flex-col text-left mr-1.5">
              <span className="font-title-sm text-xs font-semibold text-slate-800 leading-tight">
                {user ? user.name : 'Console User'}
              </span>
              <span className="font-body-sm text-[10px] text-slate-400 font-semibold leading-none mt-0.5 uppercase">
                {user ? user.role : 'GUEST'}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {user?.role === 'STUDENT' ? (
                  <button
                    onClick={() => { setShowProfileMenu(false); navigate('/student/profile'); }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </button>
                ) : (
                  <>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Global Settings
                    </a>
                  </>
                )}
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Online Support
                </a>
                <hr className="my-1.5 border-slate-100" />
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 flex items-center gap-2"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
