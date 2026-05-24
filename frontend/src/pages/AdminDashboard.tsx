import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function AdminDashboard() {
    const [_data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('AdminDashboard').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<nav className="fixed left-0 top-0 h-full w-sidebar-width bg-primary dark:bg-primary-container flex flex-col z-50">
<div className="p-lg flex items-center gap-sm">
<span className="material-symbols-outlined text-on-primary font-display-lg text-display-lg" style={{'fontVariationSettings': "'FILL' 1"}}>school</span>
<div>
<h1 className="font-display-lg text-display-lg text-on-primary dark:text-on-primary-fixed">EduInd</h1>
<p className="font-body-sm text-body-sm text-on-primary dark:text-on-primary-fixed opacity-60">Admin Terminal</p>
</div>
</div>
<div className="px-md mb-lg">
<button className="w-full bg-surface-container-lowest text-primary font-title-sm text-title-sm py-sm px-md rounded flex items-center justify-center gap-sm transition-all duration-200 ease-in-out hover:bg-surface-container-low">
<span className="material-symbols-outlined">add</span>
                Quick Report
            </button>
</div>
<ul className="flex flex-col flex-grow px-sm gap-xs overflow-y-auto">
<li>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed border-l-2 border-secondary-fixed opacity-100 bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" to="/dashboard">
<span className="material-symbols-outlined">dashboard</span>
                    Admin Dashboard
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" to="/students">
<span className="material-symbols-outlined">group</span>
                    Student Directory
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" to="/fees">
<span className="material-symbols-outlined">payments</span>
                    Fee Management
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" to="/academic">
<span className="material-symbols-outlined">menu_book</span>
                    Academic Hub
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" to="/staff">
<span className="material-symbols-outlined">badge</span>
                    Staff Directory
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" to="/portal">
<span className="material-symbols-outlined">family_restroom</span>
                    Parent Portal
                </Link>
</li>
</ul>
<div className="mt-auto px-sm py-md bg-primary dark:bg-primary-container border-t border-on-primary-fixed-variant/20">
<ul className="flex flex-col gap-xs">
<li>
<a className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" href="#">
<span className="material-symbols-outlined">settings</span>
                        Settings
                    </a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-title-sm" href="#">
<span className="material-symbols-outlined">help</span>
                        Support
                    </a>
</li>
</ul>
</div>
</nav>

<div className="flex-1 flex flex-col ml-sidebar-width min-h-screen">

<header className="flex justify-between items-center h-16 px-lg bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline z-40">
<div className="flex-1 flex items-center">
<div className="relative w-64">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
<input className="w-full pl-[36px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body-sm text-body-sm text-on-surface transition-all" placeholder="Search students, staff..." type="text"/>
</div>
</div>
<div className="flex items-center gap-sm">
<button className="p-sm text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-full transition-all scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-sm text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-full transition-all scale-95 duration-150">
<span className="material-symbols-outlined">history</span>
</button>
<button className="p-sm text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-full transition-all scale-95 duration-150">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>

<main className="flex-1 p-lg bg-surface-container-low overflow-y-auto">
<div className="flex justify-between items-end mb-lg">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Overview</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Today's snapshot of institutional performance.</p>
</div>
<span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-sm py-xs rounded">Oct 24, 2023</span>
</div>

<div className="grid grid-cols-12 gap-md mb-xl">

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-md">
<span className="material-symbols-outlined text-secondary text-[24px]">groups</span>
<span className="font-label-caps text-label-caps text-on-surface bg-secondary-container px-sm py-xs rounded-full">+2.4%</span>
</div>
<div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">Total Enrolled</p>
<p className="font-display-lg text-display-lg text-on-surface">3,248</p>
</div>
</div>

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-md">
<span className="material-symbols-outlined text-secondary text-[24px]">fact_check</span>
<span className="font-label-caps text-label-caps text-on-surface bg-secondary-container px-sm py-xs rounded-full">Target: 95%</span>
</div>
<div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">Daily Attendance</p>
<p className="font-display-lg text-display-lg text-on-surface">96.2%</p>
</div>
</div>

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-md">
<span className="material-symbols-outlined text-secondary text-[24px]">account_balance_wallet</span>
<span className="font-label-caps text-label-caps text-error bg-error-container px-sm py-xs rounded-full">Action Needed</span>
</div>
<div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">Pending Fees</p>
<p className="font-display-lg text-display-lg text-on-surface">$42.5k</p>
</div>
</div>

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-lg border border-outline-variant p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-md">
<span className="material-symbols-outlined text-secondary text-[24px]">campaign</span>
</div>
<div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">Active Announcements</p>
<p className="font-display-lg text-display-lg text-on-surface">4</p>
</div>
</div>
</div>
<div className="grid grid-cols-12 gap-lg">

<div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">

<div className="bg-surface-container-lowest rounded-lg border border-outline-variant flex flex-col">
<div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-bright rounded-t-lg">
<h3 className="font-title-sm text-title-sm text-on-surface">Recent Admissions Activity</h3>
<button className="font-label-caps text-label-caps text-primary hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant bg-surface-container-low">
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Student Name</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Grade</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Status</th>
<th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Date</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
<td className="px-md py-sm font-table-data text-table-data text-on-surface">Emma Thompson</td>
<td className="px-md py-sm font-table-data text-table-data text-on-surface-variant">10th Grade</td>
<td className="px-md py-sm">
<span className="inline-flex items-center px-sm py-xs rounded-full text-[10px] font-bold tracking-wide uppercase bg-secondary-container text-on-secondary-container">Enrolled</span>
</td>
<td className="px-md py-sm font-table-data text-table-data text-on-surface-variant">Today, 09:41 AM</td>
</tr>
<tr className="border-b border-outline-variant/50 bg-slate-50/30 hover:bg-surface-container-low/50 transition-colors">
<td className="px-md py-sm font-table-data text-table-data text-on-surface">Lucas Chen</td>
<td className="px-md py-sm font-table-data text-table-data text-on-surface-variant">8th Grade</td>
<td className="px-md py-sm">
<span className="inline-flex items-center px-sm py-xs rounded-full text-[10px] font-bold tracking-wide uppercase bg-surface-variant text-on-surface-variant">Pending Doc</span>
</td>
<td className="px-md py-sm font-table-data text-table-data text-on-surface-variant">Yesterday</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-md py-sm font-table-data text-table-data text-on-surface">Sophia Martinez</td>
<td className="px-md py-sm font-table-data text-table-data text-on-surface-variant">12th Grade</td>
<td className="px-md py-sm">
<span className="inline-flex items-center px-sm py-xs rounded-full text-[10px] font-bold tracking-wide uppercase bg-error-container text-error">Action Req</span>
</td>
<td className="px-md py-sm font-table-data text-table-data text-on-surface-variant">Oct 22</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-4 flex flex-col gap-lg">

<div className="relative bg-surface-container-lowest rounded-lg border border-outline-variant p-md overflow-hidden">

<div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-fixed opacity-20 rounded-full blur-2xl"></div>
<h3 className="font-title-sm text-title-sm text-on-surface mb-md relative z-10">Quick Actions</h3>
<div className="grid grid-cols-2 gap-sm relative z-10">
<button className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded hover:border-primary hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined text-secondary mb-sm">person_add</span>
<span className="font-body-sm text-body-sm font-semibold">Add Student</span>
</button>
<button className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded hover:border-primary hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined text-secondary mb-sm">post_add</span>
<span className="font-body-sm text-body-sm font-semibold">Post Alert</span>
</button>
<button className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded hover:border-primary hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined text-secondary mb-sm">receipt_long</span>
<span className="font-body-sm text-body-sm font-semibold">Log Payment</span>
</button>
<button className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded hover:border-primary hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined text-secondary mb-sm">event</span>
<span className="font-body-sm text-body-sm font-semibold">Schedule</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg border border-outline-variant flex flex-col">
<div className="p-md border-b border-outline-variant bg-surface-bright rounded-t-lg">
<h3 className="font-title-sm text-title-sm text-on-surface">Active Announcements</h3>
</div>
<div className="p-md flex flex-col gap-md">
<div className="border-l-2 border-primary pl-md">
<p className="font-body-sm text-body-sm font-bold text-on-surface mb-xs">Winter Break Schedule Published</p>
<p className="font-table-data text-table-data text-on-surface-variant">Sent to all Parents &amp; Staff • 2h ago</p>
</div>
<div className="border-l-2 border-outline-variant pl-md">
<p className="font-body-sm text-body-sm font-bold text-on-surface mb-xs">System Maintenance Notice</p>
<p className="font-table-data text-table-data text-on-surface-variant">Admin Only • 1d ago</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

        </>
    );
}
