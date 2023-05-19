import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

import { useMainContext } from "@/context";
import { Typography, Avatar } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/outline";

const AvatarMenu = () => {
  const navigator = useRouter();
  const { logout } = useMainContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const hideDropdown = (e) => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    logout();
    navigator.push("/");
  };

  return (
    <div className="relative">
      <button className="flex items-center gap-2" onClick={toggleDropdown}>
        <Avatar src="/images/avatars/Admin.svg" alt="avatar" />
        <div>
          <Typography
            variant="h6"
            className="font-outfit font-bold text-base text-neutral400"
          >
            Charles Mendez
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="text-neutral400 font-medium text-sm"
          >
            Crew Manager
          </Typography>
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white shadow-lg ">
          <div
            className="flex w-full box px-6 py-3 text-base text-neutral600 hover:bg-dropdownHover"
            value="en"
            onClick={hideDropdown}
          >
            <button onClick={handleLogOut} className="flex">
              <PowerIcon width={16} height={16} className="m-0.5" />
              <span>Sign Out</span>
            </button>
          </div>
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

export default AvatarMenu;
