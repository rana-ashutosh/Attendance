import React, { useState } from 'react'
import { Clock, Coffee, Calendar, Users, TreePalm } from 'lucide-react'
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

export const formatTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Employee = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [clockIn, setClockIn] = useState(() => {
    const clockedIn = JSON.parse(localStorage.getItem("ClockInTime"));
    return clockedIn ? false : true;
  });

  const [clockOut, setClockOut] = useState(() => {
    const clockedIn = JSON.parse(localStorage.getItem("ClockInTime"));
    return clockedIn ? true : false;
  });

  const [clockInTime, setClockInTime] = useState(() => {
    const time = JSON.parse(localStorage.getItem("ClockInTime"));
    return time ? formatDateTime(time) : '';
  });

  const [clockOutTime, setClockOutTime] = useState();
  const [breakDuration, setBreakDuration] = useState();

  const [startedBreak, setStartedBreak] = useState(() => {
    return !!localStorage.getItem('breakStarted');
  });

  const [hourDone, setHourDone] = useState(false)

  const parseCustomDate = (dateStr) => {
  const cleaned = dateStr.replace('at', '');
  return new Date(cleaned);
};

const getWorkingDuration = () => {
  const inTime = parseCustomDate(clockInTime);
  const outTime = parseCustomDate(clockOutTime);

  const diffMs = outTime - inTime;

  if (diffMs <= 0) return 'Invalid time';

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hr ${minutes} min`;
};


  const handleClockIn = async () => {
    try {
      const res = await axios.post(`${baseUrl}attendance/clock-in/${currentUser._id}`);
      const time = res.data.clockIn;
      localStorage.setItem('ClockInTime', JSON.stringify(time));
      setClockIn(false);
      setClockOut(true);
      setClockInTime(formatDateTime(time));
      toast.success('Clocked In Successfully');

    } catch (err) {
      toast.error("Already Clocked In");
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await axios.post(`${baseUrl}attendance/clock-out/${currentUser._id}`);
      const time = res.data.clockOut;
      console.log(time)
      setClockOut(false);
      setClockIn(true);
      localStorage.removeItem('ClockInTime');
      localStorage.removeItem('breakStarted');
      setStartedBreak(false);
      setClockOutTime(formatDateTime(time));
      toast.success("Clocked Out Successfully");
      setHourDone(true)
    } catch (err) {
      toast.error("Error during Clock Out");
    }
  };

  const startBreak = async () => {
    try {
      const userId = currentUser._id;
      const todayDate = new Date().toISOString().split("T")[0];
      const startTime = new Date().toISOString();

      const res = await axios.post(`${baseUrl}attendance/startBreak`, {
        userId,
        todayDate,
        startTime,
      });

      toast.success('Break started');
      localStorage.setItem('breakStarted', JSON.stringify(startTime));
      setStartedBreak(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to start break');
    }
  };

  // const calculateWorkingHour = (breaks)=>{
  //   const totalSeconds = breaks.reduce((acc, curr) =>{
  //     if(!curr.duration) return acc; 
  //     const[hours, minutes, seconds] = curr.duration.split(':').map(Number);
  //     return acc + hours
  //   })
  // }

  const calculateTotalDuration = (breaks) => {
    const totalSeconds = breaks.reduce((acc, curr) => {
      if (!curr.duration) return acc;
      const [hours, minutes, seconds] = curr.duration.split(':').map(Number);
      return acc + hours * 3600 + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const endBreak = async () => {
    try {
      const userId = currentUser._id;
      const todayDate = JSON.parse(localStorage.getItem('ClockInTime'));
      const endTime = new Date().toISOString();

      const res = await axios.post(`${baseUrl}attendance/endBreak`, {
        userId,
        todayDate,
        endTime,
      });

      toast.success(res.data.message || 'Break ended successfully');
      const totalDuration = calculateTotalDuration(res.data.data.breaks);
      setBreakDuration(totalDuration);
      localStorage.removeItem('breakStarted');
      setStartedBreak(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to end break");
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <EmployeeSidebar />

        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 space-y-6">
          <div className='flex justify-end'>
            <h2>{currentUser.email}</h2>
          </div>

          <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-md">
            <h2 className="text-[20px] font-semibold">Welcome, {currentUser.name}!</h2>
            <p className="text-[#4b5563] font-semibold text-sm mt-1">
              Today is {formatTodayDate()}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[60%] bg-white p-4 md:p-6 border border-gray-200 rounded-md space-y-5">
              <h2 className="text-[18px] font-semibold">Attendance Controls</h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleClockIn}
                  disabled={!clockIn}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3
                    text-white font-semibold bg-[#4b5563] hover:bg-[#3f4853] rounded-md
                    disabled:cursor-not-allowed disabled:text-[#6b7280] disabled:bg-[#d1d5db]">
                  <Clock size={20} className="fill-white text-[#4b5563]" />
                  Clock In
                </button>

                <button
                  onClick={handleClockOut}
                  disabled={!clockOut}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3
                    text-white font-semibold bg-[#4b5563] hover:bg-[#3f4853] rounded-md
                    disabled:cursor-not-allowed disabled:text-[#6b7280] disabled:bg-[#d1d5db]">
                  <Clock size={20} />
                  Clock Out
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={startBreak}
                  disabled={startedBreak}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white font-semibold bg-[#4b5563] hover:bg-[#3f4853] rounded-md disabled:cursor-not-allowed disabled:text-[#6b7280] disabled:bg-[#d1d5db]">
                  <Coffee size={20} className="fill-white text-[#4b5563]" />
                  Start Break
                </button>

                <button 
                  onClick={endBreak}
                  disabled={!startedBreak}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white font-semibold bg-[#4b5563] hover:bg-[#3f4853] rounded-md disabled:cursor-not-allowed disabled:text-[#6b7280] disabled:bg-[#d1d5db]">
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
                  <span className="font-medium text-gray-900">{clockInTime?clockInTime:'--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Clock Out:</span>
                  <span className="font-medium text-gray-900">{clockOutTime?clockOutTime:'--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Working Hours:</span>
                  <span className="font-medium text-gray-900">{clockOutTime?getWorkingDuration():'--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Break Time:</span>
                  <span className="font-medium text-gray-900">{breakDuration?breakDuration:'--'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Holidays and Leaves */}
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
  );
};

export default Employee;