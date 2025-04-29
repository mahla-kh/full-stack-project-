import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProduct as getApiProduct } from "../../services/products";
export function useGetProduct() {
  const queryClient = useQueryClient();
  const { mutate: getProduct, status } = useMutation({
    mutationFn: (id) => getApiProduct(id),
    onSuccess: async (product) => {
      queryClient.setQueryData(["showProduct"], product);
      toast.success("نمایش محصول");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(" اشتباهی رخ داده ، دوباره تلاش کنید !");
    },
  });

  const isLoading = status === "pending";

  return { getProduct, isLoading };
}
