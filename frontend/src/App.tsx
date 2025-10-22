// src/App.tsx

import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { AboutPage } from "@/pages/AboutPage"; // <-- 1. Importa la nueva página
import { QuotePage } from "@/pages/QuotePage";
import { ContactPage } from "@/pages/ContactPage"; // <-- 1. Importa la nueva página

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="productos" element={<ProductsPage />} />
        {/* --- 2. AÑADE ESTA LÍNEA --- */}
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="cotizacion" element={<QuotePage />} />
        <Route path="contacto" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
