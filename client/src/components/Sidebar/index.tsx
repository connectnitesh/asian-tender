import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useAdminAuth } from "@/context/authadminContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  handleComponentChange: (component: string) => void; // Added handleComponentChange prop
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleComponentChange }: SidebarProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const { logout } = useAdminAuth();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSidebarOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <button
        className="absolute top-0 right-0 mr-4 mt-4 p-2 text-white lg:hidden" // Add lg:hidden here
        onClick={() => setSidebarOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>



      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={pathname === "/admin_panel/dashboard" || pathname.includes("Home")}
              >
                {(handleClick, open) => (
                  <React.Fragment>
                    <Link
                      href="/admin_panel/dashboard"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/" || pathname.includes("dashboard")) && "bg-graydark dark:bg-meta-4"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        handleComponentChange("dashboard");
                      }}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                          fill=""
                        />
                        <path
                          d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                          fill=""
                        />
                        <path
                          d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                          fill=""
                        />
                        <path
                          d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                          fill=""
                        />
                      </svg>
                      Dashboard
         
                    </Link>
                    <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                        <li>
                          <Link
                            href="/create-tender"
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/create-tender" && "text-white"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleComponentChange("create-tender");
                            }}
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/read-tender" && "text-white"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleComponentChange("createTender"); // Pass the component identifier here
                            }}
                          >
                            Create Tender
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/update-tender" && "text-white"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleComponentChange("updateTender"); // Pass the component identifier here
                            }}
                          >
                            Update Tender
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/delete-tender" && "text-white"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleComponentChange("deleteTender"); // Pass the component identifier here
                            }}
                          >
                            Delete Tender
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>
            </ul>

            <div className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
              <button
                onClick={logout}
                className="flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 bg-graydark dark:bg-meta-4 hover:bg-graydark dark:hover:bg-meta-4 duration-300 ease-in-out"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 1H3C1.9 1 1 1.9 1 3V15C1 16.1 1.9 17 3 17H15C16.1 17 17 16.1 17 15V3C17 1.9 16.1 1 15 1ZM12.5 9.5L10.5 11.5C10.1 11.9 9.5 11.7 9.5 11.2V10H7V8H9.5V6.8C9.5 6.3 10.1 6.1 10.5 6.5L12.5 8.5C12.9 8.9 12.9 9.3 12.5 9.5Z"
                    fill="currentColor"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
