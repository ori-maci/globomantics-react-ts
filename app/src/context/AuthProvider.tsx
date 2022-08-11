import React from "react";
import { Props } from "../pages/conference/ErrorBoundary";

interface UserData {
  role: "USER" | "ADMIN";
}

interface AuthInfo {
  userData: UserData | null;
}

interface AuthContextValues {
  authInfo: AuthInfo;
  isAuthenticated: boolean;
  // setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>
  setAuthInfo: (authInfo: AuthInfo) => void;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<undefined | AuthContextValues>(undefined);
const Provider = AuthContext.Provider;

export function AuthProvider({ children }: Props) {
  const [authInfo, setAuthInfo] = React.useState<AuthInfo>({
    userData: null,
  });

  const isAuthenticated = !!authInfo.userData;

  const isAdmin = authInfo.userData?.role === "ADMIN";

  function handleAuthInfo(authInfo: AuthInfo) {
    setAuthInfo(authInfo);
  }

  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo, isAdmin }}>
      {children}
    </Provider>
  );
}

export function useAuthContext(): AuthContextValues {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext should be used within AuthProvider.')
  }

  return context
}
