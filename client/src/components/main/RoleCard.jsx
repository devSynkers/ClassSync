import React from 'react'

const RoleCard = ({ img, title, onClick }) => {
    return (
        <div className="flex items-center justify-center">
            <div
                onClick={onClick}
                className="flex flex-col items-center justify-center w-36 h-36 sm:w-52 sm:h-52 p-4 rounded-2xl shadow-lg hover:shadow-2xl border-4 border-blue/75 transition-transform duration-200 hover:scale-105 cursor-pointer overflow-hidden"
            >
                <img src={img} alt={title} className="w-full h-full object-cover" />
                <p className="font-semibold text-center mt-2 text-gray-700">{title}</p>
            </div>
        </div>
    );
};


export default RoleCard