import React, { useState } from 'react';
import FacultySidebar from '../../components/faculty/FacultySidebar';
import { Outlet } from 'react-router-dom';

export default function FacultyLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <FacultySidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 mt-14 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Outlet />
      </main>
    </div>
  );
}
