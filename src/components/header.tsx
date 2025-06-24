import React, { useEffect, useState } from "react";
import { CustomBlueBtn } from "./buttons/button";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"; // icons for mobile toggle

type customLi = {
  children: React.ReactNode;
};

export const CustomLinks = ({ children }: customLi) => {
  return <li className="text-white text-lg">{children}</li>;
};

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`transition-all duration-500 mt-5 sticky mx-5 rounded-t-xl z-30 ${
        isScrolled
          ? " px-0 bg-transparent after:w-full after:h-20 after:absolute after:backdrop-blur-xl after:rounded-2xl after:-top-2 after:-z-10"
          : "top-0 px-4 md:px-14 bg-black"
      } ${showHeader ? "translate-y-0 top-2" : "-translate-y-full"} transform`}
    >
      <div
        className={`container backdrop-blur-3xl mx-auto sticky top-0 ${
          isScrolled
            ? "py-4 px-5 md:px-7 top-5 rounded-xl bg-black"
            : "py-0 top-0"
        }`}
      >
        <div className="flex items-center justify-between transition-all duration-500">
          <img
            src="/home/logo.svg"
            className={`${isScrolled ? "max-w-[100px]" : "w-fit p-2"}`}
            alt="Logo"
          />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            <CustomLinks>Home</CustomLinks>
            <CustomLinks>Courses</CustomLinks>
            <CustomLinks>Pricing</CustomLinks>
            <CustomLinks>About</CustomLinks>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white text-3xl" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <CustomBlueBtn>Login</CustomBlueBtn>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-black rounded-lg p-4 space-y-4">
            <ul className="flex flex-col gap-4">
              <CustomLinks>Home</CustomLinks>
              <CustomLinks>Courses</CustomLinks>
              <CustomLinks>Pricing</CustomLinks>
              <CustomLinks>About</CustomLinks>
            </ul>
            <CustomBlueBtn >Login</CustomBlueBtn>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
