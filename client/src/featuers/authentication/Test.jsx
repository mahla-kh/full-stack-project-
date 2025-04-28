import React from "react";
function Test() {
  function handler(e) {
    e.preventDefault();
    console.log("submited");
  }
  return (
    <form onSubmit={handler}>
      <input placeholder="email" />
      <button className="hover:bg-amber-800" type="submit">
        submit
      </button>
    </form>
  );
}

export default Test;
