import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewLike } from "../../services/likes";

export function useAddLike() {
  const queryClient = useQueryClient();
  const { mutate: addLike, status } = useMutation({
    mutationFn: ({ userId, productId }) => addNewLike({ userId, productId }),
    onSuccess: async (newLike) => {
      console.log("useAddLike", newLike);
      queryClient.setQueryData(["userLikes"], (p) => [...p, newLike]);
      toast.success("با موفقیت به علاقه مندی ها اضافه شد!");
      await queryClient.invalidateQueries(["userLikes"]);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(" اشتباهی رخ داده ، دوباره تلاش کنید !");
    },
  });

  const isLoading = status === "pending";

  return { addLike, isLoading };
  //   return { login, isLoading: isLoading ?? true };
}
