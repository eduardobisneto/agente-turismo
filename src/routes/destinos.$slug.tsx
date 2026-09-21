import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, Users } from "lucide-react";

import { WhatsappButton } from "@/components/WhatsappButton";
import { getDestino } from "@/data/destinos";

export const Route = createFileRoute("/destinos/$slug")({
  loader: ({ params }) => {
    const destino = getDestino(params.slug);
    if (!destino) throw notFound();
    return destino;
  },
  component: DestinoRoteiroPage,
});

function DestinoRoteiroPage() {
  const destino = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destino.imagem}
            alt={destino.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/50 to-forest-900/30" />
        </div>

        <div className="container-tight relative flex min-h-[40vh] flex-col justify-end gap-4 py-16 text-sand-50">
          <Link
            to="/destinos"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-sand-50/90 transition-colors hover:text-sand-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para destinos
          </Link>
          <h1 className="text-balance text-4xl md:text-5xl">{destino.nome}</h1>
          <p className="text-lg text-forest-100">{destino.tagline}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-muted-foreground">{destino.descricao}</p>

            <h2 className="mt-10 text-balance text-2xl md:text-3xl">Roteiro</h2>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {destino.roteiro.map((dia) => (
                <li key={dia.titulo} className="relative">
                  <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                  <h3 className="font-display text-lg">{dia.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {dia.descricao}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-3 text-xs font-medium text-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {destino.duracao}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                {destino.grupo}
              </span>
            </div>

            <h3 className="mt-6 font-display text-lg">O que está incluso</h3>
            <ul className="mt-3 space-y-2">
              {destino.incluso.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <WhatsappButton variant="solid" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
