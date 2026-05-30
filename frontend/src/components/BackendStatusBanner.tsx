import { Sparkles, RefreshCw } from 'lucide-react';

interface BackendStatusBannerProps {
  isFallback: boolean;
  loading: boolean;
  retry: () => void;
}

export default function BackendStatusBanner({ isFallback, loading, retry }: BackendStatusBannerProps) {
  if (!isFallback) return null;

  return (
    <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-[0_2px_8px_rgba(245,158,11,0.05)] text-amber-800 animate-in fade-in slide-in-from-top-1 duration-200 select-none">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-amber-150 rounded-xl text-amber-600 shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="font-title-sm text-sm font-bold text-slate-800">Render Cloud Backend waking up...</h4>
          <p className="font-body-sm text-[11px] text-slate-500 font-medium mt-0.5 leading-normal">
            The Render free tier service is waking up (takes about 50 seconds on cold start). We have safely loaded a high-fidelity local simulation in the meantime so you can fully explore the platform.
          </p>
        </div>
      </div>
      
      <button
        onClick={retry}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-amber-100 transition-all duration-200 shrink-0"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Connecting...' : 'Retry Connection'}</span>
      </button>
    </div>
  );
}
