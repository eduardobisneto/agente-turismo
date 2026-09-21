import destinoBonitoImg from "@/assets/destino-bonito.jpeg";
import destinoSocorroImg from "@/assets/destino-socorro.jpeg";
import destinoBrotasImg from "@/assets/download.jpeg";
import destinoUbatubaImg from "@/assets/destino-ubatuba.jpeg";

export interface DiaRoteiro {
  titulo: string;
  descricao: string;
}

export interface Destino {
  slug: string;
  nome: string;
  tagline: string;
  descricao: string;
  imagem: string;
  alt: string;
  duracao: string;
  grupo: string;
  roteiro: DiaRoteiro[];
  incluso: string[];
}

export const destinos: Destino[] = [
  {
    slug: "bonito",
    nome: "Bonito, MS",
    tagline: "Águas cristalinas e grutas",
    descricao:
      "Roteiro completo por flutuações em rios de águas transparentes, grutas e cachoeiras na capital brasileira do ecoturismo.",
    imagem: destinoBonitoImg,
    alt: "Rio de águas cristalinas cercado por vegetação em Bonito, MS",
    duracao: "4 dias / 3 noites",
    grupo: "Grupos de até 15 pessoas",
    roteiro: [
      {
        titulo: "Dia 1 — Chegada",
        descricao:
          "Chegada em Bonito, check-in na pousada e city tour de reconhecimento pelo centro da cidade.",
      },
      {
        titulo: "Dia 2 — Flutuação",
        descricao:
          "Flutuação em rio de águas cristalinas, com observação da vida aquática e almoço regional.",
      },
      {
        titulo: "Dia 3 — Gruta e cachoeira",
        descricao:
          "Visita a uma gruta com lago subterrâneo pela manhã e cachoeira com piscinas naturais à tarde.",
      },
      {
        titulo: "Dia 4 — Retorno",
        descricao: "Manhã livre para compras de artesanato e retorno.",
      },
    ],
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
  },
  {
    slug: "socorro",
    nome: "Socorro, SP",
    tagline: "A capital do turismo de aventura",
    descricao:
      "Trilhas, tirolesas, rafting e cachoeiras a poucas horas de São Paulo, com estrutura completa para todos os níveis de aventura.",
    imagem: destinoSocorroImg,
    alt: "Paisagem de montanhas e vegetação em Socorro, SP",
    duracao: "3 dias / 2 noites",
    grupo: "Grupos de até 20 pessoas",
    roteiro: [
      {
        titulo: "Dia 1 — Chegada",
        descricao:
          "Chegada em Socorro, check-in na pousada e trilha leve de reconhecimento da região.",
      },
      {
        titulo: "Dia 2 — Tirolesas e rafting",
        descricao:
          "Manhã de tirolesas com vista para o vale e tarde de rafting nas corredeiras do rio.",
      },
      {
        titulo: "Dia 3 — Cachoeira e retorno",
        descricao: "Visita a uma cachoeira pela manhã e retorno após o almoço.",
      },
    ],
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
  },
  {
    slug: "brotas",
    nome: "Brotas, SP",
    tagline: "Rios, cachoeiras e adrenalina",
    descricao:
      "Rafting, bóia-cross, tirolesas e cachoeiras em um dos points de esportes de aventura mais completos do interior paulista.",
    imagem: destinoBrotasImg,
    alt: "Foto ilustrativa do destino Brotas, SP",
    duracao: "3 dias / 2 noites",
    grupo: "Grupos de até 20 pessoas",
    roteiro: [
      {
        titulo: "Dia 1 — Chegada",
        descricao:
          "Chegada em Brotas, check-in na pousada e tarde de bóia-cross em corredeiras leves.",
      },
      {
        titulo: "Dia 2 — Rafting e tirolesas",
        descricao:
          "Manhã de rafting nas corredeiras do Rio Jacaré-Pepira e tarde de tirolesas.",
      },
      {
        titulo: "Dia 3 — Cachoeira e retorno",
        descricao: "Visita a uma cachoeira pela manhã e retorno após o almoço.",
      },
    ],
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
  },
  {
    slug: "ubatuba",
    nome: "Ubatuba, SP",
    tagline: "Praias e trilhas na Mata Atlântica",
    descricao:
      "Mais de 100 praias, trilhas na mata atlântica preservada e passeios de barco até ilhas e piscinas naturais no litoral norte de SP.",
    imagem: destinoUbatubaImg,
    alt: "Praia de areia clara cercada por mata atlântica e mar em Ubatuba, SP",
    duracao: "4 dias / 3 noites",
    grupo: "Grupos de até 15 pessoas",
    roteiro: [
      {
        titulo: "Dia 1 — Chegada",
        descricao:
          "Chegada em Ubatuba, check-in na pousada e tarde livre em uma das praias centrais.",
      },
      {
        titulo: "Dia 2 — Trilha e praias selvagens",
        descricao:
          "Trilha na mata atlântica com paradas em praias mais preservadas e menos movimentadas.",
      },
      {
        titulo: "Dia 3 — Passeio de barco",
        descricao:
          "Passeio de barco até ilhas próximas, com paradas para mergulho em piscinas naturais.",
      },
      {
        titulo: "Dia 4 — Retorno",
        descricao: "Manhã livre de praia e retorno após o almoço.",
      },
    ],
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
  },
];

export function getDestino(slug: string): Destino | undefined {
  return destinos.find((destino) => destino.slug === slug);
}
