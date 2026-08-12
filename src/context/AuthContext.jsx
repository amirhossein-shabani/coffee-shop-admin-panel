import { createContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSession, onAuthStateChange } from "../services/auth";
import { useLogout } from "../hooks/useLogout";
import { useProfile } from "../hooks/useProfile";
import {
  ADMIN_ROLE,
  AUTHORIZED_ROLES,
  VIEWER_ROLE,
} from "../constants/authRoles";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [authError, setAuthError] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const {
    data: fetchedProfile,
    error: profileError,
    isFetching: isProfileFetching,
    refetch: refetchProfile,
  } = useProfile(user?.id, {
    enabled: Boolean(user?.id),
  });

  const logoutMutation = useLogout();

  // 🔐 Restore session on load
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const currentSession = await getSession();

        if (!isMounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        if (!isMounted) return;

        setAuthError(error);
        setSession(null);
        setUser(null);
        setProfile(null);
      } finally {
        if (isMounted) setIsBootstrapping(false);
      }
    }

    restoreSession();

    // 🔁 Listen to auth changes
    const subscription = onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setAuthError(null);

      if (!nextSession) {
        setProfile(null);
        queryClient.removeQueries({ queryKey: ["profile"] });
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [queryClient]);

  // 👤 Sync profile
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    if (fetchedProfile) {
      setProfile(fetchedProfile);
    }
  }, [fetchedProfile, user]);

  // 🧠 Role system
  const role = profile?.role ?? "none";

  const isAdmin = role === ADMIN_ROLE;
  const isViewer = role === VIEWER_ROLE;
  const isAuthorized = AUTHORIZED_ROLES.includes(role);

  // ⏳ Loading state
  const loading = isBootstrapping || (Boolean(user) && !profile);

  // 📦 Context value
  const value = useMemo(
    () => ({
      authError,

      // auth state
      isAuthenticated: Boolean(user),
      user,
      session,

      // profile + role
      profile,
      role,
      isAdmin,
      isViewer,
      isAuthorized,

      // loading / errors
      loading,
      profileError,

      // actions
      logout: logoutMutation.mutateAsync,
      logoutError: logoutMutation.error,
      logoutLoading: logoutMutation.isPending,
      refetchProfile,
    }),
    [
      authError,
      user,
      session,
      profile,
      role,
      isAdmin,
      isViewer,
      isAuthorized,
      loading,
      profileError,
      logoutMutation.mutateAsync,
      logoutMutation.error,
      logoutMutation.isPending,
      refetchProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
