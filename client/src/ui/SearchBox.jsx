import React, { useEffect, useRef, useState } from "react";
import { megaMenu } from "./DesctopNavBar";
import { useOutsideClick } from "../hooks/useOutSideClick";
import { CiSearch } from "react-icons/ci";

const megaMenuFullItems = megaMenu.flatMap((item) => item.items);

// megaMenu.map((item) => [...megaMenuFullItems, ...item.items]);
function SearchBox() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isOpenResults, setIsOpenResults] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => setIsOpenResults(false));

  useEffect(
    function () {
      if (search === "") {
        setResults([]); // در صورت خالی بودن جستجو نتایج را پاک می‌کنیم
      } else {
        const searchResults = megaMenuFullItems.filter((item) =>
          item.includes(search)
        );
        setResults(searchResults);
      }
    },
    [search]
  );

  return (
    <div ref={ref}>
      <div className="bg-gray-100 transition-all duration-300 px-4 w-[90%] sm:w-[29rem] py-2 rounded-xl flex align-center ">
        <span className="pt-[5px] ">
          <CiSearch />
        </span>
        <input
          className="px-1 focus:outline-none"
          placeholder="دنبال چی میگردی ؟"
          value={search}
          onFocus={() => setIsOpenResults(true)}
          onBlur={() => setSearch("")}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isOpenResults && results.length > 0 && (
        <div className="absolute transition-all w-[75%] sm:w-[29rem]  duration-300 mx-auto mt-1 bg-white shadow-lg rounded-md z-10">
          <ul className="max-h-60 overflow-y-auto">
            {results.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
