import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';

const StudentLayout = () => {
    return (
        <div className='flex'>
            <StudentSidebar />
            <div className='flex-1 p-10'>
                <Outlet />
            </div>
        </div>
    );
};

export default StudentLayout;