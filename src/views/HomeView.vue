<script setup>
import { ref, onMounted, computed } from 'vue'
import { apiService } from '../services/api.service'
import ProductCard from '../components/ProductCard.vue'

// Local state for the view
const products = ref([])
const categories = ref([])
const activeCategory = ref('Todos')
const loading = ref(true)

// Fetch data on component mount
onMounted(async () => {
  try {
    loading.value = true
    // In a real app, these might be loaded simultaneously with Promise.all
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      apiService.getProducts(),
      apiService.getCategories()
    ])
    
    products.value = fetchedProducts
    categories.value = fetchedCategories
  } catch (error) {
    console.error("Error loading catalog:", error)
  } finally {
    loading.value = false
  }
})

// Filter products based on active category
const filteredProducts = computed(() => {
  if (activeCategory.value === 'Todos') {
    return products.value
  }
  return products.value.filter(p => p.category === activeCategory.value)
})

const setCategory = (category) => {
  activeCategory.value = category
}
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Insumos de Higiene al por Mayor</h1>
        <p class="hero-subtitle">Abastece tu empresa con productos de calidad profesional a precios competitivos. Solicita tu cotización online hoy mismo.</p>
      </div>
    </section>

    <div class="catalog-container">
      <aside class="catalog-sidebar">
        <h2 class="sidebar-title">Categorías</h2>
        <div v-if="loading" class="loading-state">Cargando...</div>
        <ul v-else class="category-list">
          <li v-for="category in categories" :key="category">
            <button 
              class="category-btn" 
              :class="{ active: activeCategory === category }"
              @click="setCategory(category)"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </aside>

      <div class="catalog-content">
        <div class="catalog-header">
          <h2 class="section-title">
            {{ activeCategory === 'Todos' ? 'Nuestro Catálogo' : activeCategory }}
          </h2>
          <span class="product-count" v-if="!loading">
            {{ filteredProducts.length }} productos
          </span>
        </div>

        <div v-if="loading" class="loading-grid">
          <div v-for="n in 6" :key="n" class="skeleton-card"></div>
        </div>
        
        <div v-else-if="filteredProducts.length === 0" class="empty-state">
          No hay productos en esta categoría.
        </div>

        <div v-else class="products-grid">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 16px;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
  color: white;
  text-align: center;
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  line-height: 1.6;
}

.catalog-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.catalog-sidebar {
  width: 250px;
  flex-shrink: 0;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 100px;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #edf2f7;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background-color: #f7fafc;
  color: #2c3e50;
}

.category-btn.active {
  background-color: #ebf4ff;
  color: #3182ce;
  font-weight: 600;
}

.catalog-content {
  flex: 1;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.product-count {
  color: #718096;
  font-size: 0.875rem;
  background-color: #edf2f7;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Loading States */
.loading-state {
  color: #a0aec0;
  font-style: italic;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.skeleton-card {
  height: 400px;
  background: linear-gradient(90deg, #edf2f7 25%, #e2e8f0 50%, #edf2f7 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.empty-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 12px;
  color: #718096;
  font-size: 1.125rem;
}

/* Responsiveness */
@media (max-width: 768px) {
  .catalog-container {
    flex-direction: column;
  }
  
  .catalog-sidebar {
    width: 100%;
    position: static;
  }
  
  .category-list {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .category-btn {
    white-space: nowrap;
  }
}
</style>
