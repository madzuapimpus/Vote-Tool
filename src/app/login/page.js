"use client";

import { useContext, useState } from "react";
import useSWR from "swr";
import { useLoginMutation } from "../../helpers/login.mutation";
import { Header } from "../../components/Header";
import { useRouter } from "next/navigation";
import { UserContext } from "../../state";

const fetcherGetAuth = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userPin, setUserPin] = useState("");
  const { setIsAuthenticates } = useContext(UserContext);
  const router = useRouter();

  useSWR(`getAuth`, (url) => fetcherGetAuth("/api/login"), {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    onSuccess: (data) => {
      setIsAuthenticates(data.isAuthenticated);
    },
  });

  const loginUserMutation = useLoginMutation();

  return (
    <div className="flex flex-col justify-center min-h-screen 
     bg-white text-black">

      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl mb-10">Vote Tool - Login Page</h1>
      </div>
      <form
        className="flex flex-col  gap-4 justify-center items-center   "
        onSubmit={(e) => {
          e.preventDefault();
          loginUserMutation.trigger(
            { userName: userName, pin: userPin },
            {
              onSuccess: (data) => {
                setIsAuthenticates(data.isAuthenticated);
                router.push("/");
              },
            }
          );
        }}
      >
        <div>
          
          <input className=" border-2 p-2 border-green-500 rounded-xl w-96"
          placeholder="Insert username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          
          <input 
          className=" border-2 p-2 border-green-500  rounded-xl w-96"
          placeholder="Insert PIN"
            type="password"
            value={userPin}
            onChange={(e) => {
              setUserPin(e.target.value);
            }}
          ></input>
        </div>

        <button type="submit" className="bg-green-500 border-2 mt-5 border-green-500 text-white p-3 rounded-xl w-56  hover:text-green-500 hover:bg-white hover:border-2 hover:border-green-500 ">Zaloguj się</button>
      </form>
    </div>
  );
}
