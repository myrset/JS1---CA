// Show amount on load
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById("cart-count");

    // Show number
    cartCount.textContent = cart.length;
}

// Simple addToCart function
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product exists and add with one
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        // If product, add more
        cart[existingProductIndex].quantity += 1;
    } else {
        // No product, add one
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Update on adding
}

// Fetch from cart
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Number of items

document.addEventListener("DOMContentLoaded", loadCart);
