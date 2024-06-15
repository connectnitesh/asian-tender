"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { customerLogin } from "@/api/api";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        router.push('/profile');
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (email && password) {
        const response = await customerLogin(email, password);

        if (response.status === "success") {
          await login(response.asiantoken_);
        } else {
          alert(response.message);
        }
      } else {
        alert("Please enter both email and password.");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during login. Please try again.');
      }
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="min-h-max p-4 bg-gray-100">
      <Breadcrumb mainPage="Home" sidePage="Login" mainLink="/" sideLink="login" position="left" />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="text-lg p-8 w-full max-w-lg bg-blue-600 text-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 text-black rounded my-2 p-2 w-full"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded text-black my-2 p-2 w-full"
          />
          <br />
          <button className="bg-green-500 text-white py-2 px-4 rounded my-2 w-full" type="submit">
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-gray-200 font-bold">
              Signup
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
