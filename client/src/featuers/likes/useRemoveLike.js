import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeLikeApi } from "../../services/likes";

export function useRemoveLike() {
  const queryClient = useQueryClient();
  const { mutate: removeLike, status } = useMutation({
    mutationFn: ({ userId, productId }) => removeLikeApi({ userId, productId }),
    onSuccess: async (remoedLike) => {
      console.log("useremoveLike", remoedLike);
      toast.success("با موفقیت از علاقه مندی ها حذف شد!");
      await queryClient.invalidateQueries(["userLikes"]);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(" اشتباهی رخ داده ، دوباره تلاش کنید !");
    },
  });

  const isLoading = status === "pending";

  return { removeLike, isLoading };
  //   return { login, isLoading: isLoading ?? true };
}
