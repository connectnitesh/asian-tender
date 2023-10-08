import Search from "@/components/mainComponents/Search";
import React from "react";
import Link from "next/link";
import { BiSupport } from "react-icons/bi";
import { BiSolidBusiness } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { AiTwotoneHome } from "react-icons/ai";

const page = () => {
  return (
      <div className="bg-gray-100 pb-16">
        <Search />
        <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <AiTwotoneHome size={20} />
            Home
          </Link>
          /About Us
        </h1>
        <div className="p-4">
          <p className="mb-4">
            The <span className="font-bold text-lg text-orange-500">Asian Tender</span> is serving the industry since 1999. It was the time
            when tenders published only in newspapers. Selection of particular
            tenders, photocopy them and sent by courier to contractors was daily
            routine. Now we are available with our website www.asiantender.co.in
            to serve you with our expertise. We always care your requirements
            and we measure our success through customer satisfaction.
          </p>

          <p className="mb-4">
            We track the websites of all state governments, all departments of
            central government, eprocure.gov.in, GeM portal, public sector
            units, autonomous body, Private tenders along with all the national
            dailies newspapers.
          </p>

          <p className="mb-4">
            The Asian Tender has successfully completed a Project of <span className="font-bold text-lg text-orange-500">DRDO
            (Defence Research & Development Organisation) for News Clippings
            Services.</span>
          </p>

          <p className="font-bold text-xl text-orange-500 ">NEWS CLIPPINGS: CLIENT DRDO</p>
          <p className="mb-4">
            We provide Media Monitoring Services / Newspapers Clipping Services
            on Defence Sector (National/International) at 9.00 a.m. daily. In
            Defence News Clipping we include the news contents on DRDO, Indian
            Air Force, Indian Army, Indian Navy, Indian Coast Guard and Defence
            Industry related government and private sector news contents.
          </p>

          <p className="font-bold text-xl text-orange-500 mb-4">Source of news items</p>
          <ul>
            <li>
              1. Print Media:- All Newspapers/Magazines (Print edition)
              published from Delhi.
            </li>
            <li>
              2. Online News Portals along with Print/TV Media (National /
              International).
            </li>
            <li>3. Google news alert systems.</li>
            <li>4. Searching News contents by keywords using Google search.</li>
          </ul>

          <p className="font-bold text-xl text-orange-500">Client:</p>
          <p className="mb-4">
            DRDO (Defence Research & Development Organisation), Ministry of
            Defence, Government of India. Successfully completed 3 years work
            contract of Newspapers Clipping Services.
          </p>

          <p className="text-2xl font-bold my-4 items-center text-orange-500 flex gap-2"><BiSolidBusiness />INDUSTRIAL BUSINESS</p>
          <p className="text-2xl font-bold my-4 items-center text-orange-500 flex gap-2"><BiSupport />24/7 SUPPORT</p>
          <p className="text-2xl font-bold my-4 items-center text-orange-500 flex gap-2"><RiTeamFill />PROFESSIONAL TEAM</p>
        </div>
      </div>
  );
};

export default page;
