'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/context/authContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between px-4 bg-white dark:border-strokedark dark:bg-boxdark h-14 text-black dark:text-white w-full">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/images/logo2.png" width={200} height={150} alt="logo" />
        </Link>
      </div>
      {/* Links in the center with glassmorphism effect */}
      <div className="glassmorphism-container mt-2">
        <ul className="flex justify-center space-x-4">
          <li className="pt-1">
            <Link href="/tenders" className="hover:underline decoration-gray-400 underline-offset-4">
              Tenders
            </Link>
          </li>
          <li className="pt-1">
            <Link href="/subscribe" className="hover:underline decoration-gray-400 underline-offset-4">
              Subscription Plan
            </Link>
          </li>
          <li className="pt-1">
            <Link href="/about" className="hover:underline decoration-gray-400 underline-offset-4">
              About Us
            </Link>
          </li>
          <li className="pt-1">
            <Link href="/contact" className="hover:underline decoration-gray-400 underline-offset-4">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      {/* Conditional rendering for login/profile button */}
      <div className="flex items-center">
        {user ? (
          <Link href="/profile" className="text-white px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700">
            Profile
          </Link>
        ) : (
          <Link href="/login" className="text-white px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
