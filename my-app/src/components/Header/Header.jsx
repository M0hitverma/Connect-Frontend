"use client";
import { UserDataContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import dp from "@/../../public/assets/dp.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthLogout } from "@/api/Authentication";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
const Header = () => {
  const { user, setUser } = useContext(UserDataContext);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    const response = await AuthLogout();
    if (response.ok) {
      setShowMenu(false);
      router.replace("/auth/login");
      setUser();
    }
  };
  return (
    <div className="bg-[#111] h-[10vh] text-white px-10 py-3 font-semibold text-lg flex items-center justify-between relative ">
      <h1 className="text-2xl">Connect</h1>

      {user && (
        <div className="md:block hidden">
          <div className="flex flex-row gap-4 items-center">
            <div
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              <h2>Hey! {user.fullname.firstname}</h2>
              <div className="w-10 h-10 object-contain  rounded-full overflow-hidden">
                <Image src={dp} alt="Profile Image" height={50} width={50} />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white px-3 py-2 text-black rounded-md text-sm font-semibold "
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {user && (
        <div className="md:hidden " onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <RxCross2 /> : <IoIosMenu />}
        </div>
      )}
      {showMenu && user && (
        <div className="absolute -bottom-[4.7rem] right-0 z-50 bg-black md:hidden">
          <div className="flex flex-col  gap-2 items-start">
            <div
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              {" "}
              <div className="w-8 h-8 object-contain  rounded-full overflow-hidden">
                <Image src={dp} alt="Profile Image" height={30} width={30} />
              </div>
              <h2 className="text-sm px-2">Hey! {user.fullname.firstname}</h2>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white px-3 py-2 text-black  text-sm font-semibold w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
