import React from 'react';
import {Calendar, Coffee, User, Users, LayoutDashboard, LogOut, CalendarDays, FileClock, Pencil, Trash2, Plus} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, active: true }
  ];

  const summaryCards = [
    { name: 'Total Employees', value: 142, icon: <User className="w-5 h-5" /> },
    { name: 'Present', value: 8, icon: <Calendar className="w-5 h-5" /> },
    { name: 'Absent', value: 5, icon: <Users className="w-5 h-5" /> },
  ];

  const leaveRequests = [
    { name: 'John Smith', dates: 'Jun 30 - Jul 2, 2025' },
    { name: 'Sarah Johnson', dates: 'Jul 5 - Jul 7, 2025' },
    { name: 'Mike Davis', dates: 'Jul 10 - Jul 12, 2025' },
  ];

  const holidays = [
    { name: 'Independence Day', date: 'July 4, 2025', type: 'National' },
    { name: 'Labor Day', date: 'September 2, 2025', type: 'National' },
    { name: 'Thanksgiving', date: 'November 27, 2025', type: 'National' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <aside className="w-full lg:w-60 bg-white shadow-md px-4 py-6 space-y-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <nav className="space-y-4 text-gray-700 text-sm font-semibold">
          {navItems.map((item, i) => (
            <div key={i}
            className={`flex items-center gap-2 px-2 py-2 rounded-md ${item.active ? 'bg-[#4b5563] text-white' : 'hover:bg-gray-100'}`}>
              {item.icon}
              {item.name}
            </div>
          )
          )}
        </nav>
         <Link to='/'>
            <div className='flex text-gray-700 text-sm font-semibold gap-3 cursor-pointer hover:text-red-600'>
                <LogOut className="w-6 h-6" />
                <h2>Logout</h2>
            </div>
            </Link>
      </aside>

      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-gray-600 text-sm">Welcome back, Admin</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Today</p>
            <p className="text-lg font-semibold">June 27, 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaryCards.map((card, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-md shadow-sm border">
              <div className="text-gray-500">{card.icon}</div>
              <div>
                <div className="text-xs text-gray-500 font-semibold">{card.name}</div>
                <div className="text-xl font-bold text-gray-800">{card.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold">Weekly Attendance</h3>
              <select className="border text-sm p-1 rounded-md">
                <option>This Week</option>
              </select>
            </div>
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <LayoutDashboard className="w-10 h-10" />
              <p className="font-semibold">Attendance Chart</p>
            </div>
          </div>

          <div className="bg-white p-4 border rounded-md shadow-sm">
            <h3 className="text-md font-semibold mb-4">Pending Leave Requests</h3>
            <div className="space-y-3">
              {leaveRequests.map((req, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-md hover:bg-gray-50 gap-2">
                  <div className="flex items-center gap-3">
                    <img src='' alt={req.name}
                      className="w-10 h-10 rounded-full"/>
                    <div>
                      <div className="font-semibold">{req.name}</div>
                      <div className="text-sm text-gray-500 font-medium">{req.dates}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-semibold">
                      ✓ Approve
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-semibold">
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Manage Holidays</h2>
            <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
              <Plus className="w-4 h-4" />
              Add Holiday
            </button>
          </div>

          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 font-bold border-b">
              <tr>
                <th className="py-2">Holiday Name</th>
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{holiday.name}</td>
                  <td className="py-3">{holiday.date}</td>
                  <td className="py-3">{holiday.type}</td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-gray-600 hover:text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
