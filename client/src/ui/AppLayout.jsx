import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";
function AppLayout() {
  const navigation = useNavigate();
  const isLoading = navigation.status === "loading";
  if (isLoading)
    return (
      <div className="bg-sky-300 h-full w-full">
        <Spinner />
      </div>
    );
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="bg-cyan-100 flex-1 pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
