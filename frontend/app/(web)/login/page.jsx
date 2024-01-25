"use client"
import React, { useState } from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status == "SUCCESS") {
        setAuthenticated(true);
        console.log("Login successful!");
      } else {
        console.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="bg-gray-100 py-14">
      <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <AiTwotoneHome size={20} />
          Home
        </Link>
        /Login
      </h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="text-l p-8 w-1/4 white-box rounded my-8">
          <h1 className="text-xl font-bold orange-box px-4 py-1 my-4 rounded">
            Login
          </h1>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-orange-500 rounded my-2 "
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-orange-500 rounded my-2"
          />
          <br />
          <button className="orange-box py-1 px-4 rounded my-2" type="submit">
            Login
          </button>
          <p className="text-sm my-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-orange-500 font-bold">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
