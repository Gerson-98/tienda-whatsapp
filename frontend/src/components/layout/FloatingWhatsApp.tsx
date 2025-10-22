// src/components/layout/FloatingWhatsApp.tsx

import { FaWhatsapp } from "react-icons/fa"; // Necesitarás instalar react-icons

export const FloatingWhatsApp = () => {
  const phoneNumber = "50241916647"; // Tu número de teléfono
  const message =
    "Hola, estoy interesado en sus servicios de ventanas de PVC y me gustaría obtener más información.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 ease-in-out"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};
