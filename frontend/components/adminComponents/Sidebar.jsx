"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="blue-box w-1/5 text-gray-300 p-4 h-screen-full z-10">
      <Image src="/logo.png" width={210} height={150} alt="logo" priority/>
      <ul className="my-4 text-xl">
        <li className={`my-4 text-white  hover:bg-orange-500 px-4 py-1 rounded cursor-pointer ${pathname == "/asian_admin/add-tender" ? "bg-orange-500" : "bg-slate-800"}`}><Link href="/asian_admin/add-tender" >Add Tenders</Link></li>
        <li className={`my-4 text-white  hover:bg-orange-500 px-4 py-1 rounded cursor-pointer ${pathname == "/asian_admin/list-tender" ? "bg-orange-500" : "bg-slate-800"}`}><Link href="/asian_admin/list-tender" >List Tenders</Link></li>
        <li className={`my-4 text-white  hover:bg-orange-500 px-4 py-1 rounded cursor-pointer ${pathname == "/asian_admin/update-tender" ? "bg-orange-500" : "bg-slate-800"}`}><Link href="/asian_admin/update-tender" >Update Tenders</Link></li>
        <li className={`my-4 text-white  hover:bg-orange-500 px-4 py-1 rounded cursor-pointer ${pathname == "/asian_admin/delete-tender" ? "bg-orange-500" : "bg-slate-800"}`}><Link href="/asian_admin/delete-tender" >Delete Tenders</Link></li>
        <li className={`my-4 text-white  hover:bg-orange-500 px-4 py-1 rounded cursor-pointer ${pathname == "/asian_admin/subscribed-user" ? "bg-orange-500" : "bg-slate-800"}`}><Link href="/asian_admin/subscribed-user" >Subscribed Users</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
