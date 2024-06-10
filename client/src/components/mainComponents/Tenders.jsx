"use client"

import React, { useState, useEffect } from "react";
import { getTenders, filterTender, searchTender } from "@/api/api";
import Breadcrumb from "../Breadcrumbs/Breadcrumb-left";
import { category } from "@/utils/categories";
import { state } from "@/utils/state";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Tenders() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [sortValue, setSortValue] = useState('');
  const [tenderData, setTenderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTenders, setTotalTenders] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchTenders() {
      try {
        let result;
        if (selectedCategories.length || selectedStates.length || sortValue) {
          result = await filterTender(
            currentPage,
            10,
            selectedCategories,
            selectedStates,
            sortValue,
          );
        } else {
          result = await getTenders(currentPage, 10); // Fetch 10 tenders per page
        }
        setTenderData(result.tenders);
        setTotalPages(result.metadata.totalPages);
        setTotalTenders(result.metadata.totalTenders);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    }
    fetchTenders();
  }, [currentPage, selectedCategories, selectedStates, sortValue]);

  useEffect(() => {
    async function searchTenders() {
      try {
        if (searchClicked) {
          const result = await searchTender(searchTerm, currentPage, 10);
          setTenderData(result.tenders);
          setTotalPages(result.metadata.totalPages);
          setTotalTenders(result.metadata.totalTenders);
          setSearchClicked(false);
        }
      } catch (error) {
        console.error("Error searching tenders:", error);
      }
    }
    searchTenders();
  }, [searchClicked, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleStateChange = (state) => {
    setSelectedStates((prev) =>
      prev.includes(state)
        ? prev.filter((st) => st !== state)
        : [...prev, state]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    try {
      setSearchClicked(true);
      setCurrentPage(1); // Set searchClicked to true when search button is clicked
    } catch (error) {
      console.error("Error searching tenders:", error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]); // Clear selected categories
    setSelectedStates([]);
    setCurrentPage(1);
  };


  return (
    <div className="min-h-max p-4">
      <Breadcrumb pageName="Tender" />
      <div className="flex items-center justify-center bg-gray-800 dark:bg-navy-800 bg-[url('/image/cover.jpg')] bg-center">
        <div className="mt-8 flex w-1/3">
          <input
            className="focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-navy-600 rounded w-full h-8 bg-white dark:bg-navy-900 text-black dark:text-white border border-blue-300 dark:border-navy-700"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-600 dark:bg-navy-700 px-2 py-1 text-white rounded hover:bg-blue-700 dark:hover:bg-navy-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Filters Section */}
        <div className="w-full lg:w-1/4 p-4">
          <div className="mb-6">
            <h2 className="font-bold text-xl mb-4">Filters</h2>
            {/* Clear Filters Button */}
            <div className="mb-4">
              <button
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-md mr-2"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
            {/* Rest of the filters */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="h-60 overflow-y-scroll">
                {Object.entries(category).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedCategories.includes(key)}
                        onChange={() => handleCategoryChange(key)}
                      />
                      <span className="ml-2">{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">States</h3>
              <div className="h-60 overflow-y-scroll">
                {Object.entries(state).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedStates.includes(key)}
                        onChange={() => handleStateChange(key)}
                      />
                      <span className="ml-2">{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Section */}
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <label className="mr-2">Sort By:</label>
              <select
                className="border p-2 rounded"
                value={sortValue}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSortValue(selectedValue);
                }}
              >
                <option value="">None</option>
                <option value="max">Max Value</option>
                <option value="min">Min Value</option>
              </select>

            </div>
          </div>
          {/* Content to be dynamically populated */}
          <div>
            {tenderData && tenderData.length > 0 ? (
              tenderData.map((tender) => (
                <div key={tender.tID} className="flex border-2 blue-box rounded mt-2 w-full">
                  <div className="p-2 w-1/6">
                    <p>Category</p>
                    <p className="font-bold text-sm text-blue-500">{tender.category}</p>
                    <p>Closing Date</p>
                    <p className="font-bold text-sm text-blue-500">{new Date(tender.closeDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-2 w-3/6">
                    <p>State: <span className="font-bold text-blue-500">{tender.state}</span></p>
                    <p>
                      Tender Title: <Link href={`/tender/${tender.tID}`} className="underline underline-offset-2 hover:text-gray-800 cursor-pointer">
                        {tender.title}</Link>
                    </p>
                  </div>
                  <div className="p-2 w-1/6">
                    <p>Value: <span className="font-bold text-blue-500">{tender.value}</span></p>
                    <button className="blue-box w-16 px-2 py-1 text-white mt-4 rounded hover:bg-blue-600">Notice</button>
                  </div>
                  <div className="p-2 w-1/6">
                    <p>TID : {tender.tID}</p>
                    <button className="blue-box px-2 mt-4 py-1 text-white rounded hover:bg-blue-600">Documents</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tenders available.</p>
            )}


            {/* Pagination */}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4">
                <button
                  className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="mr-2">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="mr-2">|</span>
                <span className="mr-2">
                  Total Pages: {totalPages}
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

