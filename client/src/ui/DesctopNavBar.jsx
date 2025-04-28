import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";

export const megaMenu = [
  {
    category: "زنانه",
    items: [
      "هودی",
      "مانتو",
      "تیشرت",
      "بلوز و شومیز",
      "تاپ و نیم تنه",
      "لباس راحتی",
      "دامن",
      "پیراهن و لباس مجلسی",
    ],
  },
  {
    category: "مردانه",
    items: [
      "هودی",
      "پیراهن",
      "تیشرت",
      "شلوار",
      "لباس راحتی",
      "ژاکت و پلیور مردانه",
    ],
  },
  {
    category: "کودک",
    items: [
      "هودی",
      "مانتو",
      "تیشرت",
      "بلوز و شومیز",
      "تاپ و نیم تنه",
      "لباس راحتی",
      "دامن",
      "پیراهن و لباس مجلسی",
    ],
  },
  {
    category: "فانتزی",
    items: [
      "هودی",
      "پیراهن",
      "تیشرت",
      "شلوار",
      "لباس راحتی",
      "ژاکت و پلیور مردانه",
    ],
  },
];

function MenuItem({ item }) {
  return (
    <li>
      <a href="#" className="block text-gray-600 hover:text-blue-500">
        {item}
      </a>
    </li>
  );
}

MenuItem.propTypes = {
  item: PropTypes.string.isRequired,
};

function MegaMenu({ category, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="py-2 px-4 font-semibold text-gray-700 hover:text-black">
        {category}
      </button>

      <div
        className={`absolute left-0 top-full w-[500px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-3 gap-6 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <div>
          <ul className="mt-2 mx-auto space-y-2">
            {items.map((item) => (
              <MenuItem key={item} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

MegaMenu.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const DesctopNavbar = () => {
  return (
    <nav className="flex space-x-6">
      {megaMenu.map((item) => (
        <MegaMenu
          category={item.category}
          key={item.category}
          items={item.items}
        />
      ))}
    </nav>
  );
};

export default DesctopNavbar;
