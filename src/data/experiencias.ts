import type { ComponentType, SVGProps } from "react";
import {
  ArrowDownToLine,
  Cable,
  Flashlight,
  Gauge,
  MountainSnow,
  PawPrint,
  Sailboat,
  Target,
  TreePine,
} from "lucide-react";

import flutuacaoImg from "@/assets/flutuacao.jpeg";
import trilhasImg from "@/assets/trilhas.jpeg";
import cachoeiraImg from "@/assets/cachoeira.jpeg";
import standUpPaddleImg from "@/assets/stand-up-paddle.jpeg";
import destinoUbatubaImg from "@/assets/destino-ubatuba.jpeg";
import surfItamambucaImg from "@/assets/surf-itamambuca.jpeg";
import raftingImg from "@/assets/download.jpeg";

import { destinos } from "./destinos";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface ContextoExperiencia {
  opcoesTitulo: string;
  opcoes: string[];
  beneficios: string[];
  melhorEpoca: string;
  publico: string;
  /** Selos curtos para os cards: nível, faixa etária e melhor época resumida. */
  nivel: string;
  faixaEtaria: string;
  epocaResumo: string;
  /** Considerações sobre segurança, leis e normas, quando a atividade for regulamentada. */
  seguranca?: string;
}

export interface Experiencia {
  slug: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  alt?: string;
  icon?: IconComponent;
  contexto: ContextoExperiencia;
}

export const experiencias: Experiencia[] = [
  {
    slug: "flutuacao",
    titulo: "Flutuação",
    descricao: "Nade em águas cristalinas e observe a vida aquática de perto.",
    imagem: flutuacaoImg,
    alt: "Pessoas fazendo flutuação em rio cristalino cercado por vegetação",
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: [
        "Iniciante — não precisa saber nadar bem",
        "Toda a família — a partir de 6 anos",
      ],
      beneficios: [
        "Atividade de baixo impacto, ideal para relaxar",
        "Contato próximo com a vida aquática",
        "Boa opção para quem tem pouca experiência em esportes aquáticos",
      ],
      melhorEpoca:
        "Abril a outubro, quando as águas costumam ficar mais claras e o volume de chuva é menor.",
      publico:
        "Costuma ser liberada para crianças a partir de 6 anos, sempre acompanhadas por um adulto e usando colete salva-vidas. Como a correnteza e a profundidade variam de um rio para outro, a idade mínima e as regras de segurança são definidas pelo operador local no dia da atividade.",
      nivel: "Iniciante",
      faixaEtaria: "A partir de 6 anos",
      epocaResumo: "Abril a outubro",
    },
  },
  {
    slug: "trilhas",
    titulo: "Trilhas",
    descricao:
      "Caminhadas por trilhas entre montanhas e florestas preservadas.",
    imagem: trilhasImg,
    alt: "Grupo de pessoas caminhando em trilha na floresta",
    contexto: {
      opcoesTitulo: "Distâncias",
      opcoes: [
        "Trilhas curtas — até 3 km",
        "Trilhas médias — cerca de 5 km",
        "Trilhas longas — 10 km ou mais",
      ],
      beneficios: [
        "Melhora o condicionamento físico",
        "Reduz o estresse com contato direto com a natureza",
        "Pode ser adaptada para praticamente qualquer nível de preparo físico",
      ],
      melhorEpoca:
        "Abril a setembro, no período mais seco, com trilhas menos escorregadias.",
      publico:
        "Trilhas curtas e planas costumam ser tranquilas para crianças a partir de 5 anos, sempre acompanhadas. Trilhas médias e longas exigem mais fôlego e equilíbrio, então costumam ser recomendadas a partir da pré-adolescência — o guia local ajusta o ritmo conforme o grupo.",
      nivel: "Fácil a moderado",
      faixaEtaria: "A partir de 5 anos",
      epocaResumo: "Abril a setembro",
    },
  },
  {
    slug: "cachoeiras",
    titulo: "Cachoeiras",
    descricao: "Visite cachoeiras deslumbrantes com piscinas naturais.",
    imagem: cachoeiraImg,
    alt: "Mulher admirando cachoeira em piscina natural",
    contexto: {
      opcoesTitulo: "Acesso",
      opcoes: [
        "Acesso fácil — poucos minutos a pé",
        "Acesso moderado — trilha mais longa até a queda",
      ],
      beneficios: [
        "Momento de relaxamento e contato com a água",
        "Boa pausa refrescante entre outras atividades",
        "Cenário natural para fotos e memórias em família",
      ],
      melhorEpoca:
        "Disponível o ano todo, com volume de água geralmente maior de outubro a março.",
      publico:
        "Cachoeiras com acesso fácil e piscina natural calma costumam ser boas para crianças pequenas, sempre com supervisão de um adulto perto da água. Quedas com acesso mais longo, pedras escorregadias ou correnteza mais forte pedem mais atenção e costumam ser indicadas para crianças maiores ou adultos.",
      nivel: "Fácil a moderado",
      faixaEtaria: "Todas as idades",
      epocaResumo: "O ano todo",
    },
  },
  {
    slug: "stand-up-paddle",
    titulo: "Stand Up Paddle",
    descricao: "Reme sobre águas tranquilas em meio à natureza exuberante.",
    imagem: standUpPaddleImg,
    alt: "Mulher fazendo stand up paddle em rio de água cristalina",
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: [
        "Iniciante — águas calmas e paradas",
        "Intermediário — trechos com correnteza leve",
      ],
      beneficios: [
        "Trabalha equilíbrio e o corpo todo",
        "Atividade tranquila, boa para iniciantes",
        "Pode ser feita sozinho ou em grupo, no próprio ritmo",
      ],
      melhorEpoca: "Abril a outubro, com águas mais calmas e claras.",
      publico:
        "Em águas calmas, costuma ser liberado a partir dos 8 anos, sempre com colete salva-vidas e por perto de um adulto ou instrutor. Crianças menores podem experimentar em dupla com um adulto na mesma prancha, dependendo da avaliação do instrutor no local.",
      nivel: "Iniciante",
      faixaEtaria: "A partir de 8 anos",
      epocaResumo: "Abril a outubro",
    },
  },
  {
    slug: "praias",
    titulo: "Praias",
    descricao: "Relaxe em praias de areia clara e mar convidativo.",
    imagem: destinoUbatubaImg,
    alt: "Praia de areia clara cercada por mata atlântica",
    contexto: {
      opcoesTitulo: "Tipos",
      opcoes: [
        "Praias tranquilas — águas calmas, boas para crianças",
        "Praias com ondas — melhores para quem curte mar mais agitado",
      ],
      beneficios: [
        "Momento de descanso e lazer em família",
        "Contato com a natureza preservada",
        "Opções para todos os perfis, do mais tranquilo ao mais aventureiro",
      ],
      melhorEpoca:
        "Dezembro a março, no verão, com o mar mais quente — mas vale a visita o ano todo.",
      publico:
        "Praias de mar calmo são adequadas para qualquer idade, inclusive bebês e crianças pequenas, sempre com supervisão de um adulto. Praias com ondas mais fortes ou correnteza pedem atenção redobrada com crianças e nadadores menos experientes.",
      nivel: "Fácil",
      faixaEtaria: "Todas as idades",
      epocaResumo: "Dezembro a março",
    },
  },
  {
    slug: "aulas-de-surf",
    titulo: "Aulas de Surf",
    descricao:
      "Aprenda a surfar com instrutores em praias com ondas para todos os níveis.",
    imagem: surfItamambucaImg,
    alt: "Foto ilustrativa de praia com ondas para o surfe",
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: ["Iniciante", "Intermediário", "Avançado"],
      beneficios: [
        "Desenvolve equilíbrio, força e resistência",
        "Contato direto com o mar, com acompanhamento de instrutor",
        "Pode ser praticado desde a infância",
      ],
      melhorEpoca:
        "Ano todo em Itamambuca, com mais gente na água durante o verão.",
      publico:
        "Escolinhas de surfe costumam aceitar crianças a partir de 7 ou 8 anos, com pranchas maiores e ondas mais suaves adequadas ao nível de cada aluno. A idade mínima e o formato da aula variam conforme a escolinha e as condições do mar no dia.",
      nivel: "Iniciante a avançado",
      faixaEtaria: "A partir de 7 anos",
      epocaResumo: "O ano todo",
    },
  },
  {
    slug: "rafting",
    titulo: "Rafting",
    descricao:
      "Desça corredeiras em botes infláveis com muita adrenalina em equipe.",
    imagem: raftingImg,
    alt: "Foto ilustrativa de rafting em corredeiras",
    contexto: {
      opcoesTitulo: "Intensidade",
      opcoes: [
        "Corredeiras leves — ótimo para grupos e famílias",
        "Corredeiras mais intensas — para quem já tem experiência",
      ],
      beneficios: [
        "Muita adrenalina em equipe",
        "Trabalha comunicação e confiança no grupo",
        "Opções de intensidade para diferentes perfis",
      ],
      melhorEpoca:
        "Outubro a março, quando o volume de água dos rios costuma ser maior.",
      publico:
        "A maioria dos operadores libera o rafting a partir dos 12 anos em trechos mais tranquilos, exigindo que o participante saiba nadar. Em corredeiras mais intensas a idade mínima costuma ser maior — cada operador define seus próprios critérios de segurança conforme o rio e o volume de água no dia.",
      nivel: "Leve a intenso",
      faixaEtaria: "A partir de 12 anos",
      epocaResumo: "Outubro a março",
    },
  },
  {
    slug: "tirolesa",
    titulo: "Tirolesa",
    descricao: "Deslize por tirolesas com vista para o vale e o horizonte.",
    icon: Cable,
    contexto: {
      opcoesTitulo: "Idade e requisitos",
      opcoes: [
        "Geralmente a partir de 8 anos (varia por local)",
        "Peso e altura mínimos exigidos por segurança",
      ],
      beneficios: [
        "Adrenalina rápida, sem exigir preparo físico especial",
        "Vista privilegiada da paisagem",
        "Ótima primeira experiência de aventura para quem nunca fez nada parecido",
      ],
      melhorEpoca:
        "Ano todo — dias mais secos deixam a experiência ainda mais confortável.",
      publico:
        "Costuma ser liberada a partir dos 8 anos, respeitando peso e altura mínimos definidos pelo equipamento de cada parque — por isso a idade exata varia de um local para outro. Vale confirmar os limites de peso e altura antes de reservar, especialmente para crianças e para pessoas com estatura fora da média.",
      nivel: "Fácil",
      faixaEtaria: "A partir de 8 anos",
      epocaResumo: "O ano todo",
    },
  },
  {
    slug: "arvorismo",
    titulo: "Arvorismo",
    descricao:
      "Percursos suspensos entre as árvores, com tirolesas e obstáculos.",
    icon: TreePine,
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: ["Iniciante", "Intermediário", "Avançado"],
      beneficios: [
        "Desenvolve equilíbrio e confiança",
        "Percurso progressivo, começa fácil e vai aumentando o desafio",
        "Boa forma de introduzir crianças e adolescentes à aventura, com segurança",
      ],
      melhorEpoca: "Abril a setembro, no período mais seco.",
      publico:
        "Muitos parques têm um circuito baixo e mais simples liberado a partir dos 4 ou 5 anos, e circuitos mais altos e desafiadores recomendados a partir dos 10-12 anos. A altura mínima exigida pelo equipamento de segurança costuma pesar mais do que a idade na hora de definir quem pode subir em cada circuito.",
      nivel: "Iniciante a avançado",
      faixaEtaria: "A partir de 4 anos",
      epocaResumo: "Abril a setembro",
    },
  },
  {
    slug: "caiaque",
    titulo: "Caiaque",
    descricao: "Reme por rios e lagos em ritmo próprio, sozinho ou em dupla.",
    icon: Sailboat,
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: [
        "Iniciante — águas paradas",
        "Intermediário — trechos com correnteza",
      ],
      beneficios: [
        "Trabalha braços, core e resistência",
        "Atividade tranquila, no próprio ritmo",
        "Pode ser feita sozinho, em dupla ou em grupo",
      ],
      melhorEpoca: "Abril a outubro, com águas mais calmas.",
      publico:
        "Em águas calmas, crianças costumam remar acompanhadas em caiaque duplo a partir dos 6-7 anos, sempre com colete salva-vidas. Remar sozinho em caiaque simples costuma ser liberado a partir da pré-adolescência, dependendo da avaliação do instrutor no dia.",
      nivel: "Iniciante a intermediário",
      faixaEtaria: "A partir de 6 anos",
      epocaResumo: "Abril a outubro",
    },
  },
  {
    slug: "escalada",
    titulo: "Escalada",
    descricao:
      "Escale paredões naturais com equipamento e monitores especializados.",
    icon: MountainSnow,
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: ["Iniciante", "Intermediário", "Avançado"],
      beneficios: [
        "Trabalha força, equilíbrio e concentração",
        "Sensação de superação a cada etapa vencida",
        "Sempre com equipamento e monitores especializados, em qualquer nível",
      ],
      melhorEpoca:
        "Abril a setembro, no período mais seco, com rochas menos escorregadias.",
      publico:
        "Vias de iniciação com equipamento apropriado costumam aceitar crianças a partir dos 6-7 anos, sempre com monitor. Escaladas em rocha natural mais técnicas exigem mais força e são recomendadas a partir da adolescência.",
      nivel: "Iniciante a avançado",
      faixaEtaria: "A partir de 6 anos",
      epocaResumo: "Abril a setembro",
    },
  },
  {
    slug: "grutas",
    titulo: "Grutas e Cavernas",
    descricao:
      "Explore grutas e cavernas com guias especializados, iluminação própria e equipamento de segurança.",
    icon: Flashlight,
    contexto: {
      opcoesTitulo: "Níveis",
      opcoes: [
        "Visitação turística — trajeto com passarelas e iluminação",
        "Espeleologia leve — trechos sem estrutura, com guia e equipamento",
      ],
      beneficios: [
        "Contato com formações geológicas únicas, criadas ao longo de milhares de anos",
        "Atividade de baixo esforço físico na visitação turística guiada",
        "Desperta curiosidade sobre geologia, história natural e conservação",
      ],
      melhorEpoca:
        "Abril a setembro, no período mais seco, quando o nível dos rios subterrâneos costuma ser menor e o acesso fica mais confortável.",
      publico:
        "Grutas com trajeto turístico e passarelas costumam ser adequadas para crianças a partir de 6-7 anos, sempre acompanhadas. Trechos de espeleologia sem estrutura, com escadas ou passagens mais estreitas, costumam ser recomendados a partir da adolescência, dependendo da caverna e da avaliação do guia.",
      nivel: "Fácil a moderado",
      faixaEtaria: "A partir de 6 anos",
      epocaResumo: "Abril a setembro",
      seguranca:
        "No Brasil, cavernas naturais são patrimônio protegido por lei federal: o acesso costuma depender de autorização do órgão gestor da unidade de conservação (como o ICMBio, em áreas federais) e de acompanhamento de guias credenciados. É proibido remover formações ou tocar em paredes com sedimentos frágeis, e o uso de capacete com iluminação própria costuma ser obrigatório durante toda a visitação.",
    },
  },
  {
    slug: "rapel",
    titulo: "Rapel",
    descricao:
      "Desça paredões e cachoeiras com corda, sob supervisão de monitores certificados.",
    icon: ArrowDownToLine,
    contexto: {
      opcoesTitulo: "Alturas",
      opcoes: [
        "Rapel seco — paredão rochoso, sem água",
        "Rapel em cachoeira — descida ao lado ou dentro da queda d'água",
      ],
      beneficios: [
        "Trabalha controle emocional e confiança em si mesmo",
        "Adrenalina forte, com sistema de segurança duplo o tempo todo",
        "Sensação única de vencer o medo de altura, degrau por degrau",
      ],
      melhorEpoca:
        "Abril a setembro, no período mais seco, quando as rochas ficam menos escorregadias e o volume de água das cachoeiras é menor.",
      publico:
        "Costuma ser liberado a partir dos 10-12 anos, dependendo do peso mínimo exigido pelo equipamento e da altura do paredão. Crianças menores só costumam participar em paredões baixos e com adaptações específicas definidas pelo operador.",
      nivel: "Iniciante a avançado",
      faixaEtaria: "A partir de 10 anos",
      epocaResumo: "Abril a setembro",
      seguranca:
        "No Brasil, empresas de turismo de aventura costumam seguir normas técnicas da ABNT voltadas para atividades como o rapel, com exigências de equipamentos certificados (corda, mosquetões, capacete), sistema de segurança duplo e monitores treinados. Vale sempre confirmar se o operador segue essas normas e mantém os certificados de segurança em dia antes de contratar o passeio.",
    },
  },
  {
    slug: "cavalgada",
    titulo: "Cavalgada",
    descricao:
      "Passeios a cavalo por trilhas e paisagens naturais, com cavalos preparados e guias experientes.",
    icon: PawPrint,
    contexto: {
      opcoesTitulo: "Duração",
      opcoes: [
        "Passeio curto — cerca de 1 hora, ideal para iniciantes",
        "Cavalgada longa — meio período ou dia inteiro, para quem já tem prática",
      ],
      beneficios: [
        "Contato com os animais e com a paisagem em ritmo tranquilo",
        "Não exige preparo físico especial para passeios curtos",
        "Boa opção para quem busca uma atividade mais serena ao ar livre",
      ],
      melhorEpoca:
        "Abril a setembro, no período mais seco, quando as trilhas ficam menos lamacentas.",
      publico:
        "Passeios curtos e guiados costumam ser liberados para crianças a partir de 6-7 anos, sempre em cavalos calmos e com um guia por perto. Cavalgadas mais longas exigem mais equilíbrio e resistência, sendo recomendadas a partir da pré-adolescência.",
      nivel: "Iniciante a intermediário",
      faixaEtaria: "A partir de 6 anos",
      epocaResumo: "Abril a setembro",
      seguranca:
        "É importante usar capacete de equitação (costuma ser fornecido pelo operador) e calçado fechado, além de seguir sempre as instruções do guia sobre como montar e conduzir o animal. Cavalos usados em passeios turísticos costumam ser selecionados pelo temperamento calmo, mas o contato com animais sempre exige atenção redobrada com crianças.",
    },
  },
  {
    slug: "quadriciclo",
    titulo: "Quadriciclo",
    descricao:
      "Trilhas motorizadas de quadriciclo por estradas de terra e cenários naturais, com instrução antes de sair.",
    icon: Gauge,
    contexto: {
      opcoesTitulo: "Modalidade",
      opcoes: [
        "Quadriciclo individual — cada participante dirige o seu",
        "Quadriciclo em dupla — um adulto dirige, o outro anda como carona",
      ],
      beneficios: [
        "Adrenalina de dirigir em trilha, sem precisar de habilitação de carro",
        "Passeio dinâmico, bom para quem gosta de motor e velocidade moderada",
        "Costuma incluir paradas em pontos com vista ao longo do trajeto",
      ],
      melhorEpoca:
        "Abril a setembro, no período mais seco, quando as estradas de terra ficam menos escorregadias.",
      publico:
        "Dirigir o próprio quadriciclo costuma exigir idade mínima de 16 a 18 anos, dependendo do operador e do modelo do veículo. Crianças menores costumam poder participar apenas como carona, sentadas atrás de um adulto responsável.",
      nivel: "Iniciante a intermediário",
      faixaEtaria: "A partir de 16 anos para dirigir",
      epocaResumo: "Abril a setembro",
      seguranca:
        "O uso de capacete é obrigatório durante todo o passeio, e a maioria dos operadores faz um briefing de segurança antes da saída, com instruções sobre o veículo e o percurso. Vale confirmar se o operador exige habilitação ou permissão específica para dirigir, já que as regras variam de local para local.",
    },
  },
  {
    slug: "paintball",
    titulo: "Paintball",
    descricao:
      "Partidas em equipe com marcadores de tinta, em arena ao ar livre com obstáculos.",
    icon: Target,
    contexto: {
      opcoesTitulo: "Formatos",
      opcoes: [
        "Partidas rápidas — boas para grupos grandes se revezarem",
        "Torneio em equipe — para grupos que querem competir entre si",
      ],
      beneficios: [
        "Trabalha estratégia, trabalho em equipe e comunicação",
        "Libera adrenalina em um ambiente controlado e seguro",
        "Ótimo programa para grupos de amigos ou eventos corporativos",
      ],
      melhorEpoca:
        "O ano todo, já que costuma ser praticado em arenas com pouca dependência do clima.",
      publico:
        "Costuma ser liberado a partir dos 10-12 anos, com marcadores de menor impacto para os participantes mais jovens em alguns operadores. Vale confirmar a idade mínima e se há opção de equipamento de menor potência para crianças e pré-adolescentes.",
      nivel: "Iniciante a avançado",
      faixaEtaria: "A partir de 10 anos",
      epocaResumo: "O ano todo",
      seguranca:
        "O uso de máscara de proteção facial é obrigatório durante toda a partida, sem exceção, e os marcadores costumam ter a velocidade limitada por normas de segurança do operador. É importante seguir sempre as instruções do monitor sobre as áreas seguras e nunca remover a máscara dentro da arena.",
    },
  },
];

export function getExperiencia(slug: string): Experiencia | undefined {
  return experiencias.find((experiencia) => experiencia.slug === slug);
}

export interface DestinoComExperiencia {
  destinoSlug: string;
  destinoNome: string;
  atracaoNome: string;
  descricao: string;
  imagem: string;
  alt: string;
}

export function getDestinosPorExperiencia(
  slug: string,
): DestinoComExperiencia[] {
  const resultado: DestinoComExperiencia[] = [];

  for (const destino of destinos) {
    for (const atracao of destino.atracoes) {
      if (atracao.experiencias?.includes(slug)) {
        resultado.push({
          destinoSlug: destino.slug,
          destinoNome: destino.nome,
          atracaoNome: atracao.nome,
          descricao: atracao.descricao,
          imagem: atracao.imagem,
          alt: atracao.alt,
        });
      }
    }
  }

  return resultado;
}

export function getExperienciasPorDestino(destinoSlug: string): Experiencia[] {
  const destino = destinos.find((d) => d.slug === destinoSlug);
  if (!destino) return [];

  const slugs = new Set<string>();
  for (const atracao of destino.atracoes) {
    for (const expSlug of atracao.experiencias ?? []) {
      slugs.add(expSlug);
    }
  }

  return experiencias.filter((experiencia) => slugs.has(experiencia.slug));
}
