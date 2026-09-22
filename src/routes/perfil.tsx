import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  User,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/perfil")({
  component: () => (
    <RequireAuth>
      <PerfilPage />
    </RequireAuth>
  ),
});

type EtapaPerfil = "dados" | "endereco" | "contato";

const ETAPA_ORDER: EtapaPerfil[] = ["dados", "endereco", "contato"];

const ETAPA_LABELS: Record<EtapaPerfil, string> = {
  dados: "1. Seus dados",
  endereco: "2. Endereço",
  contato: "3. Telefone",
};

function PerfilPage() {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [etapa, setEtapa] = useState<EtapaPerfil>("dados");

  const [nome, setNome] = useState(user?.nome ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl);

  const [cep, setCep] = useState(user?.cep ?? "");
  const [endereco, setEndereco] = useState(user?.endereco ?? "");
  const [numero, setNumero] = useState(user?.numero ?? "");
  const [complemento, setComplemento] = useState(user?.complemento ?? "");
  const [bairro, setBairro] = useState(user?.bairro ?? "");
  const [cidade, setCidade] = useState(user?.cidade ?? "");
  const [estado, setEstado] = useState(user?.estado ?? "");

  const [telefone, setTelefone] = useState(user?.telefone ?? "");

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState<string | null>(null);

  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const etapaIndex = ETAPA_ORDER.indexOf(etapa);

  async function buscarCep(valor: string) {
    const digitos = valor.replace(/\D/g, "");
    if (digitos.length !== 8) return;

    setErroCep(null);
    setBuscandoCep(true);
    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${digitos}/json/`,
      );
      const dados = await resposta.json();
      if (dados.erro) {
        setErroCep("CEP não encontrado.");
        return;
      }
      setEndereco(dados.logradouro || "");
      setBairro(dados.bairro || "");
      setCidade(dados.localidade || "");
      setEstado(dados.uf || "");
      setSalvo(false);
    } catch {
      setErroCep("Não foi possível consultar o CEP agora.");
    } finally {
      setBuscandoCep(false);
    }
  }

  function handleImagemSelecionada(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = () => {
      setAvatarUrl(leitor.result as string);
      setSalvo(false);
    };
    leitor.readAsDataURL(arquivo);
  }

  function irPara(destino: EtapaPerfil) {
    setSalvo(false);
    setEtapa(destino);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);
    setSalvando(true);
    try {
      await updateProfile({
        nome,
        avatarUrl,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        telefone,
      });
      setSalvo(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível salvar.");
    } finally {
      setSalvando(false);
    }
  }

  if (!user) return null;

  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Minha conta
            </span>
            <h1 className="mt-3 text-balance text-3xl md:text-4xl">
              Editar perfil
            </h1>
            <p className="mt-4 text-muted-foreground">
              Só mais alguns dados, um passo de cada vez.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {ETAPA_ORDER.map((e, index) => (
              <div key={e} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => irPara(e)}
                  aria-label={`Ir para ${ETAPA_LABELS[e]}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    index <= etapaIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {index < etapaIndex ? <Check className="h-4 w-4" /> : index + 1}
                </button>
                {index < ETAPA_ORDER.length - 1 && (
                  <div
                    className={`h-0.5 w-8 ${
                      index < etapaIndex ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
            {ETAPA_LABELS[etapa]}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6 rounded-2xl border border-border bg-card p-6"
          >
            {etapa === "dados" && (
              <>
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative h-24 w-24 overflow-hidden rounded-full border-2 border-border"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={nome}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <User className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-forest-900/0 text-transparent transition-colors group-hover:bg-forest-900/50 group-hover:text-sand-50">
                      <Camera className="h-6 w-6" />
                    </div>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImagemSelecionada}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-semibold uppercase tracking-wide text-primary hover:text-primary/80"
                  >
                    {avatarUrl ? "Trocar imagem" : "Adicionar imagem"}
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="nome"
                    className="text-sm font-medium text-foreground"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      setSalvo(false);
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <p className="mt-1.5 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </>
            )}

            {etapa === "endereco" && (
              <>
                <p className="text-sm text-muted-foreground">
                  Esse endereço ajuda a gente a preparar propostas e envios
                  certinhos para você.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cep"
                      className="text-sm font-medium text-foreground"
                    >
                      CEP
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        id="cep"
                        type="text"
                        inputMode="numeric"
                        value={cep}
                        onChange={(e) => {
                          setCep(e.target.value);
                          setSalvo(false);
                          setErroCep(null);
                          void buscarCep(e.target.value);
                        }}
                        onBlur={(e) => void buscarCep(e.target.value)}
                        placeholder="00000-000"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                      {buscandoCep && (
                        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                      )}
                    </div>
                    {erroCep && (
                      <p className="mt-1 text-xs text-destructive">
                        {erroCep}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="numero"
                      className="text-sm font-medium text-foreground"
                    >
                      Número
                    </label>
                    <input
                      id="numero"
                      type="text"
                      value={numero}
                      onChange={(e) => {
                        setNumero(e.target.value);
                        setSalvo(false);
                      }}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="endereco"
                    className="text-sm font-medium text-foreground"
                  >
                    Endereço
                  </label>
                  <input
                    id="endereco"
                    type="text"
                    value={endereco}
                    onChange={(e) => {
                      setEndereco(e.target.value);
                      setSalvo(false);
                    }}
                    placeholder="Rua, avenida..."
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="complemento"
                    className="text-sm font-medium text-foreground"
                  >
                    Complemento (opcional)
                  </label>
                  <input
                    id="complemento"
                    type="text"
                    value={complemento}
                    onChange={(e) => {
                      setComplemento(e.target.value);
                      setSalvo(false);
                    }}
                    placeholder="Apto, bloco, referência..."
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bairro"
                    className="text-sm font-medium text-foreground"
                  >
                    Bairro
                  </label>
                  <input
                    id="bairro"
                    type="text"
                    value={bairro}
                    onChange={(e) => {
                      setBairro(e.target.value);
                      setSalvo(false);
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <label
                      htmlFor="cidade"
                      className="text-sm font-medium text-foreground"
                    >
                      Cidade
                    </label>
                    <input
                      id="cidade"
                      type="text"
                      value={cidade}
                      onChange={(e) => {
                        setCidade(e.target.value);
                        setSalvo(false);
                      }}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="estado"
                      className="text-sm font-medium text-foreground"
                    >
                      UF
                    </label>
                    <input
                      id="estado"
                      type="text"
                      maxLength={2}
                      value={estado}
                      onChange={(e) => {
                        setEstado(e.target.value.toUpperCase());
                        setSalvo(false);
                      }}
                      placeholder="SP"
                      className="mt-1.5 w-16 rounded-xl border border-border bg-background px-4 py-2.5 text-center text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>
              </>
            )}

            {etapa === "contato" && (
              <>
                <p className="text-sm text-muted-foreground">
                  Por último, um telefone para a gente confirmar detalhes da
                  sua viagem.
                </p>
                <div>
                  <label
                    htmlFor="telefone"
                    className="text-sm font-medium text-foreground"
                  >
                    Telefone (com DDD)
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => {
                      setTelefone(e.target.value);
                      setSalvo(false);
                    }}
                    placeholder="(11) 96322-0494"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </>
            )}

            {erro && <p className="text-sm text-destructive">{erro}</p>}
            {salvo && (
              <p className="text-sm text-primary">
                Perfil atualizado com sucesso.
              </p>
            )}

            <div className="flex items-center justify-between border-t border-border pt-6">
              {etapaIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => irPara(ETAPA_ORDER[etapaIndex - 1]!)}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
              ) : (
                <span />
              )}

              {etapaIndex < ETAPA_ORDER.length - 1 ? (
                <button
                  type="button"
                  onClick={() => irPara(ETAPA_ORDER[etapaIndex + 1]!)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Avançar
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={salvando}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
