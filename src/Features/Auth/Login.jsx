import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../../App';
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });
      const data = await res.json()
      
      localStorage.setItem("user", JSON.stringify(data.user))

      if (res.ok) {
        toast.success('Login successful');
        console.log(data)
        if(data.user.role==='admin'){
          setTimeout(()=>navigate('./admin'), 1000)
        } else{
        setTimeout(() => navigate('./employee'), 1000);
        }
      } else {
        toast.error('Login Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4b5563] hover:bg-[#3f4853] text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <div className="w-full flex justify-center mt-4">
          <p className="text-sm">
            Don’t have an account?{' '}
            <span
              className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              onClick={() => navigate('/signUp')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
