import React,{useState} from "react";

export default function LoginPage(){
  const[username, setUsername]= useState('');
  const[password, setPassword]= useState('');

  return(
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <form className="w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 bg-white/25 backdrop-blur-2xl">
      <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Student Portal</h2>

      <div className="mb-5">
        <label className="block text-base font-medium text-gray-900 mb-1">Username</label>
        <input  type="text" className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
         value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Rollno" />
      </div>

      <div className="mb-5">
        <label className="block text-base font-medium text-gray-900 mb-1">Password</label>
        <input  type="password" className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
         value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
      </div>

      <button type="submit" className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
        Login
      </button>

      </form>
    </div>
    
  )
}