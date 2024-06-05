"use client";

import { useContext } from "react";
import { UserContext } from "../state";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import Link from "next/link";

function Header() {
  const navigate = useRouter();
  const { isAuthenticated, setIsAuthenticates } = useContext(UserContext);

  return (
    <div className="">
      <div className="flex flex-row justify-between bg-fuchsia-800 text-white p-3 items-center ">
        <h1>
          <Link href={"/"}>PAI Project</Link>{" "}
        </h1>
        <div className="flex flex-row gap-6 m-2 ">
          {isAuthenticated ? (
            <Button
              text="Sing Out"
              color={"white"}
              onClick={() => {
                setIsAuthenticates(false);
              }}
            />
          ) : (
            <Button
              text="Login"
              color={"white"}
              textColor={"white"}
              onClick={() => {
                navigate.push("/login");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { Header };
