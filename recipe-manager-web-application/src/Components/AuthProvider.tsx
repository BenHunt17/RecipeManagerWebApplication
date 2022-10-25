import React, { createContext, useContext, useEffect, useState } from "react";
import { HttpMethod } from "../Hooks/useMutate";
import { UserCredentials } from "../types/userTypes";

interface AuthContextType {
  bearerToken: string | undefined;
  authenticationPending: boolean;
  authenticationDenied: boolean;
  login: (userCredentials: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth() {
  return useContext(AuthContext);
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
  const [authenticationPending, setAuthenticationPending] = useState(true);
  const [authenticationDenied, setAuthenicationDenied] = useState(false);

  useEffect(() => {
    refresh();
    setInterval(
      () => refresh(),
      //Refresh is wrapped in an interval so that the browser will automatically try refresh before the token expires.
      bearerTokenExpireTime
    );
  }, [setBearerToken, setAuthenticationPending]);

  const refresh = () =>
    fetch(`${process.env.REACT_APP_RECIPE_MANAGER_API_URL}user/refresh`, {
      method: HttpMethod.GET,
      credentials: "include",
    })
      .then((result) => {
        if (!result.ok) {
          setBearerToken("");
          throw Error("Unable to refresh the bearer token");
        }
        return result.text();
      })
      .then((data) => {
        try {
          setBearerToken(data);
        } catch {
          setAuthenicationDenied(true);
          throw Error("Invalid response json");
        }
      })
      .catch((error) => {
        console.log(error);
        setBearerToken("");
      })
      .finally(() => setAuthenticationPending(false));

  const login = (userCredentials: UserCredentials) =>
    fetch(`${process.env.REACT_APP_RECIPE_MANAGER_API_URL}user/login`, {
      method: HttpMethod.PUT,
      headers: new Headers({
        "Content-Type": "application/json;charset=utf-8",
      }),
      credentials: "include",
      body: JSON.stringify(userCredentials),
    })
      .then((result) => {
        if (!result.ok) {
          setAuthenicationDenied(true);
          throw Error("Could not login");
        }
        return result.text();
      })
      .then((data) => {
        try {
          setBearerToken(data);
        } catch {
          setAuthenicationDenied(true);
          throw Error("Invalid response json");
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthenicationDenied(true);
      });

  const logout = () =>
    fetch(`${process.env.REACT_APP_RECIPE_MANAGER_API_URL}user/logout`, {
      method: HttpMethod.PUT,
      headers: new Headers({
        "Content-Type": "application/json;charset=utf-8",
      }),
      credentials: "include",
    })
      .then((result) => {
        if (!result.ok) {
          throw Error("Could not logout");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setBearerToken(""));

  return (
    <AuthContext.Provider
      value={{
        bearerToken: bearerToken,
        authenticationPending: authenticationPending,
        authenticationDenied: authenticationDenied,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
