import { useQuery } from "@tanstack/react-query";
import { getMenuItemById, getMenuItems } from "../services/menuItems";

export function useMenuItems() {
  return useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItems,
    staleTime: 0,
  });
}

export function useMenuItem(id) {
  return useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => getMenuItemById(id),
    enabled: !!id,
    staleTime: 0,
  });
}
