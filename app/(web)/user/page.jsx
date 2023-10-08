"use client";

import React from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";
import axios from 'axios'
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";

const Profile = () => {
  
  const [user, setUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    axios.get('http://localhost:4000/profile', {withCredentials: true}).then( (res)=>{
      if(res.data.success === false){
        window.location.replace('/login');
      }else{
        setUser(res.data);
      }
    })
  }, [])

  const handleLogout = ()=>{
    removeCookie('token');
  }
  

  return (
    <div className="bg-gray-100 py-14">
      <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <AiTwotoneHome size={20} />
          Home
        </Link>
        /Profile
      </h1>
      <div className="flex justify-center">
        <form action="" className="text-xl p-8 w-2/5 white-box rounded my-8">
          <h1 className="text-xl font-bold orange-box px-4 py-1 my-4 rounded">
            User Profile
          </h1>
          <label htmlFor="name">{user.userName}</label>
          <br />
          <label htmlFor="email">{user.userEmail}</label>
          <br />
          <label htmlFor="contact">{user.userContact}</label>
          <br />

          <label htmlFor="company">{user.userCompany}</label>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
