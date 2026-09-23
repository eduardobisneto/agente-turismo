import type { ComponentType, SVGProps } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Gauge, Users } from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface ExperienciaCardProps {
  slug: string;
  titulo: string;
  descricao: string;
  imagem?: string | undefined;
  alt?: string | undefined;
  icon?: IconComponent | undefined;
  nivel: string;
  faixaEtaria: string;
  epocaResumo: string;
}

export function ExperienciaCard({
  slug,
  titulo,
  descricao,
  imagem,
  alt,
  icon: Icon,
  nivel,
  faixaEtaria,
  epocaResumo,
}: ExperienciaCardProps) {
  return (
    <Link
      to="/experiencias/$slug"
      params={{ slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imagem ? (
          <img
            src={imagem}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={1024}
            height={768}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-forest-800">
            {Icon && (
              <Icon className="h-16 w-16 text-forest-500 transition-transform duration-500 group-hover:scale-105" />
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl text-sand-50">{titulo}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {descricao}
        </p>

        <div className="mb-6 flex flex-wrap gap-2 text-xs font-medium text-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <Gauge className="h-3.5 w-3.5 text-primary" />
            {nivel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            {faixaEtaria}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            {epocaResumo}
          </span>
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary transition-colors group-hover:text-primary/80">
          Ver experiência
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
