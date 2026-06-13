// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { AboutPage } from "@/pages/AboutPage"; // <-- 1. Importa la nueva página
import { QuotePage } from "@/pages/QuotePage";
import { ContactPage } from "@/pages/ContactPage"; // <-- 1. Importa la nueva página
import { LoginPage } from "@/pages/LoginPage";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <ScrollToTop />
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
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
