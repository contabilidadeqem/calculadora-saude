"use client";

import { useState, useMemo, useCallback } from "react";
import ProgressBar from "./ProgressBar";
import BackButton from "./BackButton";
import Footer from "./Footer";
import Step1Hero from "./steps/Step1Hero";
import Step2Area from "./steps/Step2Area";
import Step3About from "./steps/Step3About";
import Step4Faturamento from "./steps/Step4Faturamento";
import Step5Regime from "./steps/Step5Regime";
import Step6Procedimentos from "./steps/Step6Procedimentos";
import Step7Lead from "./steps/Step7Lead";
import { calcular, type Area, type Regime } from "@/lib/calc";

const AREA_LABELS: Record<Area, string> = {
  medico: "Médico",
  dentista: "Cirurgião-dentista",
  clinica: "Clínica / consultório",
  outros: "Outros (saúde)",
};

const REGIME_LABELS: Record<Regime, string> = {
  simples: "Simples Nacional",
  presumido: "Lucro Presumido",
};

const TOTAL = 7;

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [faturamento, setFaturamento] = useState(0);
  const [regime, setRegime] = useState<Regime | null>(null);
  const [procedimentos, setProcedimentos] = useState<boolean | null>(null);

  const next = useCallback(() => setStep((s) => Math.min(TOTAL, s + 1)), []);
  const back = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  const result = useMemo(() => {
    return calcular({
      faturamentoMensal: faturamento,
      regime: regime ?? "presumido",
      procedimentos: procedimentos ?? false,
      area: area ?? "medico",
    });
  }, [faturamento, regime, procedimentos, area]);

  return (
    <main className="flex-1 flex flex-col">
      <section className="bg-hero">
        <div className="max-w-2xl w-full mx-auto px-6 pt-8 pb-12">
          <div className="flex items-center gap-3 mb-6">
            {step > 1 ? <BackButton onClick={back} /> : <div className="h-9 w-9" />}
            <div className="flex-1">
              <ProgressBar step={step} total={TOTAL} />
            </div>
          </div>

          {step === 1 && <Step1Hero onNext={next} />}
          {step === 2 && (
            <Step2Area
              value={area}
              onChange={(v) => {
                setArea(v);
                setTimeout(next, 200);
              }}
            />
          )}
          {step === 3 && <Step3About onNext={next} />}
          {step === 4 && (
            <Step4Faturamento
              value={faturamento}
              onChange={setFaturamento}
              onNext={next}
            />
          )}
          {step === 5 && (
            <Step5Regime
              value={regime}
              onChange={setRegime}
              onNext={next}
            />
          )}
          {step === 6 && (
            <Step6Procedimentos
              value={procedimentos}
              onChange={setProcedimentos}
              onNext={next}
            />
          )}
          {step === 7 && (
            <Step7Lead
              result={result}
              areaLabel={area ? AREA_LABELS[area] : ""}
              regimeLabel={regime ? REGIME_LABELS[regime] : ""}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
