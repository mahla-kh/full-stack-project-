import PropTypes from "prop-types";
import React, { useState } from "react";
import { formatCurrency } from "../../hooks/helper";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useAddLike } from "../likes/useAddLike";
import { useAllLikes } from "../likes/useAllLikes";
import toast from "react-hot-toast";
import { useUserLikes } from "../likes/useUserLikes";

function Item({ item }) {
  const { _id, title, price, pictures } = item;
  const [isHovered, setIsHovered] = useState(false);
  const { addLike, isLoading: isAddingLike } = useAddLike();
  const { removeLike, isLoading: isRemovingLike } = useAddLike();
  const { allLikes } = useAllLikes();
  const { userLikes } = useUserLikes();
  const isLiked = userLikes?.some((like) => like.productId === _id) ?? false;
  // const [isLiked, setIsLiked] = useState(isItemLiked);
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  const imageFront = arrayBufferToBase64(pictures[0].buffer.data);
  const imageBack = arrayBufferToBase64(
    pictures[1] ? pictures[1].buffer.data : pictures[0].buffer.data
  );
  const base64 = isHovered ? imageBack : imageFront;
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  function handleLike() {
    if (isAddingLike || isRemovingLike) {
      return;
    }
    if (!user) {
      toast.error("ابتدا وارد شوید !");
      return;
    }
    console.log("user in item", user);
    const alreadyLiked = allLikes?.some((like) => like.productId === _id);
    alreadyLiked
      ? removeLike({ userId: user._id, productId: _id })
      : addLike({ userId: user._id, productId: _id });

    // setIsLiked((like) => !like);
  }
  if (isAddingLike || isRemovingLike) return <Spinner />;
  return (
    <div className="flex flex-col relative gap-1 sm:gap-3 w-40 sm:w-60 bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
      <span
        onClick={() => handleLike()}
        className="absolute cursor-pointer top-3 left-3 z-0"
      >
        {isLiked ? "❤️" : <FaRegHeart />}
      </span>
      <Link className="flex flex-col gap-1" to={`${_id}`}>
        <div
          className="overflow-hidden rounded-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={`data:image/png;base64,${base64}`}
            className="w-full h-auto object-cover transition-opacity duration-300"
            alt={title}
          />
        </div>
        <span className="text-xs uppercase tracking-wide text-gray-500">
          Sewing Pattern
        </span>
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <span className="text-md font-medium text-blue-600">
          {formatCurrency(price)}
        </span>
      </Link>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
