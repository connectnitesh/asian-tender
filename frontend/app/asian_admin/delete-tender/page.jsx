"use client";

import React from "react";
import Sidebar from "@/components/adminComponents/Sidebar";
import { useState } from "react";
import axios from "axios";

const Delete = () => {
  const [tID, settID] = useState();

  const handleInput = (e) => {
    settID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.delete(`http://localhost:4000/api/${tID}`);

    alert(res.data.message);
    handleReset();
  };

  const handleReset = () => {
    const element = document.getElementById("_form");
    element.reset();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-black w-full p-16">
        <div className="flex w-full rounded">
          <h1 className="text-xl w-2/5 font-bold bg-orange-500 text-white px-4 py-1">
            Delete Tender
          </h1>
          <button
            onClick={handleReset}
            className="text-xl font-bold bg-white px-6 py-1"
          >
            Reset
          </button>
        </div>
        <form className="w-2/4 fade-box p-4 my-8 rounded" id="_form">
          <label
            htmlFor=""
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Tender Id
          </label>
          <input
            type="text"
            className="py-1 px-4 border-2  border-gray-400 rounded mb-4 w-full"
            name="tID"
            onInput={handleInput}
          />
          <br />
          <button
            className="py-1 px-4 mr-2 bg-orange-500 text-white w-full font-bold rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Delete;
