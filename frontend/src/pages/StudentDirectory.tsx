import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function StudentDirectory() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('StudentDirectory').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<nav className="fixed left-0 top-0 h-full w-sidebar-width bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-fixed flex flex-col z-20 transition-all duration-200 ease-in-out">
<div className="p-lg border-b border-on-primary/10">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-display-lg" data-icon="school">school</span>
<div>
<h1 className="font-display-lg text-display-lg text-on-primary dark:text-on-primary-fixed tracking-tight">EduInd</h1>
<p className="font-label-caps text-label-caps opacity-60 uppercase mt-xs">Admin Terminal</p>
</div>
</div>
</div>
<div className="flex-1 overflow-y-auto py-md flex flex-col gap-base px-sm">
<Link className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" to="/dashboard">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-title-sm text-title-sm">Admin Dashboard</span>
</Link>
<Link className="flex items-center gap-md px-md py-sm rounded transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed border-l-2 border-secondary-fixed opacity-100 bg-on-primary-fixed-variant/50" to="/students">
<span className="material-symbols-outlined" data-icon="group">group</span>
<span className="font-title-sm text-title-sm">Student Directory</span>
</Link>
<Link className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" to="/fees">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span className="font-title-sm text-title-sm">Fee Management</span>
</Link>
<Link className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" to="/academic">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-title-sm text-title-sm">Academic Hub</span>
</Link>
<Link className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" to="/staff">
<span className="material-symbols-outlined" data-icon="badge">badge</span>
<span className="font-title-sm text-title-sm">Staff Directory</span>
</Link>
<Link className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" to="/portal">
<span className="material-symbols-outlined" data-icon="family_restroom">family_restroom</span>
<span className="font-title-sm text-title-sm">Parent Portal</span>
</Link>
</div>
<div className="p-md">
<button className="w-full bg-secondary text-on-secondary font-title-sm text-title-sm py-sm rounded-lg flex items-center justify-center gap-sm hover:bg-opacity-90 transition-opacity">
<span className="material-symbols-outlined" data-icon="add">add</span>
                Quick Report
            </button>
</div>
<div className="mt-auto border-t border-on-primary/10 p-sm flex flex-col gap-base">
<a className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-title-sm text-title-sm">Settings</span>
</a>
<a className="flex items-center gap-md px-md py-sm rounded hover:bg-on-primary-fixed-variant hover:opacity-100 transition-all duration-200 ease-in-out text-on-primary dark:text-on-primary-fixed opacity-60" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span className="font-title-sm text-title-sm">Support</span>
</a>
</div>
</nav>

<div className="flex-1 ml-sidebar-width flex flex-col min-h-screen">

<header className="bg-surface dark:bg-surface-dim flex justify-between items-center h-16 px-lg border-b border-outline-variant dark:border-outline sticky top-0 z-10 scale-95 duration-150 transform-none">
<div className="flex items-center w-1/3">
<div className="relative w-full max-w-md hidden">

<span className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim font-bold">EduInd</span>
</div>
<div className="relative w-full max-w-md flex items-center">
<span className="material-symbols-outlined absolute left-md text-on-surface-variant" data-icon="search">search</span>
<input className="w-full pl-xl pr-md py-sm bg-surface-container-low border-none rounded-full font-body-sm text-body-sm focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder:text-on-surface-variant transition-all" placeholder="Global search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-sm">
<button className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined" data-icon="history">history</span>
</button>
<button className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>

<main className="flex-1 p-lg flex flex-col gap-lg">

<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-background">Student Directory</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Manage and view all enrolled student records.</p>
</div>
<button className="bg-primary text-on-primary font-title-sm text-title-sm px-md py-sm rounded-lg hover:bg-opacity-90 transition-opacity flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]" data-icon="person_add">person_add</span>
                    Add Student
                </button>
</div>

<div className="flex flex-col sm:flex-row gap-md items-end bg-surface-container-lowest p-md rounded-lg border border-outline-variant">
<div className="flex-1 w-full">
<label className="block font-body-sm text-body-sm font-bold text-on-surface mb-xs">Search Students</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="search">search</span>
<input className="w-full pl-[36px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-sm text-body-sm outline-none transition-all" placeholder="Search by name or roll number..." type="text"/>
</div>
</div>
<div className="w-full sm:w-48">
<label className="block font-body-sm text-body-sm font-bold text-on-surface mb-xs">Grade Level</label>
<select className="w-full px-sm py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-sm text-body-sm outline-none transition-all text-on-surface">
<option value="">All Grades</option>
<option value="9">Grade 9</option>
<option value="10">Grade 10</option>
<option value="11">Grade 11</option>
<option value="12">Grade 12</option>
</select>
</div>
<div className="w-full sm:w-48">
<label className="block font-body-sm text-body-sm font-bold text-on-surface mb-xs">Section</label>
<select className="w-full px-sm py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-sm text-body-sm outline-none transition-all text-on-surface">
<option value="">All Sections</option>
<option value="A">Section A</option>
<option value="B">Section B</option>
<option value="C">Section C</option>
</select>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden flex-1">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant bg-surface-bright">
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Student Name</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Grade</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Section</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Roll Number</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Status</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="font-table-data text-table-data text-on-surface">
<tr className="even:bg-surface-container-low border-b border-outline-variant/30 hover:bg-surface-container transition-colors group">
<td className="py-sm px-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-caps">
                                            AL
                                        </div>
<span className="font-title-sm text-title-sm text-on-surface">Alexander Lewis</span>
</div>
</td>
<td className="py-sm px-md">Grade 10</td>
<td className="py-sm px-md">A</td>
<td className="py-sm px-md">2023-1042</td>
<td className="py-sm px-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide uppercase">Enrolled</span>
</td>
<td className="py-sm px-md text-right">
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr className="even:bg-surface-container-low border-b border-outline-variant/30 hover:bg-surface-container transition-colors group">
<td className="py-sm px-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-caps">
                                            BC
                                        </div>
<span className="font-title-sm text-title-sm text-on-surface">Bianca Castafiore</span>
</div>
</td>
<td className="py-sm px-md">Grade 11</td>
<td className="py-sm px-md">B</td>
<td className="py-sm px-md">2022-0911</td>
<td className="py-sm px-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide uppercase">Enrolled</span>
</td>
<td className="py-sm px-md text-right">
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr className="even:bg-surface-container-low border-b border-outline-variant/30 hover:bg-surface-container transition-colors group">
<td className="py-sm px-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-label-caps">
                                            CW
                                        </div>
<span className="font-title-sm text-title-sm text-on-surface">Charles Wang</span>
</div>
</td>
<td className="py-sm px-md">Grade 9</td>
<td className="py-sm px-md">A</td>
<td className="py-sm px-md">2024-0105</td>
<td className="py-sm px-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold tracking-wide uppercase">Pending</span>
</td>
<td className="py-sm px-md text-right">
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr className="even:bg-surface-container-low border-b border-outline-variant/30 hover:bg-surface-container transition-colors group">
<td className="py-sm px-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-caps">
                                            DP
                                        </div>
<span className="font-title-sm text-title-sm text-on-surface">Diana Prince</span>
</div>
</td>
<td className="py-sm px-md">Grade 12</td>
<td className="py-sm px-md">C</td>
<td className="py-sm px-md">2021-3302</td>
<td className="py-sm px-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide uppercase">Enrolled</span>
</td>
<td className="py-sm px-md text-right">
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr className="even:bg-surface-container-low border-b border-outline-variant/30 hover:bg-surface-container transition-colors group">
<td className="py-sm px-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-label-caps">
                                            EH
                                        </div>
<span className="font-title-sm text-title-sm text-on-surface">Ethan Hunt</span>
</div>
</td>
<td className="py-sm px-md">Grade 10</td>
<td className="py-sm px-md">B</td>
<td className="py-sm px-md">2023-1188</td>
<td className="py-sm px-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-error-container text-on-error-container text-[11px] font-bold tracking-wide uppercase">Suspended</span>
</td>
<td className="py-sm px-md text-right">
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-sm border-t border-outline-variant bg-surface-bright flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 5 of 248 students</span>
<div className="flex items-center gap-xs">
<button className="p-xs rounded hover:bg-surface-container transition-colors text-on-surface-variant disabled:opacity-50" disabled>
<span className="material-symbols-outlined text-[20px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary text-on-primary font-body-sm text-body-sm flex items-center justify-center">1</button>
<button className="w-8 h-8 rounded hover:bg-surface-container text-on-surface font-body-sm text-body-sm flex items-center justify-center transition-colors">2</button>
<button className="w-8 h-8 rounded hover:bg-surface-container text-on-surface font-body-sm text-body-sm flex items-center justify-center transition-colors">3</button>
<span className="text-on-surface-variant px-1">...</span>
<button className="p-xs rounded hover:bg-surface-container transition-colors text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
</div>

        </>
    );
}
