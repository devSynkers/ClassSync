import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, AlertCircle, CalendarDays, UserCircle, Settings, HelpCircle, LogOut, MessageSquare } from 'lucide-react';
import useFetch from "../../hooks/studentHooks/useFetch.js";
import { Outlet, useNavigate } from "react-router-dom";

export default function StudentSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [data,loading,error]=useFetch('http://localhost:3000/student/profile/me');
    const navigate = useNavigate();//

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
        { icon: <UserCircle size={20} />, label: `WELCOME! ${data?.student_name || ""}`, path:'profile' },
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { icon: <Calendar size={20} />, label: 'Calendar', path:'calendar'},
        { icon: <AlertCircle size={20} />, label: 'Class Announcements' },
        { icon: <CalendarDays size={20} />, label: 'Class Timetable', path:'classtimetable'},
        { icon: <MessageSquare size={20} />, label: 'Feedback', path: 'feedback' },
        { icon: <Settings size={20} />, label: 'Settings' },
        { icon: <HelpCircle size={20} />, label: 'Help / Support' },
        { icon: <LogOut size={20} />, label: 'Logout' },
    ];

    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Topbar */}
            <div className="h-14 bg-blue-400 flex items-center px-4 shadow-md z-10">
                <button onClick={toggleSidebar} className="p-1 mr-4 focus:outline-none">
                    <div className="space-y-1">
                        <div className="w-5 h-0.5 bg-gray-800" />
                        <div className="w-5 h-0.5 bg-gray-800" />
                        <div className="w-5 h-0.5 bg-gray-800" />
                    </div>
                </button>
                <span className="text-xl font-semibold text-gray-800">ClassSync</span>
            </div>

            {/* Main layout */}
            <div className="flex flex-grow min-h-0">
                {/* Sidebar */}
                {shouldShowSidebar() && (
                    <aside
                        className={`bg-blue-200 shadow-md pt-4 transition-all duration-300 ease-in-out 
              ${isCollapsed && !isMobile ? 'w-20' : 'w-64'}
            `}
                    >
                        <nav className="space-y-1 px-2">
                            {navItems.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(item.path)}
                                    className="flex items-center px-3 py-2 hover:bg-blue-300 text-gray-800 rounded-md cursor-pointer"
                                >
                                    <div className="mr-4">{item.icon}</div>
                                    {!isCollapsed && <span>{item.label}</span>}
                                </div>
                            ))}
                        </nav>
                    </aside>
                )}

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6 bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
