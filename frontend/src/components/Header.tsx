import { useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  MessageSquareCode,
  User,
  History,
  Command,
  HelpCircle,
  Settings
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Determine dynamic page titles and greetings
  const getHeaderInfo = () => {
    switch (currentPath) {
      case '/dashboard':
        return {
          title: 'Overview',
          subtitle: 'Good Morning, Admin. Today\'s snapshot of system performance.'
        };
      case '/students':
        return {
          title: 'Student Directory',
          subtitle: 'View and manage all registered student profiles.'
        };
      case '/students/detail':
        return {
          title: 'Student Profile',
          subtitle: 'Detailed academic record and performance analysis.'
        };
      case '/staff':
        return {
          title: 'Staff Directory',
          subtitle: 'Manage teachers, instructors, and administrator logs.'
        };
      case '/academic':
        return {
          title: 'Academic Hub',
          subtitle: 'Configure courses, active curriculum terms, and class timetables.'
        };
      case '/fees':
        return {
          title: 'Fee Management',
          subtitle: 'Outstanding collections, billing statistics, and transaction ledgers.'
        };
      case '/portal':
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

  return (
    <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-8 z-30 shrink-0">
      {/* Page Title & Greeting */}
      <div className="flex flex-col">
        <h2 className="font-display-lg text-lg font-bold text-slate-900 tracking-tight leading-none">
          {headerInfo.title}
        </h2>
        <p className="font-body-sm text-xs text-slate-400 font-medium mt-1 select-none">
          {headerInfo.subtitle}
        </p>
      </div>

      {/* Global Controls */}
      <div className="flex items-center gap-6">
        {/* Sleek Search */}
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search console..."
            className="w-full pl-10 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/50 text-[9px] font-bold text-slate-400 border border-slate-200">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Messages */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all relative">
            <MessageSquareCode className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* History / Audit Log */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all">
            <History className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* User Account / Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition-all outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs shadow-sm shrink-0">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left mr-1.5">
              <span className="font-title-sm text-xs font-semibold text-slate-800 leading-tight">Admin User</span>
              <span className="font-body-sm text-[10px] text-slate-400 font-medium leading-none mt-0.5">Console Host</span>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Online Support
                </a>
                <hr className="my-1.5 border-slate-100" />
                <button
                  onClick={() => setShowProfileMenu(false)}
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
