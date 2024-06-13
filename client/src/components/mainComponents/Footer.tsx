import React from "react";
import Link from "next/link";
import { TbWorldWww } from "react-icons/tb";
import { IoIosCall } from "react-icons/io";
import { GrMail } from "react-icons/gr";
import { AiTwotoneHome } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-800	 text-neutral-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contact Section */}
          <div className="flex flex-col">
            <h2 className="text-xl text-blue-500 font-semibold mb-4">CONTACT US</h2>
            <address>
              <p className="flex items-center gap-2">
                <AiTwotoneHome size={20} />
                Head Office
              </p>
              <p>M/s Asian Tender</p>
              <p className="flex items-center gap-2">D-41, Gali No.13, West Karawal Nagar,</p>
              <p>Delhi-110094</p>
            </address>
            <p className="mt-2 flex items-center gap-2">
              <IoIosCall size={20} />
              +91-8010572739
            </p>
            <p className="mt-2 flex items-center gap-2">
              <GrMail size={20} />
              asiantender@rediffmail.com
            </p>
            <p className="mt-2 flex items-center gap-2">
              <TbWorldWww size={20} />
              <Link href="/" className="text-gray-400 hover:underline">
                www.asiantender.co.in
              </Link>
            </p>
          </div>
          {/* About Section */}
          <div className="flex flex-col">
            <h2 className="text-xl text-blue-500 font-semibold mb-4">ABOUT US</h2>
            <p>
              The Asian Tender is serving the industry since 1999. We have vast
              experience in the field of tender information services.
            </p>
          </div>
          {/* Solutions Section */}
          <div className="flex flex-col">
            <h2 className="text-xl text-blue-500 font-semibold mb-4">SOLUTIONS</h2>
            <ul>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Tender Results
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-gray-300 hover:text-white">
                  Price List
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          {/* Request a Demo Section */}
          <div className="flex flex-col">
            <h2 className="text-xl text-blue-500 font-semibold mb-4">REQUEST A DEMO</h2>
            <input type="text" className="mt-2 white-box px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
            <button className="bg-blue-600 mt-4 blue-box px-4 py-2 rounded hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
