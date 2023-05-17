/**
 * Des: login dropdown component
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// using context
import { useMainContext } from "@/context";

const LoginMenu = () => {
  // get global states
  const { language, setLoginImg } = useMainContext();

  // states
  const [isOpen, setIsOpen] = useState(false);

  // set state related with dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const hideDropdown = (loginImg) => {
    if (loginImg === null) {
      localStorage.setItem("loginImg", localStorage.getItem("loginImg"));
    } else {
      localStorage.setItem("loginImg", loginImg);
      setLoginImg(loginImg);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        className="box sm:px-4 px-10 py-3 text-lg text-white font-outfit font-normal bg-primaryBlue rounded-md flex flex-wrap gap-2"
        onClick={toggleDropdown}
      >
        {language.login}
        <Image
          src="/images/dropdown_white.svg"
          alt=""
          className="pt-2.5 w-auto h-auto"
          width={12}
          height={12}
          priority
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white shadow-lg ">
          <p className="text-xs box px-6 pt-6 pb-1 text-neutral500">
            {language.loginAs}
          </p>
          <Link
            href="/auth/signin"
            className="flex box px-6 py-3 pr-0 text-lg text-neutral600 hover:bg-dropdownHover"
            onClick={() => {
              hideDropdown("contractor");
            }}
          >
            <Image
              src="/images/contractor.svg"
              alt="Vercel Logo"
              className="dark:invert h-auto"
              width={21}
              height={21}
              priority
            />
            <span className="box pl-3 pr-3 text-lg font-outfit font-normal">
              {language.contractor}
            </span>
          </Link>
          <Link
            href="/auth/signin"
            className="flex box px-6 py-3 text-lg text-neutral600 hover:bg-dropdownHover"
            onClick={() => {
              hideDropdown("sales");
            }}
          >
            <Image
              src="/images/sales.svg"
              alt="Vercel Logo"
              className="dark:invert h-auto"
              width={21}
              height={21}
              priority
            />
            <p className="pl-3 text-lg font-outfit font-normal">
              {language.sales}
            </p>
          </Link>
          <Link
            href="/auth/signin"
            className="flex box px-6 py-3 text-lg text-neutral600 hover:bg-dropdownHover"
            onClick={() => {
              hideDropdown("admin");
            }}
          >
            <Image
              src="/images/admin.svg"
              alt="Vercel Logo"
              className="dark:invert h-auto"
              width={21}
              height={21}
              priority
            />
            <p className="pl-3 font-paragraph text-lg font-outfit font-normal">
              {language.admin}
            </p>
          </Link>
          <div
            onClick={() => {
              hideDropdown(null);
            }}
            style={{
              position: "fixed",
              top: "0px",
              left: "0px",
              zIndex: -5,
              width: "100vw",
              height: "100vh",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
