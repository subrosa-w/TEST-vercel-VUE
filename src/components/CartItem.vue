<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '../store/cart.js'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const { updateQuantity, removeFromCart } = useCartStore()

const handleIncrease = () => {
  updateQuantity(props.item.id, props.item.quantity + 1)
}

const handleDecrease = () => {
  if (props.item.quantity > 1) {
    updateQuantity(props.item.id, props.item.quantity - 1)
  }
}

const handleRemove = () => {
  removeFromCart(props.item.id)
}
</script>

<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.name" />
    </div>
    
    <div class="item-details">
      <h4 class="item-name">{{ item.name }}</h4>
      <p class="item-unit">{{ item.stock_unit }}</p>
      <div class="item-price">${{ item.price.toLocaleString('es-CL') }} c/u</div>
    </div>
    
    <div class="item-actions">
      <div class="quantity-controls">
        <button class="btn-qty" @click="handleDecrease" :disabled="item.quantity <= 1">-</button>
        <span class="quantity">{{ item.quantity }}</span>
        <button class="btn-qty" @click="handleIncrease">+</button>
      </div>
      
      <div class="item-total">
        ${{ (item.price * item.quantity).toLocaleString('es-CL') }}
      </div>
      
      <button class="btn-remove" @click="handleRemove" title="Eliminar del carrito">
        🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  gap: 1.5rem;
  transition: box-shadow 0.2s;
}

.cart-item:hover {
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  background-color: #f7fafc;
  border-radius: 8px;
  padding: 0.5rem;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
}

.item-unit {
  font-size: 0.75rem;
  color: #718096;
  margin: 0 0 0.5rem 0;
}

.item-price {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background-color: #edf2f7;
  border-radius: 8px;
  overflow: hidden;
}

.btn-qty {
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: #4a5568;
  transition: background-color 0.2s;
}

.btn-qty:hover:not(:disabled) {
  background-color: #e2e8f0;
}

.btn-qty:disabled {
  color: #cbd5e0;
  cursor: not-allowed;
}

.quantity {
  width: 30px;
  text-align: center;
  font-weight: 600;
  color: #2d3748;
}

.item-total {
  font-weight: 700;
  font-size: 1.125rem;
  color: #2c3e50;
  min-width: 90px;
  text-align: right;
}

.btn-remove {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: transform 0.2s, background-color 0.2s;
  color: #e53e3e;
}

.btn-remove:hover {
  background-color: #fff5f5;
  transform: scale(1.1);
}

@media (max-width: 640px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-actions {
    width: 100%;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #edf2f7;
  }
}
</style>
