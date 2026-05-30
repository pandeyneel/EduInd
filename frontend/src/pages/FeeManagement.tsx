import { useApi } from '../api';
import BackendStatusBanner from '../components/BackendStatusBanner';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Search,
  ChevronDown,
  Download,
  Plus,
  ArrowUpRight
} from 'lucide-react';

interface FeeData {
  Message: string;
}

export default function FeeManagement() {
  const { loading, retry, isFallback } = useApi<FeeData>('FeeManagement', {
    Message: "Data for Fee Management"
  });

  const transactionList = [
    { id: 1, name: 'Emma Thompson', idNum: 'STU-2023-0104', type: 'Tuition Fee', amount: 4200.00, date: 'Oct 26, 2026', method: 'Stripe Pay', status: 'Completed' },
    { id: 2, name: 'Lucas Chen', idNum: 'STU-2023-0941', type: 'Tuition Fee', amount: 4200.00, date: 'Oct 25, 2026', method: 'Bank Transfer', status: 'Completed' },
    { id: 3, name: 'Sophia Martinez', idNum: 'STU-2022-1102', type: 'Laboratory Fee', amount: 150.00, date: 'Oct 22, 2026', method: 'Credit Card', status: 'Pending' },
    { id: 4, name: 'Alexander Lewis', idNum: 'STU-2023-0842', type: 'Activity Fee', amount: 75.00, date: 'Oct 15, 2026', method: 'Stripe Pay', status: 'Completed' },
    { id: 5, name: 'Diana Prince', idNum: 'STU-2021-3302', type: 'Tuition Fee', amount: 4200.00, date: 'Oct 10, 2026', method: 'Stripe Pay', status: 'Failed' }
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      
      {/* Backend Status Alert */}
      <BackendStatusBanner isFallback={isFallback} loading={loading} retry={retry} />

      {/* Page Title Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Fee Management
          </h1>
          <p className="font-body-sm text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            Track outstanding billing, collection metrics, and recent parent transaction records.
          </p>
        </div>
        <div className="flex gap-2.5 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all bg-white">
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export Ledgers</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-150/10 hover:shadow-indigo-150/20 active:scale-95 transition-all duration-200">
            <Plus className="w-4 h-4" />
            <span>Generate Invoice</span>
          </button>
        </div>
      </div>

      {/* Finance Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Expected collection */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full select-none">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8.4%</span>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Total Collections</p>
            <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">$384,200.00</p>
            <p className="text-[10px] text-slate-400 mt-2 font-medium">Out of $425,000.00 target this term</p>
          </div>
        </div>

        {/* Pending Ledger */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full select-none">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-12%</span>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Outstanding Balances</p>
            <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">$42,500.00</p>
            <p className="text-[10px] text-rose-500 font-semibold mt-2">Requires immediate billing notification</p>
          </div>
        </div>

        {/* Invoice users */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-label-caps text-[9px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md font-bold select-none">
              INVOICES
            </span>
          </div>
          <div className="mt-5">
            <p className="font-body-sm text-xs text-slate-400 font-medium">Active Accounts Billed</p>
            <p className="font-display-lg text-2xl font-bold text-slate-900 mt-1">324 Accounts</p>
            <p className="text-[10px] text-slate-400 mt-2 font-medium">100% of enrolled list mapped</p>
          </div>
        </div>

      </div>

      {/* Structured Ledger Area */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-40">
              <select className="w-full pl-4 pr-10 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all appearance-none cursor-pointer">
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Account Student</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Fee Category</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Amount Billed</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Billing Date</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700 bg-white">
              {transactionList.map((tx) => {
                let badge = (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                    {tx.status}
                  </span>
                );
                if (tx.status === 'Pending') {
                  badge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                      {tx.status}
                    </span>
                  );
                } else if (tx.status === 'Failed') {
                  badge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
                      {tx.status}
                    </span>
                  );
                }

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 font-title-sm text-sm">{tx.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium mt-0.5">{tx.idNum}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{tx.type}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">${tx.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-400 font-medium">{tx.date}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{tx.method}</td>
                    <td className="px-6 py-4 text-center">{badge}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-650 hover:bg-slate-50 rounded-lg transition-colors inline-flex items-center justify-center border border-transparent hover:border-slate-200">
                        <ArrowUpRight className="w-4 h-4 text-slate-405" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
