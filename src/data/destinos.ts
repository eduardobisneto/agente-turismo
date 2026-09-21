import destinoBonitoImg from "@/assets/destino-bonito.jpeg";
import destinoSocorroImg from "@/assets/destino-socorro.jpeg";
import destinoBrotasImg from "@/assets/download.jpeg";
import destinoUbatubaImg from "@/assets/destino-ubatuba.jpeg";
import flutuacaoImg from "@/assets/flutuacao.jpeg";
import cachoeiraImg from "@/assets/cachoeira.jpeg";
import standUpPaddleImg from "@/assets/stand-up-paddle.jpeg";
import trilhaSetePraiasImg from "@/assets/trilha-sete-praias.jpeg";
import projetoTamarImg from "@/assets/projeto-tamar.jpeg";
import surfItamambucaImg from "@/assets/surf-itamambuca.jpeg";

export interface Atracao {
  nome: string;
  descricao: string;
  imagem: string;
  alt: string;
}

export interface NumeroDestino {
  valor: string;
  label: string;
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
  totalAtracoes?: number;
  historia: string[];
  numeros: NumeroDestino[];
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
      "Mobilidade ida e volta",
      "Estadia com café da manhã",
      "Passeios e experiências culturais do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Bonito, MS, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Porto da Ilha",
        descricao:
          "Point à beira do rio, ideal para passeio de barco e para curtir a paisagem com tranquilidade.",
        imagem: destinoBonitoImg,
        alt: "Foto ilustrativa do Porto da Ilha, em Bonito",
      },
      {
        nome: "Nascente Azul",
        descricao:
          "Nascente de águas azul-turquesa, ótima para flutuação e observação da vida aquática bem de perto.",
        imagem: flutuacaoImg,
        alt: "Foto ilustrativa de flutuação em nascente de águas cristalinas",
      },
      {
        nome: "Ceita Corê",
        descricao:
          "Parque com trilhas, cânions e piscinas naturais, ótima opção para quem gosta de caminhar em contato com a natureza.",
        imagem: destinoBonitoImg,
        alt: "Foto ilustrativa do parque Ceita Corê, em Bonito",
      },
      {
        nome: "Parque Ecológico",
        descricao:
          "Point sobre o Rio Formoso, no centro da cidade, ideal para observar peixes e relaxar em contato com a natureza.",
        imagem: destinoBonitoImg,
        alt: "Foto ilustrativa do Parque Ecológico do Rio Formoso, em Bonito",
      },
      {
        nome: "Balneário do Sol",
        descricao:
          "Balneário de água doce, ótimo para refrescar e passar o dia em família entre um passeio e outro.",
        imagem: destinoBonitoImg,
        alt: "Foto ilustrativa do Balneário do Sol, em Bonito",
      },
    ],
    totalAtracoes: 60,
    historia: [
      "Por décadas, Bonito foi só mais uma cidade agropecuária no interior do Mato Grosso do Sul, cercada pela Serra da Bodoquena, vivendo de gado e de uma agricultura tranquila — ninguém de fora parava por ali.",
      "Na virada dos anos 1990, moradores e pesquisadores perceberam o valor das águas cristalinas dos rios da região e criaram um modelo pioneiro de turismo controlado: número limitado de visitantes por atrativo, guia obrigatório em todos os passeios e fiscalização ambiental séria, para proteger o que tornaria a cidade famosa.",
      "O modelo deu tão certo que virou referência mundial de ecoturismo sustentável, citado como exemplo por organizações de turismo ao redor do planeta — hoje o mundo literalmente olha para esses rios.",
      "A cidade cresceu em torno do turismo: pousadas, agências, guias e famílias inteiras vivem da hospitalidade, mas sem perder o jeito interiorano — apesar da fama internacional, Bonito segue pequena, onde o visitante é recebido como convidado, não como número.",
    ],
    numeros: [
      { valor: "~22 mil", label: "habitantes" },
      { valor: "60+", label: "atrações turísticas" },
      { valor: "desde 1995", label: "turismo com visitação controlada" },
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
      "Mobilidade ida e volta",
      "Estadia com café da manhã",
      "Passeios e experiências culturais do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Socorro, SP, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Parque dos Sonhos",
        descricao:
          "Um dos maiores parques de aventura do Brasil, com tirolesa, rafting e escalada, além de trilhas com vista para o vale.",
        imagem: destinoSocorroImg,
        alt: "Foto ilustrativa do Parque dos Sonhos, em Socorro",
      },
      {
        nome: "Monjolinho",
        descricao:
          "Point com estrutura completa de esportes de aventura: escalada, rafting, arvorismo, caiaque e cachoeira, tudo em um só lugar.",
        imagem: destinoSocorroImg,
        alt: "Foto ilustrativa do Monjolinho, em Socorro",
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
    historia: [
      "Socorro nasceu no século 18 como povoado ligado à mineração e, mais tarde, à cultura do café, na região serrana ao norte de Campinas — por muito tempo, uma cidade tranquila do interior paulista, conhecida pelo clima ameno e a arquitetura colonial.",
      "Foi só nos anos 1990 que empreendedores locais começaram a explorar o relevo montanhoso e os rios da região para esportes como rapel, tirolesa e rafting, acompanhando o crescimento do turismo de aventura no Brasil.",
      "O investimento constante em infraestrutura — parques, trilhas, equipamentos — rendeu a Socorro o título de Capital Nacional do Turismo de Aventura, hoje parte da identidade da cidade.",
      "Boa parte da economia local gira em torno do turismo de aventura, com famílias que trabalham há gerações como monitores, guias e donos de pousada, mantendo viva a tradição de receber bem quem chega em busca de adrenalina.",
    ],
    numeros: [
      { valor: "~38 mil", label: "habitantes" },
      { valor: "4", label: "principais pontos de aventura" },
      { valor: "desde os anos 1990", label: "polo de turismo de aventura" },
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
      "Mobilidade ida e volta",
      "Estadia com café da manhã",
      "Passeios e experiências culturais do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Brotas, SP, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Parque de Aventuras e Ecoturismo",
        descricao:
          "Estrutura completa de esportes de aventura com rafting, bóia-cross, tirolesas e trilhas, reunindo boa parte do ecoturismo de Brotas em um só lugar.",
        imagem: destinoBrotasImg,
        alt: "Foto ilustrativa do Parque de Aventuras e Ecoturismo, em Brotas",
      },
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
    historia: [
      "Brotas surgiu no século 19 como cidade ligada à cultura do café e, mais tarde, à citricultura, no interior paulista — cortada pelo Rio Jacaré-Pepira, que décadas depois se tornaria o motivo de sua fama.",
      "Foi só nos anos 1990 que um grupo de moradores enxergou potencial nas corredeiras do rio para o rafting, então uma novidade no Brasil, com os primeiros passeios organizados de forma quase artesanal.",
      "O crescimento foi rápido: em poucos anos Brotas se tornou uma das principais referências de turismo de aventura do país, atraindo operadoras, investimentos e turistas de todo o Brasil em busca de rafting, bóia-cross e tirolesas.",
      "A cidade vive hoje essa transformação — de município agrícola tranquilo a point nacional de esportes de aventura — sem deixar de lado a vida simples do interior, onde ainda é possível conhecer pessoalmente quem fundou as primeiras operadoras de turismo da região.",
    ],
    numeros: [
      { valor: "~24 mil", label: "habitantes" },
      { valor: "4", label: "principais pontos de aventura" },
      { valor: "desde os anos 1990", label: "pioneira do rafting no Brasil" },
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
      "Mobilidade ida e volta",
      "Estadia com café da manhã",
      "Passeios e experiências culturais do roteiro",
      "Acompanhamento durante toda a viagem",
    ],
    mapsQuery: "Ubatuba, SP, Brasil",
    mapsZoom: 7,
    atracoes: [
      {
        nome: "Trilha das Sete Praias",
        descricao:
          "Trilha à beira-mar que liga sete praias diferentes, com mirantes ao longo do caminho — um dos programas mais conhecidos de Ubatuba para quem gosta de caminhar de praia em praia.",
        imagem: trilhaSetePraiasImg,
        alt: "Foto ilustrativa da Trilha das Sete Praias, em Ubatuba",
      },
      {
        nome: "Projeto Tamar",
        descricao:
          "Base de conservação de tartarugas marinhas aberta para visitação, com tanques e exposições educativas sobre a preservação das espécies que desovam no litoral de Ubatuba.",
        imagem: projetoTamarImg,
        alt: "Foto ilustrativa da região costeira próxima ao Projeto Tamar, em Ubatuba",
      },
      {
        nome: "Aulas de surfe em Itamambuca",
        descricao:
          "Itamambuca é uma das praias mais famosas do surfe brasileiro, com escolinhas de surfe para todos os níveis, de iniciantes a mais experientes.",
        imagem: surfItamambucaImg,
        alt: "Foto ilustrativa da praia de Itamambuca, em Ubatuba",
      },
    ],
    historia: [
      "Ubatuba fica no litoral norte de São Paulo, num trecho onde a Serra do Mar avança quase até o oceano, criando uma das maiores faixas contínuas de Mata Atlântica preservada do país, com mais de 100 praias entre costões rochosos e ilhas.",
      "Com o crescimento do turismo e a especulação imobiliária a partir das décadas de 1970 e 1980, parte da vegetação nativa ao redor das praias chegou a ser desmatada para loteamentos e casas de veraneio.",
      "A resposta veio com a criação e expansão do Parque Estadual da Serra do Mar, que hoje protege a maior parte do território de Ubatuba, limitando novas construções e permitindo que a mata voltasse a crescer em áreas antes degradadas.",
      "Hoje Ubatuba equilibra turismo e preservação: pescadores, caiçaras e famílias que vivem do mar dividem espaço com trilhas ecológicas e praias cercadas de mata fechada — um raro exemplo de litoral que cresceu sem perder a floresta.",
    ],
    numeros: [
      { valor: "100+", label: "praias" },
      { valor: "~93 mil", label: "habitantes" },
      { valor: "80%+", label: "do território em área de preservação" },
    ],
  },
];

export function getDestino(slug: string): Destino | undefined {
  return destinos.find((destino) => destino.slug === slug);
}
