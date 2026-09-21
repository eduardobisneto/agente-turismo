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

export interface Experiencia {
  slug: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  alt?: string;
  icon?: IconComponent;
}

export const experiencias: Experiencia[] = [
  {
    slug: "flutuacao",
    titulo: "Flutuação",
    descricao: "Nade em águas cristalinas e observe a vida aquática de perto.",
    imagem: flutuacaoImg,
    alt: "Pessoas fazendo flutuação em rio cristalino cercado por vegetação",
  },
  {
    slug: "trilhas",
    titulo: "Trilhas",
    descricao:
      "Caminhadas por trilhas entre montanhas e florestas preservadas.",
    imagem: trilhasImg,
    alt: "Grupo de pessoas caminhando em trilha na floresta",
  },
  {
    slug: "cachoeiras",
    titulo: "Cachoeiras",
    descricao: "Visite cachoeiras deslumbrantes com piscinas naturais.",
    imagem: cachoeiraImg,
    alt: "Mulher admirando cachoeira em piscina natural",
  },
  {
    slug: "stand-up-paddle",
    titulo: "Stand Up Paddle",
    descricao: "Reme sobre águas tranquilas em meio à natureza exuberante.",
    imagem: standUpPaddleImg,
    alt: "Mulher fazendo stand up paddle em rio de água cristalina",
  },
  {
    slug: "praias",
    titulo: "Praias",
    descricao: "Relaxe em praias de areia clara e mar convidativo.",
    imagem: destinoUbatubaImg,
    alt: "Praia de areia clara cercada por mata atlântica",
  },
  {
    slug: "aulas-de-surf",
    titulo: "Aulas de Surf",
    descricao:
      "Aprenda a surfar com instrutores em praias com ondas para todos os níveis.",
    imagem: surfItamambucaImg,
    alt: "Foto ilustrativa de praia com ondas para o surfe",
  },
  {
    slug: "rafting",
    titulo: "Rafting",
    descricao:
      "Desça corredeiras em botes infláveis com muita adrenalina em equipe.",
    imagem: raftingImg,
    alt: "Foto ilustrativa de rafting em corredeiras",
  },
  {
    slug: "tirolesa",
    titulo: "Tirolesa",
    descricao: "Deslize por tirolesas com vista para o vale e o horizonte.",
    icon: Cable,
  },
  {
    slug: "arvorismo",
    titulo: "Arvorismo",
    descricao:
      "Percursos suspensos entre as árvores, com tirolesas e obstáculos.",
    icon: TreePine,
  },
  {
    slug: "caiaque",
    titulo: "Caiaque",
    descricao: "Reme por rios e lagos em ritmo próprio, sozinho ou em dupla.",
    icon: Sailboat,
  },
  {
    slug: "escalada",
    titulo: "Escalada",
    descricao:
      "Escale paredões naturais com equipamento e monitores especializados.",
    icon: MountainSnow,
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
