export type Regime = "presumido" | "simples";
export type Area = "medico" | "dentista" | "clinica" | "outros";

export interface CalcInput {
  faturamentoMensal: number;
  regime: Regime;
  procedimentos: boolean;
  area: Area;
}

export interface CalcResult {
  elegivel: boolean;
  motivo?: string;
  faturamentoMensal: number;
  faturamentoAnual: number;
  impostoAtualMensal: number;
  impostoComEquiparacaoMensal: number;
  economiaMensal: number;
  economiaAnual: number;
  reducaoPercentual: number;
}

// Lucro Presumido — alíquotas efetivas sobre o faturamento (saúde):
// Sem equiparação: presunção 32%
//   IRPJ 15% × 32% = 4,8%
//   CSLL 9% × 32% = 2,88%
// Com equiparação (Lei 9.249/95): presunção 8% (IRPJ) / 12% (CSLL)
//   IRPJ 15% × 8% = 1,2%
//   CSLL 9% × 12% = 1,08%
// (Adicional de 10% do IRPJ sobre lucro presumido acima de R$ 20k/mês ignorado para estimativa.)
const PRESUMIDO_SEM_EQUIP = 0.048 + 0.0288; // 7,68%
const PRESUMIDO_COM_EQUIP = 0.012 + 0.0108; // 2,28%

// Simples Nacional Anexo III (saúde com fator R atendido) — alíquota efetiva média ~6%-15,5%.
// Para a estimativa usamos uma alíquota de referência por faixa.
function aliquotaSimplesAnualizada(faturamentoAnual: number): number {
  // Aproximação simplificada baseada no Anexo III + abatimento da PD.
  if (faturamentoAnual <= 180_000) return 0.06;
  if (faturamentoAnual <= 360_000) return 0.092; // 11,2% − PD/RBT12
  if (faturamentoAnual <= 720_000) return 0.105;
  if (faturamentoAnual <= 1_800_000) return 0.122;
  if (faturamentoAnual <= 3_600_000) return 0.145;
  return 0.155;
}

export function calcular(input: CalcInput): CalcResult {
  const faturamentoMensal = Math.max(0, input.faturamentoMensal);
  const faturamentoAnual = faturamentoMensal * 12;

  const base: CalcResult = {
    elegivel: false,
    faturamentoMensal,
    faturamentoAnual,
    impostoAtualMensal: 0,
    impostoComEquiparacaoMensal: 0,
    economiaMensal: 0,
    economiaAnual: 0,
    reducaoPercentual: 0,
  };

  if (faturamentoMensal <= 0) {
    return { ...base, motivo: "Informe um faturamento válido." };
  }

  if (!input.procedimentos) {
    return {
      ...base,
      motivo:
        "A equiparação hospitalar exige a realização de exames, cirurgias ou outros procedimentos — apenas consultas não se enquadram.",
    };
  }

  if (input.regime === "presumido") {
    const impostoAtualMensal = faturamentoMensal * PRESUMIDO_SEM_EQUIP;
    const impostoComEquiparacaoMensal =
      faturamentoMensal * PRESUMIDO_COM_EQUIP;
    const economiaMensal = impostoAtualMensal - impostoComEquiparacaoMensal;
    return {
      ...base,
      elegivel: true,
      impostoAtualMensal,
      impostoComEquiparacaoMensal,
      economiaMensal,
      economiaAnual: economiaMensal * 12,
      reducaoPercentual:
        (1 - PRESUMIDO_COM_EQUIP / PRESUMIDO_SEM_EQUIP) * 100, // ~70,3%
    };
  }

  // Simples Nacional → cenário de migração para Lucro Presumido com equiparação
  const aliqSimples = aliquotaSimplesAnualizada(faturamentoAnual);
  const impostoAtualMensal = faturamentoMensal * aliqSimples;
  const impostoComEquiparacaoMensal =
    faturamentoMensal * (PRESUMIDO_COM_EQUIP + 0.0365); // + PIS/COFINS cumulativos 3,65%
  const economiaMensal = Math.max(
    0,
    impostoAtualMensal - impostoComEquiparacaoMensal
  );
  return {
    ...base,
    elegivel: true,
    impostoAtualMensal,
    impostoComEquiparacaoMensal,
    economiaMensal,
    economiaAnual: economiaMensal * 12,
    reducaoPercentual:
      impostoAtualMensal > 0
        ? (economiaMensal / impostoAtualMensal) * 100
        : 0,
  };
}
