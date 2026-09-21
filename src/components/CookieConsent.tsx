import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

type ConsentChoice = "accepted" | "rejected";

function readStoredChoice(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function storeChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Ambiente sem acesso a localStorage (ex: navegação privada) — a escolha
    // só não é lembrada na próxima visita, o site continua funcionando.
  }
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(readStoredChoice());
    setReady(true);
  }, []);

  if (!ready || choice !== null) return null;

  function handle(newChoice: ConsentChoice) {
    storeChoice(newChoice);
    setChoice(newChoice);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="container-tight flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies essenciais para o funcionamento do site e, com a sua
          permissão, cookies para melhorar sua experiência (como o mapa de
          localização dos destinos). Saiba mais na nossa{" "}
          <Link
            to="/privacidade"
            className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handle("rejected")}
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
          >
            Rejeitar
          </button>
          <button
            type="button"
            onClick={() => handle("accepted")}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
