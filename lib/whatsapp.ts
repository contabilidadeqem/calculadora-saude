import type { CalcResult } from "./calc";
import { formatBRL } from "./format";

export const WHATSAPP_DESTINO = "5581994034692";

export interface LeadData {
  nome: string;
  email: string;
  whatsapp: string;
  area: string;
  regime: string;
}

export function buildWhatsAppMessage(
  lead: LeadData,
  result: CalcResult
): string {
  const linhas: string[] = [
    `Olá Q&M Consultoria! Acabei de simular minha economia tributária.`,
    ``,
    `*Meus dados:*`,
    `Nome: ${lead.nome}`,
    `E-mail: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Área: ${lead.area}`,
    `Regime atual: ${lead.regime}`,
    `Faturamento mensal: ${formatBRL(result.faturamentoMensal)}`,
    ``,
  ];

  if (result.elegivel) {
    linhas.push(
      `*Resultado da simulação:*`,
      `Imposto atual estimado: ${formatBRL(result.impostoAtualMensal)}/mês`,
      `Com Equiparação Hospitalar: ${formatBRL(
        result.impostoComEquiparacaoMensal
      )}/mês`,
      `Economia mensal: ${formatBRL(result.economiaMensal)}`,
      `Economia anual: ${formatBRL(result.economiaAnual)}`,
      `Redução: ${result.reducaoPercentual.toFixed(1)}%`,
      ``,
      `Quero entender como aplicar isso no meu CNPJ.`
    );
  } else {
    linhas.push(
      `Gostaria de conversar sobre planejamento tributário para minha PJ da saúde.`
    );
  }

  return linhas.join("\n");
}

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_DESTINO}?text=${encodeURIComponent(
    message
  )}`;
}
