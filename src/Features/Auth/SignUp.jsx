import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import {baseUrl} from '../../App';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}user/register`, values);
      console.log(res)
      toast.success(`${res.data.message}`);
      navigate('/');
    } catch (err) {
      toast.error( "Sign-in failed. Please try again.");
      console.error(err);
      setMessage('Something went wrong!');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
        <form className="space-y-4 overflow-hidden" >
          <div>
            <label className="mb-2 text-sm font-medium text-gray-600">Full Name</label>
            <input onChange={handleOnChange} type="text" name='name' className="w-full px-4 py-2 border rounded-md"
              required />
          </div>
          <div>
            <label className="mb-2 text-sm font-medium text-gray-600">Email</label>
            <input type="email" onChange={handleOnChange} name='email' className="w-full px-4 py-2 border rounded-md"
              required />
          </div>
          <div>
            <label className="mb-2 text-sm font-medium text-gray-600">Password</label>
            <input type="password" onChange={handleOnChange} name='password' className="w-full px-4 py-2 border rounded-md"
              required />
          </div>
          <button onClick={handleSubmit}
            className="w-full bg-[#4b5563] hover:bg-[#3f4853] text-white py-2 rounded-md transition">
            Sign Up
          </button>
        </form>
        <div className="w-full flex justify-center mt-4">
          <p>
            Already have an account?{' '}
            <Link to='/'>
              <span
                className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Signup;
