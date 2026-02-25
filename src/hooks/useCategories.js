import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryByHref } from "../services/categories";

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
