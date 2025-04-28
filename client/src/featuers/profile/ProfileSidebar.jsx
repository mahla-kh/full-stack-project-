import React from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useLogout } from "../authentication/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "../authentication/useUser";
// import { getCurrentUser } from "../../services/auth";
function ProfileSidebar() {
  const { logout, isLoading: loggingout } = useLogout();
  // const user = getCurrentUser();
  const { user } = useUser();
  const username = user?.username;
  return (
    <div className="flex mt-6 flex-col">
      <div
        className="w-64 flex flex-col rounded-lg border-1 border-gray-300
      bg-white shadow-2xl p-5 text-gray-600 text-xl font-semibold"
      >
        {username}
      </div>
      <div
        className="w-64 flex flex-col mt-6 rounded-lg border-1 border-gray-300
      bg-white shadow-2xl p-5"
      >
        <nav>
          <ul className=" divide-y-[1px] cursor-pointer font-bold text-[15px] text-gray-600 divide-gray-200">
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile"
                className="flex items-center flex-row-reverse space-x-reverse space-x-4 text-gray-600 hover:text-blue-500 transition"
              >
                <span>پروفایل</span>
                <FaRegUser />
              </Link>
            </li>
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile/wish-list"
                className="flex items-center flex-row-reverse space-x-reverse space-x-4 text-gray-600 hover:text-blue-500 transition"
              >
                <span>لیست علاقه‌مندی‌ ها</span>
                <FaRegHeart />
              </Link>
            </li>
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile/address"
                className="flex items-center flex-row-reverse space-x-reverse space-x-4 text-gray-600 hover:text-blue-500 transition"
              >
                <span>آدرس های من</span>
                <IoLocationOutline />
              </Link>
            </li>
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile/measure"
                className="flex items-center flex-row-reverse space-x-reverse space-x-4 text-gray-600 hover:text-blue-500 transition"
              >
                <span>اندازه های من</span>
                <span className="size-6 mr-[-5px]">
                  <img src="/images/mannequin.png" />
                </span>
              </Link>
            </li>
            <li className="py-3 flex items-center">
              <Link
                to="/profile/notifs"
                className="flex items-center flex-row-reverse space-x-reverse space-x-6 text-gray-600 hover:text-blue-500 transition"
              >
                <span>پیام ها</span>
                <FaRegBell />
              </Link>
            </li>
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile/orders"
                className="flex items-center flex-row-reverse space-x-reverse space-x-6 text-gray-600 hover:text-blue-500 transition"
              >
                <span>سفارش ها</span>
                <IoBagOutline />
              </Link>
            </li>
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile/settings"
                className="flex items-center flex-row-reverse space-x-reverse space-x-6 text-gray-600 hover:text-blue-500 transition"
              >
                <span>تنظیمات</span>
                <IoSettingsOutline />
              </Link>
            </li>
            <li className="py-3 flex items-center space-x-2">
              <Link
                to="/profile/addproduct"
                className="flex items-center flex-row-reverse space-x-reverse space-x-6 text-gray-600 hover:text-blue-500 transition"
              >
                <span>افزودن محصول</span>
                <IoSettingsOutline />
              </Link>
            </li>
            <li>
              <button
                disabled={loggingout}
                onClick={logout}
                className="flex items-center py-2 gap-6 text-red-500 hover:text-red-600 transition w-full"
              >
                {!loggingout ? <IoIosLogOut /> : <SpinnerMini />}
                <span>خروج</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProfileSidebar;
