<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '../store/cart.js'

// Define the shape of the props this component expects
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Access the global addToCart function
const { addToCart } = useCartStore()

/**
 * Handle adding this specific product to the cart
 */
const handleAddProduct = () => {
  addToCart(props.product)
}
</script>

<template>
  <div class="product-card">
    <div class="card-image">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span class="category-badge">{{ product.category }}</span>
    </div>
    
    <div class="card-content">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-meta">
        <span class="product-unit">Unidad: {{ product.stock_unit }}</span>
        <span class="product-price">${{ product.price.toLocaleString('es-CL') }}</span>
      </div>
      
      <button class="btn-add" @click="handleAddProduct">
        Agregar al Carrito
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-image {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect ratio */
  background-color: #f7fafc;
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.category-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: #4a5568;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.product-description {
  font-size: 0.875rem;
  color: #718096;
  flex: 1;
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #edf2f7;
}

.product-unit {
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #42b883;
}

.btn-add {
  width: 100%;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #1a252f;
}

.btn-add:active {
  transform: scale(0.98);
}
</style>
