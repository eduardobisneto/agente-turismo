import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, User, X, Mountain } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/lib/auth-context";
import {
  getPlanosDoUsuario,
  onPlanosAtualizados,
  pedirListaDeViagens,
} from "@/lib/trip-plan";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destinos", label: "Destinos" },
  { to: "/experiencias", label: "Experiências" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, ready, signOut } = useAuth();
  const navigate = useNavigate();

  const [temViagens, setTemViagens] = useState(false);

  useEffect(() => {
    function recalcular() {
      setTemViagens(!!user && getPlanosDoUsuario(user.id).length > 0);
    }
    recalcular();
    return onPlanosAtualizados(recalcular);
  }, [user]);

  const rotuloBotaoViagem = temViagens ? "Minhas viagens" : "Planejar viagem";

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-display text-xl tracking-tight">
            Aventura Organizada
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/planejar-viagem"
            onClick={() => {
              if (temViagens) pedirListaDeViagens();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {rotuloBotaoViagem}
          </Link>

          {ready && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-primary" />
                    {user.nome.split(" ")[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    aria-label="Sair"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  search={{ redirect: undefined }}
                  className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  Entrar
                </Link>
              )}
            </>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <div className="container-tight flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium uppercase tracking-wide text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/planejar-viagem"
              onClick={() => {
                setMobileOpen(false);
                if (temViagens) pedirListaDeViagens();
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground"
            >
              {rotuloBotaoViagem}
            </Link>

            {ready && (
              <>
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      handleSignOut();
                    }}
                    className="inline-flex items-center gap-2 text-base font-medium uppercase tracking-wide text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair ({user.nome.split(" ")[0]})
                  </button>
                ) : (
                  <Link
                    to="/login"
                    search={{ redirect: undefined }}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium uppercase tracking-wide text-foreground"
                  >
                    Entrar
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
