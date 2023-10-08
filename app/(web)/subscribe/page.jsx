import Search from "@/components/mainComponents/Search";
import React from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";

const page = () => {
  return (
    <div className="bg-gray-100 py-2">
      <Search />
      <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <AiTwotoneHome size={20} />
          Home
        </Link>
        /Subscription Plan
      </h1>
      <div className="white-box flex mx-52 my-16 p-4 cursor-pointer">
        <div className="white-box text-lg p-4">
          <p className="p-2 orange-box rounded">Plan A</p>
          <p className="p-2 border-2 border-gray-100 rounded">
            Rs. 3,500/- (Three thousand, five hundred only)
          </p>
          <p className="p-2 border-2 border-gray-100 rounded">1 State</p>
          <p className="p-2 border-2 border-gray-100 rounded">One product category / 5 keywords</p>
          <p className="p-2 border-2 border-gray-100 rounded">Daily email tender notification</p>
          <p className="p-2 border-2 border-gray-100 rounded">Download tender document</p>
          <p className="p-2 border-2 border-gray-100 rounded">Web access</p>
        </div>
        <div className="orange-box p-4 text-lg rounded">
          <p className="p-2 border-2 border-orange-200 rounded">Plan B (Most Popular)</p>
          <p className="p-2 border-2 border-orange-400 rounded">Rs. 5,500/- (Five thousand, five hundred only)</p>
          <p className="p-2 border-2 border-orange-400 rounded">8 States</p>
          <p className="p-2 border-2 border-orange-400 rounded">One product category / 5 keywords</p>
          <p className="p-2 border-2 border-orange-400 rounded">Daily email tender notification</p>
          <p className="p-2 border-2 border-orange-400 rounded">Download tender document</p>
          <p className="p-2 border-2 border-orange-400 rounded">Web access</p>
        </div>
        <div className="white-box p-4 text-lg">
          <p className="p-2 orange-box rounded">Plan C</p>
          <p className="p-2 border-2 border-gray-100 rounded">
            Rs. 7,500/- (Seven thousand, five hundred only)
          </p>
          <p className="p-2 border-2 border-gray-100 rounded">All India</p>
          <p className="p-2 border-2 border-gray-100 rounded">One product category / 5 keywords</p>
          <p className="p-2 border-2 border-gray-100 rounded">Daily email tender notification</p>
          <p className="p-2 border-2 border-gray-100 rounded">Download tender document</p>
          <p className="p-2 border-2 border-gray-100 rounded">Web access</p>
        </div>
      </div>
    </div>
  );
};

export default page;
