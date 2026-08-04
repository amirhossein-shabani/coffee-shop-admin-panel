import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/auth";
import { getProfile } from "../services/profile";

export function useLogin(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const authData = await login(email, password);
      const profile = await getProfile(authData.user.id);

      queryClient.setQueryData(["profile", authData.user.id], profile);

      return {
        ...authData,
        profile,
      };
    },
    onSuccess: (...args) => {
      options.onSuccess?.(...args);
    },
    onError: options.onError,
  });
}
