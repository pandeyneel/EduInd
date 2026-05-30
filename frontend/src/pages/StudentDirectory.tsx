import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../api';
import BackendStatusBanner from '../components/BackendStatusBanner';
import {
  Search,
  UserPlus,
  SlidersHorizontal,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Edit2
} from 'lucide-react';

interface StudentData {
  Message: string;
}

export default function StudentDirectory() {
  const { loading, retry, isFallback } = useApi<StudentData>('StudentDirectory', {
    Message: "Data for Student Directory"
  });

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const studentsList = [
    { id: 1, name: 'Alexander Lewis', code: 'AL', grade: 'Grade 10', section: 'A', roll: '2023-1042', status: 'Enrolled' },
    { id: 2, name: 'Bianca Castafiore', code: 'BC', grade: 'Grade 11', section: 'B', roll: '2022-0911', status: 'Enrolled' },
    { id: 3, name: 'Charles Wang', code: 'CW', grade: 'Grade 9', section: 'A', roll: '2024-0105', status: 'Pending' },
    { id: 4, name: 'Diana Prince', code: 'DP', grade: 'Grade 12', section: 'C', roll: '2021-3302', status: 'Enrolled' },
    { id: 5, name: 'Ethan Hunt', code: 'EH', grade: 'Grade 10', section: 'B', roll: '2023-1188', status: 'Suspended' }
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      
      {/* Backend Status Alert */}
      <BackendStatusBanner isFallback={isFallback} loading={loading} retry={retry} />

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Student Register
          </h1>
          <p className="font-body-sm text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            Browse, filter, and inspect enrolled student profiles across grades and terms.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200 w-full sm:w-auto">
          <UserPlus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Advanced Filter Inputs Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        {/* Search */}
        <div className="flex-1 w-full space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Students</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, roll number, or email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Grade Selector */}
        <div className="w-full md:w-48 space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade Level</label>
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all appearance-none cursor-pointer">
              <option value="">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Section Selector */}
        <div className="w-full md:w-48 space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Section</label>
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all appearance-none cursor-pointer">
              <option value="">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Sliders / Advanced Filters Button */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors shrink-0 h-[38px] w-full md:w-auto bg-white">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Main Student Directory Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Grade Target</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Class Section</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Roll Identifier</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Registrar Status</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700">
              {studentsList.map((stu) => {
                let statusBadge = (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600">
                    {stu.status}
                  </span>
                );
                if (stu.status === 'Pending') {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                      {stu.status}
                    </span>
                  );
                } else if (stu.status === 'Suspended') {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
                      {stu.status}
                    </span>
                  );
                }

                return (
                  <tr key={stu.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px] uppercase">
                          {stu.code}
                        </div>
                        <Link
                          to="/student-directory/detail"
                          className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors font-title-sm text-sm"
                        >
                          {stu.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{stu.grade}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{stu.section}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono font-medium">{stu.roll}</td>
                    <td className="px-6 py-4">{statusBadge}</td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === stu.id ? null : stu.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors outline-none inline-flex items-center justify-center"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === stu.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-6 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                            <Link
                              to="/student-directory/detail"
                              className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              View Profile
                            </Link>
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                              Edit Record
                            </button>
                            <hr className="my-1 border-slate-100" />
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold text-rose-500 hover:bg-rose-50"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                              Archive
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination links */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 select-none bg-white">
          <span className="font-body-sm text-xs text-slate-400 font-medium">
            Showing 1 to 5 of 248 register entries
          </span>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-40 hover:bg-slate-50 transition-colors disabled:hover:bg-transparent" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shadow-indigo-100">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-xs flex items-center justify-center bg-white">
              2
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-xs flex items-center justify-center bg-white">
              3
            </button>
            <span className="text-slate-400 px-1 font-bold text-xs">...</span>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors bg-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
