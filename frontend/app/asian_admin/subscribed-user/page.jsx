import React from "react";
import Sidebar from "@/components/adminComponents/Sidebar";

const list = () => {
  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />
      <div className="bg-black w-full p-16">
        <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1">
          Subscribed User
        </h1>
        <p className="p-4 text-2xl">It is under Development...</p>
      </div>
    </div>
  );
};

export default list;
