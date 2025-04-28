import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getWomen } from "../services/women";
import Spinner from "../ui/Spinner";
import ItemsLayOut from "../featuers/items/ItemsLayOut";

function Women() {
  const {
    isLoading,
    data: womenItems,
    // error,
  } = useQuery({
    queryKey: ["womenPatterns"],
    queryFn: getWomen,
  });
  if (isLoading) return <Spinner />;
  return (
    <>
      <ItemsLayOut items={womenItems} />
    </>
  );
}

export default Women;
