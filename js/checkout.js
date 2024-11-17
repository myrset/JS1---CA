// This will show the stuff I've added to the cart

   
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    const emptyCartText = document.querySelector(".empty-cart");
    const cartContainer = document.querySelector(".cart");
    const buyButton = document.createElement("button");

    buyButton.style.marginTop = "10px";
    buyButton.style.padding = "5px 10px";
    buyButton.style.backgroundColor = "green";
    buyButton.style.color = "#fff";
    buyButton.style.border = "none";
    buyButton.style.borderRadius = "5px";
    buyButton.style.cursor = "pointer";
   

    cartContainer.appendChild(buyButton);

    buyButton.addEventListener("click", () => {
       
        window.location.href = "../checkout/confirmation/index.html";
    
        
        localStorage.removeItem('cart');
        displayCart();
    });



function displayCart() {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    buyButton.textContent =  `Buy ${cart.length} jackets` 

    if (cart.length === 0) {
        emptyCartText.style.display = "block";
        buyButton.style.display = "none";
      }
      
    cartItemsContainer.innerHTML = ''; 

    let total = 0;

    // Går gjennom hvert produkt jeg har lagt  i handlekurven
          
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item")
       

          
        

        // Added minor styling
        itemElement.style.display = 'flex';
        itemElement.style.alignItems = 'center';
        itemElement.style.border = '1px solid #ccc';
        itemElement.style.padding = '10px';
        itemElement.style.borderRadius = '5px';
        itemElement.style.gap = '15px';

        // Estimated total price (price * quantity)
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        

        // Show image-element
        const imgElement = document.createElement("img");
        imgElement.src = item.image || 'https://via.placeholder.com/80';
        imgElement.alt = item.name;
        imgElement.style.width = '80px';
        imgElement.style.height = '80px';
        imgElement.style.objectFit = 'cover';
        imgElement.style.borderRadius = '5px';

        // Making the div with styling
        const detailsElement = document.createElement("div");
        detailsElement.style.display = 'flex';
        detailsElement.style.flexDirection = 'column';

        // Adding stuff for description
        detailsElement.innerHTML = `
            <p style="font-weight: bold; font-size: 1.1em; margin: 0;">${item.name}</p>
            <p style="margin: 5px 0;">Price: ${item.price} $</p>
            <p style="margin: 5px 0;">Quantity: ${item.quantity}</p>
            <p style="margin: 5px 0;">Total: ${itemTotal.toFixed(2)} $</p>
        `;

        // I made a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginTop = '10px';
        removeButton.style.padding = '5px 10px';
        removeButton.style.backgroundColor = '#ff4d4d';
        removeButton.style.color = '#fff';
        removeButton.style.border = 'none';
        removeButton.style.borderRadius = '5px';
        removeButton.style.cursor = 'pointer';

        // Onclick fort the remove button
        removeButton.onclick = () => removeFromCart(item.id);

        // Add details, img and removebuttoing 
        itemElement.appendChild(imgElement);
        itemElement.appendChild(detailsElement);
        itemElement.appendChild(removeButton);
        
        cartItemsContainer.appendChild(itemElement);
    });

    

    // This will update total for cart. Added style
    cartTotalDisplay.textContent = `Total: $ ${total.toFixed(2)} `;
    cartTotalDisplay.style.fontSize = '1.2em';
    cartTotalDisplay.style.fontWeight = 'bold';
    cartTotalDisplay.style.marginTop = '15px';
    cartTotalDisplay.style.padding = '10px';
    cartTotalDisplay.style.borderTop = '2px solid #ddd';
}

// Simple removefrom cart added
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    

    // Filtering items 
    cart = cart.filter(item => item.id !== productId);

    // updating the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    loadCart();
    displayCart(); // Oppdater visningen
}

// show cart on load
    document.addEventListener("DOMContentLoaded", displayCart);
