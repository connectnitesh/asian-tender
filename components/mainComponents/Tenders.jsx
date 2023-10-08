"use client"

import Link from 'next/link';
import React from 'react'
import {AiTwotoneHome} from 'react-icons/ai'
import { useState,useEffect } from 'react';
import axios from 'axios'
import Tenderbox from './Tenderbox';

export default function Tenders() {
  const [load, setLoad] = useState(false);
  const [tenders, setTenders] = useState();

  useEffect(() => {
    const getTenders = async () => {
      const result = await axios.get("http://localhost:4000/api");
      setTenders(result.data);
      setLoad(true);
    };
    getTenders();
  }, []);



  return (
    <div className='bg-gray-100 pb-8'>
    <Link href="/"><h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
       <AiTwotoneHome size={20}/> Home 
      </h1></Link>
      <div className="content flex p-2 my-4">
        <div className="mx-8">
          <div className="mb-8 p-4 white-box">
            <h1 className="font-bold text-lg text-gray-600">Tender By Category</h1>
            <TenderByCategory />
          </div>
          <div className="mt-8 p-4 white-box">
            <h1  className="font-bold text-lg text-gray-600">Tender By State</h1>
            <TenderByState />
          </div>
        </div>
        <div className="pr-4 mr-4 w-full">
          <h1  className="font-bold text-lg text-gray-600">Latest Tender Notifications</h1>
          {load ? (
          tenders.map((tender) => (
            <Tenderbox
              key={tender.tID}
              category={tender.category}
              closeDate={tender.closeDate}
              state={tender.state}
              title={tender.title}
              value={tender.value}
              tID={tender.tID}
            />
          ))
        ) : (
          <p className="text-white">Loading...</p>
        )}
        </div>
      </div>
    </div>
  )
}


function TenderByState() {
  const filterState = (state) =>{
    const result = tenders.filter((tender)=>{
        return tender.state === state;
    })
    console.log(result);
  }
  return (
    <div className="h-60 w-52 overflow-y-scroll">
 <p className="cursor-pointer" onClick={() => filterState("Andaman and Nicobar Islands")}>Andaman and Nicobar Islands</p>
<p className="cursor-pointer" onClick={() => filterState("Andhra Pradesh")}>Andhra Pradesh</p>
<p className="cursor-pointer" onClick={() => filterState("Arunachal Pradesh")}>Arunachal Pradesh</p>
<p className="cursor-pointer" onClick={() => filterState("Assam")}>Assam</p>
<p className="cursor-pointer" onClick={() => filterState("Bihar")}>Bihar</p>
<p className="cursor-pointer" onClick={() => filterState("Chandigarh")}>Chandigarh</p>
<p className="cursor-pointer" onClick={() => filterState("Chhattisgarh")}>Chhattisgarh</p>
<p className="cursor-pointer" onClick={() => filterState("Dadra and Nagar Haveli")}>Dadra and Nagar Haveli</p>
<p className="cursor-pointer" onClick={() => filterState("Daman and Diu")}>Daman and Diu</p>
<p className="cursor-pointer" onClick={() => filterState("Delhi")}>Delhi</p>
<p className="cursor-pointer" onClick={() => filterState("Goa")}>Goa</p>
<p className="cursor-pointer" onClick={() => filterState("Gujarat")}>Gujarat</p>
<p className="cursor-pointer" onClick={() => filterState("Haryana")}>Haryana</p>
<p className="cursor-pointer" onClick={() => filterState("Himachal Pradesh")}>Himachal Pradesh</p>
<p className="cursor-pointer" onClick={() => filterState("Jammu and Kashmir")}>Jammu and Kashmir</p>
<p className="cursor-pointer" onClick={() => filterState("Jharkhand")}>Jharkhand</p>
<p className="cursor-pointer" onClick={() => filterState("Karnataka")}>Karnataka</p>
<p className="cursor-pointer" onClick={() => filterState("Kerala")}>Kerala</p>
<p className="cursor-pointer" onClick={() => filterState("Ladakh")}>Ladakh</p>
<p className="cursor-pointer" onClick={() => filterState("Lakshadweep")}>Lakshadweep</p>
<p className="cursor-pointer" onClick={() => filterState("Madhya Pradesh")}>Madhya Pradesh</p>
<p className="cursor-pointer" onClick={() => filterState("Maharashtra")}>Maharashtra</p>
<p className="cursor-pointer" onClick={() => filterState("Manipur")}>Manipur</p>
<p className="cursor-pointer" onClick={() => filterState("Meghalaya")}>Meghalaya</p>
<p className="cursor-pointer" onClick={() => filterState("Mizoram")}>Mizoram</p>
<p className="cursor-pointer" onClick={() => filterState("Multi state")}>Multi state</p>
<p className="cursor-pointer" onClick={() => filterState("Nagaland")}>Nagaland</p>
<p className="cursor-pointer" onClick={() => filterState("Odisha")}>Odisha</p>
<p className="cursor-pointer" onClick={() => filterState("Puducherry")}>Puducherry</p>
<p className="cursor-pointer" onClick={() => filterState("Punjab")}>Punjab</p>
<p className="cursor-pointer" onClick={() => filterState("Rajasthan")}>Rajasthan</p>
<p className="cursor-pointer" onClick={() => filterState("Sikkim")}>Sikkim</p>
<p className="cursor-pointer" onClick={() => filterState("Tamil Nadu")}>Tamil Nadu</p>
<p className="cursor-pointer" onClick={() => filterState("Telangana")}>Telangana</p>
<p className="cursor-pointer" onClick={() => filterState("Tripura")}>Tripura</p>
<p className="cursor-pointer" onClick={() => filterState("Uttar Pradesh")}>Uttar Pradesh</p>
<p className="cursor-pointer" onClick={() => filterState("Uttarakhand")}>Uttarakhand</p>
<p className="cursor-pointer" onClick={() => filterState("West Bengal")}>West Bengal</p>

    </div>
  );
}

  
  function TenderByCategory() {

    const filterCategory = (category)=>{
      console.log(category)
    }

    return (
      <div className="h-60 overflow-y-scroll">
     <p className="cursor-pointer" onClick={() => filterCategory("Air Condition")}>Air Condition</p>
<p className="cursor-pointer" onClick={() => filterCategory("Architect / Interior")}>Architect / Interior</p>
<p className="cursor-pointer" onClick={() => filterCategory("Boiling House Equipment")}>Boiling House Equipment</p>
<p className="cursor-pointer" onClick={() => filterCategory("Bridge Bearing")}>Bridge Bearing</p>
<p className="cursor-pointer" onClick={() => filterCategory("Bridge Construction")}>Bridge Construction</p>
<p className="cursor-pointer" onClick={() => filterCategory("Bridge Consultancy")}>Bridge Consultancy</p>
<p className="cursor-pointer" onClick={() => filterCategory("Building Construction")}>Building Construction</p>
<p className="cursor-pointer" onClick={() => filterCategory("CCTV")}>CCTV</p>
<p className="cursor-pointer" onClick={() => filterCategory("Civil work")}>Civil work</p>
<p className="cursor-pointer" onClick={() => filterCategory("Fire Fighting")}>Fire Fighting</p>
<p className="cursor-pointer" onClick={() => filterCategory("Fire resistant items")}>Fire resistant items</p>
<p className="cursor-pointer" onClick={() => filterCategory("Garden Tools")}>Garden Tools</p>
<p className="cursor-pointer" onClick={() => filterCategory("GIS Survey")}>GIS Survey</p>
<p className="cursor-pointer" onClick={() => filterCategory("Horticulture Work")}>Horticulture Work</p>
<p className="cursor-pointer" onClick={() => filterCategory("Housekeeping Services")}>Housekeeping Services</p>
<p className="cursor-pointer" onClick={() => filterCategory("Laboratory Items")}>Laboratory Items</p>
<p className="cursor-pointer" onClick={() => filterCategory("Lift / Elevator / Escalator")}>Lift / Elevator / Escalator</p>
<p className="cursor-pointer" onClick={() => filterCategory("Manpower Supply")}>Manpower Supply</p>
<p className="cursor-pointer" onClick={() => filterCategory("Medical Equipments")}>Medical Equipments</p>
<p className="cursor-pointer" onClick={() => filterCategory("Pre school kit / TLM")}>Pre school kit / TLM</p>
<p className="cursor-pointer" onClick={() => filterCategory("Security Equipments")}>Security Equipments</p>
<p className="cursor-pointer" onClick={() => filterCategory("Security Services")}>Security Services</p>
<p className="cursor-pointer" onClick={() => filterCategory("Tubewell Drilling")}>Tubewell Drilling</p>
<p className="cursor-pointer" onClick={() => filterCategory("Others")}>Others</p>

      </div>
    );
  }
  
  
  function LatestTender() {
    return (
      <div className="flex border-2 white-box rounded mt-2">
        <div className="p-2">
          <p>Category</p>
          <p className="font-bold text-sm text-orange-500">Paints</p>
          <p>Closing Date</p>
          <p className="font-bold text-sm text-orange-500">17/09/2023</p>
        </div>
        <div className="p-2 w-2/4">
          <p>State: <span className="font-bold text-orange-500">Delhi</span></p>
          <p>
            Tender Title: <span className="underline underline-offset-2 hover:text-gray-800 cursor-pointer">Redevelopment of Housing Complex for Ministry of
            External Affairs MEA at KG Marg, New Delhi on Design, Engineering,
            Procurement and Construction (EPC) basis</span>
          </p>
        </div>
        <div className="p-2">
        <p>Value: <span className="font-bold text-orange-500">2,21,82,35,281</span></p>
  <button className="orange-box w-16 px-2 py-1 text-white mt-4 rounded hover:bg-orange-600">Notice</button>
        </div>
        <div className="p-2">
        <p>TID : 126447</p>
  <button className="orange-box px-2 mt-4 py-1 text-white rounded hover:bg-orange-600">	 Documents</button>
        </div>
      </div>
    );
  }
  