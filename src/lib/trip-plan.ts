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

// v2: campos de data/pessoas/interesses/inclusos migraram de nível global
// pra dentro de cada SelecaoDestino. Muda a versão da chave sempre que o
// formato dos dados salvos mudar, pra planos salvos com o formato antigo
// não quebrarem a leitura — eles simplesmente ficam invisíveis (não
// deletados) na chave anterior.
const PLANOS_KEY = "ao_planos_viagem_v2";

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

// localStorage não é reativo — nada re-renderiza sozinho quando outro
// componente grava um plano novo (ex: o Header precisa saber se o
// usuário já tem viagens, mas o wizard que salva o plano fica em outra
// parte da árvore de componentes). Esse evento avisa quem estiver
// escutando pra recalcular.
const PLANOS_ATUALIZADOS_EVENT = "ao:planos-atualizados";

export function onPlanosAtualizados(callback: () => void): () => void {
  window.addEventListener(PLANOS_ATUALIZADOS_EVENT, callback);
  return () => window.removeEventListener(PLANOS_ATUALIZADOS_EVENT, callback);
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
  window.dispatchEvent(new Event(PLANOS_ATUALIZADOS_EVENT));

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
