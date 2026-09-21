import { createFileRoute } from "@tanstack/react-router";

import { DestinoCard } from "@/components/DestinoCard";
import { destinos } from "@/data/destinos";

export const Route = createFileRoute("/destinos")({
  component: DestinosPage,
});

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
            <DestinoCard key={destino.slug} {...destino} />
          ))}
        </div>
      </div>
    </section>
  );
}
