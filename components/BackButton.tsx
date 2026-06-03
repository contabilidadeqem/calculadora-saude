export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Voltar"
      className="inline-flex items-center justify-center h-9 w-9 rounded-full text-cream-100 hover:bg-white/10 transition-colors"
    >
      <span aria-hidden className="text-xl leading-none">
        ←
      </span>
    </button>
  );
}
