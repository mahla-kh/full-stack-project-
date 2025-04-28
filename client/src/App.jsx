import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import LoginLayOut from "./pages/loginLayOut";
import Error from "./ui/Error";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Children from "./pages/Children";
import Fantasy from "./pages/Fantasy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ItemShowFull, { loader as oneItemLoader } from "./pages/ItemShowFull";
import ProfileLayout from "./pages/ProfileLayout";
import WishList from "./featuers/profile/WishList";
import ProfileInfo from "./featuers/profile/ProfileInfo";
import ProfileAddress from "./featuers/profile/ProfileAddress";
import ProfileMeasurments from "./featuers/profile/ProfileMeasurments";
import ProfileNotifs from "./featuers/profile/ProfileNotifs";
import ProfileOrders from "./featuers/profile/ProfileOrders";
import ProfileSettings from "./featuers/profile/ProfileSettings";
import { Toaster } from "react-hot-toast";
import SignupForm from "./pages/SignUpForm";
import Addproduct from "./featuers/profile/ProfileAddproduct";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <LoginLayOut />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/profile",
        element: <ProfileLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <ProfileInfo />,
          },
          {
            path: "/profile/wish-list",
            element: <WishList />,
          },
          {
            path: "/profile/address",
            element: <ProfileAddress />,
          },
          {
            path: "/profile/measure",
            element: <ProfileMeasurments />,
          },
          {
            path: "/profile/notifs",
            element: <ProfileNotifs />,
          },
          {
            path: "/profile/orders",
            element: <ProfileOrders />,
          },
          {
            path: "/profile/settings",
            element: <ProfileSettings />,
          },
          {
            path: "/profile/addproduct",
            element: <Addproduct />,
          },
        ],
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/women/:itemId",
        element: <ItemShowFull />,
        loader: oneItemLoader,
        errorElement: <Error />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/children",
        element: <Children />,
      },
      {
        path: "/fantacy",
        element: <Fantasy />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />;
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
export default App;
