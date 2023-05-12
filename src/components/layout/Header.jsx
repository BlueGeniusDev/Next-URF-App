/**
 * Des: header component
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import Image from "next/image";
import Link from "next/link";

import LoginMenu from "./LoginMenu";
import LangMenu from "./LangMenu";

const Header = () => {
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
          <div className="flex items-center gap-2 mobile:w-full mobile:flex mobile:justify-between mobile:pr-8">
            <LangMenu />
            <LoginMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
