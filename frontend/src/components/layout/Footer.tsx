export const Footer = () => {
  // Obtenemos el año actual para que el copyright se actualice solo.
  const currentYear = new Date().getFullYear();

  return (
    // --- CAMBIO CLAVE AQUÍ ---
    // bg-primary: Aplica el color oscuro principal de tu paleta.
    // text-primary-foreground: Cambia el texto a su color de contraste claro.
    // py-8: Añade un poco de espacio vertical (padding).
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container text-center">
        <p>&copy; {currentYear} VentPro. Todos los derechos reservados.</p>
        <p className="text-sm text-primary-foreground/70 mt-2">
          Diseñado y desarrollado con pasión.
        </p>
      </div>
    </footer>
  );
};
