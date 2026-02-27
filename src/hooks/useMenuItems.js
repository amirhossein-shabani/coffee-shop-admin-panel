import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMenuItemById,
  getMenuItems,
  updateMenuItem,
  updateMenuItemWithImage,
} from "../services/menuItems";

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

export function useUpdateMenuItem(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenuItem,

    onSuccess: (data) => {
      // invalidate
      queryClient.invalidateQueries(["menuItems"]);
      // invalidate individual item
      queryClient.setQueryData(["menuItem", data.id], data);

      options.onSuccess?.(data);
    },
  });
}

export function useUpdateMenuItemWithImage(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenuItemWithImage,

    onSuccess: (data) => {
      // invalidate
      queryClient.invalidateQueries(["menuItems"]);
      // invalidate individual item
      queryClient.setQueryData(["menuItem", data.id], data);

      options.onSuccess?.(data);
    },
  });
}
