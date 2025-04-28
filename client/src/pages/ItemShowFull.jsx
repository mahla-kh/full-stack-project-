import React from "react";
import { getOneItem } from "../services/women";
import { useLoaderData } from "react-router-dom";
function ItemShowFull() {
  const item = useLoaderData();
  console.log(item);
  return <div>ItemShowFull</div>;
}

export async function loader({ params }) {
  const data = await getOneItem(params.itemId);
  return data;
}

export default ItemShowFull;
