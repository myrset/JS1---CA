// Konstanter og URL
const apiUrl = 'https://v2.api.noroff.dev/rainy-days';
const productsHtml = document.getElementById("products");
const category = document.getElementById("category");

// Henter data fra API og viser produkter
async function fetchData() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('No answer from server ' + response.statusText);
    }
    
    const data = await response.json();
    
    productsHtml.innerHTML = ""; 
    productsHtml.style.display = 'flex';
    productsHtml.style.flexDirection = 'row';
    productsHtml.style.flexWrap = 'wrap';
    productsHtml.style.height = '400px';
    productsHtml.style.justifyContent = 'space-between';
    productsHtml.style.gap = '10px';

    data.data.forEach(jacket => {
        const isOnSale = jacket.onSale ? "On sale right now!" : "No sale for you!";
        
        const article = document.createElement("article");
        article.classList.add("jacket");
        
        article.innerHTML = `
            <p>${jacket.title}</p>
            <p>Price: ${jacket.price} kr</p>
            <a href="../resources/product/index.html?id=${jacket.id}">
                <img class="image-jacket" src="${jacket.image.url}" alt="${jacket.title}" />
            </a>
            <p>${isOnSale}</p>
        `;

        const button = document.createElement("button");
        button.textContent = "Add to cart";
        button.onclick = () => addToCart({ id: jacket.id, name: jacket.title, price: jacket.price, image: jacket.image ? jacket.image.url : 'https://via.placeholder.com/80' });
        
        article.appendChild(button);
        productsHtml.appendChild(article);
    });

    return data.data;
}

// fetch on load
fetchData();

// Filter on category change
category.addEventListener("change", () => {
    const gender = category.options[category.selectedIndex].value;
    filterByCategory(gender);
});
