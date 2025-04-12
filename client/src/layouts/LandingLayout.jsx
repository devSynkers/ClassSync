import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const LandingLayout = () => {
    return (
        <div className='flex-col'>
            <AppHeader />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
};

export default LandingLayout;