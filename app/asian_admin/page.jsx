
import React from "react";
import Sidebar from "@/components/adminComponents/Sidebar";

const index = () => {

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-black w-full h-screen-full p-16">
          <h1 className="text-white font-bold text-6xl m-8">Welcome!</h1>
          <h2 className="text-orange-400 text-3xl m-8">Asian admin Panel</h2>
      </div>
    </div>
  );
};

export default index;
