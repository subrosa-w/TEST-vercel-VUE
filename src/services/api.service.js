import productsMock from '../assets/data/products.json';

/**
 * Service to handle mock API calls.
 * In a real application, this would use axios or fetch to call a real backend.
 */
export const apiService = {
  /**
   * Fetches the list of all products.
   * @returns {Promise<Array>} List of products
   */
  async getProducts() {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsMock);
      }, 500);
    });
  },

  /**
   * Fetches categories dynamically based on products data.
   * @returns {Promise<Array>} List of unique categories
   */
  async getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = [...new Set(productsMock.map(p => p.category))];
        resolve(['Todos', ...categories]);
      }, 300);
    });
  },

  /**
   * Simulates sending a quote request.
   * @param {Object} formData Company details for the quote
   * @param {Array} cartItems Items in the cart
   * @returns {Promise<Object>} Success message or error
   */
  async sendQuoteRequest(formData, cartItems) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate minimally (usually done on backend too)
        if (!formData.email || !formData.companyName) {
          reject(new Error("Faltan datos requeridos."));
          return;
        }

        // Log to console to simulate what would be sent
        console.log("=== COTIZACIÓN ENVIADA ===");
        console.log("Cliente:", formData);
        console.log("Productos:", cartItems);
        console.log("==========================");

        resolve({ success: true, message: "Cotización enviada con éxito. Nos contactaremos pronto." });
      }, 1000);
    });
  }
};
