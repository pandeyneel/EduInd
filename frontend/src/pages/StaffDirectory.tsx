import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function StaffDirectory() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('StaffDirectory').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<nav className="fixed left-0 top-0 h-full w-sidebar-width bg-primary flex flex-col z-20">

<div className="p-lg flex flex-col gap-sm">
<span className="font-display-lg text-display-lg text-on-primary">EduInd</span>
<span className="font-body-sm text-body-sm text-on-primary opacity-60">Admin Terminal</span>
</div>

<div className="flex-1 flex flex-col py-sm px-sm gap-xs">

<Link className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/dashboard">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-title-sm text-title-sm">Admin Dashboard</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/students">
<span className="material-symbols-outlined">group</span>
<span className="font-title-sm text-title-sm">Student Directory</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/fees">
<span className="material-symbols-outlined">payments</span>
<span className="font-title-sm text-title-sm">Fee Management</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/academic">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-title-sm text-title-sm">Academic Hub</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded text-on-primary border-l-2 border-secondary-fixed opacity-100 bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/staff">
<span className="material-symbols-outlined">badge</span>
<span className="font-title-sm text-title-sm">Staff Directory</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" to="/portal">
<span className="material-symbols-outlined">family_restroom</span>
<span className="font-title-sm text-title-sm">Parent Portal</span>
</Link>
</div>

<div className="p-md flex flex-col gap-md">
<button className="w-full bg-secondary-fixed text-on-secondary-fixed font-title-sm text-title-sm py-sm px-md rounded transition-all duration-200 hover:bg-secondary-container flex items-center justify-center gap-sm">
<span className="material-symbols-outlined text-[20px]">add</span>
                Quick Report
            </button>
<div className="border-t border-on-primary-fixed-variant pt-md flex flex-col gap-xs">
<a className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-title-sm text-title-sm">Settings</span>
</a>
<a className="flex items-center gap-md px-md py-sm rounded text-on-primary opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-title-sm text-title-sm">Support</span>
</a>
</div>
</div>
</nav>

<div className="flex-1 ml-sidebar-width flex flex-col min-h-screen">

<header className="fixed top-0 w-[calc(100%-260px)] h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-lg z-10">

<div className="flex items-center bg-surface-container-low rounded px-md py-sm w-96 border border-transparent focus-within:border-outline-variant transition-colors">
<span className="material-symbols-outlined text-on-surface-variant mr-sm">search</span>
<input className="bg-transparent border-none focus:ring-0 w-full font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant p-0" placeholder="Search accounts, records..." type="text"/>
</div>

<div className="flex items-center gap-sm text-on-surface-variant">
<button className="p-sm rounded-full hover:bg-surface-container-high transition-colors scale-95 duration-150 relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="p-sm rounded-full hover:bg-surface-container-high transition-colors scale-95 duration-150">
<span className="material-symbols-outlined">history</span>
</button>
<button className="p-sm rounded-full hover:bg-surface-container-high transition-colors scale-95 duration-150 ml-sm">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>

<main className="flex-1 mt-16 p-xl flex flex-col gap-xl">

<div className="flex justify-between items-end">
<div className="flex flex-col gap-base">
<h1 className="font-headline-md text-headline-md text-on-surface">Staff Directory</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant">Manage and view all faculty and administrative personnel.</p>
</div>
<button className="bg-primary text-on-primary font-title-sm text-title-sm py-sm px-lg rounded flex items-center gap-sm hover:bg-on-primary-fixed-variant transition-colors">
<span className="material-symbols-outlined text-[18px]">person_add</span>
                    Add Staff Member
                </button>
</div>

<div className="flex flex-wrap gap-md items-end bg-surface-container-lowest p-md rounded-lg border border-outline-variant">

<div className="flex flex-col gap-base w-72">
<label className="font-body-sm text-body-sm font-bold text-on-surface">Search Staff</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input className="w-full pl-xl pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Name, ID, or Email" type="text"/>
</div>
</div>

<div className="flex flex-col gap-base w-64">
<label className="font-body-sm text-body-sm font-bold text-on-surface">Department</label>
<select className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
<option value="all">All Departments</option>
<option value="math">Mathematics</option>
<option value="science">Science</option>
<option value="english">Humanities &amp; English</option>
<option value="admin">Administration</option>
<option value="pe">Physical Education</option>
</select>
</div>

<div className="flex flex-col gap-base w-48">
<label className="font-body-sm text-body-sm font-bold text-on-surface">Role</label>
<select className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
<option value="all">All Roles</option>
<option value="teacher">Teacher</option>
<option value="head">Department Head</option>
<option value="staff">Support Staff</option>
</select>
</div>
<div className="flex-1"></div>
<button className="border border-outline text-on-surface font-title-sm text-title-sm py-sm px-md rounded flex items-center gap-sm hover:bg-surface-container-low transition-colors h-[38px]">
<span className="material-symbols-outlined text-[18px]">filter_list_off</span>
                    Clear Filters
                </button>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<table className="w-full text-left border-collapse">
<thead>
<tr>
<th className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant py-md px-md w-1/4">Staff Member</th>
<th className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant py-md px-md">ID</th>
<th className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant py-md px-md">Department &amp; Role</th>
<th className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant py-md px-md">Contact Info</th>
<th className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant py-md px-md text-center">Status</th>
<th className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant py-md px-md text-right">Actions</th>
</tr>
</thead>
<tbody>

<tr className="even:bg-surface-container-low hover:bg-surface-container-high transition-colors">
<td className="py-md px-md">
<div className="flex items-center gap-md">
<img alt="Profile photo" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a middle-aged female educator with glasses, smiling warmly. She is wearing a smart dark blazer over a light blouse. The background is a slightly blurred, bright modern office or classroom setting with natural light, adhering to a clean, corporate light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5zFObA8IBWNsF6rmbqRZLTq1H21mU3sLtkeyT95tpJrtYemJy1OHq8yrpLR7Fg34VhjgNxWyRN6Ice0NSZF4EBnAA-79JRFEuOxA8E36EmL-yejECh8e9rtA1kc6f7E2wVNFeHvzPqsBQVPUslNvaK6XZip7ZQSr_Axlt1ggS0260PeHzDdHLDOEgzVjNTbAHYvoemncmwR4poEn1-1R-zYHsilDR6ccsK7hZ5AKRLO9YRz554qg2kzGaoHNYX2eQ6lw7OzE1M5A"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Dr. Eleanor Vance</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Tenured</span>
</div>
</div>
</td>
<td className="font-table-data text-table-data text-on-surface py-md px-md">EMP-2041</td>
<td className="py-md px-md flex flex-col justify-center">
<span className="font-table-data text-table-data text-on-surface font-semibold">Science</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Head of Department</span>
</td>
<td className="py-md px-md">
<div className="flex flex-col gap-xs">
<span className="font-table-data text-table-data text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">mail</span>
                                        e.vance@educore.edu
                                    </span>
<span className="font-table-data text-table-data text-on-surface-variant flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px]">call</span>
                                        +1 (555) 019-2834
                                    </span>
</div>
</td>
<td className="py-md px-md text-center">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-[11px] font-bold">
                                    Active
                                </span>
</td>
<td className="py-md px-md text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-xs">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="even:bg-surface-container-low hover:bg-surface-container-high transition-colors">
<td className="py-md px-md">
<div className="flex items-center gap-md">
<img alt="Profile photo" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a mature male administrator with short grey hair and a neat beard. He is wearing a crisp white shirt and a navy tie. The setting is a minimalist, bright corporate environment with soft, high-key lighting that emphasizes a clean, trustworthy aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbiHxnQVYvex8ZFrcTHm2vLXrpXSh5re5brTUrI9g2TPKpaOA8uXx-GfPqo6hMRQ5TtAZ6RGcJ5SD_QF7ihZdUgJ5bM05OIOzAGeQDTRtpfoHN34Qed_VuYyrtyirEL_d5DTLaYS10b2RpfBCr0kN7EuvSiGODYZLMAPkkukIqDF8E57vLRt_-uAG8WsXW0hGwm-potzGuWTaeQ6S2rpNbfjz0AacIEguZkYk2UP8vhkxNth1DdGouNfa7seBe_znlpAUBCgWfGWM"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Marcus Thorne</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Full-Time</span>
</div>
</div>
</td>
<td className="font-table-data text-table-data text-on-surface py-md px-md">EMP-1088</td>
<td className="py-md px-md flex flex-col justify-center">
<span className="font-table-data text-table-data text-on-surface font-semibold">Administration</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Vice Principal</span>
</td>
<td className="py-md px-md">
<div className="flex flex-col gap-xs">
<span className="font-table-data text-table-data text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">mail</span>
                                        m.thorne@educore.edu
                                    </span>
<span className="font-table-data text-table-data text-on-surface-variant flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px]">call</span>
                                        +1 (555) 019-1002
                                    </span>
</div>
</td>
<td className="py-md px-md text-center">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-[11px] font-bold">
                                    Active
                                </span>
</td>
<td className="py-md px-md text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-xs">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="even:bg-surface-container-low hover:bg-surface-container-high transition-colors">
<td className="py-md px-md">
<div className="flex items-center gap-md">
<div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-title-sm font-bold border border-outline-variant">
                                        SJ
                                    </div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Sarah Jenkins</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Contract</span>
</div>
</div>
</td>
<td className="font-table-data text-table-data text-on-surface py-md px-md">EMP-3192</td>
<td className="py-md px-md flex flex-col justify-center">
<span className="font-table-data text-table-data text-on-surface font-semibold">Mathematics</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Senior Teacher</span>
</td>
<td className="py-md px-md">
<div className="flex flex-col gap-xs">
<span className="font-table-data text-table-data text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">mail</span>
                                        s.jenkins@educore.edu
                                    </span>
<span className="font-table-data text-table-data text-on-surface-variant flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px]">call</span>
                                        +1 (555) 019-4451
                                    </span>
</div>
</td>
<td className="py-md px-md text-center">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-[11px] font-bold">
                                    On Leave
                                </span>
</td>
<td className="py-md px-md text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-xs">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="even:bg-surface-container-low hover:bg-surface-container-high transition-colors">
<td className="py-md px-md">
<div className="flex items-center gap-md">
<img alt="Profile photo" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a young male teacher with a friendly expression. He has short dark hair and is wearing a casual but neat grey sweater over a collared shirt. The background is a soft, out-of-focus modern library or study space with bright, natural lighting suitable for a light-mode UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxVX5JCxD_zFQfCgnA5df2qZGzP-HaE5PXsalpVpGMKxUZkxuJa6c9eGFYJ13dzm6ynKSl3cju4GWCEMDTFcJKK7BazZ2eYwzxOyuifBFaczqt8UAcBQsuJSzUBNJlsYkn7NhlPZrTyE4FmcQJ-5398RmCzNngPGZ_9cHvCXYXV5yD5pfiVNYGitMHyXC6NnT_JtWYGLd41J6_BTZ6pHVvCTbflR73xiDmnA7hgs7QBXgQ2qfICHNYmCsoyS8jHW1xT2YkAyBOgbk"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">David Chen</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Full-Time</span>
</div>
</div>
</td>
<td className="font-table-data text-table-data text-on-surface py-md px-md">EMP-2884</td>
<td className="py-md px-md flex flex-col justify-center">
<span className="font-table-data text-table-data text-on-surface font-semibold">Physical Education</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Instructor</span>
</td>
<td className="py-md px-md">
<div className="flex flex-col gap-xs">
<span className="font-table-data text-table-data text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">mail</span>
                                        d.chen@educore.edu
                                    </span>
<span className="font-table-data text-table-data text-on-surface-variant flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px]">call</span>
                                        +1 (555) 019-8823
                                    </span>
</div>
</td>
<td className="py-md px-md text-center">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-[11px] font-bold">
                                    Active
                                </span>
</td>
<td className="py-md px-md text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-xs">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="even:bg-surface-container-low hover:bg-surface-container-high transition-colors">
<td className="py-md px-md">
<div className="flex items-center gap-md">
<div className="w-10 h-10 rounded-full bg-inverse-primary text-on-primary-fixed flex items-center justify-center font-title-sm font-bold border border-outline-variant">
                                        MP
                                    </div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Maria Peña</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Full-Time</span>
</div>
</div>
</td>
<td className="font-table-data text-table-data text-on-surface py-md px-md">EMP-4012</td>
<td className="py-md px-md flex flex-col justify-center">
<span className="font-table-data text-table-data text-on-surface font-semibold">Humanities &amp; English</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">Teacher</span>
</td>
<td className="py-md px-md">
<div className="flex flex-col gap-xs">
<span className="font-table-data text-table-data text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">mail</span>
                                        m.pena@educore.edu
                                    </span>
<span className="font-table-data text-table-data text-on-surface-variant flex items-center gap-xs">
<span className="material-symbols-outlined text-[14px]">call</span>
                                        +1 (555) 019-3390
                                    </span>
</div>
</td>
<td className="py-md px-md text-center">
<span className="inline-flex items-center px-sm py-xs rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-[11px] font-bold">
                                    Active
                                </span>
</td>
<td className="py-md px-md text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-xs">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>

<div className="flex items-center justify-between px-lg py-md border-t border-outline-variant bg-surface-container-lowest">
<span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 5 of 124 entries</span>
<div className="flex items-center gap-xs">
<button className="p-xs rounded text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled>
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary text-on-primary font-body-sm text-body-sm flex items-center justify-center">1</button>
<button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm flex items-center justify-center">2</button>
<button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm flex items-center justify-center">3</button>
<span className="px-sm text-on-surface-variant">...</span>
<button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm flex items-center justify-center">25</button>
<button className="p-xs rounded text-on-surface-variant hover:bg-surface-container-low">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
</div>

        </>
    );
}
