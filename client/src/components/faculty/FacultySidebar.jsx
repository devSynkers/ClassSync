import React, { useState, useEffect } from 'react';
import { LayoutDashboard, UserCircle, MessageSquare, LogOut, Menu } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // <-- import Outlet!

export default function FacultySidebar({ isCollapsed, setIsCollapsed }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // For sliding effect
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible); // Toggle visibility on mobile for sliding effect
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: 'dashboard' },
    { icon: <MessageSquare size={20} />, label: 'Student Feedback', path: 'student-feedback' },
    { icon: <UserCircle size={20} />, label: 'Profile', path: 'profile' },
    { icon: <LogOut size={20} />, label: 'Logout', path: '/login/faculty' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarVisible || !isMobile || !isCollapsed
            ? 'transform-none'
            : 'transform -translate-x-full'
        } fixed left-0 top-0 z-50 bg-[#E9F5BE] shadow-md pt-4 h-screen w-64 transition-all duration-300 ease-in-out sm:w-64 sm:transform-none sm:static`}
      >
        <nav className="space-y-4 px-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setIsSidebarVisible(false);
              }}
              className={`flex items-center px-3 py-2 hover:bg-[#81E7AF] text-gray-800 rounded-md cursor-pointer ${
                location.pathname.includes(item.path) ? 'bg-[#03A791] text-white' : ''
              }`}
            >
              <div className="mr-4">{item.icon}</div>
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Burger Menu for Mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-60 bg-[#E9F5BE] p-2 rounded-full"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Main Content Outlet */}
      <div className="flex-1 p-4 ml-0 sm:ml-64">
        <Outlet /> {/* <-- THIS RENDERS FACULTY DASHBOARD ETC */}
      </div>
    </div>
  );
}
