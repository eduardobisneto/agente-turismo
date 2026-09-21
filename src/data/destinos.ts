import destinoBonitoImg from "@/assets/destino-bonito.jpeg";
import destinoSocorroImg from "@/assets/destino-socorro.jpeg";
import destinoBrotasImg from "@/assets/download.jpeg";
import destinoUbatubaImg from "@/assets/destino-ubatuba.jpeg";
import flutuacaoImg from "@/assets/flutuacao.jpeg";
import cachoeiraImg from "@/assets/cachoeira.jpeg";
import trilhasImg from "@/assets/trilhas.jpeg";
import standUpPaddleImg from "@/assets/stand-up-paddle.jpeg";

export interface Atracao {
  nome: string;
  descricao: string;
  imagem: string;
  alt: string;
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
  incluso: string[];
  mapsQuery: string;
  mapsZoom: number;
  atracoes: Atracao[];
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
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Bonito, MS, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Gruta do Lago Azul",
        descricao:
          "Uma das grutas mais famosas do Brasil, com um lago subterrâneo de águas azul-turquesa a dezenas de metros de profundidade.",
        imagem: destinoBonitoImg,
        alt: "Foto ilustrativa da Gruta do Lago Azul, em Bonito",
      },
      {
        nome: "Rio da Prata",
        descricao:
          "Flutuação em um dos rios mais transparentes do mundo, com visibilidade que permite observar cardumes de peixes bem de perto.",
        imagem: flutuacaoImg,
        alt: "Foto ilustrativa de flutuação em rio de águas cristalinas",
      },
      {
        nome: "Balneário Municipal",
        descricao:
          "Ponto de banho de água doce dentro da cidade, ideal para relaxar entre um passeio e outro.",
        imagem: destinoBonitoImg,
        alt: "Foto ilustrativa do Balneário Municipal de Bonito",
      },
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
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Socorro, SP, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Parque dos Sonhos",
        descricao:
          "Um dos maiores parques de aventura do Brasil, com tirolesas, quadriciclo e trilhas com vista para o vale.",
        imagem: destinoSocorroImg,
        alt: "Foto ilustrativa do Parque dos Sonhos, em Socorro",
      },
      {
        nome: "Cachoeira do Paraíso",
        descricao:
          "Cachoeira com piscina natural cercada de mata, ótima para refrescar depois de um dia de trilhas.",
        imagem: cachoeiraImg,
        alt: "Foto ilustrativa de cachoeira com piscina natural",
      },
      {
        nome: "Lago dos Espelhos",
        descricao:
          "Represa que vira praia de água doce na cidade, com areia e estrutura para passar o dia em família.",
        imagem: destinoSocorroImg,
        alt: "Foto ilustrativa do Lago dos Espelhos, em Socorro",
      },
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
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Brotas, SP, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Rio Jacaré-Pepira",
        descricao:
          "Palco do rafting e do bóia-cross que colocaram Brotas no mapa dos esportes de aventura no Brasil.",
        imagem: standUpPaddleImg,
        alt: "Foto ilustrativa de esporte de aventura em rio",
      },
      {
        nome: "Cachoeira Véu da Noiva",
        descricao:
          "Queda d'água cercada de mata fechada, com trilha de acesso e poço para banho.",
        imagem: cachoeiraImg,
        alt: "Foto ilustrativa da Cachoeira Véu da Noiva, em Brotas",
      },
      {
        nome: "Balneário Municipal",
        descricao:
          "Área de lazer às margens do rio, com estrutura para famílias e grupos passarem o dia.",
        imagem: destinoBrotasImg,
        alt: "Foto ilustrativa do Balneário Municipal de Brotas",
      },
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
    incluso: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios e ingressos do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Ubatuba, SP, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Praia do Félix",
        descricao:
          "Uma das praias mais conhecidas de Ubatuba, com boas ondas para o surfe e cercada por mata preservada.",
        imagem: destinoUbatubaImg,
        alt: "Foto ilustrativa de praia cercada por mata atlântica em Ubatuba",
      },
      {
        nome: "Ilha Anchieta",
        descricao:
          "Ilha com trilhas, praias desertas e as ruínas de um antigo presídio, acessível por passeio de barco.",
        imagem: destinoUbatubaImg,
        alt: "Foto ilustrativa de ilha com mata preservada em Ubatuba",
      },
      {
        nome: "Trilha da Praia da Fazenda",
        descricao:
          "Trilha dentro do Parque Estadual da Serra do Mar, terminando em uma das praias mais preservadas da região.",
        imagem: trilhasImg,
        alt: "Foto ilustrativa de trilha na Mata Atlântica",
      },
    ],
  },
];

export function getDestino(slug: string): Destino | undefined {
  return destinos.find((destino) => destino.slug === slug);
}
