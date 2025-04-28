import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, status } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("حساب با موفقیت ساخته شد .");
      toast.success("در حال انتقال ...");
      queryClient.setQueryData(["user", user.user]);
      navigate("/profile", { replace: true });
    },
  });

  const isLoading = status === "pending";

  return { signup, isLoading };
}
