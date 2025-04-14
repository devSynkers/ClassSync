import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
    "8.30 AM - 9.20 AM",
    "9.25 AM - 10.15 AM",
    "10.30 AM - 11.20 AM",
    "11.25 AM - 12.15 AM",
    "1.10 PM - 2.00 PM",
    "2.05 PM - 2.55 PM",
    "3.00 PM - 3.50 PM",
    "3.55 PM - 4.45 PM",
];

export default function StudentClassTimetable() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [data, setData] = useState(days.map(() => Array(8).fill("")));

    const handleClick = (dayIndex, periodIndex) => {
        setSelectedCell({ dayIndex, periodIndex });
    };

    const closeModal = () => {
        setSelectedCell(null);
    };

    return (
        <div className="w-full h-full bg-white p-6 mt-10">
            <div className="overflow-auto shadow-md  border border-blue-300">
                <table className="border-collapse w-full text-sm text-center">
                    <thead>
                    <tr>
                        <th className="bg-blue-100 border border-blue-400 p-2">Days/Hours</th>
                        {Array.from({ length: 8 }, (_, i) => (
                            <th key={i} className="bg-blue-100 border border-blue-400 p-2">
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
                            <td className="bg-blue-100 border border-blue-400 p-2 font-medium">{day}</td>
                            {Array(8)
                                .fill(null)
                                .map((_, periodIndex) => (
                                    <td
                                        key={periodIndex}
                                        onClick={() => handleClick(dayIndex, periodIndex)}
                                        className="border border-gray-400 p-2 cursor-pointer hover:bg-blue-100 transition"
                                    >
                                        {data[dayIndex][periodIndex] || `Period ${periodIndex + 1}`}
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
                            {days[selectedCell.dayIndex]} – Period {selectedCell.periodIndex + 1}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Instruction: <span className="italic text-blue-500">Bring laptop</span>
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
