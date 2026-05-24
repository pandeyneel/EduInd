import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function FeeManagement() {
    const [_data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('FeeManagement').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<aside className="fixed left-0 top-0 h-full w-sidebar-width bg-primary dark:bg-primary-container flex flex-col z-20">

<div className="px-lg py-xl">
<h1 className="font-display-lg text-display-lg text-on-primary dark:text-on-primary-fixed">EduInd</h1>
<p className="font-body-sm text-body-sm text-on-primary-container mt-xs">Admin Terminal</p>
</div>

<nav className="flex-1 overflow-y-auto mt-md">
<ul className="flex flex-col gap-base">
<li>
<Link className="flex items-center px-lg py-md text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/dashboard">
<span className="material-symbols-outlined mr-md">dashboard</span>
<span className="font-title-sm text-title-sm">Admin Dashboard</span>
</Link>
</li>
<li>
<Link className="flex items-center px-lg py-md text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/students">
<span className="material-symbols-outlined mr-md">group</span>
<span className="font-title-sm text-title-sm">Student Directory</span>
</Link>
</li>
<li>
<Link className="flex items-center px-lg py-md text-on-primary dark:text-on-primary-fixed border-l-2 border-secondary-fixed opacity-100 bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/fees">
<span className="material-symbols-outlined mr-md">payments</span>
<span className="font-title-sm text-title-sm">Fee Management</span>
</Link>
</li>
<li>
<Link className="flex items-center px-lg py-md text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/academic">
<span className="material-symbols-outlined mr-md">menu_book</span>
<span className="font-title-sm text-title-sm">Academic Hub</span>
</Link>
</li>
<li>
<Link className="flex items-center px-lg py-md text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/staff">
<span className="material-symbols-outlined mr-md">badge</span>
<span className="font-title-sm text-title-sm">Staff Directory</span>
</Link>
</li>
<li>
<Link className="flex items-center px-lg py-md text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/portal">
<span className="material-symbols-outlined mr-md">family_restroom</span>
<span className="font-title-sm text-title-sm">Parent Portal</span>
</Link>
</li>
</ul>
</nav>

<div className="p-lg">
<button className="w-full py-md bg-secondary-fixed text-on-secondary-fixed font-title-sm text-title-sm rounded-lg mb-xl hover:bg-secondary-container transition-colors">
                Quick Report
            </button>
<ul className="flex flex-col gap-base border-t border-on-primary-fixed-variant pt-lg">
<li>
<a className="flex items-center px-md py-sm text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mr-md text-[20px]">settings</span>
<span className="font-body-sm text-body-sm">Settings</span>
</a>
</li>
<li>
<a className="flex items-center px-md py-sm text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mr-md text-[20px]">help</span>
<span className="font-body-sm text-body-sm">Support</span>
</a>
</li>
</ul>
</div>
</aside>

<main className="flex-1 ml-sidebar-width flex flex-col min-h-screen">

<header className="docked full-width top-0 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center h-16 px-lg z-10 sticky">

<div className="flex items-center w-1/3">
<div className="relative w-full max-w-md">
<span className="material-symbols-outlined absolute left-md top-1/2 transform -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-[44px] pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-tertiary-fixed focus:ring-2 focus:ring-tertiary-fixed-dim transition-all" placeholder="Search students, invoices..." type="text"/>
</div>
</div>

<div className="flex items-center gap-md">
<button className="p-sm text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-full transition-all scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-sm text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-full transition-all scale-95 duration-150">
<span className="material-symbols-outlined">history</span>
</button>
<button className="p-sm text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-full transition-all scale-95 duration-150">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>

<div className="flex-1 p-xl overflow-y-auto">
<div className="flex justify-between items-end mb-xl">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Fee Management</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-xs">Overview and tracking of institutional revenue.</p>
</div>
<button className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-lg font-title-sm text-title-sm hover:bg-on-primary-fixed-variant transition-colors">
<span className="material-symbols-outlined text-[20px]">add</span>
                    Generate Invoice
                </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
<div className="flex justify-between items-start mb-md">
<span className="font-title-sm text-title-sm text-on-surface-variant">Total Collected</span>
<span className="material-symbols-outlined text-outline">account_balance</span>
</div>
<div className="font-display-lg text-display-lg text-on-surface">$1,245,000</div>
<div className="flex items-center gap-xs mt-sm text-error">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
<span className="font-body-sm text-body-sm">2.4% vs last term</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
<div className="flex justify-between items-start mb-md">
<span className="font-title-sm text-title-sm text-on-surface-variant">Pending Receivables</span>
<span className="material-symbols-outlined text-outline">pending_actions</span>
</div>
<div className="font-display-lg text-display-lg text-on-surface">$342,500</div>
<div className="flex items-center gap-xs mt-sm text-tertiary-container">
<span className="material-symbols-outlined text-[16px]">info</span>
<span className="font-body-sm text-body-sm">45 invoices open</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg border-l-4 border-l-error">
<div className="flex justify-between items-start mb-md">
<span className="font-title-sm text-title-sm text-error">Overdue Payments</span>
<span className="material-symbols-outlined text-error">warning</span>
</div>
<div className="font-display-lg text-display-lg text-on-surface">$85,200</div>
<div className="flex items-center gap-xs mt-sm text-error">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-body-sm text-body-sm">Requires immediate action</span>
</div>
</div>
</div>

<div className="grid grid-cols-12 gap-lg">

<div className="col-span-12 lg:col-span-9 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div className="p-lg border-b border-outline-variant flex justify-between items-center">
<h3 className="font-title-sm text-title-sm text-on-surface">Recent Transactions</h3>
<div className="flex gap-sm">
<button className="p-sm border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant">download</span>
</button>
<button className="p-sm border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant bg-surface-container-low">
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Invoice ID</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Student</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Description</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Amount</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Due Date</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Status</th>
</tr>
</thead>
<tbody className="font-table-data text-table-data text-on-surface">
<tr className="border-b border-surface-container-high hover:bg-surface-container-lowest transition-colors">
<td className="px-md py-md font-bold text-primary">#INV-2024-089</td>
<td className="px-md py-md">Eleanor Shellstrop</td>
<td className="px-md py-md text-on-surface-variant">Tuition - Fall Term</td>
<td className="px-md py-md">$4,500.00</td>
<td className="px-md py-md">Oct 15, 2024</td>
<td className="px-md py-md">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-primary/10 text-primary font-bold text-[11px] uppercase tracking-wider">
                                            Paid
                                        </span>
</td>
</tr>
<tr className="border-b border-surface-container-high bg-surface-container-low/30 hover:bg-surface-container-lowest transition-colors">
<td className="px-md py-md font-bold text-primary">#INV-2024-090</td>
<td className="px-md py-md">Chidi Anagonye</td>
<td className="px-md py-md text-on-surface-variant">Library Fines &amp; Fees</td>
<td className="px-md py-md">$125.00</td>
<td className="px-md py-md">Oct 18, 2024</td>
<td className="px-md py-md">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-tertiary-container/10 text-tertiary-container font-bold text-[11px] uppercase tracking-wider">
                                            Partial
                                        </span>
</td>
</tr>
<tr className="border-b border-surface-container-high hover:bg-surface-container-lowest transition-colors">
<td className="px-md py-md font-bold text-primary">#INV-2024-091</td>
<td className="px-md py-md">Tahani Al-Jamil</td>
<td className="px-md py-md text-on-surface-variant">Tuition - Fall Term</td>
<td className="px-md py-md">$4,500.00</td>
<td className="px-md py-md">Sep 01, 2024</td>
<td className="px-md py-md">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-error/10 text-error font-bold text-[11px] uppercase tracking-wider">
                                            Overdue
                                        </span>
</td>
</tr>
<tr className="border-b border-surface-container-high bg-surface-container-low/30 hover:bg-surface-container-lowest transition-colors">
<td className="px-md py-md font-bold text-primary">#INV-2024-092</td>
<td className="px-md py-md">Jason Mendoza</td>
<td className="px-md py-md text-on-surface-variant">Athletic Equipment Fee</td>
<td className="px-md py-md">$350.00</td>
<td className="px-md py-md">Nov 01, 2024</td>
<td className="px-md py-md">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-surface-tint/10 text-surface-tint font-bold text-[11px] uppercase tracking-wider">
                                            Pending
                                        </span>
</td>
</tr>
<tr className="hover:bg-surface-container-lowest transition-colors">
<td className="px-md py-md font-bold text-primary">#INV-2024-093</td>
<td className="px-md py-md">Michael</td>
<td className="px-md py-md text-on-surface-variant">Architecture Lab Fee</td>
<td className="px-md py-md">$800.00</td>
<td className="px-md py-md">Oct 15, 2024</td>
<td className="px-md py-md">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-primary/10 text-primary font-bold text-[11px] uppercase tracking-wider">
                                            Paid
                                        </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="col-span-12 lg:col-span-3">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg sticky top-[88px]">
<h3 className="font-title-sm text-title-sm text-on-surface mb-md">Filters</h3>
<div className="mb-lg">
<label className="block font-body-sm font-bold text-on-surface mb-sm">Date Range</label>
<div className="space-y-sm">
<div>
<span className="text-[12px] text-on-surface-variant block mb-xs">From</span>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 transform -translate-y-1/2 text-outline-variant text-[18px]">calendar_today</span>
<input className="w-full pl-lg pr-sm py-sm border border-outline-variant rounded bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-body-sm font-body-sm transition-all" type="text" value="01 Sep 2024"/>
</div>
</div>
<div>
<span className="text-[12px] text-on-surface-variant block mb-xs">To</span>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 transform -translate-y-1/2 text-outline-variant text-[18px]">calendar_today</span>
<input className="w-full pl-lg pr-sm py-sm border border-outline-variant rounded bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-body-sm font-body-sm transition-all" type="text" value="31 Oct 2024"/>
</div>
</div>
</div>
</div>
<div className="mb-lg">
<label className="block font-body-sm font-bold text-on-surface mb-sm">Status</label>
<div className="space-y-xs">
<label className="flex items-center gap-sm">
<input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Paid</span>
</label>
<label className="flex items-center gap-sm">
<input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Partial</span>
</label>
<label className="flex items-center gap-sm">
<input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Overdue</span>
</label>
<label className="flex items-center gap-sm">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Pending</span>
</label>
</div>
</div>
<button className="w-full py-sm border border-outline-variant text-on-surface font-title-sm text-title-sm rounded hover:bg-surface-container-low transition-colors">
                            Apply Filters
                        </button>
</div>
</div>
</div>
</div>
</main>

        </>
    );
}
