import React from "react";
// import { useUser } from "../featuers/authentication/useUser";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { IoBagHandleOutline } from "react-icons/io5";

function UserBox() {
  // const { user } = useUser();

  return (
    <div className="flex gap-5">
      <Link to="/profile">
        <FaRegUser size={20} />
      </Link>
      <FaRegHeart size={20} />
      <IoBagOutline size={20} className="font-bold" />
      {/* <IoBagHandleOutline /> */}
    </div>
  );
}

export default UserBox;
