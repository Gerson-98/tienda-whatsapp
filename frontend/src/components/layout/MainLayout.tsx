// src/components/layout/MainLayout.tsx

import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp"; // <-- 1. Importa el componente

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
      <FloatingWhatsApp /> {/* <-- 2. Añádelo aquí */}
    </div>
  );
};
