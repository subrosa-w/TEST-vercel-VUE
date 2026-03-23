import { reactive, computed } from 'vue';

// Global state for the cart
// Using Vue 3 reactivity to create a simple, scalable store
const state = reactive({
    items: []
});

export const useCartStore = () => {
    /**
     * Add a product to the cart.
     * If it already exists, increase the quantity.
     * @param {Object} product The product to add
     * @param {Number} quantity Quantity to add (default 1)
     */
    const addToCart = (product, quantity = 1) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.items.push({ ...product, quantity });
        }
    };

    /**
     * Remove a product completely from the cart
     * @param {String} productId ID of the product to remove
     */
    const removeFromCart = (productId) => {
        const index = state.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            state.items.splice(index, 1);
        }
    };

    /**
     * Update the quantity of a specific product
     * @param {String} productId ID of the product
     * @param {Number} quantity New quantity
     */
    const updateQuantity = (productId, quantity) => {
        const item = state.items.find(item => item.id === productId);
        if (item && quantity > 0) {
            item.quantity = quantity;
        } else if (item && quantity === 0) {
            removeFromCart(productId);
        }
    };

    /**
     * Clear all items from the cart
     */
    const clearCart = () => {
        state.items = [];
    };

    // Computed properties for easy access to derived state
    const cartItems = computed(() => state.items);

    const totalItems = computed(() => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    });

    const cartTotal = computed(() => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    return {
        cartItems,
        totalItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};
