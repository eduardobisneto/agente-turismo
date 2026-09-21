import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { WhatsappButton } from "@/components/WhatsappButton";
import { getExperiencia, getDestinosPorExperiencia } from "@/data/experiencias";

export const Route = createFileRoute("/experiencias/$slug")({
  loader: ({ params }) => {
    const experiencia = getExperiencia(params.slug);
    if (!experiencia) throw notFound();
    return {
      experiencia,
      destinos: getDestinosPorExperiencia(params.slug),
    };
  },
  component: ExperienciaPage,
});

function ExperienciaPage() {
  const { experiencia, destinos } = Route.useLoaderData();
  const Icon = experiencia.icon;

  return (
    <>
      <section className="relative overflow-hidden">
        {experiencia.imagem ? (
          <div className="absolute inset-0">
            <img
              src={experiencia.imagem}
              alt={experiencia.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/50 to-forest-900/30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-forest-800" />
        )}

        <div className="container-tight relative flex min-h-[35vh] flex-col justify-end gap-4 py-16 text-sand-50">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-sand-50/90 transition-colors hover:text-sand-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a home
          </Link>
          {Icon && <Icon className="h-10 w-10 text-forest-300" />}
          <h1 className="text-balance text-4xl md:text-5xl">
            {experiencia.titulo}
          </h1>
          <p className="max-w-xl text-lg text-forest-100">
            {experiencia.descricao}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Onde viver essa experiência
            </span>
            <h2 className="mt-3 text-balance text-3xl md:text-4xl">
              Destinos com {experiencia.titulo.toLowerCase()}
            </h2>
          </div>

          {destinos.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {destinos.map((item) => (
                <Link
                  key={`${item.destinoSlug}-${item.atracaoNome}`}
                  to="/destinos/$slug"
                  params={{ slug: item.destinoSlug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imagem}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-800/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sand-50 backdrop-blur-sm">
                        <MapPin className="h-3 w-3" />
                        {item.destinoNome}
                      </span>
                      <h3 className="mt-2 font-display text-xl text-sand-50">
                        {item.atracaoNome}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.descricao}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary transition-colors group-hover:text-primary/80">
                      Ver roteiro de {item.destinoNome.split(",")[0]}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mx-auto mt-8 max-w-xl text-balance text-center text-muted-foreground">
              Ainda não temos um roteiro publicado com {experiencia.titulo} como
              destaque — fale com a gente pelo WhatsApp que a gente ajuda a
              encaixar essa experiência na sua viagem.
            </p>
          )}
        </div>
      </section>

      <section className="section-padding bg-forest-900 text-sand-50">
        <div className="container-tight flex flex-col items-center gap-6 text-center">
          <h2 className="text-balance text-3xl md:text-4xl">
            Vamos incluir {experiencia.titulo.toLowerCase()} na sua viagem?
          </h2>
          <WhatsappButton variant="solid" />
        </div>
      </section>
    </>
  );
}
