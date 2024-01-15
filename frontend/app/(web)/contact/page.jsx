import Search from "@/components/mainComponents/Search";
import React from "react";
import Link from "next/link";
import {IoIosCall} from 'react-icons/io'
import {GrMail} from 'react-icons/gr'
import {IoLocationSharp} from 'react-icons/io5'
import { AiTwotoneHome } from "react-icons/ai";

const page = () => {
  return (
    <div className="bg-gray-100 pb-16">
      <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2"><AiTwotoneHome size={20}/>Home</Link>/Contact Us 
      </h1>
      <div className=" p-8 text-center align-center justify-center">
        <h1 className="font-bold text-2xl text-gray-600">Get In Touch</h1>
        <p className=" mx-32 my-4">
          Experience the unwavering trust and top-notch quality that define The
          Asian Tender. Contact us to access our comprehensive tender tracking
          services, covering government departments, public sector units,
          autonomous bodies, and private tenders, ensuring your complete
          satisfaction.
        </p>
      </div>
      <div className="white-box flex mx-52">
        <div className="orange-box p-8 m-4 rounded w-2/4">
          <p className="font-semibold text-xl mb-4">Contact Informations</p>
          <p className="mb-4">
            The Asian Tender is serving the industry since 1999. We have vast
            experience in the field of tender information services.
          </p>
          <p className="my-8 flex items-center text-lg gap-2"><IoIosCall size={25}/>+91-8010572739</p>
          <p className="my-8 flex items-center text-lg gap-2"><GrMail  size={25} /> asiantender@rediffmail.com</p>
          <p className="my-8 flex items-center text-lg gap-2"><IoLocationSharp  size={25} /> West
Delhi
</p>
        </div>
        <div className="p-4">
          <form action="">
            <div className="flex py-2">
              <div className="mr-8">
                <label htmlFor="">Name</label>
                <br />
                <input
                  type="text"
                  className="border-2 border-orange-500 rounded "
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <br />
                <input
                  type="text"
                  className="border-2 border-orange-500 rounded "
                />
              </div>
            </div>
            <label htmlFor="">Subject</label><br />
            <input
              type="text"
              className="border-2 border-orange-500 rounded "
            />
            <br />
            <label htmlFor="">Message</label>
            <br />
            <textarea
              name=""
              id=""
              cols={52}
              rows={10}
              className="border-2 border-orange-500 rounded my-2 resize-none"
            ></textarea>
            <button className=" orange-box px-8 py-1 rounded hover:bg-orange-600 text-white " >Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
