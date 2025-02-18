import React from 'react'
import SideBar from '../components/staff/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/staff/NavBar'
import { useLocation } from 'react-router-dom'
export default function LayoutStaff() {
    return (
        <>
            <div className='flex gap-5 bg-[#FFF2F2] min-h-screen'>
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}
