import React from 'react'
import EmployeeSidebar from '../Components/EmployeeSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='flex'>
            <div className="hidden lg:block">
                <EmployeeSidebar />
            </div>
            <div className='flex-1 overflow-hidden'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Layout