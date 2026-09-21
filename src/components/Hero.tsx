import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "../assets/hero.jpeg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Rio cristalino em Bonito cercado por vegetação exuberante"
          className="h-full w-full object-cover"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-900/60 to-forest-900/30" />
      </div>

      <div className="container-tight relative flex min-h-[80vh] flex-col justify-center py-20 md:min-h-[85vh]">
        <div className="max-w-2xl space-y-6 text-sand-50">
          <div className="inline-flex items-center gap-2 rounded-full bg-forest-800/60 px-4 py-2 text-sm font-medium uppercase tracking-wide backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-forest-300" />
            <span>Bonito · Socorro · Brotas · Ubatuba</span>
          </div>

          <h1 className="text-balance text-4xl leading-[1.1] md:text-6xl lg:text-7xl">
            Sua aventura organizada do início ao fim
          </h1>

          <p className="max-w-xl text-balance text-lg leading-relaxed text-forest-100 md:text-xl">
            Nós montamos a viagem completa: transporte, hospedagem, alimentação
            e ingressos. Você só precisa aproveitar as paisagens dos nossos
            destinos.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/destinos"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Conhecer destinos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full border border-sand-50/30 bg-sand-50/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-sand-50 backdrop-blur-sm transition-all hover:bg-sand-50/20"
            >
              Planejar minha viagem
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
