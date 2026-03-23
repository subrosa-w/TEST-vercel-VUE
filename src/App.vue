<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <!-- RouterView automatically renders the component for the current route -->
      <RouterView />
    </main>
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2026 PymeHigiene Mayorista. Todos los derechos reservados.</p>
        <p class="footer-note">Plataforma de cotización online exclusiva para empresas.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  background-color: var(--color-background-soft, #f8f9fa);
  border-top: 1px solid var(--color-border, #e9ecef);
  padding: 2rem 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-light, #6c757d);
}

.footer-note {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
