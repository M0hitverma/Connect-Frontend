"use client";
import { AuthenticateUser } from "@/api/Authentication";
import PostContainer from "@/components/Containers/PostContainer";
import { UserDataContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function AuthUser() {
      const response = await AuthenticateUser();
      if (response.ok) {
        setUserData(response.user);
        setUser(response.user);
      }
      setLoading(false);
    }
    AuthUser();
  }, []);

  return (
    <div className="w-full  flex justify-center">
      <div className=" md:max-w-lg w-full ">
        {loading ? (
          <div className="mt-20 text-center text-xl font-semibold">Loading...</div>
        ) : userData ? (
          <PostContainer  />
        ) : (
          <div className="bg-red-300 p-5 mt-20 rounded-md border-2 border-black">
             <h1 className="text-white text-xl font-semibold">You need to login first to access this page.</h1>
          <button 
           className="bg-black text-base font-semibold text-white py-2 px-4 rounded-md mt-5 "
          onClick={()=>{
            router.replace("/auth/login");
          }}>Login</button>



          </div>
        )}
      </div>
    </div>
  );
}
