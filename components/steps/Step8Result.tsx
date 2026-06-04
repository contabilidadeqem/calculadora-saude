"use client";
import { useMemo } from "react";
import type { CalcResult } from "@/lib/calc";
import {
  buildImageURL,
  buildWhatsAppMessage,
  buildWhatsAppURL,
  type LeadData,
} from "@/lib/whatsapp";

interface Props {
  lead: LeadData;
  result: CalcResult;
}

export default function Step8Result({ lead, result }: Props) {
  const { imageURL, whatsappURL } = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const img = buildImageURL(origin, lead, result);
    const msg = buildWhatsAppMessage(lead, result, img);
    return { imageURL: img, whatsappURL: buildWhatsAppURL(msg) };
  }, [lead, result]);

  const handleWhatsApp = () => {
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(imageURL);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analise-tributaria-${lead.nome
        .trim()
        .split(/\s+/)[0]
        .toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn("Falha ao baixar imagem:", err);
      window.open(imageURL, "_blank");
    }
  };

  if (!result.elegivel) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="heading-display">Recebemos sua simulação!</h2>
        <p className="text-muted-soft">
          Pelo perfil informado, o benefício de Equiparação Hospitalar pode não
          ser o caminho direto — mas existem outras estratégias tributárias para
          PJs da saúde. Nossa equipe vai entrar em contato pelo WhatsApp.
        </p>
        <button onClick={handleWhatsApp} className="cta-primary w-full">
          Falar com especialista agora
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Análise pronta
        </div>
        <h2 className="heading-display">
          {lead.nome.trim().split(/\s+/)[0]}, sua análise está pronta.
        </h2>
        <p className="text-muted-soft text-sm">
          Toque em <strong>Enviar análise pelo WhatsApp</strong> para receber
          essa imagem + falar com nosso especialista.
        </p>
      </header>

      <div className="rounded-card overflow-hidden border border-white/10 bg-white/[0.04]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageURL}
          alt={`Análise tributária para ${lead.nome}`}
          className="w-full h-auto block"
          loading="eager"
        />
      </div>

      <div className="space-y-3">
        <button
          onClick={handleWhatsApp}
          className="cta-primary w-full flex items-center justify-center gap-2"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.93 9.93 0 0 0 5.76 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2z" />
          </svg>
          Enviar análise pelo WhatsApp
        </button>
        <button
          onClick={handleDownload}
          className="w-full py-3 rounded-cta border border-white/15 bg-white/[0.04] text-cream-100 text-sm font-medium uppercase tracking-wider hover:bg-white/[0.08] transition-colors"
        >
          Baixar imagem
        </button>
      </div>

      <p className="text-xs text-muted-soft text-center">
        Cálculo estimativo. Análise tributária definitiva feita pela equipe da
        Q&amp;M Consultoria.
      </p>
    </div>
  );
}
