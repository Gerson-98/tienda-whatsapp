// Franja discreta con las promesas de VentPro bajo la portada: texto tenue, bordes finos y bordes difuminados.
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
        <span className="px-10 text-sm font-medium tracking-wide text-muted-foreground">{t}</span>
        <span className="h-1 w-1 rounded-full bg-secondary" aria-hidden />
      </li>
    ))}
  </ul>
);

export const TrustMarquee = () => (
  <div
    className="marquee relative overflow-hidden border-y border-border bg-background py-5"
    role="region"
    aria-label="Nuestras promesas"
  >
    <div className="marquee-track flex w-max">
      <Row />
      <Row hidden />
    </div>
  </div>
);
