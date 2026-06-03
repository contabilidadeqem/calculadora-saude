export default function Footer() {
  return (
    <footer className="mt-auto py-6 px-6 text-center text-[12px] text-muted-soft border-t border-white/5">
      <div className="max-w-2xl mx-auto space-y-1">
        <p className="font-medium text-cream-100">Q&amp;M Consultoria</p>
        <p>
          Instagram:{" "}
          <a
            href="https://instagram.com/queirozemanoelconsultoria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:underline"
          >
            @queirozemanoelconsultoria
          </a>
        </p>
        <p>CNPJ: 58.848.633/0001-34</p>
        <p className="opacity-70 mt-2">
          Cálculo estimativo baseado na Lei 9.249/95. Resultado final depende de
          análise tributária individual.
        </p>
      </div>
    </footer>
  );
}
