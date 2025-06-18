import React, { useEffect, useState } from "react";
import { CustomBlueBtn } from "./buttons/button";

type customLi = {
  children: React.ReactNode;
};

export const CustomLinks = ({ children }: customLi) => {
  return <li className="text-white">{children}</li>;
};

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-900 mt-5 sticky mx-5 rounded-t-xl z-30 ${
        isScrolled ? "top-2 px-0 bg-transparent after:* after:w-full after:h-20 after:absolute after:backdrop-blur-xl after:rounded-2xl after:-top-2 after:-z-10" : "top-0 px-14 bg-black"
      }`}
    >
      <div
        className={`container backdrop-blur-3xl mx-auto sticky top-0 ${
          isScrolled
            ? "py-4 px-7 top-5 rounded-xl bg-black backdrop-blur-3xl"
            : "py-6 top-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <img
            src="/home/logo.svg"
            className={`${isScrolled ? "w-20" : "w-fit"}`}
          />
          <ul className="flex gap-8">
            <CustomLinks>Home</CustomLinks>
            <CustomLinks>Courses</CustomLinks>
            <CustomLinks>Pricing</CustomLinks>
            <CustomLinks>About</CustomLinks>
          </ul>
          <CustomBlueBtn>Login</CustomBlueBtn>
        </div>
      </div>
    </div>
  );
}

export default Header;
