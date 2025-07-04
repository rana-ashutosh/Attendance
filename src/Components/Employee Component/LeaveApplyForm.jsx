import React, { useState } from 'react';
import EmployeeSidebar from '../EmployeeSidebar';

const LeaveApplyForm = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveData = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    console.log('Leave applied:', leaveData);
  };

  return (
    <div className='flex bg-gray-50 w-full'>
      <div className='h-screen w-fit'>
        <EmployeeSidebar/>
      </div>
      <div className='flex items-center mr-10 w-full'>
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
    </div>
  );
};

export default LeaveApplyForm;
