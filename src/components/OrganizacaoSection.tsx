import { Bus, BedDouble, Ticket, UtensilsCrossed } from "lucide-react";

const itens = [
  {
    icon: Bus,
    titulo: "Transporte",
    descricao:
      "Van ou ônibus exclusivo desde a saída da sua cidade até o destino, com motoristas experientes e paradas estratégicas.",
  },
  {
    icon: BedDouble,
    titulo: "Hospedagem",
    descricao:
      "Pousadas selecionadas próximas às atrações, com conforto, café da manhã regional e ambiente integrado à natureza.",
  },
  {
    icon: UtensilsCrossed,
    titulo: "Alimentação",
    descricao:
      "Refeições planejadas para manter a energia da aventura: café da manhã, almoço e jantar com opções especiais.",
  },
  {
    icon: Ticket,
    titulo: "Ingressos",
    descricao:
      "Reserva antecipada de todos os passeios e atrações: flutuação, cachoeiras, grutas e trilhas. Sem filas, sem estresse.",
  },
];

export function OrganizacaoSection() {
  return (
    <section className="section-padding bg-sand-100">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Tudo incluso
          </span>
          <h2 className="mt-3 text-balance text-3xl md:text-4xl">
            A gente cuida da logística. Você curte a aventura.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nossos pacotes são pensados para que você não precise se preocupar
            com nada.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map((item) => (
            <div
              key={item.titulo}
              className="rounded-2xl border border-border bg-background p-6 transition-all hover:shadow-md"
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
  );
}
