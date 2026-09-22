/**
 * Cliente de autenticação MOCKADO — simula o formato de uma integração
 * com AWS Cognito (signUp/signIn/signOut/getCurrentUser), mas guarda tudo
 * em localStorage, sem servidor nem verificação real de senha.
 *
 * Pensado para ser substituído depois por uma implementação real usando
 * o AWS Amplify (Auth.signUp/Auth.signIn/...) contra o User Pool descrito
 * em `auth-config.ts`, mantendo a mesma interface `AuthUser`/métodos, para
 * que as telas de login/cadastro não precisem mudar.
 */

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
}

interface StoredAccount extends AuthUser {
  senha: string;
}

const USERS_KEY = "ao_auth_users";
const SESSION_KEY = "ao_auth_session";

function readUsers(): StoredAccount[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredAccount[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function signUp(input: {
  nome: string;
  email: string;
  senha: string;
}): Promise<AuthUser> {
  const users = readUsers();
  const email = input.email.trim().toLowerCase();

  if (users.some((u) => u.email === email)) {
    throw new Error("Já existe uma conta com esse e-mail.");
  }

  const account: StoredAccount = {
    id: crypto.randomUUID(),
    nome: input.nome.trim(),
    email,
    senha: input.senha,
  };

  writeUsers([...users, account]);

  const user: AuthUser = {
    id: account.id,
    nome: account.nome,
    email: account.email,
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  return delay(user);
}

export async function signIn(input: {
  email: string;
  senha: string;
}): Promise<AuthUser> {
  const users = readUsers();
  const email = input.email.trim().toLowerCase();
  const account = users.find(
    (u) => u.email === email && u.senha === input.senha,
  );

  if (!account) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const user: AuthUser = {
    id: account.id,
    nome: account.nome,
    email: account.email,
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  return delay(user);
}

export async function signOut(): Promise<void> {
  window.localStorage.removeItem(SESSION_KEY);
  return delay(undefined, 100);
}

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}
