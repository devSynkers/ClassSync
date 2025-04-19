import React, { useEffect, useState } from "react";
import axios from "axios";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
    "8.30 AM - 9.20 AM",
    "9.25 AM - 10.15 AM",
    "10.30 AM - 11.20 AM",
    "11.25 AM - 12.15 PM",
    "1.10 PM - 2.00 PM",
    "2.05 PM - 2.55 PM",
    "3.00 PM - 3.50 PM",
    "3.55 PM - 4.45 PM",
];

export default function StudentClassTimetable() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [data, setData] = useState(days.map(() => Array(8).fill("")));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
        axios.get("http://localhost:3000/student/calendar/fixed-timetable", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

            .then((response) => {
                const timetable = response.data.timetable;
                const transformedData = days.map(() => Array(8).fill("")); // 5x8 matrix

                timetable.forEach((dayObj) => {
                    const dayIndex = days.findIndex(
                        (d) => d.slice(0, 3).toLowerCase() === dayObj.day.toLowerCase()
                    );
                    if (dayIndex !== -1) {
                        dayObj.slots.forEach((slot) => {
                            const periodIndex = slot.period_no - 1;
                            transformedData[dayIndex][periodIndex] = `${slot.course_name}\n(${slot.faculty_name})`;
                        });
                    }
                });

                setData(transformedData);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch timetable");
                console.error("API Error:", error);
                setLoading(false);
            });
    }, []);

    const handleClick = (dayIndex, periodIndex) => {
        setSelectedCell({ dayIndex, periodIndex });
    };

    const closeModal = () => {
        setSelectedCell(null);
    };

    if (loading) return <p className="text-center p-4">Loading timetable...</p>;
    if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

    return (
        <div className="w-full h-full bg-white p-6 mt-10">
            <div className="overflow-auto shadow-md border border-blue-300">
                <table className="border-collapse w-full text-sm text-center">
                    <thead>
                    <tr>
                        <th className="bg-blue-100 border border-blue-400 p-2">
                            Days/Hours
                        </th>
                        {Array.from({ length: 8 }, (_, i) => (
                            <th
                                key={i}
                                className="bg-blue-100 border border-blue-400 p-2"
                            >
                                {i + 1}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="bg-blue-50 border border-blue-400 p-2">Time</th>
                        {times.map((time, i) => (
                            <td key={i} className="bg-blue-50 border border-blue-400 p-2">
                                {time}
                            </td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {days.map((day, dayIndex) => (
                        <tr key={dayIndex}>
                            <td className="bg-blue-100 border border-blue-400 p-2 font-medium">
                                {day}
                            </td>
                            {Array(8)
                                .fill(null)
                                .map((_, periodIndex) => (
                                    <td
                                        key={periodIndex}
                                        onClick={() => handleClick(dayIndex, periodIndex)}
                                        className="border border-gray-400 p-2 cursor-pointer hover:bg-blue-100 transition"
                                    >
                                        <div className="whitespace-pre-wrap">
                                            {data[dayIndex][periodIndex] || ""}
                                        </div>
                                    </td>
                                ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedCell && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] border border-blue-400">
                        <h2 className="text-xl font-semibold mb-2">
                            {days[selectedCell.dayIndex]} – Period{" "}
                            {selectedCell.periodIndex + 1}
                        </h2>
                        <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                            {data[selectedCell.dayIndex][selectedCell.periodIndex] ||
                                "No class"}
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
