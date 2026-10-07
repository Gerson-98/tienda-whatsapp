// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { AboutPage } from "@/pages/AboutPage";
import { QuotePage } from "@/pages/QuotePage";
import { ContactPage } from "@/pages/ContactPage";
import { LoginPage } from "@/pages/LoginPage";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/** Envuelve cada página pública en un ErrorBoundary aislado.
 *  Un error en /proyectos no mata el resto de la app. */
const Page = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Page><HomePage /></Page>} />
          <Route path="proyectos" element={<Page><ProjectsPage /></Page>} />
          <Route path="productos" element={<Page><ProductsPage /></Page>} />
          <Route path="nosotros" element={<Page><AboutPage /></Page>} />
          <Route path="contacto" element={<Page><ContactPage /></Page>} />
          <Route path="cotizacion" element={<Page><QuotePage /></Page>} />
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
