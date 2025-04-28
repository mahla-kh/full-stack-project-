import React from "react";
import Item from "./Item";
import PropTypes from "prop-types";
function ItemsLayOut({ items }) {
  return (
    <div className="flex flex-wrap p-5 sm:p-10 gap-2 sm:gap-3">
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}

ItemsLayOut.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ItemsLayOut;
