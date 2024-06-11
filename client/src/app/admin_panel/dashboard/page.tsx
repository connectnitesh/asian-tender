"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar"; // Correct import path for Sidebar
import Header from "../../../components/Header"; // Correct import path for Header
import Dashboard from "../../../components/Dashboard/Dashboard"; // Import the Dashboard component
import CreateTender from "../../../components/Dashboard/Create-Tender"; // Import the CreateTender component
import DeleteTender from "../../../components/Dashboard/Delete-Tender"; // Import the DeleteTender component
import UpdateTender from "../../../components/Dashboard/Update-Tender"; // Import the UpdateTender component
import withAdminAuth from "@/components/Auth/withAdminAuth"; // Import the HOC

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Function to handle component change based on sidebar clicks
  const handleComponentClick = (component: string) => {
    setActiveComponent(component);
  };

  // Render the appropriate component based on the activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case "createTender":
        return <CreateTender />;
      case "updateTender":
        return <UpdateTender />;
      case "deleteTender":
        return <DeleteTender />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleComponentChange={handleComponentClick}
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAdminAuth(DefaultLayout);
