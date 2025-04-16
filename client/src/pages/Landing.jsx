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
      <section id="features" className="min-h-screen bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-neutral-800">Powerful Features</h2>
          <p className="text-gray-600 mb-12">
            ClassSync offers a centralized platform for seamless communication between students, faculty, and administrators.
            Features include role-based authentication, real-time updates, data visualization dashboards, and more.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Role-Based Access", desc: "Custom dashboards for Admins, Faculty, and Students." },
              { title: "Secure Authentication", desc: "Token-based login and session storage with security in mind." },
              { title: "Streamlined Workflow", desc: "Organized semester planning and feedback tracking." },
              { title: "Responsive UI", desc: "Looks great across desktops, tablets, and phones." },
              { title: "Data Management", desc: "Admins can manage departments, courses, and users." },
              { title: "Feedback System", desc: "Students submit feedback; faculty view real-time insights." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-orange-600 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="min-h-screen bg-gray-100 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-800 mb-6">How It Works</h2>
          <p className="text-gray-600 mb-12">ClassSync keeps your campus running efficiently</p>

          <ol className="relative border-l border-orange-300 pl-6 space-y-10 text-left">
            {[
              "Select your role (Admin, Faculty, or Student)",
              "Log in securely using credentials",
              "Get routed to a customized dashboard",
              "Manage or view tasks and updates based on your role",
              "Interact, submit feedback, or assign work seamlessly",
            ].map((step, i) => (
              <li key={i} className="relative">
                <div className="absolute w-6 h-6 bg-orange-500 rounded-full left-[-33px] top-1.5 border-5 border-white" />
                <p className="text-lg font-medium text-neutral-800">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section id="stakeholders" className="min-h-screen bg-white px-6 py-20">
        <div className="text-center w-full">
          <h2 className="text-4xl font-bold mb-10 text-neutral-800">Stakeholder's Login</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 max-w-screen-lg mx-auto">
            {roles.map((role) => (
              <RoleCard
                key={role.title}
                img={role.img}
                title={role.title}
                onClick={() => navigate(role.route)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="min-h-screen bg-gray-100 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-neutral-800">What They Say</h2>
          <p className="text-gray-600 mb-12">Trusted by educators and learners alike</p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "ClassSync has transformed the way we manage courses. It's smooth, reliable, and easy to use.",
                name: "Prof. Ramya Srinivasan",
                role: "Faculty, CSE",
              },
              {
                quote: "I can finally keep track of assignments and feedback in one place. No more confusion!",
                name: "Akhil Nair",
                role: "Student, ECE",
              },
              {
                quote: "Our workflows are now unified and digital. ClassSync helps us scale without the chaos.",
                name: "Mr. Krishnan",
                role: "Admin Officer",
              },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition text-left">
                <div className="text-orange-600 text-3xl mb-4">“</div>
                <p className="text-gray-800 mb-4 italic">{t.quote}</p>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{t.name}</span> <br />
                  {t.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
