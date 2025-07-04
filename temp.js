import React, { useState } from 'react'
import { Clock, Coffee, Calendar, Users, TreePalm } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmployeeSidebar from '../Components/EmployeeSidebar'
import axios from 'axios'
import { baseUrl } from '../App'
import { toast } from 'react-toastify'

export const formatDateTime = (isoString, options = {}) => {
  if (!isoString) return "-";
  
  const defaultOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const date = new Date(isoString);
  return date.toLocaleString('en-IN', { ...defaultOptions, ...options });
};

const Employee = () => {
    const [clockIn, setClockIn] = useState(true)
    const [clockOut, setClockOut] = useState(false)

    const handleClick = async() => {
        console.log('hi')
        try {
            const currentUser = await JSON.parse(localStorage.getItem("user"));
            const res = await axios.post(`${baseUrl}attendance/clock-in/${currentUser._id}`)
            let temp = await res.data
            console.log(temp)
            localStorage.setItem('ClockInTime',JSON.stringify(temp.clockIn))
            setClockIn(false)
            setClockOut(true)
        } catch (err){
            toast.error("Already Logged In")
        }
    }

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <EmployeeSidebar/>

                <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 space-y-6">
                    <div className='flex justify-end'>
                        <h2>John Smith</h2>
                    </div>
                    <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-md">
                        <h2 className="text-[20px] font-semibold">Welcome back, John!</h2>
                        <p className="text-[#4b5563] font-semibold text-sm mt-1">
                        Today is {}
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-[60%] bg-white p-4 md:p-6 border border-gray-200 rounded-md space-y-5">
                            <h2 className="text-[18px] font-semibold">Attendance Controls</h2>

                            <div className="flex flex-col sm:flex-row gap-4"   >
                                <button onClick={handleClick}
                                 disabled={!clockIn}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3
                                 text-white font-semibold bg-[#4b5563] hover:bg-[#3f4853] rounded-md
                                 disabled:cursor-not-allowed disabled:text-[#6b7280] disabled:bg-[#d1d5db]">
                                    <Clock size={20} className="fill-white text-[#4b5563]"/>
                                    Clock In
                                </button>
                                <button onClick={handleClick}
                                disabled={clockOut}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#6b7280]
                                 font-semibold bg-[#d1d5db] rounded-md
                                 disabled:bg-[#4b5563] disabled:text-white">
                                    <Clock size={20} />
                                    Clock Out
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white font-semibold bg-[#4b5563] hover:bg-[#3f4853] rounded-md">
                                    <Coffee size={20} className="fill-white text-[#4b5563]" />
                                    Start Break
                                </button>
                                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#6b7280] font-semibold bg-[#d1d5db] rounded-md">
                                    <Coffee size={20} />
                                    End Break
                                </button>
                            </div>
                        </div>

                        <div className="w-full lg:w-[40%] bg-white p-4 md:p-6 border border-gray-200 rounded-md">
                            <h2 className="text-lg font-semibold mb-4">Today's Status</h2>
                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Clock In:</span>
                                    <span className="font-medium text-gray-900"> {formatDateTime(JSON.parse(localStorage.getItem('ClockInTime')))}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Clock Out:</span>
                                    <span className="font-medium text-gray-900">-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Working Hours:</span>
                                    <span className="font-medium text-gray-900">0h 0m</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Break Time:</span>
                                    <span className="font-medium text-gray-900">0h 0m</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col lg:flex-row gap-6">

                        <div className="flex-1 min-w-[300px] p-4 bg-white rounded-lg border border-gray-200 shadow">
                            <h2 className="text-lg font-semibold mb-4">Upcoming Holidays</h2>
                            <div className="space-y-3">
                                {[
                                    { name: 'Martin Luther King Jr. Day', date: 'January 20, 2025' },
                                    { name: "Presidents' Day", date: 'February 17, 2025' },
                                    { name: 'Memorial Day', date: 'May 26, 2025' },
                                ].map((holiday, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                                        <Calendar className="text-gray-500 w-5 h-5" />
                                        <div>
                                            <div className="font-medium">{holiday.name}</div>
                                            <div className="text-sm font-semibold text-gray-500">{holiday.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="flex-1 min-w-[300px] p-4 bg-white rounded-lg border border-gray-200 shadow">
                            <h2 className="text-lg font-semibold mb-4">Approved Leaves</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                                    <TreePalm className="text-gray-500 w-5 h-5" />
                                    <div>
                                        <div className="font-medium">Vacation Leave</div>
                                        <div className="text-sm font-semibold text-gray-500">March 15–19, 2025</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                                    <Users className="text-gray-500 w-5 h-5" />
                                    <div>
                                        <div className="font-medium">Personal Leave</div>
                                        <div className="text-sm font-semibold text-gray-500">April 10, 2025</div>
                                    </div>
                                </div>

                                <p className="text-center text-sm font-semibold text-gray-500 pt-2">
                                    No more approved leaves
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee