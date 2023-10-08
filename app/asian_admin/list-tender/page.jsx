"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/adminComponents/Sidebar";
import axios from "axios";
import Tenderbox from "@/components/mainComponents/Tenderbox";

const List = () => {
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-black w-full p-16">
        <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1">
          Tender Details
        </h1>
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
  );
};

export default List;
