'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
        if(!userName.trim() || !password.trim()) {
          toast.warning("Please fill in all fields");
          return;
        }

        if (userName !== "admin") {
          toast.error("UserName wrong");
        } else if (password !== "Admin@1234") {
          toast.error("Password wrong");
        } else {
          toast.success("Login Success");

          // Save login flag
          localStorage.setItem("isLoggedIn", "true");

          // Redirect
          router.push("/home");
        }

  }


  return (
    <div className="w-full flex h-screen justify-center items-center bg-gradient-to-br from-stone-500 to-stone-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 w-1/3 flex flex-col justify-start items-center gap-4 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-center mb-3">
          Please enter the credentials to login
        </p>
        <input
          type="text"
          placeholder="User Name"
          className="w-full rounded-md border-gray-200 outline-0 focus:ring-2 focus:ring-stone-200 border p-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border-gray-200 outline-0 focus:ring-2 focus:ring-stone-200 border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-l from-stone-800 to-stone-500 w-full p-2.5 rounded-md text-white font-semibold mt-2 hover:from-stone-500 hover:to-stone-800 transform transition ease-in-out duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
