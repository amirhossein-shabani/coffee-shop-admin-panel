import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../services/menuItems";

export function useMenuItems() {
  return useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItems,
    staleTime: 0,
  });
}
