import React from "react";
import admin from "../assets/admin.png";
import faculty from "../assets/faculty.png";
import student from "../assets/student.png";
import { useNavigate } from "react-router-dom";

const RoleCard = ({img,title,onClick}) => {
  return(
    <div className="flex flex-col items-center">
        <div onClick={onClick} className="w-36 h-36 sm:w-52 sm:h-52 rounded-2xl shadow-md flex flex-col justify-center items-center border-4 border-blue/75 hover:scale-105 transition-transform duration-200">
          <img src={img} className="w-32 h-32" />
          <p className="font-semibold text-center">{title}</p>
        </div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate();

  const roles = [
      {img:admin, title:"Admin", route:"/login/admin"},
      {img:faculty, title:"Faculty", route:"/login/faculty"},
      {img:student, title: "Student", route:"/login/student"},
  ]


  return(
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue h-20 flex items-center pl-8 sm:pl-16 text-white font-bold tracking-widest text-2xl">ClassSync</div>

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