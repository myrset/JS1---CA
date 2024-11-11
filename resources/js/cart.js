// Funksjon for å vise antall varer i handlekurven ved lasting av siden
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        // Oppdater antall varer i handlekurven
        cartCount.textContent = cart.length;
    }
}

// Funksjon for å legge til varer i handlekurven
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Sjekk om produktet allerede er i handlekurven og øk antall hvis det er der
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        // Hvis produktet finnes, øk antall
        cart[existingProductIndex].quantity += 1;
    } else {
        // Hvis produktet ikke finnes, legg det til med quantity = 1
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Oppdater antallet når vi legger til et produkt
}

// Funksjon for å hente handlekurv fra localStorage (valgfritt, hvis du trenger tilgang til handlekurven)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Initialiser antall varer på handlekurvikonet ved lasting av siden
document.addEventListener("DOMContentLoaded", loadCart);
