import React from "react";
import { Link } from "react-router-dom";

function AppHeader() {
    return (
        <div className="bg-blue-400 h-20 flex items-center pl-8 sm:pl-16 w-screen">
            <Link to='/login' className='font-montserrat font-bold text-4xl text-white'>ClassSync</Link>
        </div>
    )
}

export default AppHeader;