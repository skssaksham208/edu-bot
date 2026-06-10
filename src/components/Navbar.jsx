import React from 'react'
import { FaRobot, FaUserGraduate } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="nav flex items-center justify-between h-[100px] px-[150px] w-full">

      <div className="logo flex items-center gap-[10px]">
        <i className="text-[50px]">
          <FaRobot />
        </i>

        <h3 className="text-[25px] font-[700]">
          EDU-<span className="text-purple-500">BOT</span>
        </h3>
      </div>

      <div className="user">
        <i className="text-[27px] cursor-pointer">
          <FaUserGraduate />
        </i>
      </div>

    </div>
  )
}

export default Navbar