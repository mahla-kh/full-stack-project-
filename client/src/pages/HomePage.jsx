import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <h2>Home Page</h2>
      <div className="flex flex-col bg-white p-5 gap-4 w-[70%] mx-auto shadow-2xl rounded-lg border-2 border-gray-100">
        <div className="flex flex-row gap-4">
          <Link to="/women">
            <img alt="women" className="rounded-md " src="/images/2.jpg" />
          </Link>
          <Link to="/men">
            <img alt="men" className="rounded-md " src="/images/4.jpg" />
          </Link>
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/children">
            <img alt="children" className="rounded-md " src="/images/5.jpg" />
          </Link>
          <Link to="/fantasy">
            <img alt="fantasy" className="rounded-md " src="/images/3.jpg" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
