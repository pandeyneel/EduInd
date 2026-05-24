import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function AcademicHub() {
    const [_data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('AcademicHub').then(setData).catch(console.error);
    }, []);

    return (
        <>
            

<nav className="fixed left-0 top-0 h-full w-sidebar-width bg-primary dark:bg-primary-container flex flex-col z-50">

<div className="px-lg py-xl flex items-center gap-md border-b border-on-primary/10">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary font-display-lg text-display-lg" style={{'fontVariationSettings': "'FILL' 1"}}>school</span>
</div>
<div className="flex flex-col">
<span className="font-display-lg text-display-lg text-on-primary dark:text-on-primary-fixed leading-none tracking-tight text-[22px]">EduInd</span>
<span className="font-label-caps text-label-caps text-on-primary/60 mt-1">Admin Terminal</span>
</div>
</div>

<div className="flex-1 overflow-y-auto py-md flex flex-col gap-xs px-sm">

<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out group" to="/dashboard">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
<span className="font-title-sm text-title-sm">Admin Dashboard</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out group" to="/students">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">group</span>
<span className="font-title-sm text-title-sm">Student Directory</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out group" to="/fees">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">payments</span>
<span className="font-title-sm text-title-sm">Fee Management</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed border-l-2 border-secondary-fixed opacity-100 bg-on-primary/5 transition-all duration-200 ease-in-out" to="/academic">
<span className="material-symbols-outlined" style={{'fontVariationSettings': "'FILL' 1"}}>menu_book</span>
<span className="font-title-sm text-title-sm">Academic Hub</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out group" to="/staff">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">badge</span>
<span className="font-title-sm text-title-sm">Staff Directory</span>
</Link>

<Link className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-primary dark:text-on-primary-fixed opacity-60 hover:opacity-100 hover:bg-on-primary-fixed-variant transition-all duration-200 ease-in-out group" to="/portal">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">family_restroom</span>
<span className="font-title-sm text-title-sm">Parent Portal</span>
</Link>
</div>

<div className="p-lg border-t border-on-primary/10 flex flex-col gap-md">
<button className="w-full bg-secondary-fixed text-on-secondary-fixed font-title-sm text-title-sm py-sm rounded-DEFAULT flex items-center justify-center gap-sm hover:brightness-95 transition-all">
<span className="material-symbols-outlined text-[18px]">add</span>
                Quick Report
            </button>
<div className="flex items-center justify-between mt-sm">
<button className="text-on-primary/60 hover:text-on-primary transition-colors flex items-center gap-sm font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px]">settings</span>
                    Settings
                </button>
<button className="text-on-primary/60 hover:text-on-primary transition-colors flex items-center gap-sm font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px]">help</span>
                    Support
                </button>
</div>
</div>
</nav>

<main className="ml-sidebar-width flex-1 flex flex-col min-w-0 bg-background">

<header className="flex justify-between items-center h-16 px-lg bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline sticky top-0 z-40">

<div className="relative w-96">
<span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
<input className="w-full pl-[44px] pr-md py-sm bg-surface-container-low border border-outline-variant rounded-full font-body-sm text-body-sm text-primary placeholder:text-on-surface-variant focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="Search classes, students, or schedules..." type="text"/>
</div>

<div className="flex items-center gap-sm">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">history</span>
</button>
<div className="h-6 w-px bg-outline-variant mx-sm"></div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>

<div className="p-xl flex-1 flex flex-col max-w-[1600px] mx-auto w-full">

<div className="flex flex-col gap-lg mb-lg">
<div className="flex items-center justify-between">
<div>
<h1 className="font-headline-md text-headline-md text-primary">Academic Hub</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage institutional schedules and assessments.</p>
</div>
<div className="flex gap-md">
<button className="px-md py-sm bg-surface border border-outline-variant rounded-DEFAULT font-title-sm text-title-sm text-primary hover:bg-surface-container-low transition-colors flex items-center gap-sm shadow-sm">
<span className="material-symbols-outlined text-[18px]">print</span>
                            Print Schedule
                        </button>
<button className="px-md py-sm bg-primary text-on-primary rounded-DEFAULT font-title-sm text-title-sm hover:brightness-110 transition-colors flex items-center gap-sm shadow-sm">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
                            Edit Term
                        </button>
</div>
</div>

<div className="flex border-b border-outline-variant">
<button className="px-lg py-md font-title-sm text-title-sm text-primary border-b-2 border-primary translate-y-px">
                        Class Timetable
                    </button>
<button className="px-lg py-md font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low/50">
                        Exam Schedule
                    </button>
</div>
</div>

<div className="grid grid-cols-12 gap-lg flex-1 items-start">

<div className="col-span-12 xl:col-span-8 bg-surface-container-lowest rounded-DEFAULT border border-outline-variant shadow-sm flex flex-col h-full overflow-hidden">

<div className="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-bright">
<div className="flex items-center gap-md">
<select className="bg-surface border border-outline-variant rounded-DEFAULT px-md py-sm font-title-sm text-title-sm text-primary focus:ring-secondary focus:border-secondary outline-none">
<option>Year 10 - Group A</option>
<option>Year 10 - Group B</option>
<option>Year 11 - Science</option>
</select>
<span className="font-label-caps text-label-caps text-on-surface-variant px-sm py-1 bg-surface-container-low rounded-full border border-outline-variant">Term 2, Week 4</span>
</div>
<div className="flex items-center gap-sm">
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low transition-colors text-on-surface-variant"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
<span className="font-body-sm text-body-sm font-semibold text-primary min-w-[100px] text-center">Oct 14 - Oct 18</span>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low transition-colors text-on-surface-variant"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
</div>
</div>

<div className="flex-1 overflow-auto custom-scrollbar relative">
<table className="w-full min-w-[800px] border-collapse text-left">
<thead className="sticky top-0 bg-surface-bright z-10">
<tr>
<th className="p-md border-b border-r border-outline-variant w-24 text-center font-label-caps text-label-caps text-on-surface-variant">Time</th>
<th className="p-md border-b border-r border-outline-variant font-label-caps text-label-caps text-primary w-1/5 text-center">Monday</th>
<th className="p-md border-b border-r border-outline-variant font-label-caps text-label-caps text-primary w-1/5 text-center">Tuesday</th>
<th className="p-md border-b border-r border-outline-variant font-label-caps text-label-caps text-primary w-1/5 text-center">Wednesday</th>
<th className="p-md border-b border-r border-outline-variant font-label-caps text-label-caps text-primary w-1/5 text-center">Thursday</th>
<th className="p-md border-b border-outline-variant font-label-caps text-label-caps text-primary w-1/5 text-center">Friday</th>
</tr>
</thead>
<tbody className="font-table-data text-table-data">

<tr>
<td className="p-sm border-b border-r border-outline-variant/50 text-center text-on-surface-variant align-top pt-md">08:00 AM</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-primary-fixed border border-primary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-primary-fixed leading-tight">Mathematics</span>
<div className="flex items-center gap-xs text-on-primary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">meeting_room</span> Room 402
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-secondary-fixed border border-secondary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-secondary-fixed leading-tight">Physics</span>
<div className="flex items-center gap-xs text-on-secondary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">science</span> Lab 2
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-tertiary-fixed border border-tertiary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-tertiary-fixed leading-tight">Literature</span>
<div className="flex items-center gap-xs text-on-tertiary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">meeting_room</span> Room 105
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-primary-fixed border border-primary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-primary-fixed leading-tight">Mathematics</span>
<div className="flex items-center gap-xs text-on-primary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">meeting_room</span> Room 402
                                            </div>
</div>
</td>
<td className="p-sm border-b border-outline-variant/50 align-top">
<div className="bg-surface-container-high border border-outline-variant rounded-DEFAULT p-sm h-full flex flex-col gap-xs items-center justify-center text-on-surface-variant">
<span className="font-title-sm text-title-sm">Study Hall</span>
</div>
</td>
</tr>

<tr>
<td className="p-sm border-b border-r border-outline-variant/50 text-center text-on-surface-variant align-top pt-md">09:30 AM</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-secondary-fixed border border-secondary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-secondary-fixed leading-tight">Chemistry</span>
<div className="flex items-center gap-xs text-on-secondary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">science</span> Lab 1
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-primary-fixed border border-primary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-primary-fixed leading-tight">Computer Sci.</span>
<div className="flex items-center gap-xs text-on-primary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">computer</span> Room 301
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-secondary-fixed border border-secondary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-secondary-fixed leading-tight">Chemistry</span>
<div className="flex items-center gap-xs text-on-secondary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">science</span> Lab 1
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-tertiary-fixed border border-tertiary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-tertiary-fixed leading-tight">History</span>
<div className="flex items-center gap-xs text-on-tertiary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">meeting_room</span> Room 204
                                            </div>
</div>
</td>
<td className="p-sm border-b border-outline-variant/50 align-top">
<div className="bg-primary-fixed border border-primary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-primary-fixed leading-tight">Computer Sci.</span>
<div className="flex items-center gap-xs text-on-primary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">computer</span> Room 301
                                            </div>
</div>
</td>
</tr>

<tr className="bg-surface-container-low">
<td className="p-sm border-b border-r border-outline-variant/50 text-center text-on-surface-variant font-label-caps text-label-caps">11:00 AM</td>
<td className="p-sm border-b border-outline-variant/50 text-center font-label-caps text-label-caps text-on-surface-variant tracking-widest" colSpan={5}>
                                        LUNCH BREAK
                                    </td>
</tr>

<tr>
<td className="p-sm border-b border-r border-outline-variant/50 text-center text-on-surface-variant align-top pt-md">12:00 PM</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-tertiary-fixed border border-tertiary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-tertiary-fixed leading-tight">Geography</span>
<div className="flex items-center gap-xs text-on-tertiary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">public</span> Room 208
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-surface-container-high border border-outline-variant rounded-DEFAULT p-sm h-full flex flex-col gap-xs items-center justify-center text-on-surface-variant">
<span className="font-title-sm text-title-sm">Study Hall</span>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-primary-fixed border border-primary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-primary-fixed leading-tight">Mathematics</span>
<div className="flex items-center gap-xs text-on-primary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">meeting_room</span> Room 402
                                            </div>
</div>
</td>
<td className="p-sm border-b border-r border-outline-variant/50 align-top">
<div className="bg-secondary-fixed border border-secondary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-secondary-fixed leading-tight">Physical Ed.</span>
<div className="flex items-center gap-xs text-on-secondary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">sports_basketball</span> Gym A
                                            </div>
</div>
</td>
<td className="p-sm border-b border-outline-variant/50 align-top">
<div className="bg-tertiary-fixed border border-tertiary-fixed-dim rounded-DEFAULT p-sm h-full flex flex-col gap-xs hover:shadow-sm transition-shadow cursor-pointer">
<span className="font-title-sm text-title-sm text-on-tertiary-fixed leading-tight">Art &amp; Design</span>
<div className="flex items-center gap-xs text-on-tertiary-container text-xs mt-auto">
<span className="material-symbols-outlined text-[14px]">palette</span> Studio 1
                                            </div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="col-span-12 xl:col-span-4 flex flex-col gap-lg h-full">

<div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT shadow-sm flex flex-col flex-1">
<div className="px-md py-md border-b border-outline-variant flex items-center justify-between">
<h2 className="font-title-sm text-title-sm text-primary flex items-center gap-sm">
<span className="material-symbols-outlined text-error" style={{'fontVariationSettings': "'FILL' 1"}}>assignment_late</span>
                                Upcoming Exams
                            </h2>
<button className="text-secondary font-body-sm text-body-sm hover:underline">View All</button>
</div>
<div className="p-md flex flex-col gap-md overflow-y-auto custom-scrollbar">

<div className="flex gap-md p-md border border-outline-variant rounded-DEFAULT bg-surface-bright hover:bg-surface transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-surface-container-high rounded px-sm py-xs min-w-[50px] border border-outline-variant/50 group-hover:border-primary/30">
<span className="font-label-caps text-label-caps text-on-surface-variant">OCT</span>
<span className="font-headline-md text-headline-md text-primary leading-none mt-1">21</span>
</div>
<div className="flex flex-col justify-center flex-1">
<span className="font-title-sm text-title-sm text-primary">Mid-Term Mathematics</span>
<div className="flex items-center gap-md mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">schedule</span> 09:00 AM</span>
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">meeting_room</span> Main Hall</span>
</div>
</div>
</div>

<div className="flex gap-md p-md border border-outline-variant rounded-DEFAULT bg-surface-bright hover:bg-surface transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-surface-container-high rounded px-sm py-xs min-w-[50px] border border-outline-variant/50 group-hover:border-primary/30">
<span className="font-label-caps text-label-caps text-on-surface-variant">OCT</span>
<span className="font-headline-md text-headline-md text-primary leading-none mt-1">23</span>
</div>
<div className="flex flex-col justify-center flex-1">
<span className="font-title-sm text-title-sm text-primary">Physics Practical Assessment</span>
<div className="flex items-center gap-md mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">schedule</span> 13:00 PM</span>
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">science</span> Lab 2</span>
</div>
</div>
</div>

<div className="flex gap-md p-md border border-outline-variant rounded-DEFAULT bg-surface-bright hover:bg-surface transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-surface-container-high rounded px-sm py-xs min-w-[50px] border border-outline-variant/50 group-hover:border-primary/30">
<span className="font-label-caps text-label-caps text-on-surface-variant">NOV</span>
<span className="font-headline-md text-headline-md text-primary leading-none mt-1">05</span>
</div>
<div className="flex flex-col justify-center flex-1">
<span className="font-title-sm text-title-sm text-primary">Literature Essay Submission</span>
<div className="flex items-center gap-md mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">schedule</span> 17:00 PM</span>
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">cloud_upload</span> Online</span>
</div>
</div>
</div>
</div>

<div className="p-md border-t border-outline-variant bg-surface-bright mt-auto">
<button className="w-full py-sm border border-outline-variant rounded-DEFAULT font-title-sm text-title-sm text-primary flex justify-center items-center gap-sm hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px]">add</span>
                                Schedule New Exam
                            </button>
</div>
</div>
</div>
</div>
</div>
</main>

        </>
    );
}
