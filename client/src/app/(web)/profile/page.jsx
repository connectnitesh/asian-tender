"use client";

import React from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb-left';
import { useAuth } from "@/context/authContext";
import Link from 'next/link';
import  withAuth from '@/components/Auth/withAuth'

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <section className="bg-gray-100">
      <div className="min-h-max p-4 bg-gray-100">
        <Breadcrumb pageName="Profile" />
        <div className="container py-5">
        </div>
        <div className="md:flex">
          <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-full mx-auto mb-4"
                style={{ width: '150px' }}
              />
              <div className="flex justify-center">
                <p className="text-gray-500 mb-1">{user ? user.name : ''}</p>
              </div>
              <div className="flex justify-center">
                <p className="text-gray-500 mb-4">{user ? user.company : ''}</p>
              </div>
              <div className="flex justify-center mb-4">
                {user && user.subscribed ? (
                  <button className="bg-green-500 text-white w-40 py-2 px-4 rounded mr-2">Subscribed</button>
                ) : (
                  <Link href="/subscribe" className="bg-rose-700 w-40 text-white py-2 px-4 rounded mr-2">
                    Subscribe Now
                  </Link>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={logout}
                  className="bg-blue-600 text-white py-2 w-40 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 md:pl-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-4">
                <p className="text-lg font-semibold">Full Name:</p>
                <p className="text-gray-700">{user ? user.name : ''}</p>
              </div>
              <hr className="mb-4" />
              <div className="mb-4">
                <p className="text-lg font-semibold">Email:</p>
                <p className="text-gray-700">{user ? user.email : ''}</p>
              </div>
              <hr className="mb-4" />
              <div className="mb-4">
                <p className="text-lg font-semibold">Phone:</p>
                <p className="text-gray-700">{user ? user.contact : ''}</p>
              </div>
              <hr className="mb-4" />
              <div className="mb-4">
                <p className="text-lg font-semibold">Address:</p>
                <p className="text-gray-700">{user ? user.address : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Profile);
