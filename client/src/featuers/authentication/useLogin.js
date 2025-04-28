import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, status } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async (data) => {
      console.log("useLogin", data);
      queryClient.setQueryData(["user"], data?.user);
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.user);
      toast.success("در حال انتقال ...");
      await queryClient.invalidateQueries(["user"]);
      navigate("/profile", { replace: true });

      // window.location.href = "/profile";
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("ایمیل یا پسورد نامعتبر است !");
    },
  });

  const isLoading = status === "pending";

  return { login, isLoading };
  //   return { login, isLoading: isLoading ?? true };
}
