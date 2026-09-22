import { createFileRoute } from "@tanstack/react-router";

import { ExperienciaCard } from "@/components/ExperienciaCard";
import { experiencias } from "@/data/experiencias";

export const Route = createFileRoute("/experiencias")({
  component: ExperienciasPage,
});

function ExperienciasPage() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Experiências
          </span>
          <h1 className="mt-3 text-balance text-3xl md:text-4xl">
            Atividades que fazem parte dos nossos roteiros
          </h1>
          <p className="mt-4 text-muted-foreground">
            De experiências tranquilas às mais emocionantes, montamos o pacote
            ideal para o seu grupo.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {experiencias.map((experiencia) => (
            <ExperienciaCard
              key={experiencia.slug}
              slug={experiencia.slug}
              titulo={experiencia.titulo}
              descricao={experiencia.descricao}
              imagem={experiencia.imagem}
              alt={experiencia.alt}
              icon={experiencia.icon}
              nivel={experiencia.contexto.nivel}
              faixaEtaria={experiencia.contexto.faixaEtaria}
              epocaResumo={experiencia.contexto.epocaResumo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
