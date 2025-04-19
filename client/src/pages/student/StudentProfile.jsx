import React from "react";
import useFetch from "../../hooks/studentHooks/useFetch.js";

export default function StudentProfile() {
    const [data, loading, error] = useFetch("http://localhost:3000/student/profile/me");
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No student profile data found.</p>;

    return (
        <div className="flex flex-col min-h-screen w-full items-center bg-white py-10 px-4">
            <h3 className="text-3xl font-bold mb-10 text-blue-500">Student Profile</h3>
            <div className="overflow-x-auto w-full max-w-4xl">
            <table className="w-full max-auto border border-blue-400 border-collapse text-lg">
                <tbody>
                <tr>
                    <td className="table-cell-f">Name</td>
                    <td className="table-cell">{data.student_name}</td>
                </tr>
                <tr>
                    <td className="table-cell-f">Email</td>
                    <td className="table-cell">{data.email}</td>
                </tr>
                <tr>
                    <td className="table-cell-f">Phone Number</td>
                    <td className="table-cell">{data.phone}</td>
                </tr>
                <tr>
                    <td className="table-cell-f">Register Number</td>
                    <td className="table-cell">{data.reg_no}</td>
                </tr>
                <tr>
                    <td className="table-cell-f">Batch</td>
                    <td className="table-cell">{data.batch_name}</td>
                </tr>
                <tr>
                    <td className="table-cell-f">Department</td>
                    <td className="table-cell">{data.department_name}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}
