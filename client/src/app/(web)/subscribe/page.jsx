import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb-left";

const SubscribePage = () => {
  return (
    <div className="min-h-max p-4 bg-gray-100">
      <Breadcrumb pageName="Subscribe" />
      <div className="grid grid-cols-3 gap-8 mx-auto max-w-4xl mt-8">
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-600 bg-blue-100 p-2 rounded">1 Month Plan</h2>
          <div className="flex flex-col gap-2">
            <p>Price: Rs. 3,500/- (Three thousand, five hundred only)</p>
            <p>Includes: All Products</p>
            
            <p>Daily email tender notification</p>
            <p>Download tender document</p>
            <p>Web access</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-600 bg-blue-100 p-2 rounded">4 Month Plan (Most Popular)</h2>
          <div className="flex flex-col gap-2">
            <p>Price: Rs. 5,500/- (Five thousand, five hundred only)</p>
            <p>Includes: All Products</p>
            
            <p>Daily email tender notification</p>
            <p>Download tender document</p>
            <p>Web access</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-600 bg-blue-100 p-2 rounded">12 Month Plan</h2>
          <div className="flex flex-col gap-2">
            <p>Price: Rs. 12,500/- (Twelve thousand, five hundred only)</p>
            <p>Includes: All Products</p>
            
            <p>Daily email tender notification</p>
            <p>Download tender document</p>
            <p>Web access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
