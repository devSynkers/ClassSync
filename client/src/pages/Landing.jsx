import React from "react";
import admin from "../assets/admin.png";
import faculty from "../assets/faculty.png";
import student from "../assets/student.png";
import { useNavigate } from "react-router-dom";

const RoleCard = ({img,title,onClick}) => {
    return (
        <div className="flex items-center justify-center">
            <div
                onClick={onClick}
                className="flex flex-col items-center justify-center w-36 h-36 sm:w-52 sm:h-52 p-4 rounded-2xl shadow-lg hover:shadow-2xl border-4 border-blue-400 transition-transform duration-200 hover:scale-105 cursor-pointer overflow-hidden"
            >
                <img src={img} alt={title} className="w-full h-full object-cover" />
                <p className="font-semibold text-center mt-2 text-gray-700">{title}</p>
            </div>
        </div>
    );

}

export default function Landing() {
    const navigate = useNavigate();

    const roles = [
        {img:admin, title:"Admin", route:"/login/admin"},
        {img:faculty, title:"Faculty", route:"/login/faculty"},
        {img:student, title: "Student", route:"/login/student"},
    ]


    return(
        <div className="flex flex-col min-h-[calc(100vh-5rem)]">


            <div className="flex-grow flex justify-center items-center px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 max-w-screen-lg w-full">

                    {roles.map((role) => (
                        <RoleCard key={role.title} img={role.img} title={role.title} onClick={()=> navigate(role.route)} />
                    ))}

                </div>
            </div>
        </div>
    )
}