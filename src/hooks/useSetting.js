import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/setting";

export function useSetting() {
  return useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
    staleTime: 0,
  });
}
