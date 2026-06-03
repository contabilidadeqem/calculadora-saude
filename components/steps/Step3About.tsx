export default function Step3About({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="heading-display">
        Q&amp;M Consultoria, especialista em planejamento tributário para a saúde.
      </h2>

      <div className="info-card space-y-3">
        <p className="text-cream-100/90 leading-relaxed">
          A <span className="text-gold-400 font-medium">equiparação hospitalar</span>{" "}
          é um benefício previsto na Lei 9.249/95 que permite que CNPJs da saúde
          sejam tributados como hospitais, reduzindo em{" "}
          <span className="text-gold-400 font-medium">até 70%</span> os tributos
          federais.
        </p>
        <p className="text-sm text-muted-soft">
          Aplicamos a estratégia para médicos, cirurgiões-dentistas e clínicas
          em todo o Brasil.
        </p>
      </div>

      <div className="rounded-card border border-gold-500/30 bg-gold-500/5 p-4 space-y-1">
        <p className="text-cream-100 text-sm font-medium">
          O benefício é válido para profissionais que realizam exames,
          cirurgias ou procedimentos.
        </p>
        <p className="text-xs text-muted-soft">
          Consultas simples não se enquadram na lei.
        </p>
      </div>

      <button onClick={onNext} className="cta-primary w-full">
        Continuar →
      </button>
    </div>
  );
}
