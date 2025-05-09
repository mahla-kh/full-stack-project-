import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "../featuers/profile/ProfileSidebar";
import ProtectedRoute from "../ui/ProtectedRoute";

function ProfileLayout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) navigate("/login");
  return (
    <ProtectedRoute>
      <div className="flex mx-20">
        <ProfileSidebar />

        <main className="flex-1 mt-6 mr-6 h-full border-1  bg-white border-gray-300 text-gray-600 rounded-lg overflow-auto">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default ProfileLayout;
