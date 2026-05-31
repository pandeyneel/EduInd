import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  CalendarCheck,
  IdCard,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronRight,
  LogOut,
  X,
  User
} from 'lucide-react';

interface MenuItem {
  name: string;
  icon: any;
  path: string;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'danger';
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const role = user?.role || 'ADMIN';

  const getMenuItems = (): MenuItem[] => {
    if (role === 'STUDENT') {
      return [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
        { name: 'My Courses', icon: BookOpen, path: '/student/courses' },
        { name: 'My Attendance', icon: CalendarCheck, path: '/student/attendance' },
        { name: 'My Fees', icon: CreditCard, path: '/student/fees' },
        { name: 'My Reports', icon: BarChart3, path: '/student/reports' },
      ];
    }

    // Default ADMIN menu items
    return [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'Students', icon: Users, path: '/student-directory' },
      { name: 'Admissions', icon: UserPlus, path: '#', badge: 'New' },
      { name: 'Academics', icon: BookOpen, path: '/academic-hub' },
      { name: 'Attendance', icon: CalendarCheck, path: '#' },
      { name: 'Staff', icon: IdCard, path: '/staff-directory' },
      { name: 'Finance', icon: CreditCard, path: '/fee-management' },
      { name: 'Communication', icon: MessageSquare, path: '/parent-portal', badge: '2' },
      { name: 'Reports', icon: BarChart3, path: '#' },
    ];
  };

  const getBottomItems = (): MenuItem[] => {
    if (role === 'STUDENT') {
      return [
        { name: 'My Profile', icon: User, path: '/student/profile' }
      ];
    }
    return [
      { name: 'Settings', icon: Settings, path: '#' },
      { name: 'Support', icon: HelpCircle, path: '#' },
    ];
  };

  const menuItems = getMenuItems();
  const bottomItems = getBottomItems();

  const isItemActive = (itemPath: string) => {
    if (itemPath === '#') return false;
    if (itemPath === '/student-directory' && currentPath.startsWith('/student-directory')) {
      return true;
    }
    return currentPath === itemPath;
  };

  const handleSignOut = () => {
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
    <aside className={`fixed left-0 top-0 h-full w-sidebar-width bg-white border-r border-slate-200 flex flex-col z-50 shadow-[1px_0_10px_rgba(0,0,0,0.02)] transition-transform duration-300 lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-100 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display-lg text-lg text-slate-900 tracking-tight font-bold flex items-center gap-1.5 leading-none">
            EduInd
          </h1>
          <p className="font-body-sm text-[11px] text-slate-400 font-medium tracking-wide mt-0.5 whitespace-nowrap">
            {role === 'STUDENT' ? 'Student Portal' : 'Smart Education Management'}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7 scrollbar-thin">
        {/* Main Section */}
        <div>
          <span className="px-3 font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">
            {role === 'STUDENT' ? 'Student Workspace' : 'Management'}
          </span>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.path);
              return (
                <li key={item.name}>
                  {item.path === '#' ? (
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <Icon className="w-[18px] h-[18px] stroke-[2] transition-transform group-hover:scale-105" />
                        <span className="font-title-sm text-sm font-medium">{item.name}</span>
                      </div>
                      {item.badge ? (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-indigo-50 text-indigo-600">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                        active
                          ? 'bg-indigo-50/80 text-indigo-600 font-semibold shadow-sm shadow-indigo-50/10'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-[18px] h-[18px] stroke-[2] transition-transform group-hover:scale-105 ${
                            active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span className="font-title-sm text-sm font-medium">{item.name}</span>
                      </div>
                      {item.badge ? (
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
                            active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : (
                        active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-slate-100 shrink-0 bg-slate-50/50">
        {/* Helper Options */}
        <ul className="space-y-1 mb-4">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                    isItemActive(item.path)
                      ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                    isItemActive(item.path) ? 'text-indigo-650' : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                  <span className="font-title-sm text-xs font-semibold">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-inner uppercase">
              {getInitials()}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-title-sm text-xs font-bold text-slate-900 truncate">
              {user ? user.name : 'Console User'}
            </h4>
            <p className="font-body-sm text-[10px] text-slate-400 truncate uppercase font-semibold">
              {role}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
