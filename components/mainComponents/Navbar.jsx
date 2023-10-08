"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex px-2 bg-white text-black w-full fixed ">
      <Link href="/">
        <Image src="/logo.png" width={200} height={150} alt="logo" />
      </Link>
      <ul className="flex justify-end w-full my-2 ">
        <li className={`mx-4 pt-2 hover:underline decoration-gray-400 underline-offset-4 ${pathname == "/" ? "text-orange-500 underline decoration-orange-500" : ""}`}>
          <Link href="/">Home</Link>
        </li>
        <li className={`mx-4 pt-2 hover:underline decoration-gray-400 underline-offset-4 ${pathname == "/tenders" ? "text-orange-500 underline decoration-orange-500" : ""}`}>
          <Link href="/tenders">Tenders</Link>
        </li>
        <li className={`mx-4 pt-2 hover:underline decoration-gray-400 underline-offset-4 ${pathname == "/about" ? "text-orange-500 underline decoration-orange-500" : ""}`}>
          <Link href="/about">About Us</Link>
        </li>
        <li className={`mx-4 pt-2 hover:underline decoration-gray-400 underline-offset-4 ${pathname == "/contact" ? "text-orange-500 underline decoration-orange-500" : ""}`}>
          <Link href="/contact">Contact Us</Link>
        </li>
        <li className={`mx-4 pt-2 hover:underline decoration-gray-400 underline-offset-4 ${pathname == "/subscribe" ? "text-orange-500 underline decoration-orange-500" : ""}`}>
          <Link href="/subscribe">Subscription Plan</Link>
        </li>
        <li className="mx-4 pt-2 ">
          <Link
            className=" text-white px-4 py-1 rounded hover:bg-orange-600 orange-box"
            href="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
