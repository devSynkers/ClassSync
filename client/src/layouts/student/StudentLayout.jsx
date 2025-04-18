import React, { useState } from 'react';
import StudentSidebar from '../../components/student/StudentSidebar';
import { Outlet } from 'react-router-dom';

export default function StudentLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex">
            <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main
                className={`flex-1 mt-14 transition-all duration-300 ${
                    isCollapsed ? 'ml-20' : 'ml-64'
                }`}
            >
                <Outlet />
            </main>
        </div>
    );
}
