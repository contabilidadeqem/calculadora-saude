"use client";

const options: { value: boolean; label: string; hint: string }[] = [
  {
    value: true,
    label: "Sim, realizo exames ou procedimentos",
    hint: "Cirurgias, exames, terapias, intervenções clínicas",
  },
  {
    value: false,
    label: "Atendo apenas consultas",
    hint: "Atendimento exclusivamente consultivo",
  },
];

export default function Step6Procedimentos({
  value,
  onChange,
  onNext,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="heading-display">
          Sua atuação inclui exames ou procedimentos?
        </h2>
        <p className="text-muted-soft">
          A equiparação hospitalar se aplica a profissionais da saúde que
          realizam exames, cirurgias ou outros procedimentos — não apenas
          consultas.
        </p>
      </header>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
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
        disabled={value === null}
        className="cta-primary w-full"
      >
        Continuar
      </button>
    </div>
  );
}
