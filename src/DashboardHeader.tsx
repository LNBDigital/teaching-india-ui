import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "./lib/env";

interface SideBarType {
  closeWrap: (param: boolean) => void;
}

const SideBar: React.FC<SideBarType> = ({ closeWrap }) => {
  const navigation = useNavigate();
  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${environment.API_PROD}logout`, null, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${Cookies.get("authToken")}`,
        },
      });
      if (result.data && result.data.status === "success") {
        Cookies.remove("authToken");
        navigation("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const className = "hover:text-lightBlue4 cursor-pointer";
  return (
    <div className="flex z-10 flex-col items-start bg-white absolute right-8 top-17 py-4 pl-3 pr-8 rounded-md">
      <Link to={"/edit-profile"} className={className}>
        Edit Profile
      </Link>
      <button onClick={handleLogOut} className={className}>
        Log Out
      </button>
    </div>
  );
};

export default function DashboardHeader() {
  const [showBar, setShowBar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowBar(false);
      }
    };
    const scrollHandler = (e: Event) => {
      e.preventDefault();
      if (window.scrollY > 30) {
        setShowBar(false);
      }
    };
    document.addEventListener("mouseover", outsideHandler);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("mouseover", outsideHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div ref={ref} className=" bg-black py-2 px-3 lg:px-18">
      <div className="container mx-auto ">
        <div className="grid grid-cols-3 relative ">
          <Link to={"/dashboard"}>
            <img
              src="/home/logo.svg"
              className="w-full max-w-[70px] lg:max-w-full lg:w-fit"
              alt="Logo"
            />
          </Link>

          <Link
            to={"/dashboard"}
            className="text-lg inline-flex items-center justify-center text-white"
          >
            Dashboard
          </Link>
          <button
            className="cursor-pointer inline-flex items-center justify-end"
            onClick={() => setShowBar((prev) => !prev)}
          >
            <img className="w-10" src="/dashboard/home/user.png" />
          </button>
          {showBar && <SideBar closeWrap={() => setShowBar(false)} />}
        </div>
      </div>
    </div>
  );
}
