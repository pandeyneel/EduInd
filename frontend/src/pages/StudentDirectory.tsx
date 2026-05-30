import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi, sendBackendRequest } from '../api';
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

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  admissionDate: string;
  createdAt: string;
}

interface StudentData {
  message: string;
  students: Student[];
}

export default function StudentDirectory() {
  const { data, loading, retry, isFallback } = useApi<StudentData>('StudentDirectory', {
    message: "Data for Student Directory",
    students: [
      { id: '1', firstName: 'Alexander', lastName: 'Lewis', email: 'alewis.student@eduind.com', grade: 'Grade 10', admissionDate: '2023-08-15T00:00:00Z', createdAt: '2026-05-30T00:00:00Z' },
      { id: '2', firstName: 'Bianca', lastName: 'Castafiore', email: 'bcastafiore.student@eduind.com', grade: 'Grade 11', admissionDate: '2022-09-01T00:00:00Z', createdAt: '2026-05-30T00:00:00Z' },
      { id: '3', firstName: 'Charles', lastName: 'Wang', email: 'cwang.student@eduind.com', grade: 'Grade 9', admissionDate: '2024-01-05T00:00:00Z', createdAt: '2026-05-30T00:00:00Z' },
      { id: '4', firstName: 'Diana', lastName: 'Prince', email: 'dprince.student@eduind.com', grade: 'Grade 12', admissionDate: '2021-08-20T00:00:00Z', createdAt: '2026-05-30T00:00:00Z' },
      { id: '5', firstName: 'Ethan', lastName: 'Hunt', email: 'ehunt.student@eduind.com', grade: 'Grade 10', admissionDate: '2023-11-10T00:00:00Z', createdAt: '2026-05-30T00:00:00Z' }
    ]
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Add Student Modal & Feedback States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: '',
    admissionDate: new Date().toISOString().substring(0, 10)
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    setFormError(null);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formValues.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formValues.lastName.trim()) newErrors.lastName = 'Last name is required.';
    
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formValues.grade) newErrors.grade = 'Please select a grade level.';
    if (!formValues.admissionDate) newErrors.admissionDate = 'Admission date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      // POST the dynamic payload to ASP.NET Core
      await sendBackendRequest('students', 'POST', {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim(),
        grade: formValues.grade,
        admissionDate: new Date(formValues.admissionDate).toISOString()
      });

      // Reset Form State
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        grade: '',
        admissionDate: new Date().toISOString().substring(0, 10)
      });

      showToast('Student created successfully', 'success');
      setIsModalOpen(false);
      
      // Instantly refresh the register table asynchronously
      retry();
    } catch (err: any) {
      console.error('Error creating student:', err);
      const errMsg = err.message || 'Unable to create student';
      setFormError(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamically map database fields to UI grid fields
  const studentsList = (data?.students || []).map(stu => ({
    id: stu.id,
    name: `${stu.firstName} ${stu.lastName}`,
    code: `${stu.firstName.charAt(0)}${stu.lastName.charAt(0)}`.toUpperCase(),
    grade: stu.grade,
    section: 'A', // Visual layout section
    roll: `STU-${new Date(stu.admissionDate).getFullYear()}-${stu.id.substring(0, 4).toUpperCase()}`,
    status: 'Enrolled' // Visual layout default status
  }));

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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200 w-full sm:w-auto"
        >
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
            Showing 1 to {studentsList.length} of {studentsList.length} register entries
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

      {/* --- ADD STUDENT MODAL DIALOG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
            onClick={() => {
              if (!isSubmitting) setIsModalOpen(false);
            }}
          />
          
          {/* Modal Container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="font-display-lg text-lg font-bold text-slate-900">Add New Student</h2>
                <p className="font-body-sm text-xs text-slate-400 font-medium">Record a new student profile in the register.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-1.5 rounded-lg transition-colors outline-none disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Form Sheet */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold animate-in fade-in duration-150">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl font-body-sm text-xs focus:bg-white focus:ring-1 outline-none text-slate-800 transition-all placeholder:text-slate-400 ${
                      errors.firstName ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    placeholder="e.g. Alexander"
                  />
                  {errors.firstName && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl font-body-sm text-xs focus:bg-white focus:ring-1 outline-none text-slate-800 transition-all placeholder:text-slate-400 ${
                      errors.lastName ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    placeholder="e.g. Lewis"
                  />
                  {errors.lastName && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 py-2 bg-slate-50 border rounded-xl font-body-sm text-xs focus:bg-white focus:ring-1 outline-none text-slate-800 transition-all placeholder:text-slate-400 ${
                    errors.email ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                  placeholder="e.g. alewis.student@eduind.com"
                />
                {errors.email && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Grade */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade Level</label>
                  <div className="relative">
                    <select
                      name="grade"
                      value={formValues.grade}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full pl-3 pr-10 py-2 bg-slate-50 border rounded-xl font-body-sm text-xs focus:bg-white focus:ring-1 outline-none text-slate-700 transition-all appearance-none cursor-pointer ${
                        errors.grade ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
                      }`}
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  {errors.grade && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.grade}</p>}
                </div>

                {/* Admission Date */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admission Date</label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formValues.admissionDate}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl font-body-sm text-xs focus:bg-white focus:ring-1 outline-none text-slate-800 transition-all ${
                      errors.admissionDate ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.admissionDate && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.admissionDate}</p>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 select-none">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all disabled:opacity-50 bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span>Creating Student...</span>
                    </>
                  ) : (
                    <span>Create Student</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TOAST FEEDBACK NOTIFICATION --- */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all animate-in fade-in slide-in-from-bottom-5 duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <span className="font-title-sm text-xs font-semibold">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-75 transition-opacity text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
