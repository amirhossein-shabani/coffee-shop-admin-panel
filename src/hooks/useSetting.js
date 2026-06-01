import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "../services/setting";

export function useSetting() {
  return useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
    staleTime: 0,
  });
}

export function useUpdateSetting(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });

      options.onSuccess?.(data);
    },

    onError: options.onError,
  });
}
