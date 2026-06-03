export default function Step1Hero({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <h1 className="heading-display">
        Médico, dentista ou clínica: sua PJ pode pagar menos impostos. Você já
        verificou?
      </h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="info-card">
          <div className="h-9 w-9 rounded-full bg-gold-500/20 flex items-center justify-center mb-3 text-gold-400 text-lg">
            ↘
          </div>
          <h3 className="text-gold-400 font-medium leading-snug">
            Redução
            <br />
            de impostos
          </h3>
          <p className="text-sm text-muted-soft mt-2">
            Benefício previsto em lei que reduz os impostos federais da sua
            empresa de saúde.
          </p>
        </div>
        <div className="info-card">
          <div className="h-9 w-9 rounded-full bg-gold-500/20 flex items-center justify-center mb-3 text-gold-400 text-lg">
            ⊞
          </div>
          <h3 className="text-gold-400 font-medium leading-snug">
            Calculadora
            <br />
            100% gratuita
          </h3>
          <p className="text-sm text-muted-soft mt-2">
            Em 2 minutos, descubra quanto seu CNPJ pode economizar
            mensalmente.
          </p>
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <p className="text-sm text-muted-soft">
          Calculadora da{" "}
          <span className="text-cream-100 font-medium">Q&amp;M Consultoria</span>{" "}
          para profissionais e empresas da saúde em todo o Brasil.
        </p>
        <button onClick={onNext} className="cta-primary w-full">
          Calcular minha economia →
        </button>
        <p className="text-center text-xs text-muted-soft">
          Benefício previsto na Lei 9.249/95. Calcule 100% gratuito!
        </p>
      </div>
    </div>
  );
}
