import flutuacaoImg from "../assets/flutuacao.jpeg";
import trilhasImg from "../assets/trilhas.jpeg";
import cachoeiraImg from "../assets/cachoeira.jpeg";
import standUpPaddleImg from "../assets/stand-up-paddle.jpeg";
import destinoUbatubaImg from "../assets/destino-ubatuba.jpeg";
import surfItamambucaImg from "../assets/surf-itamambuca.jpeg";
import destinoBrotasImg from "../assets/download.jpeg";
import destinoSocorroImg from "../assets/destino-socorro.jpeg";
import heroImg from "../assets/hero.jpeg";
import destinoBonitoImg from "../assets/destino-bonito.jpeg";

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
  {
    titulo: "Praias",
    descricao: "Relaxe em praias de areia clara e mar convidativo.",
    imagem: destinoUbatubaImg,
    alt: "Praia de areia clara cercada por mata atlântica",
  },
  {
    titulo: "Aulas de Surf",
    descricao:
      "Aprenda a surfar com instrutores em praias com ondas para todos os níveis.",
    imagem: surfItamambucaImg,
    alt: "Foto ilustrativa de praia com ondas para o surfe",
  },
  {
    titulo: "Rafting",
    descricao:
      "Desça corredeiras em botes infláveis com muita adrenalina em equipe.",
    imagem: destinoBrotasImg,
    alt: "Foto ilustrativa de rafting em corredeiras",
  },
  {
    titulo: "Tirolesa",
    descricao: "Deslize por tirolesas com vista para o vale e o horizonte.",
    imagem: destinoSocorroImg,
    alt: "Foto ilustrativa de tirolesa com vista para o vale",
  },
  {
    titulo: "Arvorismo",
    descricao:
      "Percursos suspensos entre as árvores, com tirolesas e obstáculos.",
    imagem: heroImg,
    alt: "Foto ilustrativa de percurso de arvorismo na floresta",
  },
  {
    titulo: "Caiaque",
    descricao: "Reme por rios e lagos em ritmo próprio, sozinho ou em dupla.",
    imagem: destinoBonitoImg,
    alt: "Foto ilustrativa de caiaque em rio de águas calmas",
  },
  {
    titulo: "Escalada",
    descricao:
      "Escale paredões naturais com equipamento e monitores especializados.",
    imagem: cachoeiraImg,
    alt: "Foto ilustrativa de paredão rochoso natural",
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiencias.map((exp) => (
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
      </div>
    </section>
  );
}
