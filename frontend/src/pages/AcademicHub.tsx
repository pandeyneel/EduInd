import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';
import {
  Printer,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  Clock,
  UploadCloud,
  FileCheck2
} from 'lucide-react';

export default function AcademicHub() {
  const [_data, setData] = useState<any>(null);

  useEffect(() => {
    // Connect to .NET backend
    fetchBackendData('AcademicHub').then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Page Title Panel */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display-lg text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Academics Hub
          </h1>
          <p className="font-body-sm text-sm text-slate-400 mt-1.5 font-medium">
            Manage course guides, timetable distributions, and assessment calendars.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all">
            <Printer className="w-4 h-4 text-slate-400" />
            Print Schedule
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all duration-200">
            <CalendarDays className="w-4 h-4" />
            Edit Term Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button className="px-5 py-3 font-semibold text-xs text-indigo-600 border-b-2 border-indigo-600 translate-y-px">
          Class Timetable
        </button>
        <button className="px-5 py-3 font-semibold text-xs text-slate-400 hover:text-indigo-600 transition-colors">
          Exam Schedule
        </button>
      </div>

      {/* Main Grid: Weekly Calendar & Exam Tracker */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* Weekly Timetable Sheet */}
        <div className="col-span-12 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {/* Timetable Header */}
          <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="pl-4 pr-10 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 font-bold transition-all appearance-none cursor-pointer">
                  <option>Year 10 - Group A</option>
                  <option>Year 10 - Group B</option>
                  <option>Year 11 - Science</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <span className="font-label-caps text-[10px] text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 font-bold select-none">
                Term 2, Week 4
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-body-sm text-xs font-bold text-slate-700 min-w-[100px] text-center">Oct 14 - Oct 18</span>
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timetable Grid Container */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="p-4 border-r border-slate-100 w-24 text-center font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Time Slot</th>
                  <th className="p-4 border-r border-slate-100 font-label-caps text-[10px] text-slate-800 w-1/5 text-center font-bold">Monday</th>
                  <th className="p-4 border-r border-slate-100 font-label-caps text-[10px] text-slate-800 w-1/5 text-center font-bold">Tuesday</th>
                  <th className="p-4 border-r border-slate-100 font-label-caps text-[10px] text-slate-800 w-1/5 text-center font-bold">Wednesday</th>
                  <th className="p-4 border-r border-slate-100 font-label-caps text-[10px] text-slate-800 w-1/5 text-center font-bold">Thursday</th>
                  <th className="p-4 font-label-caps text-[10px] text-slate-800 w-1/5 text-center font-bold">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700">
                {/* 08:00 AM Row */}
                <tr>
                  <td className="p-3 border-r border-slate-100 text-center text-slate-400 font-medium align-top pt-4">08:00 AM</td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Mathematics</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 402
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Physics</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Lab 2
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">Literature</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 105
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Mathematics</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 402
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 min-h-[90px] flex items-center justify-center text-slate-400 font-bold select-none text-[11px] uppercase tracking-wider">
                      Study Hall
                    </div>
                  </td>
                </tr>

                {/* 09:30 AM Row */}
                <tr>
                  <td className="p-3 border-r border-slate-100 text-center text-slate-400 font-medium align-top pt-4">09:30 AM</td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Chemistry</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Lab 1
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Computer Sci.</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 301
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Chemistry</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Lab 1
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">History</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 204
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Computer Sci.</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 301
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Lunch Row */}
                <tr className="bg-slate-50">
                  <td className="p-2.5 border-r border-slate-100 text-center text-slate-400 font-bold text-[10px] tracking-wider uppercase select-none">11:00 AM</td>
                  <td className="p-2.5 text-center font-bold text-[10px] text-slate-400 tracking-widest select-none uppercase" colSpan={5}>
                    LUNCH BREAK
                  </td>
                </tr>

                {/* 12:00 PM Row */}
                <tr>
                  <td className="p-3 border-r border-slate-100 text-center text-slate-400 font-medium align-top pt-4">12:00 PM</td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">Geography</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 208
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 min-h-[90px] flex items-center justify-center text-slate-400 font-bold select-none text-[11px] uppercase tracking-wider">
                      Study Hall
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Mathematics</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Room 402
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-100 align-top">
                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Physical Ed.</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Gym A
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 flex flex-col min-h-[90px] hover:shadow-sm transition-shadow cursor-pointer group">
                      <span className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">Art &amp; Design</span>
                      <div className="flex items-center gap-1 text-slate-400 mt-auto text-[10px] font-medium">
                        <MapPin className="w-3.5 h-3.5" /> Studio 1
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section: Upcoming Exam Tracker */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-8 h-full">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="font-title-sm text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-[18px] h-[18px] text-rose-500" /> Upcoming Exams
              </h3>
              <button className="text-indigo-600 font-bold text-xs hover:underline">View All</button>
            </div>
            
            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Mathematics Card */}
              <div className="flex gap-4 p-4 border border-slate-200/60 rounded-2xl bg-white hover:border-slate-300 transition-all cursor-pointer group">
                <div className="flex flex-col items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl px-3 py-1.5 min-w-[55px] select-none border border-indigo-100">
                  <span className="text-[9px] font-bold leading-none uppercase">OCT</span>
                  <span className="text-base font-extrabold leading-none mt-1">21</span>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span className="font-semibold text-slate-800 truncate text-sm">Mid-Term Mathematics</span>
                  <div className="flex items-center gap-3 mt-1.5 text-slate-400 font-medium text-[10px]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 09:00 AM</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Main Hall</span>
                  </div>
                </div>
              </div>

              {/* Physics Card */}
              <div className="flex gap-4 p-4 border border-slate-200/60 rounded-2xl bg-white hover:border-slate-300 transition-all cursor-pointer group">
                <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-600 rounded-xl px-3 py-1.5 min-w-[55px] select-none border border-blue-100">
                  <span className="text-[9px] font-bold leading-none uppercase">OCT</span>
                  <span className="text-base font-extrabold leading-none mt-1">23</span>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span className="font-semibold text-slate-800 truncate text-sm">Physics Assessment</span>
                  <div className="flex items-center gap-3 mt-1.5 text-slate-400 font-medium text-[10px]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 01:00 PM</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Lab 2</span>
                  </div>
                </div>
              </div>

              {/* Literature Card */}
              <div className="flex gap-4 p-4 border border-slate-200/60 rounded-2xl bg-white hover:border-slate-300 transition-all cursor-pointer group">
                <div className="flex flex-col items-center justify-center bg-amber-50 text-amber-600 rounded-xl px-3 py-1.5 min-w-[55px] select-none border border-amber-100">
                  <span className="text-[9px] font-bold leading-none uppercase">NOV</span>
                  <span className="text-base font-extrabold leading-none mt-1">05</span>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span className="font-semibold text-slate-800 truncate text-sm">Literature Essay Due</span>
                  <div className="flex items-center gap-3 mt-1.5 text-slate-400 font-medium text-[10px]">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 05:00 PM</span>
                    <span className="flex items-center gap-1"><UploadCloud className="w-3.5 h-3.5" /> Online portal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 mt-auto">
              <button className="w-full py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                <Plus className="w-4 h-4 text-slate-400" />
                Schedule Assessment
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
