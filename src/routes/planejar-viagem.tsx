import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Plus,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Calendar } from "@/components/Calendar";
import { RequireAuth } from "@/components/RequireAuth";
import { WhatsappButton } from "@/components/WhatsappButton";
import { destinos } from "@/data/destinos";
import {
  experiencias,
  getDestinosPorExperiencia,
  getExperienciasPorDestino,
} from "@/data/experiencias";
import { useAuth } from "@/lib/auth-context";
import {
  adicionarInteracao,
  getPlanosDoUsuario,
  noitesEntre,
  onPedirListaDeViagens,
  responderSugestao,
  salvarPlanoViagem,
  type Interacao,
  type PlanoViagem,
  type SelecaoDestino,
} from "@/lib/trip-plan";

export const Route = createFileRoute("/planejar-viagem")({
  component: () => (
    <RequireAuth>
      <PlanejarViagemPage />
    </RequireAuth>
  ),
});

type Step = "tipo" | "selecao" | "calendario" | "resumo";
type TipoInicial = "destinos" | "experiencias";
type SelecoesMap = Record<string, Set<string>>;
type Modo = "lista" | "detalhe" | "wizard";

const STEP_LABELS: Record<Step, string> = {
  tipo: "1. Por onde começar",
  selecao: "2. Destinos e experiências",
  calendario: "3. Datas e detalhes por destino",
  resumo: "4. Resumo",
};

const STEP_ORDER: Step[] = ["tipo", "selecao", "calendario", "resumo"];

const ADULTOS_PADRAO = 2;
const CRIANCAS_PADRAO = 0;

function PlanejarViagemPage() {
  const { user } = useAuth();

  const [modo, setModo] = useState<Modo | null>(null);
  const [planos, setPlanos] = useState<PlanoViagem[]>([]);
  const [planoSelecionado, setPlanoSelecionado] = useState<PlanoViagem | null>(
    null,
  );

  const [step, setStep] = useState<Step>("tipo");
  const [maxStepIndexVisitado, setMaxStepIndexVisitado] = useState(0);
  const [tipoInicial, setTipoInicial] = useState<TipoInicial | null>(null);
  const [selecoesMap, setSelecoesMap] = useState<SelecoesMap>({});
  const [destinoAtualIndex, setDestinoAtualIndex] = useState(0);
  const [datasInicio, setDatasInicio] = useState<Record<string, string>>({});
  const [datasFim, setDatasFim] = useState<Record<string, string>>({});

  const [interessesMap, setInteressesMap] = useState<Record<string, string[]>>(
    {},
  );
  const [adultosMap, setAdultosMap] = useState<Record<string, number>>({});
  const [criancasMap, setCriancasMap] = useState<Record<string, number>>({});
  const [idadesCriancasMap, setIdadesCriancasMap] = useState<
    Record<string, number[]>
  >({});
  const [inclusosMap, setInclusosMap] = useState<Record<string, string[]>>({});
  const [contextoDestinoMap, setContextoDestinoMap] = useState<
    Record<string, string>
  >({});

  const [contexto, setContexto] = useState("");
  const [enviado, setEnviado] = useState(false);

  const destinosSelecionados = Object.keys(selecoesMap);

  useEffect(() => {
    if (!user) return;
    const doUsuario = getPlanosDoUsuario(user.id);
    setPlanos(doUsuario);
    setModo(doUsuario.length > 0 ? "lista" : "wizard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;
    return onPedirListaDeViagens(() => {
      setPlanos(getPlanosDoUsuario(user.id));
      setPlanoSelecionado(null);
      setModo("lista");
    });
  }, [user]);

  function iniciarNovoPlanejamento() {
    setStep("tipo");
    setMaxStepIndexVisitado(0);
    setTipoInicial(null);
    setSelecoesMap({});
    setDestinoAtualIndex(0);
    setDatasInicio({});
    setDatasFim({});
    setInteressesMap({});
    setAdultosMap({});
    setCriancasMap({});
    setIdadesCriancasMap({});
    setInclusosMap({});
    setContextoDestinoMap({});
    setContexto("");
    setEnviado(false);
    setModo("wizard");
  }

  function verMeusPlanos() {
    if (!user) return;
    setPlanos(getPlanosDoUsuario(user.id));
    setPlanoSelecionado(null);
    setModo("lista");
  }

  function abrirPlano(plano: PlanoViagem) {
    setPlanoSelecionado(plano);
    setModo("detalhe");
  }

  function irPara(novoStep: Step) {
    setStep(novoStep);
    setMaxStepIndexVisitado((atual) =>
      Math.max(atual, STEP_ORDER.indexOf(novoStep)),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleDestino(slug: string) {
    setSelecoesMap((atual) => {
      const proximo = { ...atual };
      if (proximo[slug]) {
        delete proximo[slug];
      } else {
        proximo[slug] = new Set();
      }
      return proximo;
    });

    setAdultosMap((atual) => {
      if (slug in atual) {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [slug]: ADULTOS_PADRAO };
    });
    setCriancasMap((atual) => {
      if (slug in atual) {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [slug]: CRIANCAS_PADRAO };
    });
    setIdadesCriancasMap((atual) => {
      if (slug in atual) {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [slug]: [] };
    });
    setInteressesMap((atual) => {
      if (slug in atual) {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [slug]: [] };
    });
    setInclusosMap((atual) => {
      if (slug in atual) {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [slug]: [] };
    });
    setContextoDestinoMap((atual) => {
      if (slug in atual) {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [slug]: "" };
    });
  }

  function toggleExperienciaDoDestino(destinoSlug: string, expSlug: string) {
    setSelecoesMap((atual) => {
      const atualSet = atual[destinoSlug] ?? new Set<string>();
      const novoSet = new Set(atualSet);
      if (novoSet.has(expSlug)) {
        novoSet.delete(expSlug);
      } else {
        novoSet.add(expSlug);
      }
      return { ...atual, [destinoSlug]: novoSet };
    });
  }

  function selecionarDataDoDestino(slug: string, iso: string) {
    const inicioAtual = datasInicio[slug];
    const fimAtual = datasFim[slug];

    if (!inicioAtual || fimAtual) {
      // Começando uma seleção nova (ou range anterior já fechado): esse
      // clique vira o novo início, limpando o fim.
      setDatasInicio((atual) => ({ ...atual, [slug]: iso }));
      setDatasFim((atual) => {
        const { [slug]: _removido, ...resto } = atual;
        return resto;
      });
      return;
    }

    if (iso < inicioAtual) {
      // Clicou numa data antes do início escolhido: essa vira o novo início.
      setDatasInicio((atual) => ({ ...atual, [slug]: iso }));
      return;
    }

    setDatasFim((atual) => ({ ...atual, [slug]: iso }));
  }

  function toggleInteresseDoDestino(destinoSlug: string, valor: string) {
    setInteressesMap((atual) => {
      const atuais = atual[destinoSlug] ?? [];
      const novos = atuais.includes(valor)
        ? atuais.filter((v) => v !== valor)
        : [...atuais, valor];
      return { ...atual, [destinoSlug]: novos };
    });
  }

  function toggleInclusoDoDestino(destinoSlug: string, valor: string) {
    setInclusosMap((atual) => {
      const atuais = atual[destinoSlug] ?? [];
      const novos = atuais.includes(valor)
        ? atuais.filter((v) => v !== valor)
        : [...atuais, valor];
      return { ...atual, [destinoSlug]: novos };
    });
  }

  function handleEnviar() {
    if (!user) return;

    const selecoes: SelecaoDestino[] = destinosSelecionados.map((slug) => ({
      destinoSlug: slug,
      experienciaSlugs: Array.from(selecoesMap[slug] ?? []),
      dataInicio: datasInicio[slug],
      dataFim: datasFim[slug],
      adultos: adultosMap[slug] ?? ADULTOS_PADRAO,
      criancas: criancasMap[slug] ?? CRIANCAS_PADRAO,
      idadesCriancas: idadesCriancasMap[slug],
      interesses: interessesMap[slug] ?? [],
      inclusos: inclusosMap[slug] ?? [],
      contextoDestino: contextoDestinoMap[slug] || undefined,
    }));

    salvarPlanoViagem({
      usuarioId: user.id,
      tipoInicial: tipoInicial ?? "destinos",
      selecoes,
      contexto,
    });

    setEnviado(true);
  }

  const stepIndex = STEP_ORDER.indexOf(step);

  if (modo === null) {
    return (
      <section className="section-padding">
        <div className="container-tight">
          <p className="text-center text-sm text-muted-foreground">
            Carregando...
          </p>
        </div>
      </section>
    );
  }

  if (modo === "lista") {
    return (
      <ListaPlanosView
        nome={user?.nome.split(" ")[0] ?? ""}
        planos={planos}
        onNovoPlanejamento={iniciarNovoPlanejamento}
        onAbrirPlano={abrirPlano}
      />
    );
  }

  if (modo === "detalhe" && planoSelecionado) {
    return (
      <DetalhePlanoView
        plano={planoSelecionado}
        nomeUsuario={user?.nome.split(" ")[0] ?? ""}
        avatarUrlUsuario={user?.avatarUrl}
        onVoltar={verMeusPlanos}
      />
    );
  }

  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Planejar viagem
          </span>
          <h1 className="mt-3 text-balance text-3xl md:text-4xl">
            Vamos montar a sua aventura, {user?.nome.split(" ")[0]}
          </h1>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between gap-1">
          {STEP_ORDER.map((s, index) => (
            <div key={s} className="flex flex-1 items-center gap-1">
              {index <= stepIndex ? (
                <button
                  type="button"
                  onClick={() => irPara(s)}
                  aria-label={`Voltar para ${STEP_LABELS[s]}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-80"
                >
                  {index + 1}
                </button>
              ) : index <= maxStepIndexVisitado ? (
                <button
                  type="button"
                  onClick={() => irPara(s)}
                  aria-label={`Ir para ${STEP_LABELS[s]}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-transparent text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  {index + 1}
                </button>
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                  {index + 1}
                </div>
              )}
              {index < STEP_ORDER.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${index < stepIndex ? "bg-primary" : "bg-secondary"}`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
          {STEP_LABELS[step]}
        </p>

        <div className="mt-12">
          {step === "tipo" && (
            <TipoStep
              onEscolher={(tipo) => {
                setTipoInicial(tipo);
                irPara("selecao");
              }}
            />
          )}

          {step === "selecao" && tipoInicial && (
            <SelecaoStep
              tipoInicial={tipoInicial}
              selecoesMap={selecoesMap}
              onToggleDestino={toggleDestino}
              onToggleExperiencia={toggleExperienciaDoDestino}
              onVoltar={() => irPara("tipo")}
              onAvancar={() => {
                setDestinoAtualIndex(0);
                irPara("calendario");
              }}
            />
          )}

          {step === "calendario" && (
            <CalendarioStep
              destinosSelecionados={destinosSelecionados}
              destinoAtualIndex={destinoAtualIndex}
              onIrParaDestino={setDestinoAtualIndex}
              datasInicio={datasInicio}
              datasFim={datasFim}
              onSelecionarData={selecionarDataDoDestino}
              adultosMap={adultosMap}
              onAdultosChange={(slug, valor) =>
                setAdultosMap((atual) => ({ ...atual, [slug]: valor }))
              }
              criancasMap={criancasMap}
              onCriancasChange={(slug, valor) => {
                setCriancasMap((atual) => ({ ...atual, [slug]: valor }));
                setIdadesCriancasMap((atual) => {
                  const atuais = atual[slug] ?? [];
                  const proximas = Array.from(
                    { length: Math.max(valor, 0) },
                    (_, i) => atuais[i] ?? 0,
                  );
                  return { ...atual, [slug]: proximas };
                });
              }}
              idadesCriancasMap={idadesCriancasMap}
              onIdadeCriancaChange={(slug, indice, idade) =>
                setIdadesCriancasMap((atual) => {
                  const atuais = [...(atual[slug] ?? [])];
                  atuais[indice] = idade;
                  return { ...atual, [slug]: atuais };
                })
              }
              interessesMap={interessesMap}
              onToggleInteresse={toggleInteresseDoDestino}
              inclusosMap={inclusosMap}
              onToggleIncluso={toggleInclusoDoDestino}
              contextoDestinoMap={contextoDestinoMap}
              onContextoDestinoChange={(slug, valor) =>
                setContextoDestinoMap((atual) => ({ ...atual, [slug]: valor }))
              }
              onVoltar={() => irPara("selecao")}
              onAvancar={() => irPara("resumo")}
            />
          )}

          {step === "resumo" && (
            <ResumoStep
              destinosSelecionados={destinosSelecionados}
              selecoesMap={selecoesMap}
              datasInicio={datasInicio}
              datasFim={datasFim}
              adultosMap={adultosMap}
              criancasMap={criancasMap}
              interessesMap={interessesMap}
              inclusosMap={inclusosMap}
              contextoDestinoMap={contextoDestinoMap}
              contexto={contexto}
              enviado={enviado}
              onVoltar={() => irPara("calendario")}
              onEnviar={handleEnviar}
              onVerMeusPlanos={verMeusPlanos}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function TipoStep({ onEscolher }: { onEscolher: (tipo: TipoInicial) => void }) {
  return (
    <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onEscolher("destinos")}
        className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center transition-all hover:shadow-md"
      >
        <MapPin className="h-10 w-10 text-primary" />
        <div>
          <h3 className="font-display text-xl">Já sei o destino</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Quero começar escolhendo para onde ir, e depois ver as experiências
            disponíveis em cada lugar.
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onEscolher("experiencias")}
        className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center transition-all hover:shadow-md"
      >
        <Sparkles className="h-10 w-10 text-primary" />
        <div>
          <h3 className="font-display text-xl">Já sei o que quero viver</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Quero começar escolhendo experiências, e depois ver em quais
            destinos elas acontecem.
          </p>
        </div>
      </button>
    </div>
  );
}

function SelecaoStep({
  tipoInicial,
  selecoesMap,
  onToggleDestino,
  onToggleExperiencia,
  onVoltar,
  onAvancar,
}: {
  tipoInicial: TipoInicial;
  selecoesMap: SelecoesMap;
  onToggleDestino: (slug: string) => void;
  onToggleExperiencia: (destinoSlug: string, expSlug: string) => void;
  onVoltar: () => void;
  onAvancar: () => void;
}) {
  const [experienciasEscolhidas, setExperienciasEscolhidas] = useState<
    Set<string>
  >(new Set());

  const destinosEscolhidos = Object.keys(selecoesMap);
  const totalExperiencias = Object.values(selecoesMap).reduce(
    (total, set) => total + set.size,
    0,
  );

  const podeAvancar = destinosEscolhidos.length > 0 && totalExperiencias > 0;

  function toggleExperienciaEscolhida(slug: string) {
    setExperienciasEscolhidas((atual) => {
      const novo = new Set(atual);
      if (novo.has(slug)) {
        novo.delete(slug);
      } else {
        novo.add(slug);
      }
      return novo;
    });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {tipoInicial === "destinos" ? (
        <>
          <div>
            <h2 className="text-balance text-2xl md:text-3xl">
              Quais destinos você quer visitar?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pode escolher mais de um — mesmo que sejam em datas diferentes, a
              gente ajusta isso no próximo passo.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinos.map((destino) => {
                const selecionado = destino.slug in selecoesMap;
                return (
                  <button
                    key={destino.slug}
                    type="button"
                    onClick={() => onToggleDestino(destino.slug)}
                    className={`relative overflow-hidden rounded-2xl border-2 text-left transition-all ${
                      selecionado
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={destino.imagem}
                      alt={destino.alt}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/10 to-transparent" />
                    {selecionado && (
                      <div className="absolute right-3 top-3 rounded-full bg-primary p-1.5 text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                    <p className="absolute bottom-3 left-4 right-4 font-display text-lg text-sand-50">
                      {destino.nome}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {destinosEscolhidos.map((slug) => {
            const destino = destinos.find((d) => d.slug === slug);
            const disponiveis = getExperienciasPorDestino(slug);
            if (!destino) return null;

            return (
              <div key={slug}>
                <h3 className="font-display text-xl">
                  O que você quer viver em {destino.nome.split(",")[0]}?
                </h3>
                {disponiveis.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {disponiveis.map((exp) => {
                      const marcado = selecoesMap[slug]?.has(exp.slug);
                      return (
                        <button
                          key={exp.slug}
                          type="button"
                          onClick={() => onToggleExperiencia(slug, exp.slug)}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            marcado
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-foreground hover:bg-secondary"
                          }`}
                        >
                          {marcado && <Check className="h-3.5 w-3.5" />}
                          {exp.titulo}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Ainda não temos experiências específicas cadastradas para
                    esse destino.
                  </p>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div>
            <h2 className="text-balance text-2xl md:text-3xl">
              O que você quer viver?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pode escolher mais de uma experiência.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {experiencias.map((exp) => {
                const marcado = experienciasEscolhidas.has(exp.slug);
                return (
                  <button
                    key={exp.slug}
                    type="button"
                    onClick={() => toggleExperienciaEscolhida(exp.slug)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      marcado
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-secondary"
                    }`}
                  >
                    {marcado && <Check className="h-3.5 w-3.5" />}
                    {exp.titulo}
                  </button>
                );
              })}
            </div>
          </div>

          {Array.from(experienciasEscolhidas).map((expSlug) => {
            const exp = experiencias.find((e) => e.slug === expSlug);
            const destinosComExp = getDestinosPorExperiencia(expSlug);
            const destinosUnicos = Array.from(
              new Map(destinosComExp.map((d) => [d.destinoSlug, d])).values(),
            );
            if (!exp) return null;

            return (
              <div key={expSlug}>
                <h3 className="font-display text-xl">
                  Onde você quer viver {exp.titulo.toLowerCase()}?
                </h3>
                {destinosUnicos.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {destinosUnicos.map((item) => {
                      const marcado =
                        selecoesMap[item.destinoSlug]?.has(expSlug);
                      return (
                        <button
                          key={item.destinoSlug}
                          type="button"
                          onClick={() =>
                            onToggleExperiencia(item.destinoSlug, expSlug)
                          }
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            marcado
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-foreground hover:bg-secondary"
                          }`}
                        >
                          {marcado && <Check className="h-3.5 w-3.5" />}
                          {item.destinoNome}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Ainda não temos um roteiro publicado com essa experiência em
                    destaque.
                  </p>
                )}
              </div>
            );
          })}
        </>
      )}

      <div className="flex items-center justify-between border-t border-border pt-6">
        <button
          type="button"
          onClick={onVoltar}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <button
          type="button"
          disabled={!podeAvancar}
          onClick={onAvancar}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
        >
          Continuar
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function CalendarioStep({
  destinosSelecionados,
  destinoAtualIndex,
  onIrParaDestino,
  datasInicio,
  datasFim,
  onSelecionarData,
  adultosMap,
  onAdultosChange,
  criancasMap,
  onCriancasChange,
  idadesCriancasMap,
  onIdadeCriancaChange,
  interessesMap,
  onToggleInteresse,
  inclusosMap,
  onToggleIncluso,
  contextoDestinoMap,
  onContextoDestinoChange,
  onVoltar,
  onAvancar,
}: {
  destinosSelecionados: string[];
  destinoAtualIndex: number;
  onIrParaDestino: (index: number) => void;
  datasInicio: Record<string, string>;
  datasFim: Record<string, string>;
  onSelecionarData: (slug: string, data: string) => void;
  adultosMap: Record<string, number>;
  onAdultosChange: (slug: string, valor: number) => void;
  criancasMap: Record<string, number>;
  onCriancasChange: (slug: string, valor: number) => void;
  idadesCriancasMap: Record<string, number[]>;
  onIdadeCriancaChange: (slug: string, indice: number, idade: number) => void;
  interessesMap: Record<string, string[]>;
  onToggleInteresse: (slug: string, valor: string) => void;
  inclusosMap: Record<string, string[]>;
  onToggleIncluso: (slug: string, valor: string) => void;
  contextoDestinoMap: Record<string, string>;
  onContextoDestinoChange: (slug: string, valor: string) => void;
  onVoltar: () => void;
  onAvancar: () => void;
}) {
  const slug = destinosSelecionados[destinoAtualIndex];
  const destino = destinos.find((d) => d.slug === slug);
  if (!slug || !destino) return null;

  const inicio = datasInicio[slug];
  const fim = datasFim[slug];
  const noites = noitesEntre(inicio, fim);
  const ehUltimo = destinoAtualIndex === destinosSelecionados.length - 1;

  // Conflitos entre este destino e outros que já têm datas escolhidas.
  const conflitosComOutros = destinosSelecionados
    .filter((s) => s !== slug && datasInicio[s] && datasFim[s])
    .filter((s) => {
      if (!inicio || !fim) return false;
      const oInicio = datasInicio[s]!;
      const oFim = datasFim[s]!;
      return inicio < oFim && oInicio < fim;
    });

  const semFolgaComOutros = destinosSelecionados
    .filter((s) => s !== slug && datasInicio[s] && datasFim[s])
    .filter((s) => {
      if (!inicio || !fim) return false;
      const oInicio = datasInicio[s]!;
      const oFim = datasFim[s]!;
      return fim === oInicio || oFim === inicio;
    });

  const todasAsDatasPreenchidas = destinosSelecionados.every(
    (s) => datasInicio[s] && datasFim[s],
  );

  const podeAvancarDesteDestino =
    !!inicio && !!fim && conflitosComOutros.length === 0;
  const podeAvancar = ehUltimo
    ? podeAvancarDesteDestino && todasAsDatasPreenchidas
    : podeAvancarDesteDestino;

  function handleVoltar() {
    if (destinoAtualIndex === 0) onVoltar();
    else onIrParaDestino(destinoAtualIndex - 1);
  }

  function handleAvancar() {
    if (ehUltimo) onAvancar();
    else onIrParaDestino(destinoAtualIndex + 1);
  }

  function camposPessoas() {
    const input =
      "mt-1.5 w-full rounded-xl border border-sand-50/30 bg-background/90 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary";
    const numCriancas = criancasMap[slug!] ?? 0;
    const idades = idadesCriancasMap[slug!] ?? [];
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-sand-50">Adultos</label>
            <input
              type="number"
              min={1}
              max={30}
              value={adultosMap[slug!] ?? 2}
              onChange={(e) => onAdultosChange(slug!, Number(e.target.value))}
              className={input}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-sand-50">Crianças</label>
            <input
              type="number"
              min={0}
              max={30}
              value={numCriancas}
              onChange={(e) => onCriancasChange(slug!, Number(e.target.value))}
              className={input}
            />
          </div>
        </div>
        {numCriancas > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: numCriancas }, (_, i) => (
              <div key={i}>
                <label className="text-sm font-medium text-sand-50">
                  Idade da criança {i + 1}
                </label>
                <input
                  type="number"
                  min={0}
                  max={17}
                  value={idades[i] ?? 0}
                  onChange={(e) =>
                    onIdadeCriancaChange(slug!, i, Number(e.target.value))
                  }
                  className={input}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function camposInteresses() {
    return (
      <div>
        <p className="text-sm font-medium text-sand-50">
          Interesses em {destino!.nome.split(",")[0]}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {destino!.interessesDisponiveis.map((interesse) => {
            const marcado = (interessesMap[slug!] ?? []).includes(interesse);
            return (
              <button
                key={interesse}
                type="button"
                onClick={() => onToggleInteresse(slug!, interesse)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  marcado
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-sand-50/40 text-sand-50 hover:bg-sand-50/10"
                }`}
              >
                {marcado && <Check className="h-3.5 w-3.5" />}
                {interesse}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function camposInclusos() {
    return (
      <div>
        <p className="text-sm font-medium text-sand-50">
          O que gostaria que estivesse incluso em {destino!.nome.split(",")[0]}?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {destino!.inclusosDisponiveis.map((item) => {
            const marcado = (inclusosMap[slug!] ?? []).includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => onToggleIncluso(slug!, item)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  marcado
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-sand-50/40 text-sand-50 hover:bg-sand-50/10"
                }`}
              >
                {marcado && <Check className="h-3.5 w-3.5" />}
                {item}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function camposContexto() {
    return (
      <div className="flex h-full flex-col">
        <label className="text-sm font-medium text-sand-50">
          O que vai fazer da sua passagem por {destino!.nome.split(",")[0]}{" "}
          inesquecível? (opcional)
        </label>
        <textarea
          value={contextoDestinoMap[slug!] ?? ""}
          onChange={(e) => onContextoDestinoChange(slug!, e.target.value)}
          placeholder="Conta pra gente suas expectativas — quanto mais detalhes, mais completa fica a proposta que preparamos especialmente pra você."
          className="mt-1.5 w-full flex-1 resize-none rounded-xl border border-sand-50/30 bg-background/90 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Destino {destinoAtualIndex + 1} de {destinosSelecionados.length}
        </span>
        <p className="mt-2 text-sm text-muted-foreground">
          Escolha início e fim, quem vai, interesses e o que gostaria que
          estivesse incluso nesse destino.
        </p>
      </div>

      {destinosSelecionados.length > 1 && (
        <div className="flex items-center justify-center gap-1">
          {destinosSelecionados.map((s, i) => {
            const completo = !!datasInicio[s] && !!datasFim[s];
            const ativo = i === destinoAtualIndex;
            return (
              <div key={s} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onIrParaDestino(i)}
                  aria-label={`Ir para o destino ${i + 1}`}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    ativo
                      ? "bg-primary text-primary-foreground"
                      : completo
                        ? "border-2 border-primary bg-transparent text-primary hover:bg-primary/10"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/70"
                  }`}
                >
                  {completo && !ativo ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    i + 1
                  )}
                </button>
                {i < destinosSelecionados.length - 1 && (
                  <div
                    className={`h-0.5 w-8 ${i < destinoAtualIndex ? "bg-primary" : "bg-secondary"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      {destinosSelecionados.length > 1 && (
        <p className="text-center text-sm font-medium text-muted-foreground">
          {destino.nome}
        </p>
      )}

      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={destino.imagem}
          alt={destino.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/75 to-forest-900/60" />
        <div className="relative p-6">
          <p className="font-display text-xl text-sand-50">{destino.nome}</p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-sand-50">
            Escolher datas
          </p>
          <p className="mt-1 text-sm text-sand-50/80">
            {!inicio
              ? "Escolha a data de início"
              : !fim
                ? "Agora escolha a data de fim"
                : `${new Date(`${inicio}T00:00:00`).toLocaleDateString("pt-BR")} a ${new Date(`${fim}T00:00:00`).toLocaleDateString("pt-BR")} · ${noites} noites`}
          </p>

          {conflitosComOutros.length > 0 && (
            <p className="mt-4 rounded-xl bg-destructive px-4 py-3 text-sm text-destructive-foreground">
              Essas datas cruzam com{" "}
              {conflitosComOutros
                .map((s) => destinos.find((d) => d.slug === s)?.nome ?? s)
                .join(", ")}
              . Ajuste um dos dois períodos — você não pode estar em dois
              lugares ao mesmo tempo.
            </p>
          )}
          {conflitosComOutros.length === 0 && semFolgaComOutros.length > 0 && (
            <p className="mt-4 rounded-xl bg-amber-400 px-4 py-3 text-sm text-amber-950">
              Essas datas encostam direto em{" "}
              {semFolgaComOutros
                .map((s) => destinos.find((d) => d.slug === s)?.nome ?? s)
                .join(", ")}
              , sem folga pro deslocamento. Vale considerar pelo menos 1 dia a
              mais entre os destinos.
            </p>
          )}

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_auto]">
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              {camposPessoas()}
              {camposInteresses()}
              {camposInclusos()}
              <div className="flex-1">{camposContexto()}</div>
            </div>
            <div className="order-1 flex justify-center lg:order-2">
              <Calendar
                rangeStart={inicio}
                rangeEnd={fim}
                onSelect={(iso) => onSelecionarData(slug, iso)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        <button
          type="button"
          onClick={handleVoltar}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <button
          type="button"
          disabled={!podeAvancar}
          onClick={handleAvancar}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
        >
          {ehUltimo ? "Continuar" : "Próximo destino"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ResumoStep({
  destinosSelecionados,
  selecoesMap,
  datasInicio,
  datasFim,
  adultosMap,
  criancasMap,
  interessesMap,
  inclusosMap,
  contextoDestinoMap,
  contexto,
  enviado,
  onVoltar,
  onEnviar,
  onVerMeusPlanos,
}: {
  destinosSelecionados: string[];
  selecoesMap: SelecoesMap;
  datasInicio: Record<string, string>;
  datasFim: Record<string, string>;
  adultosMap: Record<string, number>;
  criancasMap: Record<string, number>;
  interessesMap: Record<string, string[]>;
  inclusosMap: Record<string, string[]>;
  contextoDestinoMap: Record<string, string>;
  contexto: string;
  enviado: boolean;
  onVoltar: () => void;
  onEnviar: () => void;
  onVerMeusPlanos: () => void;
}) {
  const mensagemWhatsapp = useMemo(() => {
    const linhasDestinos = destinosSelecionados.map((slug) => {
      const destino = destinos.find((d) => d.slug === slug);
      const exps = Array.from(selecoesMap[slug] ?? [])
        .map((s) => experiencias.find((e) => e.slug === s)?.titulo)
        .filter(Boolean)
        .join(", ");
      const inicio = datasInicio[slug];
      const fim = datasFim[slug];
      const noites = noitesEntre(inicio, fim);
      const periodo =
        inicio && fim
          ? `${new Date(`${inicio}T00:00:00`).toLocaleDateString("pt-BR")} a ${new Date(`${fim}T00:00:00`).toLocaleDateString("pt-BR")}, ${noites} noites`
          : "datas a combinar";
      const adultos = adultosMap[slug] ?? 2;
      const criancas = criancasMap[slug] ?? 0;
      const pessoas = `${adultos} adulto(s)${criancas > 0 ? ` e ${criancas} criança(s)` : ""}`;
      const interesses = interessesMap[slug] ?? [];
      const inclusos = inclusosMap[slug] ?? [];
      const contextoDestino = contextoDestinoMap[slug];

      return [
        `- ${destino?.nome} (${periodo}) — ${pessoas}`,
        `  Experiências: ${exps || "a combinar"}`,
        interesses.length > 0 ? `  Interesses: ${interesses.join(", ")}` : null,
        inclusos.length > 0
          ? `  Gostaria que incluísse: ${inclusos.join(", ")}`
          : null,
        contextoDestino ? `  Contexto: ${contextoDestino}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    });

    return encodeURIComponent(
      [
        "Olá! Montei um plano de viagem no site e queria fechar com vocês:",
        ...linhasDestinos,
        contexto ? `Mais detalhes: ${contexto}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }, [
    destinosSelecionados,
    selecoesMap,
    datasInicio,
    datasFim,
    adultosMap,
    criancasMap,
    interessesMap,
    inclusosMap,
    contextoDestinoMap,
    contexto,
  ]);

  const experienciaSlugsUnicos = Array.from(
    new Set(
      destinosSelecionados.flatMap((slug) =>
        Array.from(selecoesMap[slug] ?? []),
      ),
    ),
  );
  const experienciasUnicas = experienciaSlugsUnicos
    .map((s) => experiencias.find((e) => e.slug === s))
    .filter((e): e is (typeof experiencias)[number] => !!e);

  const interessesUnicos = Array.from(
    new Set(
      destinosSelecionados.flatMap((slug) => interessesMap[slug] ?? []),
    ),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="text-balance text-2xl md:text-3xl">
          Confira o resumo da sua viagem
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Nossa equipe recebe esse plano e monta uma proposta detalhada para
          você.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Destinos
          </p>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            {destinosSelecionados.map((slug) => {
              const destino = destinos.find((d) => d.slug === slug);
              const inicio = datasInicio[slug];
              const fim = datasFim[slug];
              const noites = noitesEntre(inicio, fim);
              const adultos = adultosMap[slug] ?? 2;
              const criancas = criancasMap[slug] ?? 0;
              const contextoDestino = contextoDestinoMap[slug];

              return (
                <div
                  key={slug}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {destino?.imagem ? (
                      <img
                        src={destino.imagem}
                        alt={destino.alt}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-forest-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl text-sand-50">
                        {destino?.nome}
                      </h3>
                      <p className="text-sm text-forest-100">
                        {inicio && fim
                          ? `${new Date(`${inicio}T00:00:00`).toLocaleDateString("pt-BR")} a ${new Date(`${fim}T00:00:00`).toLocaleDateString("pt-BR")} · ${noites} noites · ${adultos} adulto(s)${criancas > 0 ? `, ${criancas} criança(s)` : ""}`
                          : "Datas a combinar"}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {contextoDestino ||
                        "Sem comentários adicionais para esse destino."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {experienciasUnicas.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Experiências
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experienciasUnicas.map((exp) => (
                <span
                  key={exp.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
                >
                  <Check className="h-3.5 w-3.5" />
                  {exp.titulo}
                </span>
              ))}
            </div>
          </div>
        )}

        {interessesUnicos.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Interesses
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {interessesUnicos.map((interesse) => (
                <span
                  key={interesse}
                  className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
                >
                  <Check className="h-3.5 w-3.5" />
                  {interesse}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {enviado ? (
        <div className="rounded-2xl bg-forest-900 p-6 text-center text-sand-50">
          <p className="font-display text-xl">Plano enviado!</p>
          <p className="mt-2 text-sm text-forest-100">
            Recebemos o seu plano de viagem. Nossa equipe vai analisar e entrar
            em contato com uma proposta detalhada — ou, se preferir, já fala com
            a gente agora pelo WhatsApp.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3">
            <a
              href={`https://wa.me/5511963220494?text=${mensagemWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappButton variant="solid" />
            </a>
            <button
              type="button"
              onClick={onVerMeusPlanos}
              className="text-sm font-semibold uppercase tracking-wide text-sand-50 underline-offset-4 hover:underline"
            >
              Ver meus planos de viagem
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onVoltar}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <button
            type="button"
            onClick={onEnviar}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Enviar plano de viagem
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ListaPlanosView({
  nome,
  planos,
  onNovoPlanejamento,
  onAbrirPlano,
}: {
  nome: string;
  planos: PlanoViagem[];
  onNovoPlanejamento: () => void;
  onAbrirPlano: (plano: PlanoViagem) => void;
}) {
  return (
    <>
      <section className="section-padding">
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Minhas viagens
              </span>
              <h1 className="mt-3 text-balance text-3xl md:text-4xl">
                Suas viagens, {nome}
              </h1>
            </div>
            <button
              type="button"
              onClick={onNovoPlanejamento}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Novo planejamento de viagem
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-100">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl space-y-4">
            {planos.map((plano) => {
              const nomesDestinos = plano.selecoes
                .map(
                  (s) => destinos.find((d) => d.slug === s.destinoSlug)?.nome,
                )
                .filter(Boolean)
                .join(", ");

              return (
                <button
                  key={plano.id}
                  type="button"
                  onClick={() => onAbrirPlano(plano)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
                >
                  <div>
                    <p className="font-display text-lg">
                      {nomesDestinos || "Plano de viagem"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Enviado em{" "}
                      {new Date(plano.criadoEm).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
                    Em análise
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function juntarNomes(nomes: string[]): string {
  if (nomes.length <= 1) return nomes[0] ?? "";
  if (nomes.length === 2) return `${nomes[0]} e ${nomes[1]}`;
  return `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}`;
}

type ConsultaStep =
  | "tipo"
  | "selecao"
  | "calendario"
  | "detalhes"
  | "analise";

const CONSULTA_STEP_ORDER: ConsultaStep[] = [
  "tipo",
  "selecao",
  "calendario",
  "detalhes",
  "analise",
];

const CONSULTA_STEP_LABELS: Record<ConsultaStep, string> = {
  tipo: "1. Por onde começou",
  selecao: "2. Destinos e experiências",
  calendario: "3. Datas e detalhes por destino",
  detalhes: "4. Resumo",
  analise: "5. Análise da nossa equipe",
};

function DetalhePlanoView({
  plano,
  nomeUsuario,
  avatarUrlUsuario,
  onVoltar,
}: {
  plano: PlanoViagem;
  nomeUsuario: string;
  avatarUrlUsuario?: string | undefined;
  onVoltar: () => void;
}) {
  const [stepConsulta, setStepConsulta] = useState<ConsultaStep>("analise");
  const [destinoAtualIndex, setDestinoAtualIndex] = useState(0);
  const [interacoes, setInteracoes] = useState<Interacao[]>(
    plano.interacoes ?? [],
  );
  const [mensagem, setMensagem] = useState("");

  const selecaoAtual = plano.selecoes[destinoAtualIndex];
  const destinoAtualInfo = selecaoAtual
    ? destinos.find((d) => d.slug === selecaoAtual.destinoSlug)
    : undefined;

  const nomesDestinos = plano.selecoes
    .map((s) => destinos.find((d) => d.slug === s.destinoSlug)?.nome)
    .filter((n): n is string => !!n);

  const iniciosValidos = plano.selecoes
    .map((s) => s.dataInicio)
    .filter((d): d is string => !!d);
  const fimValidos = plano.selecoes
    .map((s) => s.dataFim)
    .filter((d): d is string => !!d);
  const inicioGeral =
    iniciosValidos.length > 0
      ? iniciosValidos.reduce((min, d) => (d < min ? d : min))
      : undefined;
  const fimGeral =
    fimValidos.length > 0
      ? fimValidos.reduce((max, d) => (d > max ? d : max))
      : undefined;

  function handleEnviarMensagem() {
    if (!mensagem.trim()) return;
    const atualizado = adicionarInteracao(plano.id, {
      autor: "usuario",
      texto: mensagem.trim(),
      tipo: "mensagem",
    });
    if (atualizado) setInteracoes(atualizado.interacoes);
    setMensagem("");
  }

  function handleResponderSugestao(
    interacaoId: string,
    status: "aceita" | "recusada",
  ) {
    const atualizado = responderSugestao(plano.id, interacaoId, status);
    if (atualizado) setInteracoes(atualizado.interacoes);
  }

  function renderPainelDestino() {
    if (!selecaoAtual || !destinoAtualInfo) return null;

    const exps = (selecaoAtual.experienciaSlugs ?? [])
      .map((s) => experiencias.find((e) => e.slug === s))
      .filter((e): e is (typeof experiencias)[number] => !!e);
    const noites = noitesEntre(selecaoAtual.dataInicio, selecaoAtual.dataFim);
    const interesses = selecaoAtual.interesses ?? [];
    const inclusos = selecaoAtual.inclusos ?? [];

    return (
      <div className="space-y-6">
        {plano.selecoes.length > 1 && (
          <div className="flex items-center justify-center gap-1">
            {plano.selecoes.map((s, i) => {
              const ativo = i === destinoAtualIndex;
              return (
                <div key={s.destinoSlug} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setDestinoAtualIndex(i)}
                    aria-label={`Ir para o destino ${i + 1}`}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      ativo
                        ? "bg-primary text-primary-foreground"
                        : "border-2 border-primary bg-transparent text-primary hover:bg-primary/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                  {i < plano.selecoes.length - 1 && (
                    <div className="h-0.5 w-8 bg-primary" />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {plano.selecoes.length > 1 && (
          <p className="text-center text-sm font-medium text-muted-foreground">
            {destinoAtualInfo.nome}
          </p>
        )}

        <div className="relative overflow-hidden rounded-2xl">
          {destinoAtualInfo.imagem ? (
            <img
              src={destinoAtualInfo.imagem}
              alt={destinoAtualInfo.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-forest-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/75 to-forest-900/60" />
          <div className="relative p-6">
            <p className="font-display text-xl text-sand-50">
              {destinoAtualInfo.nome}
            </p>
            <p className="mt-1 text-sm text-sand-50/80">
              {selecaoAtual.dataInicio && selecaoAtual.dataFim
                ? `${new Date(`${selecaoAtual.dataInicio}T00:00:00`).toLocaleDateString("pt-BR")} a ${new Date(`${selecaoAtual.dataFim}T00:00:00`).toLocaleDateString("pt-BR")} · ${noites} noites`
                : "Datas a combinar"}
            </p>

            <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_auto]">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-sand-50">
                      Adultos
                    </label>
                    <input
                      type="number"
                      value={selecaoAtual.adultos ?? 2}
                      disabled
                      className="mt-1.5 w-full rounded-xl border border-sand-50/30 bg-background/90 px-4 py-2.5 text-sm outline-none disabled:opacity-90"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-sand-50">
                      Crianças
                    </label>
                    <input
                      type="number"
                      value={selecaoAtual.criancas ?? 0}
                      disabled
                      className="mt-1.5 w-full rounded-xl border border-sand-50/30 bg-background/90 px-4 py-2.5 text-sm outline-none disabled:opacity-90"
                    />
                  </div>
                </div>
                {(selecaoAtual.idadesCriancas ?? []).length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(selecaoAtual.idadesCriancas ?? []).map((idade, i) => (
                      <div key={i}>
                        <label className="text-sm font-medium text-sand-50">
                          Idade da criança {i + 1}
                        </label>
                        <input
                          type="number"
                          value={idade}
                          disabled
                          className="mt-1.5 w-full rounded-xl border border-sand-50/30 bg-background/90 px-4 py-2.5 text-sm outline-none disabled:opacity-90"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {exps.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-sand-50">
                      Experiências em {destinoAtualInfo.nome.split(",")[0]}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exps.map((exp) => (
                        <span
                          key={exp.slug}
                          className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {exp.titulo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {interesses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-sand-50">
                      Interesses em {destinoAtualInfo.nome.split(",")[0]}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {interesses.map((interesse) => (
                        <span
                          key={interesse}
                          className="rounded-full border border-sand-50/40 bg-sand-50/10 px-3 py-1.5 text-sm text-sand-50"
                        >
                          {interesse}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {inclusos.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-sand-50">
                      O que gostaria que estivesse incluso em{" "}
                      {destinoAtualInfo.nome.split(",")[0]}?
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {inclusos.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-sand-50/40 bg-sand-50/10 px-3 py-1.5 text-sm text-sand-50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selecaoAtual.contextoDestino && (
                  <div>
                    <label className="text-sm font-medium text-sand-50">
                      O que vai fazer da passagem por{" "}
                      {destinoAtualInfo.nome.split(",")[0]} inesquecível
                    </label>
                    <textarea
                      rows={2}
                      value={selecaoAtual.contextoDestino}
                      disabled
                      className="mt-1.5 w-full resize-none rounded-xl border border-sand-50/30 bg-background/90 px-4 py-2.5 text-sm text-foreground outline-none disabled:opacity-90"
                    />
                  </div>
                )}
              </div>
              <div className="order-1 flex justify-center lg:order-2">
                <Calendar
                  rangeStart={selecaoAtual.dataInicio}
                  rangeEnd={selecaoAtual.dataFim}
                  onSelect={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="section-padding">
        <div className="container-tight">
          <div className="mx-auto max-w-2xl">
            <button
              type="button"
              onClick={onVoltar}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para minhas viagens
            </button>

            <div className="mt-6 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Planejar viagem
              </span>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <h1 className="text-balance text-3xl md:text-4xl">
                  Viagem de {nomeUsuario} para {juntarNomes(nomesDestinos)}
                </h1>
                <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
                  Em análise
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">
                {inicioGeral && fimGeral
                  ? `${new Date(`${inicioGeral}T00:00:00`).toLocaleDateString("pt-BR")} a ${new Date(`${fimGeral}T00:00:00`).toLocaleDateString("pt-BR")}`
                  : "Datas a combinar"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Enviado em{" "}
                {new Date(plano.criadoEm).toLocaleDateString("pt-BR")}. Previsão
                de retorno até{" "}
                {new Date(
                  new Date(plano.criadoEm).getTime() + 24 * 60 * 60 * 1000,
                ).toLocaleDateString("pt-BR")}{" "}
                às{" "}
                {new Date(
                  new Date(plano.criadoEm).getTime() + 24 * 60 * 60 * 1000,
                ).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-100">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between gap-1">
              {CONSULTA_STEP_ORDER.map((s, index) => {
                const ativo = s === stepConsulta;
                return (
                  <div key={s} className="flex flex-1 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setStepConsulta(s)}
                      aria-label={`Ver ${CONSULTA_STEP_LABELS[s]}`}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        ativo
                          ? "bg-primary text-primary-foreground"
                          : "border-2 border-primary bg-transparent text-primary hover:bg-primary/10"
                      }`}
                    >
                      {index + 1}
                    </button>
                    {index < CONSULTA_STEP_ORDER.length - 1 && (
                      <div className="h-0.5 flex-1 bg-primary/40" />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
              {CONSULTA_STEP_LABELS[stepConsulta]}
            </p>

            <div className="mt-10">
              {stepConsulta === "tipo" && (
                <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
                  <div
                    className={`flex flex-col items-center gap-4 rounded-2xl border p-8 text-center ${
                      plano.tipoInicial === "destinos"
                        ? "border-primary bg-card"
                        : "border-border bg-card opacity-50"
                    }`}
                  >
                    <MapPin className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-display text-xl">
                        Já sei o destino
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Começou escolhendo para onde ir, e depois viu as
                        experiências disponíveis em cada lugar.
                      </p>
                    </div>
                    {plano.tipoInicial === "destinos" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                        Escolhido
                      </span>
                    )}
                  </div>

                  <div
                    className={`flex flex-col items-center gap-4 rounded-2xl border p-8 text-center ${
                      plano.tipoInicial === "experiencias"
                        ? "border-primary bg-card"
                        : "border-border bg-card opacity-50"
                    }`}
                  >
                    <Sparkles className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-display text-xl">
                        Já sei o que quero viver
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Começou escolhendo experiências, e depois viu em quais
                        destinos elas acontecem.
                      </p>
                    </div>
                    {plano.tipoInicial === "experiencias" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                        Escolhido
                      </span>
                    )}
                  </div>
                </div>
              )}

              {stepConsulta === "selecao" && (
                <div className="mx-auto max-w-4xl space-y-12">
                  <div>
                    <h2 className="text-balance text-2xl md:text-3xl">
                      Destinos escolhidos
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {plano.selecoes.map((selecao) => {
                        const destino = destinos.find(
                          (d) => d.slug === selecao.destinoSlug,
                        );
                        if (!destino) return null;
                        return (
                          <div
                            key={selecao.destinoSlug}
                            className="relative overflow-hidden rounded-2xl border-2 border-primary"
                          >
                            <img
                              src={destino.imagem}
                              alt={destino.alt}
                              className="aspect-[4/3] w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/10 to-transparent" />
                            <div className="absolute right-3 top-3 rounded-full bg-primary p-1.5 text-primary-foreground">
                              <Check className="h-4 w-4" />
                            </div>
                            <p className="absolute bottom-3 left-4 right-4 font-display text-lg text-sand-50">
                              {destino.nome}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {plano.selecoes.map((selecao) => {
                    const destino = destinos.find(
                      (d) => d.slug === selecao.destinoSlug,
                    );
                    if (!destino) return null;
                    const escolhidas = (selecao.experienciaSlugs ?? [])
                      .map((s) => experiencias.find((e) => e.slug === s))
                      .filter((e): e is (typeof experiencias)[number] => !!e);
                    if (escolhidas.length === 0) return null;

                    return (
                      <div key={selecao.destinoSlug}>
                        <h3 className="font-display text-xl">
                          O que você quer viver em {destino.nome.split(",")[0]}?
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-3">
                          {escolhidas.map((exp) => (
                            <span
                              key={exp.slug}
                              className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                            >
                              <Check className="h-3.5 w-3.5" />
                              {exp.titulo}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {stepConsulta === "calendario" && renderPainelDestino()}

              {stepConsulta === "detalhes" &&
                (() => {
                  const experienciaSlugsUnicos = Array.from(
                    new Set(
                      plano.selecoes.flatMap((s) => s.experienciaSlugs ?? []),
                    ),
                  );
                  const experienciasUnicas = experienciaSlugsUnicos
                    .map((s) => experiencias.find((e) => e.slug === s))
                    .filter((e): e is (typeof experiencias)[number] => !!e);

                  const interessesUnicos = Array.from(
                    new Set(
                      plano.selecoes.flatMap((s) => s.interesses ?? []),
                    ),
                  );

                  return (
                    <div className="mx-auto max-w-3xl space-y-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Destinos
                        </p>
                        <div className="mt-3 grid gap-6 sm:grid-cols-2">
                          {plano.selecoes.map((selecao) => {
                            const destino = destinos.find(
                              (d) => d.slug === selecao.destinoSlug,
                            );
                            const noites = noitesEntre(
                              selecao.dataInicio,
                              selecao.dataFim,
                            );

                            return (
                              <div
                                key={selecao.destinoSlug}
                                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                              >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                  {destino?.imagem ? (
                                    <img
                                      src={destino.imagem}
                                      alt={destino.alt}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-full w-full bg-forest-800" />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                                  <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="font-display text-2xl text-sand-50">
                                      {destino?.nome}
                                    </h3>
                                    <p className="text-sm text-forest-100">
                                      {selecao.dataInicio && selecao.dataFim
                                        ? `${new Date(`${selecao.dataInicio}T00:00:00`).toLocaleDateString("pt-BR")} a ${new Date(`${selecao.dataFim}T00:00:00`).toLocaleDateString("pt-BR")} · ${noites} noites · ${selecao.adultos ?? 2} adulto(s)${(selecao.criancas ?? 0) > 0 ? `, ${selecao.criancas} criança(s)` : ""}`
                                        : "Datas a combinar"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex-1 p-6">
                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {selecao.contextoDestino ||
                                      "Sem comentários adicionais para esse destino."}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {experienciasUnicas.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Experiências
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {experienciasUnicas.map((exp) => (
                              <span
                                key={exp.slug}
                                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                              >
                                <Check className="h-3.5 w-3.5" />
                                {exp.titulo}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {interessesUnicos.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Interesses
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {interessesUnicos.map((interesse) => (
                              <span
                                key={interesse}
                                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                              >
                                <Check className="h-3.5 w-3.5" />
                                {interesse}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

              {stepConsulta === "analise" && (
                <div className="mx-auto max-w-2xl space-y-6">
                  <div className="text-center">
                    <h2 className="font-display text-2xl md:text-3xl">
                      Análise da nossa equipe
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Nosso time responde em até 24 horas com os próximos passos
                      do seu plano. Você pode enviar dúvidas por aqui a qualquer
                      momento.
                    </p>
                  </div>

                  <div>
                    {interacoes.map((interacao, index) => {
                      const isUsuario = interacao.autor === "usuario";
                      const isUltima = index === interacoes.length - 1;
                      return (
                        <div key={interacao.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary">
                              {isUsuario && avatarUrlUsuario ? (
                                <img
                                  src={avatarUrlUsuario}
                                  alt={nomeUsuario}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User
                                  className={`h-4 w-4 ${isUsuario ? "text-primary" : "text-muted-foreground"}`}
                                />
                              )}
                            </div>
                            {!isUltima && (
                              <div className="mt-1 w-0.5 flex-1 bg-border" />
                            )}
                          </div>
                          <div className={isUltima ? "flex-1" : "flex-1 pb-6"}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {interacao.autor === "usuario"
                                ? "Você"
                                : "Analista da Aventura Organizada"}{" "}
                              ·{" "}
                              {new Date(interacao.criadoEm).toLocaleDateString(
                                "pt-BR",
                              )}{" "}
                              às{" "}
                              {new Date(interacao.criadoEm).toLocaleTimeString(
                                "pt-BR",
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </p>
                            <p className="mt-1.5 text-sm text-foreground">
                              {interacao.texto}
                            </p>

                            {interacao.tipo === "sugestao" && (
                              <div className="mt-3">
                                {interacao.sugestaoStatus === "aceita" ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                                    <Check className="h-3.5 w-3.5" />
                                    Sugestão aceita
                                  </span>
                                ) : interacao.sugestaoStatus === "recusada" ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                                    <X className="h-3.5 w-3.5" />
                                    Sugestão recusada
                                  </span>
                                ) : (
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleResponderSugestao(
                                          interacao.id,
                                          "aceita",
                                        )
                                      }
                                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      Aceitar
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleResponderSugestao(
                                          interacao.id,
                                          "recusada",
                                        )
                                      }
                                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                      Recusar
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-4">
                    <label
                      htmlFor="mensagem-analista"
                      className="text-sm font-medium text-foreground"
                    >
                      Enviar mensagem para o analista
                    </label>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <textarea
                        id="mensagem-analista"
                        rows={2}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Escreva sua dúvida ou comentário..."
                        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={handleEnviarMensagem}
                        disabled={!mensagem.trim()}
                        className="inline-flex shrink-0 items-center justify-center gap-2 self-end rounded-full bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40 sm:self-stretch"
                      >
                        <Send className="h-4 w-4" />
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
