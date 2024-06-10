"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // Correct import path for Sidebar
import Header from "../../../components/Header"; // Correct import path for Header
import Dashboard from "../../../components/Dashboard/Dashboard"; // Import the CreateTender component
import CreateTender from "../../../components/Dashboard/Create-Tender"; // Import the CreateTender component
import DeleteTender from "../../../components/Dashboard/Delete-Tender"; // Import the CreateTender component
import UpdateTender from "../../../components/Dashboard/Update-Tender"; // Import the CreateTender component
import { useAdminAuth } from "@/context/authadminContext";


interface DefaultLayoutProps {
  handleComponentChange: (component: string) => void;
}

const DefaultLayout = ({ handleComponentChange }: DefaultLayoutProps) => {

  const router = useRouter();

  const { admin,logout} = useAdminAuth;
  const [getAdmin, setAdmin] = useState();

  useEffect(()=>{
    setAdmin(admin);
    if(admin)
  },[admin])

  if(!admin){
    console.log("LDJKDLFJDS")
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Function to handle component change based on sidebar clicks
  const handleComponentClick = (component: string) => {
    setActiveComponent(component);
    handleComponentChange(component);
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
        return <Dashboard />; // Render nothing if no component is active
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleComponentChange={handleComponentClick}
          logout={logout} // Pass the handleComponentClick function to the Sidebar
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
    </>
  );
};

export default DefaultLayout;
