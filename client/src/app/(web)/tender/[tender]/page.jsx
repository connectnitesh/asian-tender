'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTenderById, downloadTenderDoc } from '@/api/api';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb-left';
import cookie from 'js-cookie';
import { useAuth } from "@/context/authContext";

const TenderOne = () => {
  const pathname = usePathname();
  const tID = pathname.match(/\d+/)[0];
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [tender, setTender] = useState({
    tID: "",
    state: "",
    title: "",
    category: "",
    closeDate: "",
    value: ""
  });

  const authorization = cookie.get('asiantoken_');

  useEffect(() => {
    async function getTender() {
      try {
        const result = await getTenderById(tID);
        setTender(result);
      } catch (error) {
        console.error("Error fetching tender:", error);
      } finally {
        setLoading(false);
      }
    }
    getTender();
  }, [tID]);

  const handleDownload = async () => {
    try {
      if (user && user.subscribed) {
        const response = await downloadTenderDoc(tID, authorization);
        const blob = new Blob([response]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tender_${tID}.pdf`; // You can set a more meaningful filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Please subscribe to download the tender document.');
      }
    } catch (error) {
      alert("Something Went Wrong!");
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="min-h-max p-4 bg-gray-100">
      <Breadcrumb pageName="Tender Details" />
      <div className="container mx-auto p-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-xl">Loading...</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{tender.title}</h2>
              <p className="text-gray-500">Tender ID: {tender.tID}</p>
            </div>
            <div className="space-y-4">
              <p className="text-lg"><span className="font-semibold">Category:</span> {tender.category}</p>
              <p className="text-lg"><span className="font-semibold">Tender Value:</span> {tender.value}</p>
              <p className="text-lg"><span className="font-semibold">State:</span> {tender.state}</p>
              <p className="text-lg"><span className="font-semibold">Last Date of Bid Submission:</span> {tender.closeDate}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Other Information</h3>
              <button
                onClick={handleDownload}
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Download Tender Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderOne;
