import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth";

export function useLogout(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (...args) => {
      queryClient.clear();
      options.onSuccess?.(...args);
    },
    onError: options.onError,
  });
}
