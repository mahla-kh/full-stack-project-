import React from "react";
import Logo from "./Logo";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

function Footer() {
  return (
    <footer className="text-gray-800 border-t border-gray-200 bg-white py-10">
      <div className="container mx-auto px-6">
        {/* بخش بالا */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <Logo />

          {/* لینک‌ها */}
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-6  text-sm">
            <li className="hover:text-gray-900 cursor-pointer">پشتیبانی</li>
            <li className="hover:text-gray-900 cursor-pointer">نحوه استفاده</li>
            <li className="hover:text-gray-900 cursor-pointer">سفارش</li>
            <li className="hover:text-gray-900 cursor-pointer">
              شرایط استفاده
            </li>
            <li className="hover:text-gray-900 cursor-pointer">حریم خصوصی</li>
          </ul>

          {/* آیکون‌های شبکه‌های اجتماعی */}
          <div className="flex gap-4 mt-3">
            <FaInstagram className="w-6 h-6 hover:text-gray-900 cursor-pointer" />
            <FaTelegram className="w-6 h-6 hover:text-gray-900 cursor-pointer" />
            <TfiEmail className="w-6 h-6 hover:text-gray-900 cursor-pointer" />
          </div>
        </div>

        {/* بخش پایین */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 pt-6">
          <p>{`© ${new Date().getFullYear()} تمامی حقوق محفوظ است.`}</p>
          <p>ساخته شده توسط خودم </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
