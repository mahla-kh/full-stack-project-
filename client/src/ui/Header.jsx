import React, { useRef, useState } from "react";
import Logo from "./Logo";
import DesctopNavbar from "./DesctopNavBar";
import MobileNavBar from "./MobileNavBar";
import SearchBox from "./SearchBox";
import UserBox from "./UserBox";
import { FiMenu } from "react-icons/fi";
import { useOutsideClick } from "../hooks/useOutSideClick";

function Header() {
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setIsMobMenuOpen(false));

  return (
    <header className="w-full bg-white sticky border-b border-gray-200  top-0 z-50 shadow-2xl p-4">
      <div className="sm:flex container mx-auto hidden justify-between items-center">
        <Logo />
        <SearchBox />
        <DesctopNavbar />
        <UserBox />
      </div>
      <div className="sm:hidden w-full container flex flex-col items-center gap-4">
        <div className="w-full flex flex-row items-center justify-between px-4">
          <UserBox />
          <Logo />
          <button
            onClick={() => setIsMobMenuOpen((is) => !is)}
            className="mx-1 px-2 py-1 outline-gray-500 outline-1 rounded-full"
          >
            <FiMenu />
          </button>
        </div>
        <div className="w-full px-4">
          <SearchBox />
        </div>
        {isMobMenuOpen && <MobileNavBar ref={ref} />}
      </div>
    </header>
  );
}

export default Header;
