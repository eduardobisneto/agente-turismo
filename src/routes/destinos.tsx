import { createFileRoute } from "@tanstack/react-router";

import { DestinoCard } from "@/components/DestinoCard";
import destinoBonitoImg from "@/assets/destino-bonito.jpeg";
import destinoSocorroImg from "@/assets/destino-socorro.jpeg";
import destinoBrotasImg from "@/assets/download.jpeg";
import destinoUbatubaImg from "@/assets/destino-ubatuba.jpeg";

export const Route = createFileRoute("/destinos")({
  component: DestinosPage,
});

const destinos = [
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
  },
];

function DestinosPage() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Destinos
          </span>
          <h1 className="mt-3 text-balance text-3xl md:text-4xl">
            Para onde vamos na próxima aventura?
          </h1>
          <p className="mt-4 text-muted-foreground">
            Cada destino tem um roteiro montado com transporte, hospedagem,
            alimentação e ingressos inclusos.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {destinos.map((destino) => (
            <div key={destino.slug} id={destino.slug}>
              <DestinoCard {...destino} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
