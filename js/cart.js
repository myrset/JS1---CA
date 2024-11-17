// Show the total amount of items in the cart and also adding duplicates
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById("cart-count");

    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
 
    cartCount.textContent = totalItems;
}

// Simple addToCart function
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product already exists and we can add more of same
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product doesn't exist, add it with quantity = 1
        product.quantity = 1;
        cart.push(product);
    }

    // Saved updated cart to the localStorage and update display
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); 
}

// Fetch the cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", loadCart);
