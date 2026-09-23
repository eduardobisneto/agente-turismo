import { Link } from "@tanstack/react-router";

import { experiencias } from "@/data/experiencias";

export function ExperienciasGallery() {
  const comFoto = experiencias.filter((exp) => exp.imagem);
  const semFoto = experiencias.filter((exp) => !exp.imagem && exp.icon);

  return (
    <section className="section-padding bg-sand-100">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Experiências
          </span>
          <h2 className="mt-3 text-balance text-3xl md:text-4xl">
            Atividades que fazem parte dos nossos roteiros
          </h2>
          <p className="mt-4 text-muted-foreground">
            De experiências tranquilas às mais emocionantes, montamos o pacote
            ideal para o seu grupo.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comFoto.map((exp) => (
            <Link
              key={exp.slug}
              to="/experiencias/$slug"
              params={{ slug: exp.slug }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={exp.imagem}
                alt={exp.alt}
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={1024}
                height={768}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-sand-50">
                <h3 className="font-display text-2xl">{exp.titulo}</h3>
                <p className="mt-1 text-sm text-forest-100">{exp.descricao}</p>
              </div>
            </Link>
          ))}

          {semFoto.map((exp) => {
            const Icon = exp.icon!;
            return (
              <Link
                key={exp.slug}
                to="/experiencias/$slug"
                params={{ slug: exp.slug }}
                className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-forest-800 p-6 text-sand-50 transition-colors hover:bg-forest-700"
              >
                <Icon className="absolute right-4 top-4 h-10 w-10 text-forest-500" />
                <h3 className="font-display text-2xl">{exp.titulo}</h3>
                <p className="mt-1 text-sm text-forest-100">{exp.descricao}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
