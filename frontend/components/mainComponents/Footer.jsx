import Link from "next/link";
import React from "react";
import {TbWorldWww} from 'react-icons/tb'
import {IoIosCall} from 'react-icons/io'
import {GrMail} from 'react-icons/gr'
import {AiTwotoneHome} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-neutral-200  py-8">
      <div className="flex justify-evenly">
        <div className="w-64">
          <h2 className="text-xl text-orange-500 font-semibold">CONTACT US</h2>
          <address className="mt-4">
            <p className="flex items-center gap-2"><AiTwotoneHome size={20}/>Head Office</p>
            <p>M/s Asian Tender</p>
            <p className="flex items-center gap-2">D-41, Gali No.13, West Karawal Nagar,</p>
            <p>Delhi-110094</p>
          </address>
          <p className="mt-2 flex items-center gap-2"><IoIosCall size={20}/>+91-8010572739</p>
          <p className="mt-2 flex items-center gap-2"><GrMail size={20}/>asiantender@rediffmail.com</p>
          <p className="mt-2 flex items-center gap-2">
            <TbWorldWww size={20}/>
            <Link
              href="/"
              className="text-gray-400 hover:underline"
            >
              www.asiantender.co.in
            </Link>
          </p>
        </div>
        <div className="w-64">
          <h2 className="text-xl text-orange-500 font-semibold">ABOUT US</h2>
          <p className="mt-4">
            The Asian Tender is serving the industry since 1999. We have vast
            experience in the field of tender information services.
          </p>
        </div>
        <div className="mt-0 w-64">
          <h2 className="text-xl text-orange-500 font-semibold">SOLUTIONS</h2>
          <ul className="mt-4">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            {/* <li>
              <Link href="/projects" className="text-gray-300 hover:text-white">
                Projects
              </Link>
            </li> */}
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white"
              >
                Tender Results
              </Link>
            </li>
            <li>
              <Link
                href="/subscribe"
                className="text-gray-300 hover:text-white"
              >
                Price List
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-64">
          <p >Request a Demo </p>
          <input type="text" className="mt-2 white-box"/>
          <button className="mt-4 orange-box px-4 py-1 rounded hover:bg-orange-600">Submit</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
