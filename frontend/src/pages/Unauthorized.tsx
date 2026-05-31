import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function Unauthorized() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    if (user && user.role === 'ADMIN') {
      navigate('/dashboard');
    } else if (user && user.role === 'STUDENT') {
      navigate('/student/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl shadow-slate-100/50 flex flex-col items-center">
        {/* Error icon */}
        <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm mb-6 animate-bounce">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h1 className="font-display-lg text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
          Access Denied
        </h1>
        
        <p className="font-body-sm text-xs sm:text-sm text-slate-400 mt-2 font-medium">
          Error 403 • Insufficient Permissions
        </p>

        <p className="font-body-md text-xs sm:text-sm text-slate-500 mt-4 leading-relaxed max-w-[320px]">
          Your account does not possess authorization to view this secure administrative panel. 
        </p>

        <div className="mt-8 flex gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={handleBackToDashboard}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200"
          >
            <LayoutDashboard className="w-4 h-4 text-white" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
