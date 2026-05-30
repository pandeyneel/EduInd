import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBackendData } from '../api';
import {
  Users,
  CalendarCheck,
  CreditCard,
  UserPlus,
  BookOpen,
  Heart,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  BellRing,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const [_data, setData] = useState<any>(null);

  useEffect(() => {
    // Connect to .NET backend
    fetchBackendData('AdminDashboard').then(setData).catch(console.error);
  }, []);

  // Simple sparkline path generators
  const sparklineData1 = "M 0 15 Q 10 5, 20 18 T 40 10 T 60 2 T 80 12";
  const sparklineData2 = "M 0 10 Q 10 18, 20 8 T 40 12 T 60 15 T 80 5";
  const sparklineData3 = "M 0 5 Q 10 15, 20 12 T 40 18 T 60 10 T 80 15";
  const sparklineData4 = "M 0 18 Q 10 10, 20 15 T 40 5 T 60 12 T 80 2";

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Welcome Title Grid */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display-lg text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Welcome to the Console
          </h1>
          <p className="font-body-sm text-sm text-slate-400 mt-1.5 font-medium">
            Here's a unified look at key performance metrics across your organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-caps text-xs text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200/50 font-bold select-none">
            Academic Term: Fall 2026
          </span>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all duration-200">
            <Plus className="w-4 h-4" />
            Quick Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {/* Total Students */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full select-none">
              <TrendingUp className="w-3 h-3" />
              <span>+4.2%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Total Students</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display-lg text-xl font-bold text-slate-900 leading-none">3,248</span>
              <span className="text-[10px] text-slate-400 font-bold">active</span>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="mt-4 h-6 w-full opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 80 20" fill="none">
              <path d={sparklineData1} stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full select-none">
              <span>Goal: 95%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Daily Attendance</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display-lg text-xl font-bold text-slate-900 leading-none">96.2%</span>
              <span className="text-[10px] text-emerald-600 font-bold">Above Target</span>
            </div>
          </div>
          <div className="mt-4 h-6 w-full opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 80 20" fill="none">
              <path d={sparklineData2} stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Pending Fees */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full select-none">
              <TrendingDown className="w-3 h-3" />
              <span>-1.8%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Pending Fees</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display-lg text-xl font-bold text-slate-900 leading-none">$42.5k</span>
              <span className="text-[10px] text-rose-500 font-semibold">Action Required</span>
            </div>
          </div>
          <div className="mt-4 h-6 w-full opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 80 20" fill="none">
              <path d={sparklineData3} stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* New Admissions */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <UserPlus className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full select-none">
              <span>+12.4%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-body-sm text-xs text-slate-400 font-medium">New Admissions</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display-lg text-xl font-bold text-slate-900 leading-none">124</span>
              <span className="text-[10px] text-slate-400 font-bold">this term</span>
            </div>
          </div>
          <div className="mt-4 h-6 w-full opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 80 20" fill="none">
              <path d={sparklineData4} stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Teachers */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full select-none">
              <span>Ratio: 1:18</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Teachers</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display-lg text-xl font-bold text-slate-900 leading-none">182</span>
              <span className="text-[10px] text-slate-400 font-bold">instructors</span>
            </div>
          </div>
          <div className="mt-4 h-6 w-full opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 80 20" fill="none">
              <path d={sparklineData1} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Parent Engagement */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
              <Heart className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full select-none">
              <span>High</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Parent Engagement</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display-lg text-xl font-bold text-slate-900 leading-none">88.4%</span>
              <span className="text-[10px] text-purple-500 font-semibold">Portal Active</span>
            </div>
          </div>
          <div className="mt-4 h-6 w-full opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 80 20" fill="none">
              <path d={sparklineData2} stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Charts & Activity Feed Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Section: Trends Charts */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Trends Charts Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-title-sm text-base font-bold text-slate-900">Trends Monitor</h3>
                <p className="font-body-sm text-xs text-slate-400">Enrollment expansion and average monthly attendance logs.</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 select-none">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-indigo-600" /> Enrollment</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> Attendance</span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative h-64 w-full">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {/* Y-axis gridlines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                {/* Enrollment Fill & Line */}
                <path d="M 0 170 C 50 160, 100 130, 150 110 C 200 90, 250 85, 300 70 C 350 55, 400 45, 500 30 L 500 200 L 0 200 Z" fill="url(#indigoGrad)" />
                <path d="M 0 170 C 50 160, 100 130, 150 110 C 200 90, 250 85, 300 70 C 350 55, 400 45, 500 30" fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />

                {/* Attendance Line */}
                <path d="M 0 100 C 50 105, 100 95, 150 90 C 200 92, 250 90, 300 85 C 350 88, 400 80, 500 75" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />

                {/* Data point indicators */}
                <circle cx="300" cy="70" r="5" fill="#4F46E5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="500" cy="30" r="5" fill="#4F46E5" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
            {/* Chart X-axis Labels */}
            <div className="flex justify-between px-1 text-[11px] font-bold text-slate-400 select-none">
              <span>JAN</span>
              <span>MAR</span>
              <span>MAY</span>
              <span>JUL</span>
              <span>SEP</span>
              <span>NOV</span>
            </div>
          </div>
        </div>

        {/* Right Section: Recent Activities Feed */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col flex-1">
            <h3 className="font-title-sm text-base font-bold text-slate-900 mb-5">System Activities</h3>
            <div className="flex-grow space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1.5 ring-4 ring-indigo-50" />
                <div className="flex-1">
                  <p className="font-body-sm text-xs text-slate-700 font-semibold leading-tight">Curriculum updated by Mr. Aris</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Academics Hub • 10 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 ring-4 ring-emerald-50" />
                <div className="flex-1">
                  <p className="font-body-sm text-xs text-slate-700 font-semibold leading-tight">Fee payment logged for Emma Thompson</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Finance Admin • 1 hour ago</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 ring-4 ring-amber-50" />
                <div className="flex-1">
                  <p className="font-body-sm text-xs text-slate-700 font-semibold leading-tight">Leave request sent by Dr. Mercer</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Staff Directory • 3 hours ago</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1.5 ring-4 ring-slate-50" />
                <div className="flex-1">
                  <p className="font-body-sm text-xs text-slate-700 font-medium leading-tight">System backups completed</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Automated Task • Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admissions Table & Right Panels Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Recent Admissions table */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-title-sm text-base font-bold text-slate-900">Recent Registrations</h3>
              <p className="font-body-sm text-xs text-slate-400">Newly approved student profiles this week.</p>
            </div>
            <Link to="/students" className="font-label-caps text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 group">
              View Register <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3.5 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3.5 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Grade Target</th>
                  <th className="px-6 py-3.5 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Registrar Status</th>
                  <th className="px-6 py-3.5 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700">
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Emma Thompson</td>
                  <td className="px-6 py-4 text-slate-500">10th Grade</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">Enrolled</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">Today, 09:41 AM</td>
                </tr>
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Lucas Chen</td>
                  <td className="px-6 py-4 text-slate-500">8th Grade</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">Reviewing Docs</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">Yesterday, 4:15 PM</td>
                </tr>
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Sophia Martinez</td>
                  <td className="px-6 py-4 text-slate-500">12th Grade</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">Action Req</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">Oct 22, 11:20 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements & Events panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          {/* Active Announcements */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4 flex-1">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-title-sm text-base font-bold text-slate-900 flex items-center gap-2">
                <BellRing className="w-[18px] h-[18px] text-indigo-500" /> Announcements
              </h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-3 border-indigo-500 pl-3">
                <p className="font-title-sm text-xs font-bold text-slate-800 leading-tight">Winter Break Schedule Published</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">Parents &amp; Staff • 2h ago</p>
              </div>
              <div className="border-l-3 border-slate-300 pl-3">
                <p className="font-title-sm text-xs font-bold text-slate-800 leading-tight">System Maintenance Notice</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">Administrators • 1d ago</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4 flex-1">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-title-sm text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-[18px] h-[18px] text-blue-500" /> Upcoming Events
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3.5 items-center p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex flex-col items-center justify-center shrink-0 select-none text-indigo-600">
                  <span className="text-[10px] font-bold leading-none">OCT</span>
                  <span className="text-base font-extrabold leading-none mt-0.5">28</span>
                </div>
                <div>
                  <h4 className="font-title-sm text-xs font-bold text-slate-800">Advanced Calculus Midterm</h4>
                  <p className="text-[10px] text-slate-400 font-medium">09:00 AM • Main Hall</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-center p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex flex-col items-center justify-center shrink-0 select-none text-blue-600">
                  <span className="text-[10px] font-bold leading-none">NOV</span>
                  <span className="text-base font-extrabold leading-none mt-0.5">04</span>
                </div>
                <div>
                  <h4 className="font-title-sm text-xs font-bold text-slate-800">Parent-Teacher Symposium</h4>
                  <p className="text-[10px] text-slate-400 font-medium">02:30 PM • Seminar Complex</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
