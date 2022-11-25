import React, { createContext, useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import useMutate, { HttpMethod } from "../hook/useMutate";
import { UserCredentials } from "../type/userTypes";

interface AuthContextType {
  bearerToken: string | undefined;
  authenticationPending: boolean;
  authenticationDenied: boolean;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const bearerTokenExpireTime = 29.5 * 60 * 1000; //Set to 30 seconds before the bearer token expires

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bearerToken, setBearerToken] = useState<string>();
  const [authenticationDenied, setAuthenicationDenied] = useState(false);

  const { callback: login, loading: loginLoading } = useMutate<string>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}user/login`,
    httpMethod: HttpMethod.PUT,
    onComplete: (token) => {
      setBearerToken(token);
    },
    onError: () => {
      setAuthenicationDenied(true);
    },
    options: { includeCredentials: true },
  });

  const { callback: logout } = useMutate({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}user/logout`,
    httpMethod: HttpMethod.PUT,
    onComplete: () => setBearerToken(undefined),
    options: { includeCredentials: true, overrideBearer: bearerToken },
  });

  const { data: refreshResult } = useFetch<string>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}user/refresh`,
    options: { includeCredentials: true },
  });

  useEffect(() => {
    setBearerToken(refreshResult);
    setInterval(
      () => setBearerToken(undefined),
      //token invalidation is wrapped in an interval so that the browser will automatically try refresh before the token expires.
      bearerTokenExpireTime
    );
  }, [refreshResult]);

  return (
    <AuthContext.Provider
      value={{
        bearerToken: bearerToken,
        authenticationPending: loginLoading,
        authenticationDenied: authenticationDenied,
        login: (credentials) => login(JSON.stringify(credentials)),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
