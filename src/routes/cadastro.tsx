import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/cadastro")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect:
      typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/cadastro" });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);
    try {
      await signUp({ nome, email, senha });
      navigate({ to: redirect ?? "/planejar-viagem" });
    } catch (err) {
      setErro(
        err instanceof Error ? err.message : "Não foi possível criar a conta.",
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Cadastro
            </span>
            <h1 className="mt-3 text-balance text-3xl md:text-4xl">
              Crie sua conta
            </h1>
            <p className="mt-4 text-muted-foreground">
              Crie uma conta para começar a planejar sua viagem.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <label
                htmlFor="nome"
                className="text-sm font-medium text-foreground"
              >
                Nome
              </label>
              <input
                id="nome"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                placeholder="voce@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="text-sm font-medium text-foreground"
              >
                Senha
              </label>
              <input
                id="senha"
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                placeholder="Mínimo de 6 caracteres"
              />
            </div>

            {erro && <p className="text-sm text-destructive">{erro}</p>}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {carregando ? "Criando conta..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link
                to="/login"
                search={{ redirect }}
                className="font-medium text-primary hover:text-primary/80"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
