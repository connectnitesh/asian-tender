"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import axios from 'axios';

const Signup = () => {

  const [user, setUser] = useState({
    "name": "",
    "email": "",
    "contact":"",
    "company": "",
    "password": ""
  });

  // useEffect(() => {
  //   axios.get('http://localhost:4000/profile', {withCredentials: true}).then( (res)=>{
  //     if(res.data.success !== false){
  //       window.location.replace('/user');
  //     }
  //   })
  // }, [])

  const handleInput = (e)=>{
    const {name,value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const  handleSubmit = async(e) => {
    e.preventDefault();
    
    // const response = await axios.post('http://localhost:4000/signup', user,{withCredentials: true});

    // if(response.data.success === true){
    //   window.location.replace('/user');
    // }else{
    //   alert(response.data.message);
    // }
    
  }


  return (
    <div className="bg-gray-100 py-14">
      <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <AiTwotoneHome size={20} />
          Home
        </Link>
        /Signup
      </h1>
      <div className="flex justify-center">
        <form action="" className="text-xl p-8 w-2/5 white-box rounded my-8">
          <h1 className="text-xl font-bold orange-box px-4 py-1 my-4 rounded">
            Signup
          </h1>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            className="border-2 border-orange-500 rounded my-2 w-full"
          onChange={handleInput}/>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            className="border-2 border-orange-500 rounded my-2 w-full"
            onChange={handleInput}/>
          <br />
          <label htmlFor="contact">Contact</label>
          <br />
          <input
            type="text"
            name="contact"
            className="border-2 border-orange-500 rounded my-2 w-full"
            onChange={handleInput}/>
          <br />
          <label htmlFor="company">Company</label>
          <br />
          <input
            type="text"
            name="company"
            className="border-2 border-orange-500 rounded my-2 w-full"
            onChange={handleInput}/>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="text"
            name="password"
            className="border-2 border-orange-500 rounded my-2 w-full"
            onChange={handleInput}/>
          <br />
          <button className="orange-box py-1 px-4 rounded my-2" onClick={handleSubmit}>Signup</button>
          <p className="text-sm my-8">
            Already have an account ? <Link href="/login" className="text-orange-500 font-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
