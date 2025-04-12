import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, AlertCircle, CalendarDays, UserCircle, Settings, HelpCircle, LogOut } from 'lucide-react';
import useFetch from "../../hooks/studentHooks/useFetch.js";

export default function StudentSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [data,loading,error]=useFetch('http://localhost:3000/student/profile/me');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const shouldShowSidebar = () => {
        if (isMobile) return !isCollapsed;
        return true;
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: `WELCOME !${data.student_name}` },
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { icon: <Calendar size={20} />, label: 'My Timetable' },
        { icon: <AlertCircle size={20} />, label: 'Class Announcements' },
        { icon: <CalendarDays size={20} />, label: 'Class Timetable' },
        { icon: <UserCircle size={20} />, label: 'Profile' },
        { icon: <Settings size={20} />, label: 'Settings' },
        { icon: <HelpCircle size={20} />, label: 'Help / Support' },
        { icon: <LogOut size={20} />, label: 'Logout' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">

            {shouldShowSidebar() && (
                <aside
                    className={`
            bg-blue/45 shadow-md h-full transition-all duration-300 ease-in-out
            ${isCollapsed && !isMobile ? 'w-20' : 'w-64'}
            flex flex-col pt-14
            ${isMobile ? '' : 'fixed sm:relative z-20'}
          `}
                >
                    <nav className="space-y-1 px-2">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className="flex items-center px-3 py-2 hover:bg-blue/50 text-gray-800 rounded-md"
                            >
                                <div className="mr-4">{item.icon}</div>
                                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                            </a>
                        ))}
                    </nav>
                </aside>
            )}

            <div className="fixed top-0 left-0 right-0 z-30 bg-blue shadow-md h-14 flex items-center px-4">
                <button onClick={toggleSidebar} className="p-1 mr-4 focus:outline-none">
                    {/* 3-line Hamburger Icon */}
                    <div className="space-y-1">
                        <div className="w-5 h-0.5 bg-gray-800"></div>
                        <div className="w-5 h-0.5 bg-gray-800"></div>
                        <div className="w-5 h-0.5 bg-gray-800"></div>
                    </div>
                </button>
                <span className="text-lg font-semibold text-gray-800">ClassSync</span>
            </div>

            <main
                className={`flex-1 mt-14 p-6 overflow-auto transition-all duration-300 ${
                    isMobile ? '' : isCollapsed ? 'ml-20' : 'ml-64'
                }`}
            >
                {/*<h1 className="text-2xl font-bold">Main Content Area</h1>*/}
                {/*<p className="mt-4 text-gray-600">This is your dashboard or main working space.</p>*/}
            </main>
        </div>
    );
}