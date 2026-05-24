import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function DetailedStudentProfile() {
    const [_data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('DetailedStudentProfile').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<nav className="hidden md:flex flex-col w-sidebar-width h-full fixed left-0 top-0 bg-primary dark:bg-primary-container z-50">
<div className="p-lg flex items-center gap-sm border-b border-surface-tint/20">
<div className="w-10 h-10 rounded-DEFAULT bg-secondary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-fixed font-title-sm">school</span>
</div>
<div>
<h1 className="font-display-lg text-[20px] text-on-primary dark:text-on-primary-fixed leading-tight">EduInd</h1>
<p className="font-label-caps text-[10px] text-on-primary dark:text-on-primary-fixed opacity-60">Admin Terminal</p>
</div>
</div>
<div className="p-md">
<button className="w-full flex items-center justify-center gap-sm bg-secondary-fixed text-on-primary-fixed font-title-sm text-sm py-sm rounded-DEFAULT hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-[18px]">add</span>
                Quick Report
            </button>
</div>
<div className="flex-1 overflow-y-auto py-sm px-sm flex flex-col gap-xs">
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" to="/dashboard">
<span className="material-symbols-outlined">dashboard</span>
                Admin Dashboard
            </Link>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed border-l-2 border-secondary-fixed opacity-100 bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" to="/students">
<span className="material-symbols-outlined">group</span>
                Student Directory
            </Link>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" to="/fees">
<span className="material-symbols-outlined">payments</span>
                Fee Management
            </Link>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" to="/academic">
<span className="material-symbols-outlined">menu_book</span>
                Academic Hub
            </Link>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" to="/staff">
<span className="material-symbols-outlined">badge</span>
                Staff Directory
            </Link>
<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" to="/portal">
<span className="material-symbols-outlined">family_restroom</span>
                Parent Portal
            </Link>
</div>
<div className="mt-auto border-t border-surface-tint/20 py-sm px-sm flex flex-col gap-xs">
<a className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" href="#">
<span className="material-symbols-outlined">settings</span>
                Settings
            </a>
<a className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out font-title-sm text-sm" href="#">
<span className="material-symbols-outlined">help</span>
                Support
            </a>
</div>
</nav>

<main className="flex-1 md:ml-[260px] flex flex-col min-h-screen">

<header className="flex justify-between items-center h-16 px-lg bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline sticky top-0 z-40">
<div className="flex items-center gap-sm text-on-surface-variant md:hidden">
<span className="material-symbols-outlined">menu</span>
</div>
<div className="flex-1 flex justify-start pl-md hidden md:flex">
<div className="relative w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="w-full bg-surface-container-high dark:bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-sm font-body-sm focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all duration-200 text-primary dark:text-primary-fixed-dim placeholder:text-on-surface-variant" placeholder="Search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-sm">
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-150 scale-95 hover:scale-100">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-150 scale-95 hover:scale-100">
<span className="material-symbols-outlined">history</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-150 scale-95 hover:scale-100 ml-sm">
<span className="material-symbols-outlined text-[28px]">account_circle</span>
</button>
</div>
</header>

<div className="p-lg lg:p-xl flex-1 flex flex-col gap-lg max-w-7xl mx-auto w-full">

<div className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-lg">
<div className="flex items-center gap-lg">
<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-surface-variant shrink-0 bg-surface-container-high">
<img alt="Student Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a confident young male student with short dark hair, wearing a crisp white button-down shirt. The background is a soft, blurred light grey, emphasizing the subject. The lighting is bright and even, typical of a modern corporate or academic portrait. The mood is serious yet approachable, fitting a formal school database profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg6sm8wj36OTAYFywWXrq1V9zDBwiXvBXm2VrX1WOS1bxkGqfuQQkmSBdLF15cTX93s4VfMxU7iJs8mv2cTQV0Nfz57keRWDkKCezLdJB9OKvEbK6tGNTC8AMx0sfHrCVdmhac-Tn_VOiNNJTdfjNETnSntgeBMyYuMPR10jFKweUTiiENBchi5U35XO_2PwInzvXBX59SDc-R8HD6ZPAcxAEmbbdiy_ya6BN8ER_tcb9kYfndG2FfXQ3C-uvsp5IzUZT7NwIvhi8"/>
</div>
<div>
<h2 className="font-display-lg text-[28px] text-on-surface mb-xs">Alexander Lewis</h2>
<div className="flex flex-wrap gap-sm font-body-sm text-on-surface-variant">
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">badge</span> ID: STU-2023-0842</span>
<span className="hidden md:inline text-outline-variant">•</span>
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">school</span> Grade 10 - Science</span>
<span className="hidden md:inline text-outline-variant">•</span>
<span className="flex items-center gap-xs px-2 py-1 rounded-full bg-[#14b8a6]/10 text-[#0f766e] text-[12px] font-bold tracking-wide">ACTIVE</span>
</div>
</div>
</div>
<div className="flex flex-wrap gap-sm w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-xs px-md py-sm rounded-DEFAULT bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-high transition-colors font-title-sm text-sm">
<span className="material-symbols-outlined text-[18px]">edit</span>
                        Edit Profile
                    </button>
<button className="flex-1 md:flex-none flex items-center justify-center gap-xs px-md py-sm rounded-DEFAULT bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-high transition-colors font-title-sm text-sm">
<span className="material-symbols-outlined text-[18px]">print</span>
                        Print Report
                    </button>
<button className="flex-1 md:flex-none flex items-center justify-center gap-xs px-md py-sm rounded-DEFAULT bg-primary text-on-primary hover:opacity-90 transition-opacity font-title-sm text-sm">
<span className="material-symbols-outlined text-[18px]">mail</span>
                        Message Parent
                    </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">

<div className="flex flex-col gap-lg">

<div className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-lg">
<h3 className="font-title-sm text-on-surface mb-md pb-sm border-b border-surface-variant">Personal Information</h3>
<div className="flex flex-col gap-md">
<div>
<p className="font-label-caps text-on-surface-variant mb-xs">DATE OF BIRTH</p>
<p className="font-body-md text-on-surface">March 14, 2008 (16 yrs)</p>
</div>
<div>
<p className="font-label-caps text-on-surface-variant mb-xs">GENDER</p>
<p className="font-body-md text-on-surface">Male</p>
</div>
<div>
<p className="font-label-caps text-on-surface-variant mb-xs">CONTACT</p>
<p className="font-body-md text-on-surface">alewis.student@educore.edu</p>
<p className="font-body-md text-on-surface mt-xs">+1 (555) 019-8372</p>
</div>
<div>
<p className="font-label-caps text-on-surface-variant mb-xs">ADDRESS</p>
<p className="font-body-md text-on-surface">482 Oakwood Drive, Apt 3B<br/>Springfield, IL 62704</p>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-lg">
<div className="flex justify-between items-center mb-md pb-sm border-b border-surface-variant">
<h3 className="font-title-sm text-on-surface">Fee Status</h3>
<span className="px-2 py-1 rounded-full bg-[#14b8a6]/10 text-[#0f766e] font-label-caps text-[10px]">UP TO DATE</span>
</div>
<div className="mb-md">
<p className="font-label-caps text-on-surface-variant mb-xs">CURRENT BALANCE</p>
<p className="font-display-lg text-on-surface">$0.00</p>
</div>
<div className="flex flex-col gap-xs">
<p className="font-label-caps text-on-surface-variant mb-xs">RECENT PAYMENTS</p>
<div className="flex justify-between items-center text-sm font-table-data">
<span className="text-on-surface">Fall Semester Tuition</span>
<span className="text-on-surface-variant">$4,200.00</span>
</div>
<div className="flex justify-between items-center text-sm font-table-data">
<span className="text-on-surface">Lab Fees (Science)</span>
<span className="text-on-surface-variant">$150.00</span>
</div>
</div>
</div>
</div>

<div className="lg:col-span-2 flex flex-col gap-lg">

<div className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-lg">
<h3 className="font-title-sm text-on-surface mb-md pb-sm border-b border-surface-variant">Academic Overview</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-lg">
<div className="p-md bg-surface rounded-DEFAULT border border-outline-variant/30 text-center">
<p className="font-label-caps text-on-surface-variant mb-xs">CURRENT GPA</p>
<p className="font-headline-md text-primary">3.84</p>
</div>
<div className="p-md bg-surface rounded-DEFAULT border border-outline-variant/30 text-center">
<p className="font-label-caps text-on-surface-variant mb-xs">CLASS RANK</p>
<p className="font-headline-md text-primary">12 <span className="text-sm font-body-sm text-on-surface-variant font-normal">/ 340</span></p>
</div>
<div className="p-md bg-surface rounded-DEFAULT border border-outline-variant/30 text-center">
<p className="font-label-caps text-on-surface-variant mb-xs">TOTAL CREDITS</p>
<p className="font-headline-md text-primary">42.5</p>
</div>
<div className="p-md bg-surface rounded-DEFAULT border border-outline-variant/30 text-center">
<p className="font-label-caps text-on-surface-variant mb-xs">CONDUCT</p>
<p className="font-headline-md text-[#0f766e]">Excellent</p>
</div>
</div>

<div className="flex flex-col gap-md">
<p className="font-label-caps text-on-surface-variant">CURRENT TERM SUBJECTS</p>
<div className="flex items-center gap-md">
<span className="font-table-data text-on-surface w-32 shrink-0">Adv. Calculus</span>
<div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{'width': "92%"}}></div>
</div>
<span className="font-title-sm text-on-surface w-8 text-right">92%</span>
</div>
<div className="flex items-center gap-md">
<span className="font-table-data text-on-surface w-32 shrink-0">AP Physics</span>
<div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{'width': "88%"}}></div>
</div>
<span className="font-title-sm text-on-surface w-8 text-right">88%</span>
</div>
<div className="flex items-center gap-md">
<span className="font-table-data text-on-surface w-32 shrink-0">World History</span>
<div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{'width': "95%"}}></div>
</div>
<span className="font-title-sm text-on-surface w-8 text-right">95%</span>
</div>
<div className="flex items-center gap-md">
<span className="font-table-data text-on-surface w-32 shrink-0">English Lit</span>
<div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{'width': "84%"}}></div>
</div>
<span className="font-title-sm text-on-surface w-8 text-right">84%</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-lg">
<div className="flex justify-between items-center mb-md pb-sm border-b border-surface-variant">
<h3 className="font-title-sm text-on-surface">Attendance Summary</h3>
<button className="text-primary text-sm font-title-sm hover:underline">View Log</button>
</div>
<div className="flex flex-col md:flex-row items-center gap-lg">

<div className="relative w-32 h-32 flex items-center justify-center shrink-0">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
<path className="text-[#0f766e]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="96, 100" stroke-width="3"></path>
</svg>
<div className="absolute flex flex-col items-center justify-center">
<span className="font-headline-md text-on-surface">96%</span>
<span className="font-label-caps text-on-surface-variant text-[10px]">PRESENT</span>
</div>
</div>
<div className="flex-1 w-full grid grid-cols-2 gap-sm">
<div className="p-sm bg-surface rounded-DEFAULT border border-outline-variant/30">
<p className="font-label-caps text-on-surface-variant mb-xs">TOTAL DAYS</p>
<p className="font-title-sm text-on-surface">142</p>
</div>
<div className="p-sm bg-surface rounded-DEFAULT border border-outline-variant/30">
<p className="font-label-caps text-on-surface-variant mb-xs">PRESENT</p>
<p className="font-title-sm text-on-surface">136</p>
</div>
<div className="p-sm bg-surface rounded-DEFAULT border border-outline-variant/30">
<p className="font-label-caps text-on-surface-variant mb-xs">ABSENT (EXCUSED)</p>
<p className="font-title-sm text-on-surface">4</p>
</div>
<div className="p-sm bg-surface rounded-DEFAULT border border-outline-variant/30">
<p className="font-label-caps text-on-surface-variant mb-xs">ABSENT (UNEXCUSED)</p>
<p className="font-title-sm text-error">2</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

        </>
    );
}
