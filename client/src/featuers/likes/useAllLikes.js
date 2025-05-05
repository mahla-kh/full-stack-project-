import { useQuery } from "@tanstack/react-query";
import { getAllLikes } from "../../services/likes";

export function useAllLikes() {
  const { isLoading, data: allLikes } = useQuery({
    queryKey: ["AllLikes"],
    queryFn: getAllLikes,
  });
  return { isLoading, allLikes };
}
