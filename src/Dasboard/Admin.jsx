import React, { useEffect, useState } from 'react';
import { Calendar, Coffee, User, Users, LayoutDashboard, LogOut, Pencil, Trash2, Plus, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../App';
import { formatToIndianDateTime } from '../utils/helpingFunc';
const AdminDashboard = () => {

 
  const [employeeAttendance, setemployeeAttendance] = useState({
    totalEmployee: 0,
    present: 0,
    absent: 0
  })
  const [leaveRequests, setLeaveRequests] = useState([
  ])

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, active: true }
  ];

  const summaryCards = [
    { name: 'Total Employees', value: employeeAttendance.totalEmployee, icon: <User className="w-5 h-5" /> },
    { name: 'Present', value: employeeAttendance.present, icon: <Calendar className="w-5 h-5" /> },
    { name: 'Absent', value: employeeAttendance.absent, icon: <Users className="w-5 h-5" /> },
  ];

  const [holidayRequests,setHolidayRequests] = useState([])

  const [formInput,setFormInput] = useState({
    EventName:'',
    startDate:'',
    endDate:''
  })

  useEffect(() => {
    LeavesRec()
    EmployeeRec();
    holidaysRec()
  }, [])

  const EmployeeRec = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/totalusers`)

      setemployeeAttendance({
        totalEmployee: res.data.totalEmployees,
        present: res.data.presentToday,
        absent: res.data.absentToday
      })
    } catch (err) {
      console.error("error")
    }
  }

  const LeavesRec = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/getallleaves`)
      console.log(res.data.allLeaves, 'data=>>')
      setLeaveRequests(res.data.allLeaves)
    }
    catch (err) {
      console.log('err')
    }
  }
  const holidaysRec = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/getholidays`)
      console.log(res, 'hoidays data=>>')
      setHolidayRequests(res.data.allHolidays)
    }
    catch (err) {
      console.log('err')
    }
  }

  const handleUpdateLeave = async(id, status) => {
    try {
      const res = await axios.post(`${baseUrl}admin/updateleave`,{leaveId:id,status:status})
      console.log(res, 'newdata=>>');
      LeavesRec()
    }
    catch (err) {
      console.log('err')
    }

  }

  const handleChange=(e)=>{
    const {name,value} = e.target
    console.log(name,value)
    setFormInput((prev)=>{return{...prev,[name]:value}})
  }

   const handleAddHoliday = async() => {
    try{
      await axios.post(`${baseUrl}admin/registerholiday`,formInput)
      holidaysRec()
    }
    catch(err){
      console.log(err)
    }
  }


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

        <div className="w-full">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <h3 className="text-md font-semibold mb-4">Leave Requests</h3>
            <div className="space-y-3">
              {leaveRequests.map((req, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-md hover:bg-gray-50 gap-2">
                  <div className="flex items-center gap-3">
                    {/* <img src='ok' alt={req?.userId?.name}
                      className="w-10 h-10 rounded-full" /> */}
                    <span className='w-10 h-10 rounded-full flex items-center justify-center'>
                      <UserRound size={30} />
                    </span>
                    <div className='flex gap-16'>
                    <div>
                      <div className='flex items-center gap-3'>
                      <div className="font-semibold">{req?.userId?.name}</div> 
                          <span className={req?.status==='Pending'?'text-amber-300 font-semibold':req?.status==='Approved'?'text-green-500 font-semibold':'text-red-600 font-semibold'}> {req?.status}</span>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{formatToIndianDateTime(req.startDate).date} - {formatToIndianDateTime(req.endDate).date}</div>
                    </div>
                    <div>
                      <span className='font-semibold'>Reason - </span>{req.reason}
                    </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleUpdateLeave(req?._id, 'Approved')} className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-semibold">
                      ✓ Approve
                    </button>
                    <button onClick={() => handleUpdateLeave(req?._id, 'Rejected')} className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-semibold">
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

          </div>

         <table className="w-full text-sm text-left text-gray-700 table-auto border">
  <thead className="text-xs text-gray-700 font-bold ">
    <tr>
      <th className="py-2 px-4 ">Holiday Name</th>
      <th className="py-2 px-4">Start Date</th>
      <th className="py-2 px-4 ">End Date</th>
      <th className="py-2 px-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-gray-100">
      <td className="py-2 px-4">
        <input type="text" name='EventName' value={formInput.EventName} placeholder="Enter Holiday" onChange={handleChange} className="outline-none w-full px-2 py-1 border rounded" />
      </td>
      <td className="py-2 px-4">
        <input type="date" name='startDate' value={formInput.startDate} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
      </td>
      <td className="py-2 px-4">
        <input type="date" name='endDate' value={formInput.endDate} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
      </td>
      <td className="py-2 px-4">
        <button
          onClick={handleAddHoliday}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          <Plus className="w-4 h-4" />
          Add Holiday
        </button>
      </td>
    </tr>

    {holidayRequests?.map((holiday, index) => (
      <tr key={index} className="border-t">
        <td className="py-2 px-4 ">{holiday.EventName}</td>
        <td className="py-2 px-4">{formatToIndianDateTime(holiday.startDate).date}</td>
        <td className="py-2 px-4 ">{formatToIndianDateTime(holiday.endDate).date}</td>
        <td className="py-2 px-4">
          {/* Optional delete/edit buttons here */}
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