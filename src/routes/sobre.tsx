import { createFileRoute } from "@tanstack/react-router";
import { ChefHat, Landmark } from "lucide-react";

import { WhatsappButton } from "@/components/WhatsappButton";
import transporteImg from "@/assets/transporte.jpeg";
import hospedagemImg from "@/assets/hospedagem.jpeg";

const experienciasAdicionais = [
  {
    icon: ChefHat,
    titulo: "Experiências gastronômicas",
    descricao:
      "Do café da manhã reforçado aos jantares com pratos típicos de cada região, incluímos paradas gastronômicas que fazem parte da experiência — não só refeições no meio do caminho.",
  },
  {
    icon: Landmark,
    titulo: "Experiências culturais",
    descricao:
      "Visitas a mercados locais, artesanato regional e contato com a cultura de cada destino, para conhecer não só a paisagem, mas também a história e as pessoas de cada lugar.",
  },
];

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sobre nós
            </span>
            <h1 className="mt-3 text-balance text-3xl md:text-4xl">
              Organizamos aventuras desde a saída de casa até a volta
            </h1>
            <p className="mt-4 text-muted-foreground">
              A Aventura Organizada nasceu para tirar do papel viagens de
              turismo de aventura sem a dor de cabeça de planejar cada detalhe
              sozinho. Cuidamos de transporte, hospedagem, alimentação e
              ingressos, para que você só precise aproveitar a experiência —
              seja em grupo, com os amigos ou em família.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-100">
        <div className="container-tight grid gap-8 md:grid-cols-2 md:items-center">
          <img
            src={transporteImg}
            alt="Van de turismo pronta para levar o grupo até o destino"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
            loading="lazy"
          />
          <div>
            <h2 className="text-balance text-2xl md:text-3xl">
              Logística pensada para grupos, amigos e família
            </h2>
            <p className="mt-4 text-muted-foreground">
              Trabalhamos com transporte exclusivo, motoristas experientes e
              paradas estratégicas para que o trajeto seja tão bom quanto o
              destino — seja para o grupo da empresa, a turma de amigos ou a
              família toda.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-balance text-2xl md:text-3xl">
              Hospedagem próxima das atrações
            </h2>
            <p className="mt-4 text-muted-foreground">
              Selecionamos pousadas com conforto, café da manhã regional e
              localização estratégica para reduzir o deslocamento entre os
              passeios.
            </p>
          </div>
          <img
            src={hospedagemImg}
            alt="Pousada aconchegante em meio à natureza"
            className="order-1 aspect-[4/3] w-full rounded-2xl object-cover md:order-2"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-padding bg-sand-100">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Experiências
            </span>
            <h2 className="mt-3 text-balance text-3xl md:text-4xl">
              Mais do que aventura: gastronomia e cultura local
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada roteiro também inclui momentos para provar a culinária e
              conhecer a cultura de cada destino.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {experienciasAdicionais.map((item) => (
              <div
                key={item.titulo}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="mb-4 inline-flex rounded-xl bg-secondary p-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-forest-900 text-sand-50">
        <div className="container-tight flex flex-col items-center gap-6 text-center">
          <h2 className="text-balance text-3xl md:text-4xl">
            Vamos planejar a sua próxima viagem?
          </h2>
          <WhatsappButton variant="solid" />
        </div>
      </section>
    </>
  );
}
