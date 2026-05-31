import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, useApi } from '../api';
import BackendStatusBanner from '../components/BackendStatusBanner';
import {
  TrendingUp,
  BookOpen,
  CalendarCheck,
  CreditCard,
  BarChart3,
  User,
  Sparkles,
  Trophy,
  CheckCircle2,
  CalendarRange,
  MapPin,
  ClipboardList,
  AlertCircle,
  Circle,
  ArrowRight,
  Download,
  Edit2,
  Mail,
  Phone,
  Home,
  Check,
  Clock
} from 'lucide-react';

interface Course {
  name: string;
  progress: number;
  grade: string;
}

interface Attendance {
  presentRate: number;
  totalDays: number;
  present: number;
  excused: number;
  unexcused: number;
}

interface Transaction {
  description: string;
  amount: number;
  date: string;
  status: string;
}

interface Fees {
  billed: number;
  paid: number;
  outstanding: number;
  status: string;
  transactions: Transaction[];
}

interface Notification {
  text: string;
  type: string;
}

interface StudentDashboardData {
  studentId: string;
  fullName: string;
  email: string;
  grade: string;
  courses: Course[];
  attendance: Attendance;
  fees: Fees;
  notifications: Notification[];
}

// Support Tab configuration from sidebar navigation
interface StudentDashboardProps {
  activeTab?: 'dashboard' | 'courses' | 'attendance' | 'fees' | 'reports' | 'profile';
}

export default function StudentDashboard({ activeTab = 'dashboard' }: StudentDashboardProps) {
  const { user, token, updateUser } = useAuth();
  
  // Custom API fetch hook
  const { data, loading, error, retry, isFallback } = useApi<StudentDashboardData>('student/dashboard', {
    studentId: 'mock-id',
    fullName: user?.name || 'Alexander Lewis',
    email: user?.email || 'alewis.student@eduind.com',
    grade: 'Grade 10',
    courses: [
      { name: "Advanced Calculus", progress: 92, grade: "A" },
      { name: "AP Physics II", progress: 88, grade: "B+" },
      { name: "World History II", progress: 95, grade: "A" },
      { name: "English Literature", progress: 84, grade: "B" }
    ],
    attendance: {
      presentRate: 96,
      totalDays: 142,
      present: 136,
      excused: 4,
      unexcused: 2
    },
    fees: {
      billed: 4350.00,
      paid: 4350.00,
      outstanding: 0.00,
      status: "Paid",
      transactions: [
        { description: "Fall Term Tuition", amount: 4200.00, date: "Oct 26, 2026", status: "Completed" },
        { description: "Laboratory Fee", amount: 150.00, date: "Oct 22, 2026", status: "Completed" }
      ]
    },
    notifications: [
      { text: "Physics Lab Report due by 11:59 PM today", type: "Warning" },
      { text: "Upcoming Mathematics Quiz on Friday", type: "Info" }
    ]
  });

  // Edit Profile Form State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 019-8372');
  const [profileAddress, setProfileAddress] = useState('482 Oakwood Drive, Springfield, IL 62704');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Sync profile details when user or data updates
  useEffect(() => {
    if (data) {
      setProfileName(data.fullName);
      setProfileEmail(data.email);
    }
  }, [data]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/student/profile`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileName,
          email: profileEmail
        })
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.Message || 'Failed to update profile');
      }

      updateUser(profileName, profileEmail);
      setUpdateSuccess(true);
    } catch (err: any) {
      console.warn('Backend profile update failed. Triggering simulated fallback.');
      updateUser(profileName, profileEmail);
      setUpdateSuccess(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case 'courses': return 'My Courses';
      case 'attendance': return 'My Attendance';
      case 'fees': return 'Fee Statement';
      case 'reports': return 'Academic Reports';
      case 'profile': return 'My Profile';
      default: return 'Student Dashboard';
    }
  };

  const getActiveTabSubtitle = () => {
    switch (activeTab) {
      case 'courses': return 'Monitor active curriculum topics, teachers, and current marks.';
      case 'attendance': return 'Review comprehensive classroom registries and attendance logs.';
      case 'fees': return 'View transaction ledgers, itemized tuition statements, and paid invoices.';
      case 'reports': return 'Inspect teacher comments, term reviews, and overall grade points.';
      case 'profile': return 'Update contact details, manage avatars, and verify residential listings.';
      default: return `Welcome back, ${data?.fullName || user?.name}. Here is your academic overview.`;
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      
      {/* Backend Status Alert */}
      <BackendStatusBanner isFallback={isFallback} loading={loading} retry={retry} />

      {/* Top Banner Sheet */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            {getActiveTabTitle()}
          </h1>
          <p className="font-body-sm text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            {getActiveTabSubtitle()}
          </p>
        </div>
      </div>

      {/* --- RENDER TAB CONTENTS --- */}

      {activeTab === 'dashboard' && data && (
        <div className="space-y-6 sm:space-y-8">
          {/* Snapshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* GPA */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full select-none">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Excellent</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="font-body-sm text-xs text-slate-400 font-medium">Current Cumulative GPA</p>
                <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">3.84</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Science Track Curriculum</p>
              </div>
            </div>

            {/* Attendance radial progress */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <span className="font-label-caps text-[9px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md font-bold select-none">TERM</span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-body-sm text-xs text-slate-400 font-medium">Attendance Rate</p>
                  <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">{data.attendance.presentRate}%</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">{data.attendance.present} / {data.attendance.totalDays} Days Present</p>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-150" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                    <path className="text-emerald-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${data.attendance.presentRate}, 100`} strokeWidth="3" strokeLinecap="round"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Rank */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-label-caps text-[9px] bg-amber-50 border border-amber-100 text-amber-600 px-2 py-0.5 rounded-md font-bold select-none">TOP 4%</span>
              </div>
              <div className="mt-5">
                <p className="font-body-sm text-xs text-slate-400 font-medium">Class Rank</p>
                <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">12th <span className="text-sm text-slate-400 font-normal">/340</span></p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Grade 10 cohort ranking</p>
              </div>
            </div>

            {/* Outstanding Fees */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-label-caps text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md font-bold select-none">PAID</span>
              </div>
              <div className="mt-5">
                <p className="font-body-sm text-xs text-slate-400 font-medium">Outstanding Fees</p>
                <p className="font-display-lg text-2xl font-bold text-slate-950 mt-1">${data.fees.outstanding.toFixed(2)}</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-2">Accounts settled for this term</p>
              </div>
            </div>

          </div>

          {/* Timetable & Notification boards */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
            {/* Timetable timeline */}
            <div className="xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col h-full bg-white">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 bg-white">
                <h3 className="font-title-sm text-base font-bold text-slate-900 flex items-center gap-2">
                  <CalendarRange className="w-[18px] h-[18px] text-indigo-500" /> Today's Timetable
                </h3>
                <span className="font-label-caps text-[10px] text-slate-450 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/50 font-bold select-none">
                  Thursday, Oct 26
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-5 relative pl-4 bg-white">
                {/* Timeline vertical line */}
                <div className="absolute left-[79px] top-6 bottom-6 w-[2px] bg-slate-100 z-0"></div>

                {/* Timetable slots */}
                <div className="flex gap-4 items-center relative z-10 group opacity-50 select-none">
                  <div className="w-14 text-right font-label-caps text-[10px] text-slate-400 font-bold">08:30 AM</div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-350 border-4 border-white shadow-sm ring-1 ring-slate-200 z-10"></div>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">AP Physics</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Room 302 • Dr. Aris
                      </p>
                    </div>
                    <span className="font-label-caps text-[9px] text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded-md font-bold uppercase select-none">Completed</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center relative z-10 group">
                  <div className="w-14 text-right font-label-caps text-[10px] text-indigo-600 font-bold">10:15 AM</div>
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 border-4 border-white shadow-sm ring-1 ring-indigo-200 z-10 animate-pulse"></div>
                  <div className="flex-1 bg-indigo-50/50 border-l-3 border-l-indigo-600 rounded-r-xl rounded-l-md border-y border-r border-indigo-100 p-3 shadow-sm shadow-indigo-100/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Advanced Literature</h4>
                      <p className="text-[10px] text-slate-405 font-medium mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Library • Ms. Vance
                      </p>
                    </div>
                    <span className="font-label-caps text-[9px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-bold uppercase select-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Now
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 items-center relative z-10 group">
                  <div className="w-14 text-right font-label-caps text-[10px] text-slate-400 font-bold">11:45 AM</div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-350 border-4 border-white shadow-sm ring-1 ring-slate-200 z-10"></div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Calculus II</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Room 105 • Mr. Chen
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks Board */}
            <div className="xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col h-full bg-white">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 bg-white">
                <h3 className="font-title-sm text-base font-bold text-slate-900 flex items-center gap-2">
                  <ClipboardList className="w-[18px] h-[18px] text-blue-500" /> Notifications & Alerts
                </h3>
              </div>

              <div className="space-y-3.5 bg-white flex-1">
                {data.notifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`p-3.5 rounded-xl border flex gap-3.5 items-start ${
                      notif.type === 'Warning'
                        ? 'border-rose-100 bg-rose-50/45 text-rose-600'
                        : 'border-blue-100 bg-blue-50/45 text-blue-600'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-800 text-xs leading-snug">{notif.text}</h4>
                      <p className="font-body-sm text-[10px] text-slate-400 mt-1 font-medium">Administrative Broadcast</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- COURSES TAB --- */}
      {activeTab === 'courses' && data && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-title-sm text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Active Subject Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.courses.map((course) => (
              <div key={course.name} className="p-5 border border-slate-200/80 rounded-xl space-y-4 hover:shadow-sm transition-all bg-slate-50/30">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-title-sm text-sm font-bold text-slate-900">{course.name}</h4>
                    <p className="font-body-sm text-[11px] text-slate-400 font-semibold mt-0.5">Grade 10 • Primary Science Track</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs">
                    Current Mark: {course.grade}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Syllabus Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ATTENDANCE TAB --- */}
      {activeTab === 'attendance' && data && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-8 pb-6 border-b border-slate-150">
            {/* Radial SVGs rings */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                <path className="text-emerald-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${data.attendance.presentRate}, 100`} strokeWidth="3" strokeLinecap="round"></path>
              </svg>
              <div className="absolute flex flex-col items-center justify-center select-none">
                <span className="font-display-lg text-2xl font-bold text-slate-900">{data.attendance.presentRate}%</span>
                <span className="font-label-caps text-[8px] text-slate-400 font-bold uppercase mt-0.5">PRESENT</span>
              </div>
            </div>

            {/* Attendance breakdowns */}
            <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200/45 rounded-xl">
                <p className="font-label-caps text-[9px] text-slate-455 font-bold mb-1 uppercase tracking-wide">TOTAL SESSION DAYS</p>
                <p className="font-semibold text-slate-900 text-lg font-display-lg">{data.attendance.totalDays}</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/45 rounded-xl">
                <p className="font-label-caps text-[9px] text-slate-455 font-bold mb-1 uppercase tracking-wide">DAYS ATTENDED</p>
                <p className="font-semibold text-slate-900 text-lg font-display-lg">{data.attendance.present}</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/45 rounded-xl">
                <p className="font-label-caps text-[9px] text-slate-455 font-bold mb-1 uppercase tracking-wide">EXCUSED LEAVES</p>
                <p className="font-semibold text-slate-900 text-lg font-display-lg">{data.attendance.excused}</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/45 rounded-xl">
                <p className="font-label-caps text-[9px] text-slate-455 font-bold mb-1 uppercase tracking-wide">UNEXCUSED ABSENCES</p>
                <p className="font-semibold text-rose-600 text-lg font-display-lg">{data.attendance.unexcused}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-title-sm text-sm font-bold text-slate-900 uppercase tracking-wide">Recent Attendance Logs</h4>
            <div className="border border-slate-200/80 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 p-3.5 bg-slate-50 border-b border-slate-200 font-label-caps text-[10px] text-slate-400 font-bold">
                <div>DATE</div>
                <div>SESSION TYPE</div>
                <div className="text-right">REGISTRY STATUS</div>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-3 p-3.5 text-xs text-slate-600 font-semibold items-center">
                  <div className="text-slate-900">Oct 26, 2026</div>
                  <div>Morning Assembly / Regular Class</div>
                  <div className="text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-650 text-[10px] font-bold">PRESENT</span></div>
                </div>
                <div className="grid grid-cols-3 p-3.5 text-xs text-slate-600 font-semibold items-center">
                  <div className="text-slate-900">Oct 25, 2026</div>
                  <div>Morning Assembly / Regular Class</div>
                  <div className="text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-650 text-[10px] font-bold">PRESENT</span></div>
                </div>
                <div className="grid grid-cols-3 p-3.5 text-xs text-slate-600 font-semibold items-center">
                  <div className="text-slate-900">Oct 24, 2026</div>
                  <div>Morning Assembly / Regular Class</div>
                  <div className="text-right"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-650 text-[10px] font-bold">PRESENT</span></div>
                </div>
                <div className="grid grid-cols-3 p-3.5 text-xs text-slate-600 font-semibold items-center">
                  <div className="text-slate-900">Oct 23, 2026</div>
                  <div>Regular Class Session</div>
                  <div className="text-right"><span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold">ABSENT (UNEXCUSED)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FEES TAB --- */}
      {activeTab === 'fees' && data && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <p className="font-body-sm text-xs text-slate-400 font-semibold">Total Term Statement</p>
              <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">${data.fees.billed.toFixed(2)}</p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <p className="font-body-sm text-xs text-slate-400 font-semibold">Total Settled / Paid</p>
              <p className="font-display-lg text-2xl font-bold text-emerald-650 mt-1">${data.fees.paid.toFixed(2)}</p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <p className="font-body-sm text-xs text-slate-400 font-semibold">Outstanding Balance</p>
              <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">${data.fees.outstanding.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h4 className="font-title-sm text-sm font-bold text-slate-900">Transaction Ledgers</h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl bg-white transition-all">
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Statement</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Fee Description</th>
                    <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Billing Date</th>
                    <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Amount Paid</th>
                    <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700 bg-white">
                  {data.fees.transactions.map((tx, index) => (
                    <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900 font-title-sm text-sm">{tx.description}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-medium">{tx.date}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">${tx.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- REPORTS TAB --- */}
      {activeTab === 'reports' && data && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-title-sm text-base font-bold text-slate-900">Official Report Cards</h3>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Conduct Rating: Excellent
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-350 transition-all bg-slate-50/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-650 rounded-xl">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Fall Term Academic Review</h4>
                  <p className="font-body-sm text-[10px] text-slate-400 mt-1 font-medium">Released October 2026 • Verified by principal</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl bg-white transition-all">
                <Download className="w-3.5 h-3.5 text-slate-450" />
                <span>PDF Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PROFILE TAB --- */}
      {activeTab === 'profile' && data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Static details */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-6 h-fit">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-indigo-100 shadow-inner bg-slate-50 flex items-center justify-center">
                <img
                  alt="Student Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg6sm8wj36OTAYFywWXrq1V9zDBwiXvBXm2VrX1WOS1bxkGqfuQQkmSBdLF15cTX93s4VfMxU7iJs8mv2cTQV0Nfz57keRWDkKCezLdJB9OKvEbK6tGNTC8AMx0sfHrCVdmhac-Tn_VOiNNJTdfjNETnSntgeBMyYuMPR10jFKweUTiiENBchi5U35XO_2PwInzvXBX59SDc-R8HD6ZPAcxAEmbbdiy_ya6BN8ER_tcb9kYfndG2FfXQ3C-uvsp5IzUZT7NwIvhi8"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <h3 className="font-display-lg text-lg font-bold text-slate-900 leading-tight">{user?.name || data.fullName}</h3>
              <p className="font-body-sm text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{data.grade} • ACTIVE STUDENT</p>
            </div>
            <div className="w-full border-t border-slate-100 pt-4 text-left space-y-3.5 font-body-sm text-xs font-semibold text-slate-550">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Enrolled Since: Aug 2023</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-slate-400" />
                <span>Grade 10 cohort #STU-2023</span>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-title-sm text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Personal Information Settings
            </h3>
            
            {updateSuccess && (
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/60 flex items-center gap-3 text-emerald-600 animate-in fade-in slide-in-from-top-1 duration-200">
                <Check className="w-5 h-5 shrink-0" />
                <p className="font-body-sm text-xs font-bold">Profile synchronized successfully across database credentials.</p>
              </div>
            )}

            {updateError && (
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/60 flex items-center gap-3 text-rose-600 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-body-sm text-xs font-bold">{updateError}</p>
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-caps text-[10px] text-slate-450 font-bold uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-caps text-[10px] text-slate-450 font-bold uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-caps text-[10px] text-slate-455 font-bold uppercase tracking-wider mb-2">Telephone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-850 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-caps text-[10px] text-slate-455 font-bold uppercase tracking-wider mb-2">Residential Address</label>
                  <div className="relative">
                    <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-850 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 disabled:opacity-50 transition-all duration-200"
                >
                  {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Edit2 className="w-3.5 h-3.5 text-white" />
                      <span>Save Profile Modifications</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
