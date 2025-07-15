import React, { useState } from 'react';
import EmployeeSidebar from '../EmployeeSidebar';
import { baseUrl } from '../../App';
import axios from 'axios';
import { Menu } from 'lucide-react';

const LeaveApplyForm = () => {

    const [showSidebar, setShowSidebar] = useState(false); 
  
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const leaveData = {
        leaveType,
        startDate,
        endDate,
        reason,
        userId: user._id,
      };

      console.log('Leave applied:', leaveData);
      const res = await axios.post(`${baseUrl}admin/registerleave`, leaveData);
      console.log(res, 'data is gone');

      // Clear the form after successful submission
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {showSidebar && (
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setShowSidebar(false)}
          />
        )}


        <div className={`fixed top-0 left-0 z-50 h-full bg-white shadow-lg w-60 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <button
              onClick={() => setShowSidebar(false)}
              className="text-2xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
          <EmployeeSidebar />
        </div>

      <div className='flex-1 items-center mr-10 w-full'>
        <div className="flex justify-between">
          <div className="lg:hidden p-4">
            <button onClick={() => setShowSidebar(true)} className="text-gray-700">
              <Menu size={28} />
            </button>
          </div>
          <div className="flex items-center">
            <h1 className="text-md font-bold text-gray-800 lg:hidden px-5">Employee Dashboard</h1>
          </div>
        </div>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-[20px] font-semibold mb-4 text-center">Apply for Leave</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">-- Reason for Leave --</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="earned">Other Reason</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Describe your reason for leave..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4b5563] text-white py-2 rounded-md hover:bg-[#3f4853] transition"
            >
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default LeaveApplyForm;