import React from 'react'
import { LuLogOut } from "react-icons/lu";
import './Logout.css'

function Logout() {

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expires_at");
        window.location.href = "/login";
    }
  return (
    <LuLogOut className='logout' onClick={handleLogout}/>
  )
}

export default Logout