import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Users } from "lucide-react";

interface DestinoCardProps {
  slug: string;
  nome: string;
  tagline: string;
  descricao: string;
  imagem: string;
  alt: string;
  duracao: string;
  grupo: string;
}

export function DestinoCard({
  slug,
  nome,
  tagline,
  descricao,
  imagem,
  alt,
  duracao,
  grupo,
}: DestinoCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imagem}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl text-sand-50">{nome}</h3>
          <p className="text-sm text-forest-100">{tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {descricao}
        </p>

        <div className="mb-6 flex flex-wrap gap-4 text-xs font-medium text-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            {duracao}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            {grupo}
          </span>
        </div>

        <Link
          to={`/destinos#${slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Ver roteiro
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
