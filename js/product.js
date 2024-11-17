const params = new URLSearchParams(window.location.search);
const productID = params.get('id');

const productsHtml = document.getElementById("products");

// Function for showing product on my page

function displayJacket(jacket) {
    productsHtml.style.display = 'flex';
    productsHtml.style.flexDirection = 'row';
    productsHtml.style.flexWrap = 'wrap';
    productsHtml.style.height = '400px';
    productsHtml.style.justifyContent = 'space-between';
    productsHtml.style.gap = '10px';

    const isOnSale = jacket.onSale ? "On sale right now!" : "No sale for you!";

    productsHtml.innerHTML = `
        <article class="jacket">
            <p>${jacket.title}</p>
            <p>Price: $ ${jacket.price}</p>
            <img class="image-jacket" src="${jacket.image?.url || 'https://via.placeholder.com/150'}" alt="${jacket.title}" />
            <p>Color: ${jacket.baseColor}</p>
            <p>Description: ${jacket.description}</p>
            <p>${jacket.gender}</p>
            <p>${isOnSale}</p>
        </article>
    `;

    const button = document.createElement("button");
    button.textContent = "Add to cart";
    button.onclick = () => addToCart({ id: jacket.id, name: jacket.title, price: jacket.price, image: jacket.image ? jacket.image.url : 'https://via.placeholder.com/80' });
    
    productsHtml.querySelector(".jacket").appendChild(button);
}

// Fetching the ID to show product

async function fetchAndDisplayJacket() {
    const apiUrl = `https://v2.api.noroff.dev/rainy-days/${productID}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayJacket(data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        productsHtml.innerHTML = "<p>There was an error loading the product details.</p>";
    }
}



fetchAndDisplayJacket();
