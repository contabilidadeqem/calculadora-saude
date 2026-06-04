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

/**
 * Gera a URL pública (relativa) da imagem PNG personalizada com os dados do lead.
 * Em produção fica em https://<seu-domínio>/api/result-image?...
 */
export function buildImageURL(
  origin: string,
  lead: Pick<LeadData, "nome">,
  result: CalcResult
): string {
  const params = new URLSearchParams({
    nome: lead.nome,
    em: String(Math.round(result.economiaMensal)),
    ea: String(Math.round(result.economiaAnual)),
    r: String(Math.round(result.reducaoPercentual)),
    f: String(Math.round(result.faturamentoMensal)),
  });
  return `${origin}/api/result-image?${params.toString()}`;
}

export function buildWhatsAppMessage(
  lead: LeadData,
  result: CalcResult,
  imageURL?: string
): string {
  const primeiroNome = lead.nome.trim().split(/\s+/)[0];

  const linhas: string[] = [
    `Olá Q&M Consultoria! Sou ${primeiroNome}, acabei de simular minha economia tributária pela calculadora.`,
    ``,
  ];

  if (result.elegivel) {
    linhas.push(
      `Faturamento mensal: ${formatBRL(result.faturamentoMensal)}`,
      `Regime atual: ${lead.regime}`,
      `Área: ${lead.area}`,
      ``,
      `*Economia estimada com Equiparação Hospitalar:*`,
      `${formatBRL(result.economiaMensal)} / mês`,
      `${formatBRL(result.economiaAnual)} / ano`,
      `Redução: ${result.reducaoPercentual.toFixed(0)}%`,
      ``
    );
    if (imageURL) {
      linhas.push(`Veja minha análise completa: ${imageURL}`, ``);
    }
    linhas.push(`Quero entender como aplicar isso no meu CNPJ.`);
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
