import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';
import {
  IdCard,
  GraduationCap,
  CreditCard,
  Edit2,
  Printer,
  Mail,
  MailQuestion,
  User,
  MapPin,
  Calendar,
  Sparkles,
  Trophy,
  CheckCircle2
} from 'lucide-react';

export default function DetailedStudentProfile() {
  const [_data, setData] = useState<any>(null);

  useEffect(() => {
    // Connect to .NET backend
    fetchBackendData('DetailedStudentProfile').then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Profile Header Sheet */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-300 transition-all">
        <div className="flex items-center gap-6">
          {/* Avatar Container */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-inner shrink-0 bg-slate-50 flex items-center justify-center">
              <img
                alt="Student Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg6sm8wj36OTAYFywWXrq1V9zDBwiXvBXm2VrX1WOS1bxkGqfuQQkmSBdLF15cTX93s4VfMxU7iJs8mv2cTQV0Nfz57keRWDkKCezLdJB9OKvEbK6tGNTC8AMx0sfHrCVdmhac-Tn_VOiNNJTdfjNETnSntgeBMyYuMPR10jFKweUTiiENBchi5U35XO_2PwInzvXBX59SDc-R8HD6ZPAcxAEmbbdiy_ya6BN8ER_tcb9kYfndG2FfXQ3C-uvsp5IzUZT7NwIvhi8"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <h2 className="font-display-lg text-xl font-bold text-slate-900 leading-tight">Alexander Lewis</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 font-body-sm text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><IdCard className="w-4 h-4 text-slate-400" /> ID: STU-2023-0842</span>
              <span className="hidden md:inline text-slate-200">•</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-slate-400" /> Grade 10 - Science Track</span>
              <span className="hidden md:inline text-slate-200">•</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto shrink-0">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all">
            <Edit2 className="w-4 h-4 text-slate-400" />
            Edit Profile
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all">
            <Printer className="w-4 h-4 text-slate-400" />
            Print Docket
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all duration-200">
            <Mail className="w-4 h-4" />
            Message Family
          </button>
        </div>
      </div>

      {/* Structured Multi-Panel Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Metadata */}
        <div className="flex flex-col gap-8">
          {/* Metadata Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-title-sm text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Date of Birth</p>
                <p className="font-body-md text-sm text-slate-700 font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" /> March 14, 2008 (16 years)
                </p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Gender</p>
                <p className="font-body-md text-sm text-slate-700 font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400 shrink-0" /> Male
                </p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Contact Point</p>
                <p className="font-body-md text-sm text-slate-700 font-medium flex items-center gap-2">
                  <MailQuestion className="w-4 h-4 text-slate-400 shrink-0" /> alewis.student@eduind.com
                </p>
                <p className="font-body-md text-sm text-slate-700 font-medium flex items-center gap-2 mt-1.5">
                  <span className="w-4 h-4 shrink-0" /> +1 (555) 019-8372
                </p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Residential Address</p>
                <p className="font-body-md text-sm text-slate-700 font-medium flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> 
                  <span>482 Oakwood Drive, Apt 3B<br />Springfield, IL 62704</span>
                </p>
              </div>
            </div>
          </div>

          {/* Billing / Fee Ledger */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-title-sm text-base font-bold text-slate-900">Fee Summary</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-label-caps text-[9px] font-bold">
                UP TO DATE
              </span>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Outstanding Balance</p>
              <p className="font-display-lg text-2xl font-bold text-slate-900 leading-none">$0.00</p>
            </div>
            <div className="space-y-2.5">
              <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider">Recent Transactions</p>
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Fall Term Tuition
                </span>
                <span className="text-slate-900">$4,200.00</span>
              </div>
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Laboratory Fee
                </span>
                <span className="text-slate-900">$150.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Academics & Timetables */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Academic Stats & Subject List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-title-sm text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Academic Snapshot
            </h3>
            
            {/* KPI Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl text-center flex flex-col justify-center">
                <p className="font-label-caps text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">CURRENT GPA</p>
                <p className="font-display-lg text-lg font-bold text-indigo-600 flex items-center justify-center gap-1">
                  3.84 <Sparkles className="w-4 h-4 text-amber-500" />
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl text-center flex flex-col justify-center">
                <p className="font-label-caps text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">CLASS RANK</p>
                <p className="font-display-lg text-lg font-bold text-indigo-600 flex items-center justify-center gap-1">
                  12 <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] text-slate-400 font-normal">/340</span>
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl text-center flex flex-col justify-center">
                <p className="font-label-caps text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">CREDITS EARNED</p>
                <p className="font-display-lg text-lg font-bold text-indigo-600">42.5</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl text-center flex flex-col justify-center">
                <p className="font-label-caps text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">CONDUCT RATING</p>
                <p className="font-display-lg text-lg font-bold text-emerald-600 flex items-center justify-center gap-1">
                  Excellent <CheckCircle2 className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>

            {/* Subject Breakdown Progress Bars */}
            <div className="space-y-4.5">
              <p className="font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Subjects & Term Grades</p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Advanced Calculus</span>
                  <span className="text-indigo-600 font-bold">92%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">AP Physics II</span>
                  <span className="text-indigo-600 font-bold">88%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">World History II</span>
                  <span className="text-indigo-600 font-bold">95%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">English Literature</span>
                  <span className="text-indigo-600 font-bold">84%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Radial ring Summary */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-title-sm text-base font-bold text-slate-900">Attendance summary</h3>
              <button className="text-indigo-600 text-xs font-bold hover:underline">Inspect Log</button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Radial SVGs rings */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  <path className="text-emerald-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="96, 100" strokeWidth="3" strokeLinecap="round"></path>
                </svg>
                <div className="absolute flex flex-col items-center justify-center select-none">
                  <span className="font-display-lg text-lg font-bold text-slate-900">96%</span>
                  <span className="font-label-caps text-[8px] text-slate-400 font-bold uppercase">PRESENT</span>
                </div>
              </div>

              {/* Attendance breakdowns */}
              <div className="flex-1 w-full grid grid-cols-2 gap-3.5 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200/45 rounded-xl">
                  <p className="font-label-caps text-[9px] text-slate-400 font-bold mb-1">TOTAL DAYS</p>
                  <p className="font-semibold text-slate-800 text-sm">142</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/45 rounded-xl">
                  <p className="font-label-caps text-[9px] text-slate-400 font-bold mb-1">DAYS PRESENT</p>
                  <p className="font-semibold text-slate-800 text-sm">136</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/45 rounded-xl">
                  <p className="font-label-caps text-[9px] text-slate-400 font-bold mb-1">ABSENT (EXCUSED)</p>
                  <p className="font-semibold text-slate-800 text-sm">4</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/45 rounded-xl">
                  <p className="font-label-caps text-[9px] text-slate-400 font-bold mb-1">ABSENT (UNEXCUSED)</p>
                  <p className="font-semibold text-rose-600 text-sm">2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
