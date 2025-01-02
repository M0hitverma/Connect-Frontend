"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateFrom } from "@/lib/validateFrom";
import { UserDataContext } from "@/context/UserContext";
import { AuthRegister } from "@/api/Authentication";

import { IoIosWarning } from "react-icons/io";
const Register = ({ userType }) => {
  const { setUser } = useContext(UserDataContext);

  const router = useRouter();
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [warning, setWarning] = useState({
    email: [],
    password: [],
    firstname: [],
    lastname: [],
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleFocus = () => {
    setWarning({
      email: [],
      password: [],
      firstname: [],
      lastname: [],
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateFrom(info, setWarning)) {
      return;
    }

    const response = await AuthRegister(info);
    if(response.ok){
        setUser(response.user);
        console.log(response.user);
      setInfo({
         firstname: "",
         lastname: "",
         email: "",
         password: "",
      })
      return router.replace("/");
    }
    setError(response.message);

  };
  return (
    <div className="  lg:max-w-md  w-full pt-6 pb-4  px-8 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold mb-4">{`Sign up`}</h1>
      <form className="flex flex-col gap-6" onSubmit={handleRegister}>
        <div className="flex flex-col relative">
          <label className="text-base font-semibold mb-2">
            What's your Name
          </label>
          <div className="flex flex-row gap-4">
            <input
              id="firstname"
              name="firstname"
              maxLength={254}
              placeholder="first name"
              value={info.firstname}
              onChange={handleOnChange}
              className="text-sm font-semibold bg-[#eeeeee] w-1/2   p-3 rounded-md  "
              onFocus={handleFocus}
            />
            <input
              id="lastname"
              name="lastname"
              maxLength={254}
              placeholder="last name"
              value={info.lastname}
              onChange={handleOnChange}
              className="text-sm font-semibold bg-[#eeeeee] w-1/2   p-3 rounded-md  "
              onFocus={handleFocus}
            />
          </div>
          {warning.firstname.length > 0 && (
            <p className="text-sm text-red-400 font-medium absolute -bottom-5">
              *{warning.firstname[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col  flex-1 relative  ">
          <label className=" text-base font-semibold mb-2">
            What's your email
          </label>
          <input
            id="email"
            name="email"
            maxLength={254}
            placeholder="email@example.com"
            value={info.email}
            onChange={handleOnChange}
            className="flex-1 text-sm font-semibold bg-[#eeeeee]   p-3 rounded-md  "
            onFocus={handleFocus}
          />
          {warning.email.length > 0 && (
            <p className="text-sm text-red-400 font-medium absolute -bottom-5">
              *{warning.email[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col flex-1 relative">
          <label className="text-base font-semibold mb-2">Enter Password</label>
          <input
            id="password"
            name="password"
            maxLength={12}
            value={info.password}
            onChange={handleOnChange}
            placeholder="password"
            className="flex-1 text-sm font-semibold bg-[#eeeeee] p-3 rounded-md"
            onFocus={handleFocus}
          />
          {warning.password.length > 0 && (
            <p className="text-sm text-red-400  font-medium absolute -bottom-5">
              *{warning.password[0]}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-black py-2 text-md font-semibold rounded-md"
        >
          Create Account
        </button>
      </form>

      <div className=" mx-auto font-medium text-md">
        <span>Already have a account? </span>
        <Link
          href="/auth/login"
          className=" text-blue-400 hover:text-blue-500 active:text-blue-500"
        >
          Login here
        </Link>
      </div>
      <div className=" h-16">
      {error.length > 0 && (
        <div className=" bg-red-400 text-white font-semibold text-sm  py-3 px-2  rounded-md flex flex-row gap-1 items- start justify-center my-2  ">
          <IoIosWarning className="text-lg" />
          <span> {error}</span>
        </div>
      )}
      </div>
    </div>
  );
};

export default Register;
