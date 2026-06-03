"use client";
import type { Area } from "@/lib/calc";

const options: { value: Area; label: string }[] = [
  { value: "medico", label: "Médico" },
  { value: "dentista", label: "Cirurgião-dentista" },
  { value: "clinica", label: "Clínica / consultório" },
  { value: "outros", label: "Outros (saúde)" },
];

export default function Step2Area({
  value,
  onChange,
}: {
  value: Area | null;
  onChange: (v: Area) => void;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="heading-display">Qual a sua área de atuação?</h2>
        <p className="text-muted-soft">Selecione abaixo para continuar.</p>
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
            <span className="text-[17px]">{opt.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-soft">100% gratuito e sem compromisso.</p>
    </div>
  );
}
