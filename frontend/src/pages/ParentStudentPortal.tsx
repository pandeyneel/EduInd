import { useApi } from '../api';
import BackendStatusBanner from '../components/BackendStatusBanner';
import {
  CalendarRange,
  MapPin,
  ClipboardList,
  AlertCircle,
  Circle,
  ArrowRight,
  TrendingUp,
  MoreHorizontal,
  Plus
} from 'lucide-react';

interface PortalData {
  Message: string;
}

export default function ParentStudentPortal() {
  const { loading, retry, isFallback } = useApi<PortalData>('ParentStudentPortal', {
    Message: "Data for Parent Portal"
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      
      {/* Backend Status Alert */}
      <BackendStatusBanner isFallback={isFallback} loading={loading} retry={retry} />

      {/* Top Banner Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Alex Mercer's Portal
          </h1>
          <p className="font-body-sm text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            Welcome back. Monitor academic courses, attendances, and assignment timelines.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span>Leave Request</span>
        </button>
      </div>

      {/* Timetable Timeline & Homework Grid */}
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
            {/* Timeline line */}
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
              <ClipboardList className="w-[18px] h-[18px] text-blue-500" /> Upcoming Tasks
            </h3>
          </div>

          <div className="space-y-3.5 bg-white">
            {/* Warning Assignment */}
            <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/45 flex gap-3.5 items-start">
              <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-800 text-xs leading-snug">Physics Lab Report</h4>
                <p className="font-body-sm text-[10px] text-rose-500 mt-1 font-semibold">Due Today, 11:59 PM</p>
              </div>
            </div>

            {/* Standard Tasks */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex gap-3.5 items-start group hover:border-slate-350 transition-all cursor-pointer">
              <Circle className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 mt-0.5 shrink-0 transition-colors" />
              <div>
                <h4 className="font-semibold text-slate-800 text-xs leading-snug">Read Ch. 4-5 Gatsby</h4>
                <p className="font-body-sm text-[10px] text-slate-400 mt-1 font-medium">Literature • Tomorrow</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex gap-3.5 items-start group hover:border-slate-350 transition-all cursor-pointer">
              <Circle className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 mt-0.5 shrink-0 transition-colors" />
              <div>
                <h4 className="font-semibold text-slate-800 text-xs leading-snug">Problem Set 8</h4>
                <p className="font-body-sm text-[10px] text-slate-400 mt-1 font-medium">Calculus II • Fri, Oct 28</p>
              </div>
            </div>
          </div>

          <button className="mt-6 pt-4 text-indigo-600 font-bold text-xs text-center border-t border-slate-100 w-full hover:text-indigo-700 transition-colors flex items-center justify-center gap-1 group bg-white">
            <span>View All Assignments</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Recent Grades table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col mt-4 bg-white">
        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
          <h3 className="font-title-sm text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-[18px] h-[18px] text-emerald-500" /> Recent Assessments
          </h3>
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-700 bg-white">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider w-1/3">Subject</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Assessment Type</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-right">Date</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700 bg-white">
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">Calculus II</td>
                <td className="px-6 py-4 text-slate-500">Midterm Exam</td>
                <td className="px-6 py-4 text-right text-slate-400">Oct 24</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 font-bold text-indigo-600">
                    92%
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">AP Physics</td>
                <td className="px-6 py-4 text-slate-500">Kinematics Quiz</td>
                <td className="px-6 py-4 text-right text-slate-400">Oct 20</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 font-bold text-indigo-600">
                    88%
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">Advanced Literature</td>
                <td className="px-6 py-4 text-slate-500">Essay: The Jazz Age</td>
                <td className="px-6 py-4 text-right text-slate-400">Oct 15</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 font-bold text-indigo-600">
                    95%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
