import React from "react";
function SpinnerMini() {
  return (
    <svg
      className="w-10 h-6 animate-spin"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M25 5a20 20 0 0110 2.5L30 10a15 15 0 00-10 0L15 7.5A20 20 0 0125 5z"
      />
    </svg>
  );
}

export default SpinnerMini;
