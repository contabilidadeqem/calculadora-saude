"use client";
import type { Regime } from "@/lib/calc";

const options: { value: Regime; label: string; hint: string }[] = [
  {
    value: "simples",
    label: "Simples Nacional",
    hint: "Anexo III ou V",
  },
  {
    value: "presumido",
    label: "Lucro Presumido",
    hint: "Tributação por presunção",
  },
];

export default function Step5Regime({
  value,
  onChange,
  onNext,
}: {
  value: Regime | null;
  onChange: (v: Regime) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="heading-display">Qual seu regime tributário?</h2>
        <p className="text-muted-soft">
          Informe seu regime para estimarmos o valor do seu imposto atual.
        </p>
      </header>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className="option-card"
            data-selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            <div className="text-[17px]">{opt.label}</div>
            <div className="text-xs text-muted-soft mt-1">{opt.hint}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="cta-primary w-full"
      >
        Continuar
      </button>

      <p className="text-xs text-muted-soft">
        Não sabe? Sem problema — seu contador ou nossa equipe identifica.
      </p>
    </div>
  );
}
