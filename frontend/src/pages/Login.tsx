import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const role = await login(email, password);
      if (role === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillQuickLogin = (role: 'ADMIN' | 'STUDENT') => {
    if (role === 'ADMIN') {
      setEmail('admin@eduind.com');
      setPassword('Admin123');
    } else {
      setEmail('alewis.student@eduind.com');
      setPassword('Student123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-800">
      
      {/* Decorative background abstract circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-50/50 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-50/45 blur-3xl pointer-events-none z-0"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-indigo-150/40">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="mt-6 text-center font-display-lg text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
            Welcome to EduInd
          </h2>
          <p className="mt-2 text-center font-body-sm text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
            Smart Education Management System
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white border border-slate-200/80 rounded-3xl py-8 px-4 sm:px-10 shadow-xl shadow-slate-100/50">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl border border-rose-100 bg-rose-50/60 flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="font-body-sm text-xs text-rose-600 font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@eduind.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-label-caps text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-sm font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In to Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick-login Helpers */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="px-1 font-label-caps text-[9px] text-slate-450 font-bold uppercase tracking-wider block mb-3.5">
              Quick Sandbox Credentials
            </span>
            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => fillQuickLogin('ADMIN')}
                className="flex flex-col items-start p-3 border border-slate-200/80 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/10 text-left transition-all group active:scale-95"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin User</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium mt-1">Full control permissions</span>
              </button>

              <button
                type="button"
                onClick={() => fillQuickLogin('STUDENT')}
                className="flex flex-col items-start p-3 border border-slate-200/80 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/10 text-left transition-all group active:scale-95"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <span className="w-3.5 h-3.5 border-1.5 border-indigo-600 rounded-full flex items-center justify-center font-bold text-[9px] leading-none text-center">S</span>
                  <span>Student Portal</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium mt-1">Alexander Lewis profile</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
