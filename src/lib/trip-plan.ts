/**
 * Modelo e persistência (mockada) do plano de viagem montado pelo cliente
 * final no fluxo de "Planejar viagem".
 *
 * Hoje isso só grava no localStorage do navegador. Quando a
 * `cadastro.api` existir, o envio do resumo deve virar uma chamada real
 * pra ela (POST do plano), pra o analista da Aventura Organizada
 * conseguir ver e detalhar a proposta.
 */

export interface SelecaoDestino {
  destinoSlug: string;
  experienciaSlugs: string[];
  dataInicio?: string | undefined;
  dataFim?: string | undefined;
  interesses: string[];
  adultos: number;
  criancas: number;
  inclusos: string[];
}

export interface PlanoViagem {
  id: string;
  criadoEm: string;
  usuarioId: string;
  tipoInicial: "destinos" | "experiencias";
  selecoes: SelecaoDestino[];
  contexto: string;
}

const PLANOS_KEY = "ao_planos_viagem";

function readPlanos(): PlanoViagem[] {
  try {
    const raw = window.localStorage.getItem(PLANOS_KEY);
    return raw ? (JSON.parse(raw) as PlanoViagem[]) : [];
  } catch {
    return [];
  }
}

export function getPlanosDoUsuario(usuarioId: string): PlanoViagem[] {
  return readPlanos()
    .filter((plano) => plano.usuarioId === usuarioId)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function salvarPlanoViagem(
  plano: Omit<PlanoViagem, "id" | "criadoEm">,
): PlanoViagem {
  const registro: PlanoViagem = {
    ...plano,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };

  const planos = readPlanos();
  window.localStorage.setItem(
    PLANOS_KEY,
    JSON.stringify([...planos, registro]),
  );

  return registro;
}

export function noitesEntre(
  dataInicio?: string,
  dataFim?: string,
): number | null {
  if (!dataInicio || !dataFim) return null;
  const inicio = new Date(`${dataInicio}T00:00:00`);
  const fim = new Date(`${dataFim}T00:00:00`);
  const diffMs = fim.getTime() - inicio.getTime();
  const noites = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return noites > 0 ? noites : null;
}

export const INTERESSES_DISPONIVEIS = [
  "Aventura",
  "Praia",
  "Natureza",
  "Cultura",
  "Gastronomia",
] as const;

export const INCLUSOS_DISPONIVEIS = [
  "Experiência Aérea",
  "Experiências de Estadia",
  "Mobilidade",
  "Experiências Culturais e de Entretenimento",
  "Lazer",
  "Passeios Turísticos",
  "Transfer Exclusivo",
] as const;
