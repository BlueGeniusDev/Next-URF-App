/**
 * Des: header component
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import Image from "next/image";
import Link from "next/link";

import { useMainContext } from "@/context";

import LoginMenu from "./LoginMenu";
import LangMenu from "./LangMenu";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useState } from "react";

const Header = () => {
  const { accessToken, language } = useMainContext();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [token, accessToken]);

  return (
    <header className="border-b border-bottomColor bg-[#f9fafb] py-4 mobile:bg-white">
      <nav className="w-full">
        <div className="flex items-center justify-between w-full px-10 mobile:flex-col mobile:px-0">
          <div className="flex items-center mobile:mb-4">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 mobile:w-full mobile:flex mobile:justify-between mobile:px-4">
            {token ? (
              <Link href="/">
                <button className="box sm:px-4 px-10 py-3 text-lg text-neutral600 font-outfit font-normal bg-white rounded-md flex flex-wrap gap-2">
                  {language.myProject}
                </button>
              </Link>
            ) : (
              ""
            )}
            <LangMenu />
            {token ? <ProfileMenu /> : <LoginMenu />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
