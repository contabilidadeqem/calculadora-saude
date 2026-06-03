"use client";
import { useState, useEffect } from "react";
import { formatMaskedBRL, parseDigits } from "@/lib/format";

export default function Step4Faturamento({
  value,
  onChange,
  onNext,
}: {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
}) {
  const initialDigits =
    value > 0 ? String(Math.round(value * 100)) : "";
  const [digits, setDigits] = useState(initialDigits);

  useEffect(() => {
    onChange(parseDigits(digits));
  }, [digits, onChange]);

  const valid = parseDigits(digits) >= 1000;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="heading-display">Qual seu faturamento mensal médio?</h2>
        <p className="text-muted-soft">
          Considere a média do seu faturamento nos últimos 12 meses.
        </p>
      </header>

      <div className="field">
        <label htmlFor="faturamento">Digite seu faturamento médio</label>
        <input
          id="faturamento"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="R$ 0,00"
          value={formatMaskedBRL(digits)}
          onChange={(e) =>
            setDigits(e.target.value.replace(/\D/g, "").slice(0, 12))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && valid) onNext();
          }}
        />
      </div>

      <button
        onClick={onNext}
        disabled={!valid}
        className="cta-primary w-full"
      >
        Continuar
      </button>

      <p className="text-xs text-muted-soft">
        Usamos essa informação apenas para estimar sua economia. Seus dados
        não são compartilhados.
      </p>
    </div>
  );
}
