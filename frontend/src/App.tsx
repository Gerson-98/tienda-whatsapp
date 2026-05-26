// src/App.tsx

import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { AboutPage } from "@/pages/AboutPage"; // <-- 1. Importa la nueva página
import { QuotePage } from "@/pages/QuotePage";
import { ContactPage } from "@/pages/ContactPage"; // <-- 1. Importa la nueva página
import { LoginPage } from "@/pages/LoginPage";
import { AdminDashboard } from "@/pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="cotizacion" element={<QuotePage />} />
      </Route>

      {/* Rutas de Administrador */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
