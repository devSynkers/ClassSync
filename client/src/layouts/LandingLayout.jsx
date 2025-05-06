import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const LandingLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <AppHeader />
            <div className='flex-grow'>
                <Outlet />
            </div>
        </div>
    );
};

export default LandingLayout;