// Show the total amount of items in the cart, counting duplicates
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById("cart-count");

    // Calculate the total quantity of items in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update the cart count to show the total number of items
    cartCount.textContent = totalItems;
}

// Simple addToCart function
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        // If product exists, increment its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product doesn't exist, add it with quantity = 1
        product.quantity = 1;
        cart.push(product);
    }

    // Save updated cart to localStorage and update display
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Update cart count immediately
}

// Fetch the cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", loadCart);
