import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories";

export function useCategoies() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    slateTime: 0,
  });
}
