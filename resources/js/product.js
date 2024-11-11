const params = new URLSearchParams(window.location.search);
const productID = params.get('id');

const productsHtml = document.getElementById("products");
console.log("Product ID", productID);

// Function to display the specific jacket


    function displayJacket(jacket) {
    productsHtml.style.display = 'flex';
    productsHtml.style.flexDirection = 'row';
    productsHtml.style.flexWrap = 'wrap';
    productsHtml.style.height = '400px';
    productsHtml.style.justifyContent = 'space-between';
    productsHtml.style.gap = '10px';

    let salg;
    if (jacket.onSale) {
        salg = "On sale right now!";
    } else {
        salg = "No sale for you!";
    }

    productsHtml.innerHTML = `
        <article class="jacket">
            <p>${jacket.title}</p>
            <p>Price: ${jacket.price}</p>
            
            <img class="image-jacket" src="${jacket.image?.url || 'https://via.placeholder.com/150'}" alt="${jacket.title}" />
        
            <button onClick="addToCart()">Add to cart</button>
             <p> Color: ${jacket.baseColor} </p> 
             <p> Description: ${jacket.description} </p> 
             <p>  ${jacket.gender}  </p> 
             <p> onSale: ${jacket.onSale} </p> 
             <p> Sizes available: ${jacket.onSale} </p> 
             <p> Price: ${jacket.price} </p> 
             <p> Discounted price: ${jacket.discountedPrice} </p> 
             <p>${salg}</p>
        </article>
    `;
}

// Fetch data and display only the jacket with the matching ID


async function fetchAndDisplayJacket() {
    const apiUrl = `https://v2.api.noroff.dev/rainy-days/${productID}`;
    // Da slipper du å hente ALLE items også filtrere ned på den du trenger.

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data", data.data)
        displayJacket(data.data);
        if (!response) {
            productsHtml.innerHTML = "<p>Jacket not found.</p>";
        } 
    } catch (error) {
        console.error("Error fetching data:", error);
        productsHtml.innerHTML = "<p>There was an error loading the product details.</p>";
    }
}

// Call the function to fetch and display the jacket


fetchAndDisplayJacket();
