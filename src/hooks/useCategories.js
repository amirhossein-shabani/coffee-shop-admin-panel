import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryByHref,
  updateCategory,
} from "../services/categories";

export function useCategoies() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 0,
  });
}

export function useCategory(href) {
  return useQuery({
    queryKey: ["category", href],
    queryFn: () => getCategoryByHref(href),
    enabled: !!href,
    staleTime: 0,
  });
}

export function useUpdateCategory(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onSuccess: (data) => {
      // فقط این کافیه 👇
      queryClient.invalidateQueries(["categories"]);

      options.onSuccess?.(data);
    },
  });
}
