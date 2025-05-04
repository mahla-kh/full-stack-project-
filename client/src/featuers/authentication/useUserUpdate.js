import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/auth";

export function useUserUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, status } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: async (user) => {
      console.log("updateUser", user);
      queryClient.setQueryData(["user"], user);
      toast.success("با موفقیت به علاقه مندی ها اضافه شد ! ");
      await queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("خطایی رخ داد ! دوباره تلاش کنید.");
    },
  });

  const isLoading = status === "pending";

  return { updateUser, isLoading };
}
