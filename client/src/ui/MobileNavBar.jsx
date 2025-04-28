import React, { useState } from "react";
import { megaMenu } from "./DesctopNavBar";
import Logo from "./Logo";
import { IoMdArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";
function MobileNavBar({ ref }) {
  const [whatIsOpen, setWhatIsOpen] = useState("cat");
  const [items, setItems] = useState([]);
  const [headerCategory, setHeaderCategory] = useState(null);
  const categories = megaMenu.map((item) => item.category);
  const display = whatIsOpen === "cat" ? categories : items;

  return (
    <div ref={ref} className="transition-transform duration-300">
      <nav
        id="menu"
        className="sm:hidden text-gray-800 pt-5 fixed top-0 left-0 h-full w-64 bg-gray-100 transform -translate-x-full transition-transform duration-300 ease-in-out"
      >
        {whatIsOpen !== "cat" ? (
          <div className="flex flex-row align-center justify-between">
            <span className=" font-bold text-xl p-4 py-2">
              {headerCategory}
            </span>
            <button
              onClick={() => {
                setHeaderCategory(null);
                setItems([]);
                setWhatIsOpen("cat");
              }}
              className="mx-7 px-3.5 outline-gray-500 outline-1 rounded-full"
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
        ) : (
          <Logo />
        )}
        <ul className="p-4">
          {display.map((cat, index) => (
            <li
              className="py-2"
              onClick={() => {
                if (whatIsOpen === "cat") {
                  setItems(() => megaMenu[index].items);
                  setHeaderCategory(cat);
                  setWhatIsOpen("items");
                }
              }}
              key={index}
            >
              <a href="#">{cat}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

MobileNavBar.propTypes = {
  ref: PropTypes.any,
};

export default MobileNavBar;
