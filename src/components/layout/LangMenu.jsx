/**
 * Des: language dropdown component
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useState } from "react";
import Image from "next/image";

// using context
import { useMainContext } from "@/context";

const LangMenu = () => {
  // get global states
  const states = useMainContext();
  const language = states.language;

  // states
  const [isOpen, setIsOpen] = useState(false);

  // set state related with dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const hideDropdown = (e) => {
    if(e.target.value === undefined) {
      localStorage.setItem("lang", localStorage.getItem("lang"));
    } else {
      localStorage.setItem("lang", e.target.value);
      states.setSelectedLang(e.target.value);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        className="box sm:px-4 px-10 py-3 text-lg text-neutral600 font-outfit font-normal bg-white rounded-md flex flex-wrap gap-2"
        onClick={toggleDropdown}
      >
        {language.lang}
        <Image
          src="/images/dropdown_black.svg"
          alt=""
          className="pt-2.5"
          width={12}
          height={12}
          priority
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white shadow-lg ">
          <button
            className="flex w-full box px-6 py-3 text-lg text-neutral600 hover:bg-dropdownHover"
            value="en"
            onClick={hideDropdown}
          >
            English
          </button>
          <button
            className="flex w-full box px-6 py-3 text-lg text-neutral600 hover:bg-dropdownHover"
            value="sp"
            onClick={hideDropdown}
          >
            Spainsh
          </button>
          <div
            onClick={hideDropdown}
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

export default LangMenu;
