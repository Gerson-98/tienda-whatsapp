// Define el URL base de nuestra API
const API_URL = "http://localhost:3000";

// Función para obtener todos los productos
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// Función para obtener todas las categorías
export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

// Puedes añadir aquí más funciones (createProduct, deleteProduct, etc.) en el futuro
