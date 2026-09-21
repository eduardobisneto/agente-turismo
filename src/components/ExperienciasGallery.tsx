import flutuacaoImg from "../assets/flutuacao.jpeg";
import trilhasImg from "../assets/trilhas.jpeg";
import cachoeiraImg from "../assets/cachoeira.jpeg";
import standUpPaddleImg from "../assets/stand-up-paddle.jpeg";

const experiencias = [
  {
    titulo: "Flutuação",
    descricao: "Nade em águas cristalinas e observe a vida aquática de perto.",
    imagem: flutuacaoImg,
    alt: "Pessoas fazendo flutuação em rio cristalino cercado por vegetação",
  },
  {
    titulo: "Trilhas",
    descricao:
      "Caminhadas por trilhas entre montanhas e florestas preservadas.",
    imagem: trilhasImg,
    alt: "Grupo de pessoas caminhando em trilha na floresta",
  },
  {
    titulo: "Cachoeiras",
    descricao: "Visite cachoeiras deslumbrantes com piscinas naturais.",
    imagem: cachoeiraImg,
    alt: "Mulher admirando cachoeira em piscina natural",
  },
  {
    titulo: "Stand Up Paddle",
    descricao: "Reme sobre águas tranquilas em meio à natureza exuberante.",
    imagem: standUpPaddleImg,
    alt: "Mulher fazendo stand up paddle em rio de água cristalina",
  },
];

export function ExperienciasGallery() {
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {experiencias.slice(0, 2).map((exp) => (
            <div
              key={exp.titulo}
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
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {experiencias.slice(2).map((exp) => (
            <div
              key={exp.titulo}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={exp.imagem}
                alt={exp.alt}
                className="aspect-[16/9] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={1024}
                height={768}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-sand-50">
                <h3 className="font-display text-2xl">{exp.titulo}</h3>
                <p className="mt-1 text-sm text-forest-100">{exp.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
