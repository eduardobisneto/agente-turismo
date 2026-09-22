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
  /** Idade de cada criança, na mesma ordem — usada depois pra coletar nome/documento por criança. */
  idadesCriancas?: number[] | undefined;
  inclusos: string[];
  contextoDestino?: string | undefined;
}

export interface Interacao {
  id: string;
  autor: "usuario" | "analista";
  texto: string;
  criadoEm: string;
  tipo?: "mensagem" | "sugestao";
  sugestaoStatus?: "pendente" | "aceita" | "recusada";
}

export interface PlanoViagem {
  id: string;
  criadoEm: string;
  usuarioId: string;
  tipoInicial: "destinos" | "experiencias";
  selecoes: SelecaoDestino[];
  contexto: string;
  interacoes: Interacao[];
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

// O Header tem um link "Minhas viagens" pra /planejar-viagem, mas a página
// guarda internamente se está mostrando a lista, o wizard ou o detalhe de
// um plano. Clicar no link quando já se está nessa rota não dispara
// navegação (mesma URL), então a página não teria como saber que precisa
// voltar pra lista. Esse evento avisa quem estiver escutando pra fazer isso.
const IR_PARA_LISTA_EVENT = "ao:ir-para-lista-de-viagens";

export function pedirListaDeViagens(): void {
  window.dispatchEvent(new Event(IR_PARA_LISTA_EVENT));
}

export function onPedirListaDeViagens(callback: () => void): () => void {
  window.addEventListener(IR_PARA_LISTA_EVENT, callback);
  return () => window.removeEventListener(IR_PARA_LISTA_EVENT, callback);
}

function horasDepois(base: string, horas: number): string {
  return new Date(new Date(base).getTime() + horas * 60 * 60 * 1000).toISOString();
}

export function salvarPlanoViagem(
  plano: Omit<PlanoViagem, "id" | "criadoEm" | "interacoes">,
): PlanoViagem {
  const agora = new Date().toISOString();
  const registro: PlanoViagem = {
    ...plano,
    id: crypto.randomUUID(),
    criadoEm: agora,
    interacoes: [
      {
        id: crypto.randomUUID(),
        autor: "usuario",
        texto: "Plano enviado para análise.",
        criadoEm: agora,
        tipo: "mensagem",
      },
      {
        id: crypto.randomUUID(),
        autor: "analista",
        texto:
          "Recebemos seu plano! Já começamos a montar a proposta com base nos destinos e experiências que você escolheu — em breve trazemos os detalhes por aqui.",
        criadoEm: horasDepois(agora, 3),
        tipo: "mensagem",
      },
      {
        id: crypto.randomUUID(),
        autor: "analista",
        texto:
          "Uma sugestão: que tal incluir um passeio de barco a mais no roteiro? Costuma ser um dos programas queridinhos de quem viaja com a gente.",
        criadoEm: horasDepois(agora, 4),
        tipo: "sugestao",
        sugestaoStatus: "pendente",
      },
    ],
  };

  const planos = readPlanos();
  window.localStorage.setItem(
    PLANOS_KEY,
    JSON.stringify([...planos, registro]),
  );
  window.dispatchEvent(new Event(PLANOS_ATUALIZADOS_EVENT));

  return registro;
}

export function adicionarInteracao(
  planoId: string,
  interacao: Omit<Interacao, "id" | "criadoEm">,
): PlanoViagem | null {
  const planos = readPlanos();
  const index = planos.findIndex((p) => p.id === planoId);
  if (index === -1) return null;

  const atual = planos[index]!;
  const novaInteracao: Interacao = {
    ...interacao,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };

  const atualizado: PlanoViagem = {
    ...atual,
    interacoes: [...(atual.interacoes ?? []), novaInteracao],
  };

  planos[index] = atualizado;
  window.localStorage.setItem(PLANOS_KEY, JSON.stringify(planos));
  window.dispatchEvent(new Event(PLANOS_ATUALIZADOS_EVENT));

  return atualizado;
}

export function responderSugestao(
  planoId: string,
  interacaoId: string,
  status: "aceita" | "recusada",
): PlanoViagem | null {
  const planos = readPlanos();
  const index = planos.findIndex((p) => p.id === planoId);
  if (index === -1) return null;

  const atual = planos[index]!;
  const atualizado: PlanoViagem = {
    ...atual,
    interacoes: (atual.interacoes ?? []).map((i) =>
      i.id === interacaoId ? { ...i, sugestaoStatus: status } : i,
    ),
  };

  planos[index] = atualizado;
  window.localStorage.setItem(PLANOS_KEY, JSON.stringify(planos));
  window.dispatchEvent(new Event(PLANOS_ATUALIZADOS_EVENT));

  return atualizado;
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
