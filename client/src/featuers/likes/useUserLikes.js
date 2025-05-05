import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "../../services/likes";

export function useUserLikes() {
  const { isLoading, data: userLikes } = useQuery({
    queryKey: ["userLikes"],
    queryFn: getUserLikes,
  });
  return { isLoading, userLikes };
}
