import { Dispatch, ReactNode, createContext, useState } from "react";
import User from "../models/user";
import AuthApi from "../apis/authapi";

class AuthState {
  readonly user?: User;
  readonly setUser?: Dispatch<React.SetStateAction<User | undefined>>;

  constructor(
    user?: User,
    setUser?: Dispatch<React.SetStateAction<User | undefined>>
  ) {
    this.user = user;
    this.setUser = setUser;
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  async login(email: string, password: string) {
    const user = await AuthApi.login(email, password);
    this.setUser?.(user);
  }

  async registerUser(email: string, password: string, fullname: string) {
    const user = await AuthApi.registerUser(email, password, fullname);
    this.setUser?.(user);
  }

  async signinWithGoogle() {
    const user = await AuthApi.signinWithGoogle();
    this.setUser?.(user);
  }

  async getUserDetailsById(userId: string) {
    const user = await AuthApi.getUserDetailsById(userId);
    this.setUser?.(user);
    return user;
  }
}

export const AuthContext = createContext<AuthState>(
  new AuthState(undefined, undefined)
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={new AuthState(user, setUser)}>
      {props.children}
    </AuthContext.Provider>
  );
}
