import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../ui/Spinner";
import ItemsLayOut from "../featuers/items/ItemsLayOut";
import { getAllProducts } from "../services/products";

function Women() {
  const {
    isLoading,
    data: womenItems,
    // error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });
  console.log(womenItems);
  if (isLoading) return <Spinner />;
  return (
    <>
      <ItemsLayOut items={womenItems} />
    </>
  );
}

export default Women;
