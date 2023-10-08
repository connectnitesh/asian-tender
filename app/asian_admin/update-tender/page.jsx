"use client";

import React from "react";
import Sidebar from "@/components/adminComponents/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
  const [tender, setTender] = useState({
    tID: "",
    state: "",
    category: "",
    title: "",
    value: "",
    document: "",
    closeDate: "",
  });

  const handleInput = (e) => {
    setTender({
      ...tender,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.patch(
      `http://localhost:4000/api/${tender.tID}`,
      tender
    );

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
            Update Tender
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
          <label
            htmlFor="stateSelect"
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Tender State
          </label>
          <select
            id="state"
            name="state"
            className="py-1 px-4 border-2  border-gray-400 rounded mb-4 w-full"
            onChange={handleInput}
          >
            <option value="">Select state</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadra and Nagar Haveli">
              Dadra and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
          <br></br>
          <label
            htmlFor="serviceSelect"
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Tender Category
          </label>
          <select
            id="category"
            name="category"
            className="py-1 px-4  border-2 border-gray-400 rounded mb-4 w-full"
            onChange={handleInput}
          >
            <option value="">Select Category</option>
            <option value="Air Conditioner">Air Conditioner</option>
            <option value="Architect / Interior">Architect / Interior</option>
            <option value="Boiling House Equipment">
              Boiling House Equipment
            </option>
            <option value="Bridge Bearing">Bridge Bearing</option>
            <option value="Bridge Construction">Bridge Construction</option>
            <option value="Bridge Consultancy">Bridge Consultancy</option>
            <option value="Building Construction">Building Construction</option>
            <option value="CCTV">CCTV</option>
            <option value="Civil work">Civil work</option>
            <option value="Fire Fighting">Fire Fighting</option>
            <option value="Fire resistant items">Fire resistant items</option>
            <option value="Garden Tools">Garden Tools</option>
            <option value="GIS Survey">GIS Survey</option>
            <option value="Horticulture Work">Horticulture Work</option>
            <option value="Housekeeping Services">Housekeeping Services</option>
            <option value="Laboratory Items">Laboratory Items</option>
            <option value="Lift / Elevator / Escalator">
              Lift / Elevator / Escalator
            </option>
            <option value="Manpower Supply">Manpower Supply</option>
            <option value="Medical Equipments">Medical Equipments</option>
            <option value="Pre school kit / TLM">Pre school kit / TLM</option>
            <option value="Security Equipments">Security Equipments</option>
            <option value="Security Services">Security Services</option>
            <option value="Tubewell Drilling">Tubewell Drilling</option>
            <option value="Others">Others</option>
          </select>
          <br></br>
          <label
            htmlFor=""
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Tender Title
          </label>
          <textarea
            rows={4}
            cols={40}
            className="py-1 px-4 border-2  border-gray-400 rounded mb-4 w-full resize-none"
            name="title"
            onInput={handleInput}
          />
          <br></br>
          <label
            htmlFor=""
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Tender Value
          </label>
          <input
            type="text"
            className="py-1 px-4 border-2  border-gray-400 rounded mb-4 w-full"
            name="value"
            onInput={handleInput}
          />
          <br></br>
          <label
            htmlFor=""
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Tender Document
          </label>
          <input
            type="file"
            name=""
            id=""
            className="py-1 px-4 border-2  border-gray-400 rounded mb-4 w-full"
          />
          <br></br>
          <label
            htmlFor=""
            className="py-1 px-4 border-2 mr-2 bg-black text-white border-gray-400 rounded"
          >
            Closing Date
          </label>
          <input
            type="text"
            className="py-1 px-4 border-2  border-gray-400 rounded mb-4 w-full"
            name="closeDate"
            onInput={handleInput}
          />
          <br></br>
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

export default Update;
