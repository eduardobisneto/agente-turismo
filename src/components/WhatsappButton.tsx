import { MessageCircle } from "lucide-react";

export function WhatsappButton({
  variant = "outline",
}: {
  variant?: "outline" | "solid";
}) {
  const numero = "5511999999999";
  const mensagem = encodeURIComponent(
    "Olá! Quero saber mais sobre os pacotes de turismo de aventura para Bonito, Socorro, Brotas e Ubatuba.",
  );

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";
  const variantClasses =
    variant === "solid"
      ? "bg-[#25D366] text-white hover:bg-[#128C7E]"
      : "border border-forest-700 bg-transparent text-sand-50 hover:bg-forest-800";

  return (
    <a
      href={`https://wa.me/${numero}?text=${mensagem}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses}`}
    >
      <MessageCircle className="h-4 w-4" />
      Falar no WhatsApp
    </a>
  );
}
