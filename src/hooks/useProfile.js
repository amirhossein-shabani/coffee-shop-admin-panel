import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile";

export function useProfile(userId, options = {}) {
  const { enabled = true, ...queryOptions } = options;

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: Boolean(userId) && enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...queryOptions,
  });
}
