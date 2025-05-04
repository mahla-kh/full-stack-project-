import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postProduct } from "../../services/products";

export function useProduct() {
  const queryClient = useQueryClient();
  const { mutate: addProduct, status } = useMutation({
    mutationFn: (formData) => postProduct(formData),
    onSuccess: async (product) => {
      console.log("useProduct", product);
      queryClient.setQueryData(["product"], product);
      toast.success("محصول با موفقیت اضافه شد ");
      await queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(" اشتباهی رخ داده ، دوباره تلاش کنید !");
    },
  });

  const isLoading = status === "pending";

  return { addProduct, isLoading };
  //   return { login, isLoading: isLoading ?? true };
}
