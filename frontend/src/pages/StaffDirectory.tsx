import { useState } from 'react';
import { useApi } from '../api';
import BackendStatusBanner from '../components/BackendStatusBanner';
import {
  Search,
  UserPlus,
  FilterX,
  Mail,
  Phone,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  ChevronDown
} from 'lucide-react';

interface StaffData {
  Message: string;
}

export default function StaffDirectory() {
  const { loading, retry, isFallback } = useApi<StaffData>('StaffDirectory', {
    Message: "Data for Staff Directory"
  });

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const staffList = [
    {
      id: 1,
      name: 'Dr. Eleanor Vance',
      status: 'Active',
      type: 'Tenured',
      empId: 'EMP-2041',
      dept: 'Science',
      role: 'Head of Department',
      email: 'e.vance@eduind.com',
      phone: '+1 (555) 019-2834',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5zFObA8IBWNsF6rmbqRZLTq1H21mU3sLtkeyT95tpJrtYemJy1OHq8yrpLR7Fg34VhjgNxWyRN6Ice0NSZF4EBnAA-79JRFEuOxA8E36EmL-yejECh8e9rtA1kc6f7E2wVNFeHvzPqsBQVPUslNvaK6XZip7ZQSr_Axlt1ggS0260PeHzDdHLDOEgzVjNTbAHYvoemncmwR4poEn1-1R-zYHsilDR6ccsK7hZ5AKRLO9YRz554qg2kzGaoHNYX2eQ6lw7OzE1M5A'
    },
    {
      id: 2,
      name: 'Marcus Thorne',
      status: 'Active',
      type: 'Full-Time',
      empId: 'EMP-1088',
      dept: 'Administration',
      role: 'Vice Principal',
      email: 'm.thorne@eduind.com',
      phone: '+1 (555) 019-1002',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbiHxnQVYvex8ZFrcTHm2vLXrpXSh5re5brTUrI9g2TPKpaOA8uXx-GfPqo6hMRQ5TtAZ6RGcJ5SD_QF7ihZdUgJ5bM05OIOzAGeQDTRtpfoHN34Qed_VuYyrtyirEL_d5DTLaYS10b2RpfBCr0kN7EuvSiGODYZLMAPkkukIqDF8E57vLRt_-uAG8WsXW0hGwm-potzGuWTaeQ6S2rpNbfjz0AacIEguZkYk2UP8vhkxNth1DdGouNfa7seBe_znlpAUBCgWfGWM'
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      status: 'On Leave',
      type: 'Contract',
      empId: 'EMP-3192',
      dept: 'Mathematics',
      role: 'Senior Teacher',
      email: 's.jenkins@eduind.com',
      phone: '+1 (555) 019-4451',
      avatar: null
    },
    {
      id: 4,
      name: 'David Chen',
      status: 'Active',
      type: 'Full-Time',
      empId: 'EMP-2884',
      dept: 'Physical Education',
      role: 'Instructor',
      email: 'd.chen@eduind.com',
      phone: '+1 (555) 019-8823',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxVX5JCxD_zFQfCgnA5df2qZGzP-HaE5PXsalpVpGMKxUZkxuJa6c9eGFYJ13dzm6ynKSl3cju4GWCEMDTFcJKK7BazZ2eYwzxOyuifBFaczqt8UAcBQsuJSzUBNJlsYkn7NhlPZrTyE4FmcQJ-5398RmCzNngPGZ_9cHvCXYXV5yD5pfiVNYGitMHyXC6NnT_JtWYGLd41J6_BTZ6pHVvCTbflR73xiDmnA7hgs7QBXgQ2qfICHNYmCsoyS8jHW1xT2YkAyBOgbk'
    },
    {
      id: 5,
      name: 'Maria Peña',
      status: 'Active',
      type: 'Full-Time',
      empId: 'EMP-4012',
      dept: 'Humanities',
      role: 'Teacher',
      email: 'm.pena@eduind.com',
      phone: '+1 (555) 019-3390',
      avatar: null
    }
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      
      {/* Backend Status Alert */}
      <BackendStatusBanner isFallback={isFallback} loading={loading} retry={retry} />

      {/* Page Title Panels */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Staff Directory
          </h1>
          <p className="font-body-sm text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            Manage teachers, administrator profiles, contact cards, and department hierarchies.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200 w-full sm:w-auto">
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Filter Inputs Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        {/* Search */}
        <div className="flex-1 w-full space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Staff</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, EMP ID, or role..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Department Selector */}
        <div className="w-full md:w-56 space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</label>
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all appearance-none cursor-pointer">
              <option value="all">All Departments</option>
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">Humanities &amp; English</option>
              <option value="admin">Administration</option>
              <option value="pe">Physical Education</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Role Selector */}
        <div className="w-full md:w-48 space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</label>
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all appearance-none cursor-pointer">
              <option value="all">All Roles</option>
              <option value="teacher">Teacher</option>
              <option value="head">Department Head</option>
              <option value="staff">Support Staff</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters Button */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors shrink-0 h-[38px] w-full md:w-auto bg-white">
          <FilterX className="w-4 h-4 text-slate-400" />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* Main Staff Directory Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">ID Number</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Department &amp; Role</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Contact Information</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700">
              {staffList.map((st) => {
                let statusBadge = (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                    Active
                  </span>
                );
                if (st.status === 'On Leave') {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                      On Leave
                    </span>
                  );
                }

                return (
                  <tr key={st.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {st.avatar ? (
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-sm bg-slate-100">
                            <img alt={st.name} className="w-full h-full object-cover" src={st.avatar} />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px] shrink-0 select-none shadow-sm">
                            {st.name.split(' ').slice(-2).map(n => n[0]).join('')}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 font-title-sm text-sm">{st.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{st.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono font-medium">{st.empId}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{st.dept}</span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{st.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 flex flex-col justify-center">
                        <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {st.email}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-300 shrink-0" /> {st.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{statusBadge}</td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === st.id ? null : st.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors outline-none inline-flex items-center justify-center"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === st.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-6 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              View Dossier
                            </button>
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                              Edit Profile
                            </button>
                            <hr className="my-1 border-slate-100" />
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold text-rose-500 hover:bg-rose-50"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                              Revoke Access
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

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 select-none bg-white">
          <span className="font-body-sm text-xs text-slate-400 font-medium">
            Showing 1 to 5 of 124 personnel records
          </span>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-40 hover:bg-slate-50 transition-colors bg-white" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-xs flex items-center justify-center bg-white">
              2
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
