import React from "react";
import { useUser } from "../authentication/useUser";
import { getAllProducts } from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import Item from "../items/Item";
function WishList() {
  const { user } = useUser();
  const {
    isLoading,
    data: AllItems,
    // error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  console.log(AllItems);
  console.log(user);
  const likedProductsId = user.liked.map((item) => item.productId);
  console.log("likedProductsId", likedProductsId);
  const likedProducts = likedProductsId
    ? AllItems.filter((item) => likedProductsId.includes(item._id))
    : [];
  console.log("likedProducts", likedProducts);
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-row gap-4 p-3">
      {likedProducts.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}

export default WishList;
