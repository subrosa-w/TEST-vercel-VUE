# PymeHigiene Mayorista

Proyecto de catálogo online y solicitud de cotizaciones para empresa de ventas de insumos de higiene al por mayor.

Este proyecto fue generado con Vue 3 (Composition API) y Vite.

## Instrucciones para ejecutar en local

1. **Requisitos Previos:**
   - Node.js (versión 18 o superior recomendada)
   - npm o yarn

2. **Instalación:**
   ```bash
   # Clonar / Descargar el repositorio
   # Navegar a la carpeta del proyecto
   cd "parte 2"

   # Instalar las dependencias
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto estará disponible localmente, usualmente en `http://localhost:5173/`.

4. **Construir para producción (Build):**
   ```bash
   npm run build
   ```

## Estructura del Proyecto

- `src/assets/data`: Contiene el JSON que simula la base de datos de productos.
- `src/components`: Componentes reutilizables (Navbar, ProductCard, CartItem).
- `src/services`: Lógica de API. `api.service.js` actúa como un *mock* (simulador) de peticiones a un backend real.
- `src/store`: Manejo de estado global usando la reactividad nativa de Vue 3 (`store/cart.js`).
- `src/views`: Vistas de nivel de página conectadas al Vue Router (`HomeView.vue`, `QuoteCartView.vue`).

## Cómo escalar este proyecto a Producción

Este proyecto está diseñado con una arquitectura modular para facilitar su escalado. Para llevarlo a producción con un backend real, sigue estos pasos:

### 1. Integración de Backend Real (API Rest / GraphQL)

Actualmente, las llamadas simuladas están aisladas en `src/services/api.service.js`.
Para conectar un servidor real (por ejemplo, en Node/Express, Python/Django, o PHP/Laravel):
- Reemplaza los `setTimeout` en `api.service.js` por llamadas reales utilizando **Axios** o la **Fetch API**.
- Ejemplo:
  ```javascript
  import axios from 'axios';
  
  export const apiService = {
    async getProducts() {
      const response = await axios.get('https://api.tuempresa.com/v1/products');
      return response.data;
    }
    // ...
  }
  ```

### 2. Base de Datos

- El archivo local `products.json` debe reemplazarse por una base de datos (PostgreSQL, MySQL o MongoDB en el backend) para gestionar stock, precios dinámicos y categorías.

### 3. Autenticación y Panel de Administración (Admin Dashboard)

- Necesitarás un sistema de inicio de sesión (JWT o Sesiones) en el backend.
- Puedes crear un módulo extra en este mismo frontend (ej. `/admin/...`) protegido por validación de rutas de Vue Router (`router.beforeEach`), o crear un proyecto frontend separado exclusivo para la administración, donde el administrador pueda:
  - Hacer un CRUD de los productos.
  - Ver las solicitudes de cotizaciones recibidas con su estado (Pendiente, Respondida).

### 4. Envío real de correos electrónicos

- En la ruta de envío de la cotización (`apiService.sendQuoteRequest`), el backend que procese ese endpoint debe integrar un servicio como **SendGrid, Resend, o AWS SES** para efectivamente enviar el correo con el formato adecuado al cliente y al área de ventas de la empresa.

### 5. State Management Avanzado (Pinia)

- Aunque el archivo `store/cart.js` es suficiente para el manejo del carrito actualmente, si en el futuro se añade inicio de sesión, favoritos y manejo de estados más complejos, se recomienda migrar a **Pinia** (la librería estándar actual para estado global en Vue 3), la cual se integra perfectamente con las herramientas de desarrollo de Vue.
