import React, { useState, useEffect } from 'react'
import EmployeeSidebar from '../EmployeeSidebar'
import { Calendar } from 'lucide-react'
import { formatToIndianDateTime } from '../../utils/helpingFunc'
import axios from 'axios'
import { baseUrl } from '../../App'

const Holidays = () => {

    const [upcommingHolidays, setUpcommingHolidays] = useState([
        { name: 'Martin Luther King Jr. Day', date: 'January 20, 2025' },
        { name: "Presidents' Day", date: 'February 17, 2025' },
        { name: 'Memorial Day', date: 'May 26, 2025' },
    ])

    const getholidays = async () => {
        const todayDate = new Date()
        const res = await axios.get(`${baseUrl}admin/getholidays`)
        setUpcommingHolidays(res.data.allHolidays)
    }

    useEffect(() => {
        getholidays()
    }, [])

    return (
        <div className='flex bg-gray-50 w-full'>
            <div className='h-screen w-fit'>
                <EmployeeSidebar />
            </div>
            <div className="flex-1 min-w-[300px] p-4 bg-white rounded-lg border border-gray-200 shadow">
                <h2 className="text-lg font-semibold mb-4">Upcoming Holidays</h2>
                <div className="space-y-3">
                    {upcommingHolidays.map((holiday, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                            <Calendar className="text-gray-500 w-5 h-5" />
                            <div>
                                <div className="font-medium">{holiday.EventName}</div>
                                <div className="text-sm font-semibold text-gray-500">{formatToIndianDateTime(holiday.startDate).date} - {formatToIndianDateTime(holiday.endDate).date} </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Holidays