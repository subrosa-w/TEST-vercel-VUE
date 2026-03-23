<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../store/cart.js'

// Access the global cart store to get the total number of items
const { totalItems } = useCartStore()
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="navbar-brand">
        <span class="brand-highlight">Pyme</span>Higiene
      </RouterLink>
      
      <nav class="navbar-nav">
        <RouterLink to="/" class="nav-link" active-class="active">Catálogo</RouterLink>
        <RouterLink to="/quote" class="nav-link cart-link" active-class="active">
          <span class="cart-icon">🛒</span>
          Cotizar
          <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.brand-highlight {
  color: #42b883; /* Vue green */
}

.navbar-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0.5rem 0.25rem;
}

.nav-link:hover, .nav-link.active {
  color: #42b883;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f7fafc;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  position: relative;
}

.cart-link:hover, .cart-link.active {
  background-color: #ebf4ff;
  border-color: #bee3f8;
  color: #3182ce;
}

.cart-badge {
  background-color: #e53e3e;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  position: absolute;
  top: -8px;
  right: -8px;
  box-shadow: 0 2px 4px rgba(229, 62, 62, 0.3);
}
</style>
