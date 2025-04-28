import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log("use user", user);
  return { isLoading, user };
  // return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
