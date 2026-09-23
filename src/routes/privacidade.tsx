import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  component: PrivacidadePage,
});

const secoes = [
  {
    titulo: "1. Quem somos",
    paragrafos: [
      "A Aventura Organizada é a controladora dos dados pessoais tratados por meio deste site, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Esta política explica quais dados coletamos, por que os coletamos e quais são os seus direitos.",
    ],
  },
  {
    titulo: "2. Quais dados coletamos",
    paragrafos: [
      "Dados que você nos fornece diretamente: quando você entra em contato pelo WhatsApp, telefone ou e-mail, podemos coletar nome, telefone, e-mail e as informações que você compartilhar sobre sua viagem (destino de interesse, datas, número de pessoas).",
      "Dados de navegação: como a maioria dos sites, podemos coletar automaticamente informações técnicas como endereço IP, tipo de navegador, páginas visitadas e cookies, para o funcionamento e a melhoria do site.",
    ],
  },
  {
    titulo: "3. Para que usamos seus dados",
    paragrafos: [
      "Usamos os dados coletados para: responder seus contatos e montar propostas de viagem; melhorar o funcionamento e a navegação do site; e cumprir obrigações legais, quando aplicável. Não vendemos seus dados pessoais a terceiros.",
    ],
  },
  {
    titulo: "4. Base legal para o tratamento",
    paragrafos: [
      "Tratamos seus dados com base no seu consentimento (por exemplo, ao nos contatar voluntariamente pelo WhatsApp), na execução de procedimentos preliminares relacionados a um contrato (orçamento e planejamento da viagem) e no legítimo interesse para o funcionamento técnico do site, sempre observando os limites da LGPD.",
    ],
  },
  {
    titulo: "5. Cookies",
    paragrafos: [
      "Cookies são pequenos arquivos armazenados no seu navegador. Usamos cookies essenciais, necessários para o funcionamento básico do site (como lembrar a sua escolha no aviso de cookies).",
      "O site também incorpora um mapa do Google Maps nas páginas de destino, que pode definir seus próprios cookies de acordo com a política de privacidade do Google, para exibir o mapa corretamente. Você pode gerenciar ou bloquear cookies diretamente nas configurações do seu navegador a qualquer momento.",
    ],
  },
  {
    titulo: "6. Compartilhamento de dados",
    paragrafos: [
      "Podemos compartilhar dados com prestadores de serviço estritamente necessários para operar o site e nossos canais de contato, como o Google (mapas) e o WhatsApp/Meta (mensagens), cada um sujeito à sua própria política de privacidade. Não compartilhamos seus dados com terceiros para fins de marketing sem o seu consentimento.",
    ],
  },
  {
    titulo: "7. Por quanto tempo guardamos seus dados",
    paragrafos: [
      "Guardamos os dados de contato pelo tempo necessário para atender sua solicitação e cumprir obrigações legais ou contratuais, podendo ser eliminados a qualquer momento mediante sua solicitação, conforme descrito na seção de direitos abaixo.",
    ],
  },
  {
    titulo: "8. Seus direitos como titular de dados",
    paragrafos: [
      "De acordo com a LGPD, você tem direito a: confirmação da existência de tratamento; acesso aos seus dados; correção de dados incompletos, inexatos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade dos dados; eliminação dos dados tratados com base no seu consentimento; informação sobre com quem compartilhamos seus dados; e revogação do consentimento a qualquer momento.",
    ],
  },
  {
    titulo: "9. Como exercer seus direitos",
    paragrafos: [
      "Para exercer qualquer um desses direitos ou tirar dúvidas sobre o tratamento dos seus dados, entre em contato pelo e-mail contato@aventuraorganizada.com.br. Responderemos sua solicitação dentro do prazo previsto em lei.",
    ],
  },
  {
    titulo: "10. Segurança dos dados",
    paragrafos: [
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acessos não autorizados, perda, alteração ou divulgação indevida.",
    ],
  },
  {
    titulo: "11. Alterações desta política",
    paragrafos: [
      "Esta Política de Privacidade pode ser atualizada periodicamente, para refletir mudanças no site, em nossas práticas ou na legislação aplicável. A versão vigente estará sempre disponível nesta página.",
    ],
  },
];

function PrivacidadePage() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Conformidade
          </span>
          <h1 className="mt-3 text-balance text-3xl md:text-4xl">
            Política de Privacidade
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
