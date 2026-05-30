import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';
import {
  Plus,
  ArrowUpRight,
  TrendingDown,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

export default function FeeManagement() {
  const [_data, setData] = useState<any>(null);

  useEffect(() => {
    // Connect to .NET backend
    fetchBackendData('FeeManagement').then(setData).catch(console.error);
  }, []);

  const transactions = [
    { id: '#INV-2024-089', name: 'Eleanor Shellstrop', desc: 'Tuition - Fall Term', amount: '$4,500.00', date: 'Oct 15, 2024', status: 'Paid' },
    { id: '#INV-2024-090', name: 'Chidi Anagonye', desc: 'Library Fines & Fees', amount: '$125.00', date: 'Oct 18, 2024', status: 'Partial' },
    { id: '#INV-2024-091', name: 'Tahani Al-Jamil', desc: 'Tuition - Fall Term', amount: '$4,500.00', date: 'Sep 01, 2024', status: 'Overdue' },
    { id: '#INV-2024-092', name: 'Jason Mendoza', desc: 'Athletic Equipment Fee', amount: '$350.00', date: 'Nov 01, 2024', status: 'Pending' },
    { id: '#INV-2024-093', name: 'Michael', desc: 'Architecture Lab Fee', amount: '$800.00', date: 'Oct 15, 2024', status: 'Paid' }
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Page Title & Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display-lg text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Financial Ledger
          </h1>
          <p className="font-body-sm text-sm text-slate-400 mt-1.5 font-medium">
            Monitor institutional cash flows, track accounts receivable, and dispatch student invoices.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-title-sm text-xs font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all duration-200">
          <Plus className="w-4 h-4" />
          Generate Invoice
        </button>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Collected */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-title-sm text-sm font-semibold text-slate-400">Total Revenue Collected</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-display-lg text-2xl font-extrabold text-slate-900 tracking-tight">$1,245,000</div>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full select-none w-max">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-2.4% vs last term</span>
            </div>
          </div>
        </div>

        {/* Pending Receivables */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-title-sm text-sm font-semibold text-slate-400">Outstanding Receivables</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-display-lg text-2xl font-extrabold text-slate-900 tracking-tight">$342,500</div>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full select-none w-max">
              <span>45 invoices open</span>
            </div>
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md border-l-4 border-l-rose-500 transition-all duration-200 group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-title-sm text-sm font-semibold text-rose-600">Overdue Collections</span>
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-display-lg text-2xl font-extrabold text-slate-900 tracking-tight">$85,200</div>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full select-none w-max">
              <span>Action Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Ledger Table & Filters Section */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Table Log */}
        <div className="col-span-12 lg:col-span-9 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-title-sm text-base font-bold text-slate-900">Recent Transactions</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-700 transition-all flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-700 transition-all flex items-center justify-center shrink-0">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Student Profile</th>
                  <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Billing Amount</th>
                  <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-table-data text-xs text-slate-700">
                {transactions.map((tx) => {
                  let statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                      Paid
                    </span>
                  );
                  if (tx.status === 'Partial') {
                    statusBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                        Partial
                      </span>
                    );
                  } else if (tx.status === 'Overdue') {
                    statusBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
                        Overdue
                      </span>
                    );
                  } else if (tx.status === 'Pending') {
                    statusBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600">
                        Pending
                      </span>
                    );
                  }

                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 font-mono">{tx.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{tx.name}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{tx.desc}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{tx.amount}</td>
                      <td className="px-6 py-4 text-slate-400 font-medium">{tx.date}</td>
                      <td className="px-6 py-4">{statusBadge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-title-sm text-base font-bold text-slate-900">Ledger Filters</h3>
            
            {/* Date Range Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Billing Term</label>
              
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">From</span>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all font-semibold"
                      value="01 Sep 2026"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">To</span>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-body-sm text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 transition-all font-semibold"
                      value="31 Oct 2026"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Checkbox Group */}
            <div className="space-y-3.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Collection Status</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-body-sm text-xs text-slate-600 font-medium select-none">Paid In Full</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-body-sm text-xs text-slate-600 font-medium select-none">Partial Payments</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-body-sm text-xs text-slate-600 font-medium select-none">Overdue Collections</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-body-sm text-xs text-slate-600 font-medium select-none">Pending Invoices</span>
                </label>
              </div>
            </div>

            {/* Apply Button */}
            <button className="w-full py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all">
              Apply Filter Parameters
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
