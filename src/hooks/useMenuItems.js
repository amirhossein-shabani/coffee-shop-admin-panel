import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMenuItemWithImage,
  deleteMenuItemById,
  getMenuItemById,
  getMenuItems,
  // updateMenuItem,
  updateMenuItemWithImage,
  updateSuggestedItems,
  updateAvailability,
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

export function useAddMenuItemWithImage(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMenuItemWithImage,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["menuItems"]);
      options.onSuccess?.(data);
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageUrl }) => deleteMenuItemById({ id, imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries(["menuItems"]);
    },
  });
}

export function useUpdateSuggestedItems(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSuggestedItems,
    onSuccess: () => {
      queryClient.invalidateQueries(["menuItems"]);
      options.onSuccess?.();
    },
    onError: (error) => {
      console.error("خطای بروزرسانی آیتم‌های پیشنهادی:", error);
      options.onError?.(error);
    },
  });
}

export function useUpdateAvailability(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (unavailableIds) => updateAvailability(unavailableIds),
    onSuccess: () => {
      queryClient.invalidateQueries(["menuItems"]);
      options.onSuccess?.();
    },
    onError: (error) => {
      console.error("خطای بروزرسانی موجودی آیتم‌ها:", error);
      options.onError?.(error);
    },
  });
}
