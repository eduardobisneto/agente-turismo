import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  signIn as signInClient,
  signOut as signOutClient,
  signUp as signUpClient,
  type AuthUser,
} from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  /** false até o localStorage ser lido no cliente (evita mismatch de hidratação). */
  ready: boolean;
  signIn: (input: { email: string; senha: string }) => Promise<AuthUser>;
  signUp: (input: {
    nome: string;
    email: string;
    senha: string;
  }) => Promise<AuthUser>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setReady(true);
  }, []);

  const signIn = useCallback(
    async (input: { email: string; senha: string }) => {
      const account = await signInClient(input);
      setUser(account);
      return account;
    },
    [],
  );

  const signUp = useCallback(
    async (input: { nome: string; email: string; senha: string }) => {
      const account = await signUpClient(input);
      setUser(account);
      return account;
    },
    [],
  );

  const signOut = useCallback(async () => {
    await signOutClient();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
  }
  return context;
}
