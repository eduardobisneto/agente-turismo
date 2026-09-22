import type { ComponentType, SVGProps } from "react";
import { Cable, MountainSnow, Sailboat, TreePine } from "lucide-react";

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
