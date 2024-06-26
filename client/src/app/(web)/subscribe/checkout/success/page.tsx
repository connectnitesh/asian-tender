"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { orderVerify } from '@/api/api';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Error from "next/error";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [reference, setReference] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const validateReference = (reference: string) => {
    return reference.startsWith('ASNT') && reference.length >= 3;
  };

  const fetchOrderDetails = async (reference: string) => {
    try {
      const response = await orderVerify(reference);
      if (response.status == 'failure') {
        return response.message;
      } else {
        //@ts-ignore
        throw new Error('Order verification failed');
      }
    } catch (error) {
      //@ts-ignore
      throw new Error('Failed to fetch order details');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const referenceParam = searchParams.get('reference');
      if (!referenceParam || !validateReference(referenceParam)) {
        setError('Invalid order reference');
        setIsLoading(false);
        return;
      }

      try {
        setReference(referenceParam);
        const details = await fetchOrderDetails(referenceParam);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);


  if (error) {
    return (
      <div className="min-h-screen p-4 bg-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="mt-4">{error}</p>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            onClick={() => router.push('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Breadcrumb mainPage="Home" sidePage="Subscribe" mainLink="/" sideLink="/subscribe" position="left" />
      <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-600">Payment Successful!</h2>
        <p className="mt-4">Thank you for your purchase. Your order has been successfully processed.</p>
        {isLoading ? (
          <p className="mt-2">Loading order reference...</p>
        ) : (
          <>
            <p className="mt-2">Order Reference: <span className="font-bold">{reference}</span></p>
          </>
        )}
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={() => router.push('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
