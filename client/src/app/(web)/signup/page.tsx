"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { customerSignup } from "@/api/api";
import { useAuth } from "@/context/authContext";

const Signup = () => {
  const router = useRouter();
  const { user } = useAuth(); 

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    contact: "",
    company: "",
    password: ""
  });

  const fetchUserProfile = async () => {
    try {
      if (user) {
        router.push('/profile');
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customerSignup(customer.name, customer.email, customer.contact, customer.company, customer.password);
      if (response.status === "success") {
        alert(response.message);
        router.push('/login');
      } else {
        alert(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during signup. Please try again.');
      }
      console.error('An error occurred during signup:', error);
    }
  }

  return (
    <div className="min-h-max p-4 bg-gray-100">
      <Breadcrumb mainPage="Home" sidePage="Sign Up" mainLink="/" sideLink="signup" position="left" />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="text-lg p-8 w-full max-w-lg bg-blue-600 text-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Signup
          </h1>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            className="border-2 border-gray-300 text-black rounded my-2 p-2 w-full"
            onChange={handleInput}
            value={customer.name}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            className="border-2 border-gray-300 text-black rounded my-2 p-2 w-full"
            onChange={handleInput}
            value={customer.email}
          />
          <br />
          <label htmlFor="contact">Contact</label>
          <br />
          <input
            type="text"
            name="contact"
            className="border-2 border-gray-300 text-black rounded my-2 p-2 w-full"
            onChange={handleInput}
            value={customer.contact}
          />
          <br />
          <label htmlFor="company">Company</label>
          <br />
          <input
            type="text"
            name="company"
            className="border-2 border-gray-300 text-black rounded my-2 p-2 w-full"
            onChange={handleInput}
            value={customer.company}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            className="border-2 border-gray-300 text-black rounded my-2 p-2 w-full"
            onChange={handleInput}
            value={customer.password}
          />
          <br />
          <button className="bg-green-600 py-1 px-4 rounded my-2" type="submit">
            Signup
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-gray-200 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
