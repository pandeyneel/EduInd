import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function ParentStudentPortal() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('ParentStudentPortal').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<nav className="fixed left-0 top-0 h-full w-sidebar-width bg-primary dark:bg-primary-container flex flex-col z-20">
<div className="p-lg flex items-center gap-sm">
<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
<span className="material-symbols-outlined icon-fill">school</span>
</div>
<div>
<h1 className="font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed">EduInd</h1>
<p className="font-body-sm text-body-sm text-on-primary dark:text-on-primary-fixed opacity-60">Admin Terminal</p>
</div>
</div>
<div className="px-md py-sm">
<button className="w-full bg-secondary-fixed text-on-secondary-fixed font-title-sm text-title-sm py-sm rounded-lg flex items-center justify-center gap-sm transition-all duration-200 ease-in-out hover:opacity-90">
<span className="material-symbols-outlined icon-fill">add_circle</span>
                Quick Report
            </button>
</div>
<ul className="flex-1 overflow-y-auto py-md flex flex-col gap-base">
<li>
<Link className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" to="/dashboard">
<span className="material-symbols-outlined">dashboard</span>
                    Admin Dashboard
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" to="/students">
<span className="material-symbols-outlined">group</span>
                    Student Directory
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" to="/fees">
<span className="material-symbols-outlined">payments</span>
                    Fee Management
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed border-l-2 border-secondary-fixed opacity-100 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant bg-on-primary-fixed-variant/20" to="/academic">
<span className="material-symbols-outlined icon-fill">menu_book</span>
                    Academic Hub
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" to="/staff">
<span className="material-symbols-outlined">badge</span>
                    Staff Directory
                </Link>
</li>
<li>
<Link className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" to="/portal">
<span className="material-symbols-outlined">family_restroom</span>
                    Parent Portal
                </Link>
</li>
</ul>
<div className="p-md mt-auto">
<ul className="flex flex-col gap-base border-t border-on-primary/20 pt-sm">
<li>
<a className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" href="#">
<span className="material-symbols-outlined">settings</span>
                        Settings
                    </a>
</li>
<li>
<a className="flex items-center gap-md px-lg py-sm font-title-sm text-title-sm text-on-primary dark:text-on-primary-fixed opacity-60 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-on-primary-fixed-variant" href="#">
<span className="material-symbols-outlined">help</span>
                        Support
                    </a>
</li>
</ul>
</div>
</nav>

<header className="fixed top-0 w-full ml-sidebar-width bg-surface dark:bg-surface-dim flex justify-between items-center h-16 px-lg border-b border-outline-variant dark:border-outline z-10 w-[calc(100%-260px)]">
<div className="flex-1 max-w-md">
<div className="relative flex items-center w-full h-10 rounded-full bg-surface-container-low overflow-hidden border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
<div className="grid place-items-center h-full w-12 text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">search</span>
</div>
<input className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-2 font-body-sm placeholder:text-on-surface-variant" id="search" placeholder="Search classes, assignments..." type="text"/>
</div>
</div>
<div className="flex items-center gap-sm">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all scale-95 duration-150 relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all scale-95 duration-150">
<span className="material-symbols-outlined">history</span>
</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all scale-95 duration-150 ml-sm">
<img alt="Student Profile" className="w-8 h-8 rounded-full border border-outline-variant" data-alt="A close-up, high-quality portrait photograph of a focused young female student with dark curly hair, looking directly at the camera with a subtle smile. She is wearing a crisp white button-down shirt. The lighting is soft and natural, suggesting a bright morning. The background is a gently blurred modern classroom environment in a high-key light mode aesthetic, perfectly integrating into a corporate/modern SaaS interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmKj47TdOFeUlots7lHvhF-sNLP_S4ND2rT_WN8dLsSdA9V6E7h6kvAVW_3JQK0Ofol870ILAic2FnFn10qvUNWIt3oKPtv0DXBT43lT3kR4fi5S4dvGIACPg_1CPWPiOrulF5VNRL2MWlZu8TYnAfPyFOhrq8ZtHC87BQiZ3FlHXEBw2BzaD4_4zLos2Ir8nuhVdU3ZAN6biF-Xm4STnHgUFz8X_2PF02HrbT06gEjNZklIXfGVBEY7NNMI22mXAV7-stO1eb_Kk"/>
</button>
</div>
</header>

<main className="ml-sidebar-width pt-[88px] px-lg pb-xl min-h-screen">

<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
<div>
<p className="font-body-md text-body-md text-on-surface-variant mb-base">Welcome back,</p>
<h2 className="font-headline-md text-headline-md text-on-surface">Alex Mercer</h2>
</div>
<button className="bg-primary text-on-primary font-label-caps text-label-caps px-lg py-sm rounded-full flex items-center gap-sm hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">event_busy</span>
                Leave Request
            </button>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-md">

<div className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col h-full">
<div className="flex justify-between items-center mb-md pb-sm border-b border-outline-variant/50">
<h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-sm">
<span className="material-symbols-outlined text-secondary">calendar_today</span>
                        Today's Timetable
                    </h3>
<span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-sm py-xs rounded-full">Thursday, Oct 26</span>
</div>
<div className="flex-1 flex flex-col gap-sm relative">

<div className="absolute left-[59px] top-4 bottom-4 w-[2px] bg-surface-container-high z-0"></div>

<div className="flex gap-md items-center relative z-10 group">
<div className="w-12 text-right font-label-caps text-label-caps text-on-surface-variant opacity-60">08:30</div>
<div className="w-3 h-3 rounded-full bg-outline-variant ring-4 ring-surface-container-lowest z-10"></div>
<div className="flex-1 bg-surface border border-outline-variant rounded-lg p-sm flex justify-between items-center opacity-60">
<div>
<h4 className="font-title-sm text-title-sm text-on-surface">AP Physics</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Room 302 • Dr. Aris</p>
</div>
<span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-sm py-xs rounded-full">Completed</span>
</div>
</div>

<div className="flex gap-md items-center relative z-10">
<div className="w-12 text-right font-label-caps text-label-caps text-primary font-bold">10:15</div>
<div className="w-3 h-3 rounded-full bg-secondary-fixed ring-4 ring-surface-container-lowest z-10 animate-pulse"></div>
<div className="flex-1 bg-surface-container-lowest border-l-2 border-secondary-fixed rounded-lg p-sm shadow-[0_4px_15px_-3px_rgba(19,27,46,0.08)] flex justify-between items-center">
<div>
<h4 className="font-title-sm text-title-sm text-on-surface">Advanced Literature</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Library • Ms. Vance</p>
</div>
<span className="font-label-caps text-label-caps text-on-secondary-fixed bg-secondary-fixed/20 px-sm py-xs rounded-full flex items-center gap-xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span> Now
                            </span>
</div>
</div>

<div className="flex gap-md items-center relative z-10">
<div className="w-12 text-right font-label-caps text-label-caps text-on-surface-variant">11:45</div>
<div className="w-3 h-3 rounded-full bg-surface-container-highest border-2 border-outline z-10"></div>
<div className="flex-1 bg-surface border border-outline-variant rounded-lg p-sm flex justify-between items-center hover:bg-surface-container-low transition-colors cursor-pointer">
<div>
<h4 className="font-title-sm text-title-sm text-on-surface">Calculus II</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Room 105 • Mr. Chen</p>
</div>
<span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
</div>
</div>
</div>
</div>

<div className="xl:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col h-full">
<div className="flex justify-between items-center mb-md pb-sm border-b border-outline-variant/50">
<h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-sm">
<span className="material-symbols-outlined text-secondary">assignment</span>
                        Upcoming Tasks
                    </h3>
</div>
<div className="flex flex-col gap-sm">

<div className="p-sm rounded-lg border border-error-container bg-error-container/10 flex gap-sm items-start">
<div className="mt-1 text-error">
<span className="material-symbols-outlined text-[20px]">warning</span>
</div>
<div>
<h4 className="font-title-sm text-title-sm text-on-surface leading-tight">Physics Lab Report</h4>
<p className="font-body-sm text-body-sm text-error mt-xs">Due Today, 11:59 PM</p>
</div>
</div>

<div className="p-sm rounded-lg border border-outline-variant bg-surface flex gap-sm items-start group hover:border-primary transition-colors cursor-pointer">
<div className="mt-1 text-outline-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">radio_button_unchecked</span>
</div>
<div>
<h4 className="font-title-sm text-title-sm text-on-surface leading-tight">Read Ch. 4-5 Gatsby</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Literature • Tomorrow</p>
</div>
</div>

<div className="p-sm rounded-lg border border-outline-variant bg-surface flex gap-sm items-start group hover:border-primary transition-colors cursor-pointer">
<div className="mt-1 text-outline-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">radio_button_unchecked</span>
</div>
<div>
<h4 className="font-title-sm text-title-sm text-on-surface leading-tight">Problem Set 8</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Calculus II • Fri, Oct 28</p>
</div>
</div>
</div>
<button className="mt-auto pt-md text-secondary font-label-caps text-label-caps text-center w-full hover:text-primary transition-colors flex items-center justify-center gap-xs">
                    View All Assignments <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>

<div className="xl:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mt-sm">
<div className="p-md border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
<h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-sm">
<span className="material-symbols-outlined text-secondary">bar_chart</span>
                        Recent Grades
                    </h3>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface border-b border-outline-variant">
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant font-bold w-1/3">Subject</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant font-bold">Assessment</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant font-bold text-right">Date</th>
<th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant font-bold text-right">Score</th>
</tr>
</thead>
<tbody className="font-table-data text-table-data text-on-surface">
<tr className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
<td className="py-sm px-md font-title-sm text-title-sm">Calculus II</td>
<td className="py-sm px-md text-on-surface-variant">Midterm Exam</td>
<td className="py-sm px-md text-right text-on-surface-variant">Oct 24</td>
<td className="py-sm px-md text-right">
<span className="inline-flex items-center justify-center px-sm py-xs rounded bg-surface-container border border-outline-variant font-title-sm">
                                        92%
                                    </span>
</td>
</tr>
<tr className="bg-surface-container-lowest/50 border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
<td className="py-sm px-md font-title-sm text-title-sm">AP Physics</td>
<td className="py-sm px-md text-on-surface-variant">Kinematics Quiz</td>
<td className="py-sm px-md text-right text-on-surface-variant">Oct 20</td>
<td className="py-sm px-md text-right">
<span className="inline-flex items-center justify-center px-sm py-xs rounded bg-surface-container border border-outline-variant font-title-sm">
                                        88%
                                    </span>
</td>
</tr>
<tr className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
<td className="py-sm px-md font-title-sm text-title-sm">Advanced Literature</td>
<td className="py-sm px-md text-on-surface-variant">Essay: The Jazz Age</td>
<td className="py-sm px-md text-right text-on-surface-variant">Oct 15</td>
<td className="py-sm px-md text-right">
<span className="inline-flex items-center justify-center px-sm py-xs rounded bg-surface-container border border-outline-variant font-title-sm">
                                        95%
                                    </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>

        </>
    );
}
