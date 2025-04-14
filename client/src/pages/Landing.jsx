import React from "react";
import admin from "../assets/admin.png";
import faculty from "../assets/faculty.png";
import student from "../assets/student.png";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/main/NavBar";
import RoleCard from "../components/main/RoleCard";

export default function Landing() {
  const navigate = useNavigate();

  const roles = [
    { img: admin, title: "Admin", route: "/login/admin" },
    { img: faculty, title: "Faculty", route: "/login/faculty" },
    { img: student, title: "Student", route: "/login/student" },
  ];

  return (
    <>
      <NavBar />

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center bg-white px-6 py-16">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            ClassSync offers a centralized platform for seamless communication between students, faculty, and administrators.
            Features include role-based authentication, real-time updates, data visualization dashboards, and more.
          </p>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6">Workflow</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
            <li>Users select their role (Admin, Faculty, Student) from the Stakeholders section</li>
            <li>They log in using their credentials</li>
            <li>Each role is routed to their personalized dashboard</li>
            <li>Admins can manage data, faculty can track and assign coursework, students can submit and view feedback</li>
          </ul>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section id="stakeholders" className="min-h-screen flex items-center justify-center bg-white px-6 py-16">
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold mb-10">Stakeholders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 max-w-screen-lg mx-auto">
            {roles.map((role) => (
              <RoleCard key={role.title} img={role.img} title={role.title} onClick={() => navigate(role.route)} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-16">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
          <p className="text-lg text-gray-700 italic mb-4">
            “ClassSync has completely streamlined our semester planning. It's intuitive and efficient!”  
          </p>
          <p className="text-gray-600">— Prof. Ramya Srinivasan, Department of Computer Science</p>
        </div>
      </section>
    </>
  );
}
