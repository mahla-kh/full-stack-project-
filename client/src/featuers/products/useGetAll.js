import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllProducts as getAllProductsApi } from "../../services/products";
export function useGetAll() {
  const queryClient = useQueryClient();
  const { mutate: getAllProducts, status } = useMutation({
    mutationFn: () => getAllProductsApi(),
    onSuccess: async (products) => {
      queryClient.setQueryData(["allProducts"], products);
      toast.success("نمایش محصولات");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(" اشتباهی رخ داده ، دوباره تلاش کنید !");
    },
  });

  const isLoading = status === "pending";

  return { getAllProducts, isLoading };
}
