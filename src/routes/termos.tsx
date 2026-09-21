import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  component: TermosPage,
});

const secoes = [
  {
    titulo: "1. Aceitação dos termos",
    paragrafos: [
      'Estes Termos de Uso regulam o acesso e a utilização do site da Aventura Organizada ("nós", "site"), que apresenta pacotes de turismo de aventura em Bonito (MS), Socorro, Brotas e Ubatuba (SP). Ao acessar ou usar este site, você concorda com os termos descritos aqui.',
      "Se você não concorda com algum destes termos, recomendamos que não continue navegando ou utilizando o site.",
    ],
  },
  {
    titulo: "2. Sobre o serviço",
    paragrafos: [
      "O site tem caráter informativo e comercial: apresenta destinos, roteiros, atrações e formas de contato para que você possa planejar sua viagem conosco. A contratação efetiva de pacotes, reservas e pagamentos é feita diretamente pelos canais de contato informados (WhatsApp, telefone ou e-mail), não por meio de compra automatizada no site.",
      "As informações sobre destinos, atrações, preços de referência, disponibilidade e roteiros podem ser alteradas sem aviso prévio e devem ser confirmadas diretamente conosco antes da contratação.",
    ],
  },
  {
    titulo: "3. Uso adequado do site",
    paragrafos: [
      "Você concorda em utilizar o site apenas para fins lícitos, sem violar direitos de terceiros, sem tentar acessar áreas restritas sem autorização, e sem utilizar meios automatizados (robôs, scrapers) para extrair conteúdo do site sem nossa permissão prévia.",
    ],
  },
  {
    titulo: "4. Propriedade intelectual",
    paragrafos: [
      "Textos, imagens, logotipos e demais conteúdos publicados neste site pertencem à Aventura Organizada ou são utilizados com a devida autorização. A reprodução, distribuição ou uso comercial desses conteúdos sem autorização prévia é proibida.",
    ],
  },
  {
    titulo: "5. Links e serviços de terceiros",
    paragrafos: [
      "O site utiliza serviços de terceiros, como mapas incorporados do Google Maps e links diretos para o WhatsApp, para facilitar a localização dos destinos e o contato com nossa equipe. O uso desses serviços está sujeito também aos termos e políticas de privacidade de cada provedor.",
    ],
  },
  {
    titulo: "6. Limitação de responsabilidade",
    paragrafos: [
      "Fazemos o possível para manter as informações do site atualizadas e corretas, mas não garantimos que estejam livres de erros a qualquer momento. A Aventura Organizada não se responsabiliza por decisões tomadas exclusivamente com base em informações do site sem confirmação direta com nossa equipe, nem por indisponibilidades temporárias do site por motivos técnicos.",
    ],
  },
  {
    titulo: "7. Alterações destes termos",
    paragrafos: [
      "Podemos atualizar estes Termos de Uso periodicamente, para refletir mudanças no site ou na legislação aplicável. A versão vigente estará sempre disponível nesta página.",
    ],
  },
  {
    titulo: "8. Contato",
    paragrafos: [
      "Dúvidas sobre estes Termos de Uso podem ser enviadas para contato@aventuraorganizada.com.br.",
    ],
  },
];

function TermosPage() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Conformidade
          </span>
          <h1 className="mt-3 text-balance text-3xl md:text-4xl">
            Termos de Uso
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: setembro de 2026
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {secoes.map((secao) => (
            <div key={secao.titulo}>
              <h2 className="text-balance text-xl md:text-2xl">
                {secao.titulo}
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground">
                {secao.paragrafos.map((paragrafo, index) => (
                  <p key={index}>{paragrafo}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
