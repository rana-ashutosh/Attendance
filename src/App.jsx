import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './Features/Auth/Login'
import Signup from './Features/Auth/SignUp'
import Employee from './Dasboard/Employee'
import Admin from './Dasboard/Admin'
import LeaveApplyForm from './Components/Employee Component/LeaveApplyForm'
import { ToastContainer } from 'react-toastify';
import Holidays from './Components/Employee Component/Holidays'

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <ToastContainer/>
        <Routes>
          <Route path='/signUp' element={<Signup />}></Route>
          <Route path='/' element={<Login />}></Route>s
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/leave' element={<LeaveApplyForm />}></Route>
          <Route path='/Holidays' element={<Holidays />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}
export const baseUrl = "http://localhost:8080/";
export default App