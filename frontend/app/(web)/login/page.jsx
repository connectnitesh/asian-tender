import React from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";

const Login = () => {


  return (
    <div className="bg-gray-100 py-14">
      <h1 className="text-xl font-bold bg-orange-500 text-white px-4 py-1 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <AiTwotoneHome size={20} />
          Home
        </Link>
        /Login
      </h1>
      <div className="flex justify-center">
        <form action="" className="text-xl p-8 w-1/4 white-box rounded my-8">
          <h1 className="text-xl font-bold orange-box px-4 py-1 my-4 rounded">
            Login
          </h1>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            className="border-2 border-orange-500 rounded my-2 "
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="text"
            name="password"
            className="border-2 border-orange-500 rounded my-2"
          />
          <br />
          <button className="orange-box py-1 px-4 rounded my-2">Login</button>
          <p className="text-sm my-8">
            Dont have an account ? <Link href="/signup" className="text-orange-500 font-bold" >Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
