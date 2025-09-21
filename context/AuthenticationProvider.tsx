"use client";

import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import type {
  AuthContextValue,
  AuthEvent,
  AuthState,
  LoginCredentials,
  LoginResponse,
} from "@/types/auth";
import {
  completeLogout,
  getActiveSession,
  login as loginRequest,
  refreshSession as refreshSessionRequest,
} from "@/lib/api/auth";
import {
  clearStoredSessionMetadata,
  getStoredSessionMetadata,
  persistSessionMetadata,
} from "@/utils/session/storage";
import {
  getRememberMePreference,
  persistRememberMePreference,
} from "@/utils/session/remember-me";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  sessionExpiry: null,
  lastActivityAt: null,
  rememberMe: false,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function authReducer(state: AuthState, event: AuthEvent): AuthState {
  switch (event.type) {
    case "SET_LOADING":
      return { ...state, isLoading: event.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: event.payload.user,
        sessionExpiry: event.payload.sessionExpiry,
        lastActivityAt: new Date(),
        error: null,
        isLoading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: event.payload.error,
      };
    case "REFRESH":
      return {
        ...state,
        isAuthenticated: true,
        sessionExpiry: event.payload.sessionExpiry,
        user: event.payload.user ?? state.user,
        lastActivityAt: new Date(),
        error: null,
      };
    case "LOGOUT":
      return {
        ...initialState,
        rememberMe: state.rememberMe,
      };
    case "SET_REMEMBER_ME":
      return {
        ...state,
        rememberMe: event.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: event.payload,
      };
    default:
      return state;
  }
}

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => ({
    ...initialState,
    rememberMe: getRememberMePreference(),
  }));

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const storedMetadata = getStoredSessionMetadata();
        const response = await getActiveSession();

        if (!mounted) {
          return;
        }

        if (response?.success && response.user && response.expiresIn) {
          const expiry = new Date(Date.now() + response.expiresIn * 1000);
          persistSessionMetadata({
            sessionId: response.sessionId ?? storedMetadata?.sessionId ?? "",
            issuedAt: new Date(),
            expiresAt: expiry,
            deviceId: storedMetadata?.deviceId,
            ipAddress: storedMetadata?.ipAddress,
            location: storedMetadata?.location,
            userAgent: storedMetadata?.userAgent,
          });

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: response.user,
              sessionExpiry: expiry,
            },
          });
        } else if (storedMetadata && storedMetadata.expiresAt > new Date()) {
          dispatch({
            type: "REFRESH",
            payload: {
              sessionExpiry: storedMetadata.expiresAt,
              user: state.user ?? undefined,
            },
          });
        } else {
          clearStoredSessionMetadata();
        }
      } catch (error) {
        console.error("Failed to bootstrap authentication", error);
        if (mounted) {
          dispatch({
            type: "SET_ERROR",
            payload: "We couldn’t verify your session. Please log in again.",
          });
        }
      } finally {
        mounted && dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    persistRememberMePreference(state.rememberMe);
  }, [state.rememberMe]);

  useEffect(() => {
    if (!state.sessionExpiry) {
      return;
    }

    const millisecondsUntilExpiry =
      state.sessionExpiry.getTime() - Date.now() - 60 * 1000;

    if (millisecondsUntilExpiry <= 0) {
      void refreshSession();
      return;
    }

    const timer = window.setTimeout(() => {
      void refreshSession();
    }, millisecondsUntilExpiry);

    return () => {
      window.clearTimeout(timer);
    };
  }, [refreshSession, state.sessionExpiry]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResponse> => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await loginRequest(credentials);

        if (response.success && response.user && response.expiresIn) {
          const expiry = new Date(Date.now() + response.expiresIn * 1000);
          persistSessionMetadata({
            sessionId: response.sessionId ?? crypto.randomUUID(),
            issuedAt: new Date(),
            expiresAt: expiry,
            deviceId: credentials.deviceId,
          });

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: response.user,
              sessionExpiry: expiry,
            },
          });
        } else if (response.errors?.length) {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { error: response.errors[0] },
          });
        }

        return response;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "We couldn’t log you in. Please try again.";

        dispatch({
          type: "LOGIN_FAILURE",
          payload: { error: message },
        });

        return {
          success: false,
          errors: [message],
        };
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
  );

  const logout = useCallback(async () => {
    try {
      await completeLogout();
    } finally {
      clearStoredSessionMetadata();
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const refreshSession = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await refreshSessionRequest();
      if (response.success && response.expiresIn) {
        const expiry = new Date(Date.now() + response.expiresIn * 1000);
        persistSessionMetadata({
          ...(getStoredSessionMetadata() ?? {
            sessionId: response.sessionId ?? crypto.randomUUID(),
            issuedAt: new Date(),
          }),
          expiresAt: expiry,
        });
        dispatch({
          type: "REFRESH",
          payload: {
            sessionExpiry: expiry,
            user: response.user,
          },
        });
      }
    } catch (error) {
      console.error("Failed to refresh session", error);
      dispatch({
        type: "SET_ERROR",
        payload:
          "Your session has expired. Please sign in again to continue.",
      });
      clearStoredSessionMetadata();
      dispatch({ type: "LOGOUT" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const setRememberMe = useCallback((remember: boolean) => {
    dispatch({ type: "SET_REMEMBER_ME", payload: remember });
  }, []);

  const setError = useCallback((message: string | null) => {
    dispatch({ type: "SET_ERROR", payload: message });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
      refreshSession,
      setRememberMe,
      setError,
    }),
    [login, logout, refreshSession, setRememberMe, setError, state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthenticationContext = (): AuthContextValue => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuthenticationContext must be used within an AuthenticationProvider",
    );
  }
  return ctx;
};
