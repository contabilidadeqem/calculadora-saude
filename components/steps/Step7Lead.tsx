"use client";
import { useState } from "react";
import type { CalcResult } from "@/lib/calc";
import { formatPhoneBR } from "@/lib/format";
import { buildWhatsAppMessage, buildWhatsAppURL } from "@/lib/whatsapp";

interface Props {
  result: CalcResult;
  areaLabel: string;
  regimeLabel: string;
}

export default function Step7Lead({ result, areaLabel, regimeLabel }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneDigits = whatsapp.replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 10 && phoneDigits.length <= 11;
  const nomeValid = nome.trim().split(/\s+/).length >= 2;
  const allValid = nomeValid && emailValid && phoneValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid || submitting) return;

    setSubmitting(true);

    // 1) Manda o lead pro HubSpot (silencioso, não bloqueia se falhar).
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          whatsapp: formatPhoneBR(phoneDigits),
          areaInternal: areaLabel,
          regimeInternal: regimeLabel,
          faturamentoMensal: result.faturamentoMensal,
          economiaMensal: result.economiaMensal,
          economiaAnual: result.economiaAnual,
          pageUri:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
        keepalive: true,
      });
    } catch (err) {
      // Não bloqueia o WhatsApp se a chamada falhar.
      console.warn("Falha ao registrar lead no CRM:", err);
    }

    // 2) Abre o WhatsApp com a mensagem pré-montada.
    const msg = buildWhatsAppMessage(
      {
        nome: nome.trim(),
        email: email.trim(),
        whatsapp: formatPhoneBR(phoneDigits),
        area: areaLabel,
        regime: regimeLabel,
      },
      result
    );
    window.open(buildWhatsAppURL(msg), "_blank", "noopener,noreferrer");

    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#25D366] flex items-center justify-center text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.93 9.93 0 0 0 5.76 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.39 1.3-1.95 1.39-.5.08-1.14.11-1.84-.12-.42-.13-.97-.31-1.66-.61-2.93-1.27-4.85-4.21-4.99-4.4-.15-.19-1.2-1.59-1.2-3.03 0-1.44.76-2.15 1.03-2.44.27-.29.59-.36.78-.36.2 0 .39.01.56.01.18.01.42-.07.66.5.24.58.83 2.01.9 2.16.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.3.36-.43.49-.14.13-.29.28-.13.55.17.27.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.29 1.41.27.13.43.11.59-.07.16-.18.69-.8.87-1.07.18-.27.36-.22.61-.13.25.09 1.58.74 1.85.88.27.13.45.2.51.31.07.12.07.66-.17 1.33z" />
          </svg>
        </div>
        <h2 className="heading-display">Receba seu resultado pelo WhatsApp.</h2>
      </div>

      <p className="text-muted-soft">
        Preencha os dados abaixo para finalizar e receber seu relatório
        personalizado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="field">
          <label htmlFor="nome">Nome e sobrenome</label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            placeholder="Digite seu nome e sobrenome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail principal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            id="whatsapp"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            placeholder="(11) 99999-9999"
            value={formatPhoneBR(whatsapp)}
            onChange={(e) =>
              setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 11))
            }
          />
        </div>

        <button
          type="submit"
          disabled={!allValid || submitting}
          className="cta-primary w-full mt-2"
        >
          {submitting ? "Enviando..." : "Receber agora"}
        </button>
      </form>

      <p className="text-xs text-muted-soft">
        Ao continuar, seus dados serão usados exclusivamente para envio do
        resultado e contato pela Q&amp;M Consultoria.
      </p>
    </div>
  );
}
