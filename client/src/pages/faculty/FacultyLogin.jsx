import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppHeader from "../../components/AppHeader";

export default function FacultyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Clear any previous errors
    setError("");
    
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:3000/faculty/auth/login", {
        id: username,
        password: password,
      });

      // Check if the response has a token and faculty_id directly
      const token = response.data.token;
      const facultyId = response.data.faculty_id; // Assuming the faculty_id is returned directly

      if (token && facultyId) {
        // Store the token and faculty_id in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("faculty_id", facultyId); // Directly store the faculty_id in localStorage

        // Navigate to the faculty dashboard after successful login
        navigate("/faculty/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Login failed:", error.message);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <AppHeader />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 px-4">
        <div className="w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 bg-white/25 backdrop-blur-2xl">
          <h2 className="text-2xl font-semibold text-center text-emerald-800 mb-6">Faculty Portal</h2>

          {/* Display error if any */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div className="mb-5">
            <label className="block text-base font-medium text-gray-900 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Faculty ID"
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium text-gray-900 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </>
  );
}
