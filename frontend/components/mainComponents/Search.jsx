"use client"
import React, { useState } from "react";
import axios from "axios";
import { useTender } from "../TenderContext";


export default function Search() {
    const { tenderData, updateTenderData } = useTender();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/search?search=${searchTerm}`
            );

            updateTenderData(response.data.data.data);
      
            // Your other logic here
            console.log("Search API response:", response.data);
      
            // Custom navigation logic
            navigate("/result"); // Adjust the path based on your route
        } catch (error) {
            console.error("An error occurred during search:", error);
        }
    };

    return (
        <div className="h-60 flex items-center justify-center bg-[url('/cover.jpg')] bg-center">
            <div className="mt-8 flex w-1/3">
                <input
                    className="focus:outline-orange-600 rounded w-full h-8 white-box"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="orange-box px-2 py-1 text-white rounded hover:bg-orange-600"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}
