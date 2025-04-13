import React, { useState,useEffect } from "react";
import useFetch from "../../hooks/studentHooks/useFetch.js";
import axios from "axios";

export default function Feedback() {
    const [data, loading, error] = useFetch("http://localhost:3000/student/enroll/courses");
    const [facultyList, setFacultyList] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (data) {
            const courses = data.courses.map(course => ({
                courseName: course.course_name,
                facultyName: course.faculty_name,
            }));
            setFacultyList(courses);
        }
    }, [data]);

    const handleSubmit = async () => {
        if (!facultyId || !courseId || !feedback.trim()) {
            alert('Please fill all fields!');
            return;
        }

        const feedbackData = {
            faculty_id: facultyId,
            course_id: courseId,
            feedback,
        };

        try {
            await axios.post("http://localhost:3000/student/profile/feedback", feedbackData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setShowModal(true);
            setFacultyId('');
            setCourseId('');
            setFeedback('');
        } catch (error) {
            console.error("Feedback submission error:", error);
            alert("Error submitting feedback");
        }
    };

    if (loading) return <div>Loading courses...</div>;
    if (error) return <div>Error loading courses.</div>;

    return (
        <div className="min-h-screen bg-white flex justify-center items-center p-6">
            <div className="bg-blue-100 w-full max-w-2xl p-10 rounded-lg shadow-lg relative">
                <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Feedback Form</h2>

                <div className="mb-6">
                    <label className="text-lg font-medium text-gray-800">Select Course</label>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="w-full p-3 mt-2 border bg-white rounded"
                    >
                        <option value="">Select Course</option>
                        {facultyList.map((course, index) => (
                            <option key={index} value={course.courseName}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="text-lg font-medium text-gray-800">Select Faculty</label>
                    <select
                        value={facultyId}
                        onChange={(e) => setFacultyId(e.target.value)}
                        className="w-full p-3 mt-2 border bg-white rounded"
                    >
                        <option value="">Select Faculty</option>
                        {facultyList.map((course, index) => (
                            <option key={index} value={course.facultyName}>
                                {course.facultyName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-lg font-medium text-gray-800">Feedback</label>
                    <textarea
                        className="w-full p-3 mt-2 border rounded-lg bg-white text-gray-700"
                        rows="6"
                        placeholder="Enter your feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                <div
                    onClick={handleSubmit}
                    className="text-center w-full p-2 mt-5 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 cursor-pointer transition-colors"
                >
                    Submit Feedback
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] border border-blue-400">
                            <h2 className="text-lg font-semibold mb-2 text-center">Feedback Submitted</h2>
                            <p className="text-gray-700 mb-4 text-center">Your feedback has been recorded. Thank you!</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
