// Franja ámbar con las promesas de VentPro, en movimiento continuo bajo la portada.
const ITEMS = [
  "Fabricación propia desde 2010",
  "Aislamiento térmico y acústico",
  "Hechas a tu medida",
  "Garantía real de por vida",
  "Entrega en 15 días hábiles",
  "Más de 200 proyectos",
];

const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {ITEMS.map((t) => (
      <li key={t} className="flex items-center whitespace-nowrap">
        <span className="px-8 font-display text-sm font-bold tracking-tight md:text-base">{t}</span>
        <span className="h-1.5 w-1.5 rotate-45 bg-secondary-foreground/40" aria-hidden />
      </li>
    ))}
  </ul>
);

export const TrustMarquee = () => (
  <div className="marquee relative overflow-hidden bg-secondary py-4 text-secondary-foreground" role="region" aria-label="Nuestras promesas">
    <div className="marquee-track flex w-max">
      <Row />
      <Row hidden />
    </div>
  </div>
);
