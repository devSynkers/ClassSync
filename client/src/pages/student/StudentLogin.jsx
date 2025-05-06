import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentLogin(){
  const[username, setUsername]= useState('');
  const[password, setPassword]= useState('');

  const navigate = useNavigate();
  const handleSubmit = async ()=>{
    if(!username || !password){
        console.log("hihihiihi")
    }
    try{
        let response = await axios.post("http://localhost:3000/student/auth/login",{reg_no:username, password})
       let token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/student/dashboard");
    }
    catch (error){
        console.log("ERROR !! :",error.message);
    }


  }

  return(
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 bg-white/25 backdrop-blur-2xl">
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

      <button  onClick={()=>handleSubmit()} className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
        Login
      </button>

      </div>
    </div>
    
  )
}