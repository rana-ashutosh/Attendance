import { CalendarDays, FileClock, LayoutDashboard, LogOut, PartyPopper } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const EmployeeSidebar = () => {
    const location = useLocation();

    const navItems = [
        { option: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, link: '/employee' },
        { option: 'Apply Leaves', icon: <FileClock className="w-4 h-4" />, link: '/leave' },
        { option: 'Holidays', icon: <PartyPopper className="w-4 h-4"/>, link: '/Holidays'}
    ];

    return (
        <div className="w-60 h-screen bg-white shadow-md px-4 py-6 space-y-6 flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">Employee Dashboard</h1>
            <nav className="flex flex-col gap-4 text-gray-700 text-sm font-semibold border-b border-gray-200">
                {navItems.map((item, i) => {
                    const isClicked = location.pathname === item.link;
                    return (
                        <Link className='w-full' key={i} to={item.link}>
                            <div className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors
                                ${isClicked ? 'bg-[#4b5563] text-white' : 'hover:bg-gray-100'}`}>
                                {item.icon}
                                {item.option}
                            </div>
                        </Link>
                    );
                })}
            </nav>
            <Link to='/'>
            <div 
            className='flex text-gray-700 text-sm font-semibold gap-3 cursor-pointer hover:text-red-600'>
                <LogOut className="w-6 h-6" />
                <h2>Logout</h2>
            </div>
            </Link>
        </div>
    )
}

export default EmployeeSidebar
