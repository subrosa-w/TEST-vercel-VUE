<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart.js'
import { apiService } from '../services/api.service'
import CartItem from '../components/CartItem.vue'

const router = useRouter()
const { cartItems, totalItems, cartTotal, clearCart } = useCartStore()

// Form State
const form = reactive({
  companyName: '',
  rut: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const handleSubmit = async () => {
  if (cartItems.value.length === 0) return
  
  isSubmitting.value = true
  submitError.value = ''
  
  try {
    const response = await apiService.sendQuoteRequest(form, cartItems.value)
    if (response.success) {
      submitSuccess.value = true
      clearCart()
      
      // Auto redirect after a few seconds
      setTimeout(() => {
        router.push('/')
      }, 5000)
    }
  } catch (error) {
    submitError.value = error.message || "Error al enviar la solicitud."
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="quote-view">
    <div class="header">
      <h1 class="page-title">Solicitud de Cotización</h1>
      <button class="btn-back" @click="goBack">← Volver al Catálogo</button>
    </div>

    <!-- Success State -->
    <div v-if="submitSuccess" class="success-message">
      <div class="success-icon">✅</div>
      <h2>¡Cotización Enviada!</h2>
      <p>Hemos recibido tu solicitud. Un ejecutivo se contactará contigo a la brevedad al correo <strong>{{ form.email }}</strong> con los precios y disponibilidad.</p>
      <p class="redirect-note">Serás redirigido al catálogo en unos segundos...</p>
      <button class="btn-primary mt-4" @click="goBack">Volver Ahora</button>
    </div>

    <!-- Empty Cart State -->
    <div v-else-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos desde nuestro catálogo para solicitar una cotización.</p>
      <button class="btn-primary mt-4" @click="goBack">Ir al Catálogo</button>
    </div>

    <!-- Cart and Form Layout -->
    <div v-else class="quote-layout">
      <!-- Cart Items -->
      <div class="cart-section">
        <h2 class="section-title">Productos ({{ totalItems }})</h2>
        <div class="items-list">
          <CartItem 
            v-for="item in cartItems" 
            :key="item.id" 
            :item="item" 
          />
        </div>
      </div>

      <!-- Quote Form & Summary -->
      <div class="form-section">
        <div class="summary-card">
          <h2 class="section-title">Resumen Referencial</h2>
          <div class="summary-details">
            <div class="summary-row">
              <span>Subtotal estimado:</span>
              <span>${{ cartTotal.toLocaleString('es-CL') }}</span>
            </div>
            <div class="summary-row total">
              <span>Total estimado:</span>
              <span>${{ cartTotal.toLocaleString('es-CL') }}</span>
            </div>
            <p class="summary-note">* Los precios son referenciales y están sujetos a confirmación por el área de ventas. No incluyen IVA ni costos de despacho.</p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="quote-form">
          <h2 class="section-title">Datos de Contacto</h2>
          
          <div class="form-group">
            <label for="companyName">Razón Social / Empresa *</label>
            <input 
              type="text" 
              id="companyName" 
              v-model="form.companyName" 
              required 
              placeholder="Ej. Mi Empresa SpA"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="rut">RUT *</label>
              <input 
                type="text" 
                id="rut" 
                v-model="form.rut" 
                required 
                placeholder="12.345.678-9"
              />
            </div>

            <div class="form-group">
              <label for="phone">Teléfono *</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                required 
                placeholder="+56 9 1234 5678"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Correo Electrónico *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required 
              placeholder="contacto@empresa.cl"
            />
          </div>

          <div class="form-group">
            <label for="message">Mensaje Adicional</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="3" 
              placeholder="Indícanos si necesitas despacho, condiciones de pago, etc."
            ></textarea>
          </div>

          <div v-if="submitError" class="error-message">
            {{ submitError }}
          </div>

          <button 
            type="submit" 
            class="btn-submit" 
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Enviando...</span>
            <span v-else>Enviar Solicitar Cotización</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quote-view {
  min-height: 60vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #edf2f7;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  margin: 0;
}

.btn-back {
  background: none;
  border: none;
  color: #4a5568;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.btn-back:hover {
  background-color: #edf2f7;
  color: #2d3748;
}

/* Quote Layout */
.quote-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2.5rem;
  align-items: start;
}

@media (max-width: 992px) {
  .quote-layout {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

/* Form Styles */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary-card, .quote-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.125rem;
  color: #4a5568;
}

.summary-row.total {
  font-weight: 800;
  font-size: 1.5rem;
  color: #2d3748;
  padding-top: 1rem;
  border-top: 2px dashed #edf2f7;
}

.summary-note {
  font-size: 0.75rem;
  color: #a0aec0;
  line-height: 1.5;
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: #2d3748;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.btn-submit {
  width: 100%;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #3aa876;
}

.btn-submit:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

/* Empty State / Success State */
.empty-cart, .success-message {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.empty-icon, .success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-cart h2, .success-message h2 {
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.empty-cart p, .success-message p {
  font-size: 1.125rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
}

.redirect-note {
  font-size: 0.875rem !important;
  color: #a0aec0 !important;
  margin-top: 2rem !important;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2b6cb0;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
