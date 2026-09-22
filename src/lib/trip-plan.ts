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
  data?: string | undefined;
}

export interface PlanoViagem {
  id: string;
  criadoEm: string;
  usuarioId: string;
  tipoInicial: "destinos" | "experiencias";
  selecoes: SelecaoDestino[];
  duracaoNoites: number;
  interesses: string[];
  contexto: string;
  adultos: number;
  criancas: number;
  inclusos: string[];
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
