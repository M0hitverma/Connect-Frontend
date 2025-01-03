"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateFrom } from "@/lib/validateFrom";
import { UserDataContext } from "@/context/UserContext";
import { AuthLogin } from "@/api/Authentication";
import { IoIosWarning } from "react-icons/io";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
const Login = () => {
  const { setUser } = useContext(UserDataContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState({
    email: [],
    password: [],
  });
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleFocus = () => {
    setWarning({
      email: [],
      password: [],
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateFrom(info, setWarning)) {
      return;
    }
    const response = await AuthLogin(info);
    if (response.ok) {
      setUser(response.user);
      console.log(response.user);
      setInfo({
        email: "",
        password: "",
      });

      return router.replace("/");
    }
    setError(response.message);
  };
  return (
    <div className=" lg:max-w-md w-full mx-auto pt-6 pb-14 px-8 flex flex-col gap-2 ">
      <h1 className="text-2xl font-semibold mb-4">{`Login`}</h1>
      <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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
            className="flex-1 text-sm font-semibold bg-[#eeeeee] tracking-normal  p-3 rounded-md  "
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
          <div className="flex flex-row bg-[#eeeeee] rounded-md">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              maxLength={12}
              value={info.password}
              onChange={handleOnChange}
              placeholder="password"
              className="flex-1 text-sm font-semibold bg-transparent p-3 outline-none rounded-md tracking-normal "
              onFocus={handleFocus}
            />
            <div className=" text-2xl flex items-center px-2" onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </div>
          </div>
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
          Login
        </button>
      </form>

      <div className=" mx-auto font-medium text-md">
        <span>New here? </span>
        <Link
          href="/auth/register"
          className=" text-blue-400 hover:text-blue-500 active:text-blue-500"
        >
          Create new Account
        </Link>
      </div>
      <div className="h-24">
        {error.length > 0 && (
          <div className=" bg-red-400 text-white font-semibold text-sm  py-3 px-2  rounded-md flex flex-row gap-1 items- start justify-center  ">
            <IoIosWarning className="text-lg" />
            <span> {error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
