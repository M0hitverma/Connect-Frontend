"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { getUserRequest } from "@/api/CommonApi";
import dp from "@/../public/assets/dp.jpg";
import coverpic from "@/../public/assets/cover.jpg";
import UserPostContainer from "@/components/Containers/UserPostContainer";
import { UserDataContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
const router= useRouter();
  useEffect(() => {
    async function fetchProfileData() {
      const response = await getUserRequest();
      if (response.ok) {
        setUser(response.user);
      }
      setLoading(false);
    }
    fetchProfileData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="mt-20 text-center text-xl font-semibold">
          Loading...
        </div>
      ) : user ? (
        <div>
          <div className="p-3 flex flex-col justify-center items-center">
            <div className=" w-full">
              <Link href="/" className=" flex flex-row items-center  ">
                <MdOutlineArrowBackIos className="text-3xl font-extrabold" />
                <div className="">Home</div>
              </Link>
            </div>
            <div className=" w-[90%] md:h-[45vh] h-[30vh] rounded-xl overflow-hidden object-contain">
              <Image
                src={coverpic}
                alt="Cover Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 -mt-6">
              <div className=" rounded-full overflow-hidden lg:w-60 lg:h-60 md:w-40 md:h-40   w-28 h-28 object-contain  ">
                <Image
                  src={dp}
                  className="w-full h-full object-cover"
                  alt="Profile Image"
                  height={200}
                  width={200}
                />
              </div>
              <h1 className=" text-4xl drop-shadow-xl">
                {user.fullname?.firstname} {user.fullname?.lastname}
              </h1>
              <h1 className="opacity-50"></h1>
            </div>
          </div>

          <UserPostContainer userId={user._id} />
        </div>
      ) : (
        <div className="bg-red-300 p-5 mt-20 rounded-md border-2 border-black md:w-[30vw] w-[80vw]  mx-auto">
          <h1 className="text-white text-xl font-semibold">
            You need to login first to access this page.
          </h1>
          <button
            className="bg-black text-base font-semibold text-white py-2 px-4 rounded-md mt-5 "
            onClick={() => {
              router.replace("/auth/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};
export default Profile;
