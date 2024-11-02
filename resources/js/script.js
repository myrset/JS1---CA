// Collecting consts!

const apiUrl = 'https://v2.api.noroff.dev/rainy-days';

const productsHtml = document.getElementById("products") // getElementById

const params = new URLSearchParams(window.location.search);
const productID = params.get('id');

console.log("Product ID", productID)


// Fetching the API

console.log(productsHtml)

    async function fetchData() {

         const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error('No answer from server ' + response.statusText); 
            
        } 
        
        const data = await response.json();
 

        data.data.forEach(jacket => {

            productsHtml.style.display = 'flex'
            productsHtml.style.flexDirection = 'row'
            productsHtml.style.flexWrap = 'wrap'
            productsHtml.style.height = '400px'
            productsHtml.style.justifyContent = 'space-between'
            productsHtml.style.gap = '10px'

            let salg; 

            if(jacket.onSale) {
                salg = "On sale right now!"
            } 
            
            if(!jacket.onSale) {
                salg = "No sale for you!"
            }
            
            productsHtml.innerHTML += `
            <article class="jacket">
            <p> ${jacket.title} </p> 
            <p> Price: ${jacket.price} </p>
            <a href="../resources/product/index.html?id=${jacket.id}">
            <img class="image-jacket" src="${jacket.image.url}" alt="${jacket.title}" />
            </a>
            <button onClick="addToCart()"> Add to cart </button>
            <p>  ${salg}
            </article>
            `
      
        })


    }

    fetchData();
  
        // Helpful for further work on product page

            // <p> Color: ${jacket.baseColor} </p> 
            // <p> Description: ${jacket.description} </p> 
            // <p> Gender: ${jacket.gender} </p> 
            // <p> onSale: ${jacket.onSale} </p> 
            // <p> Sizes available: ${jacket.onSale} </p> 
            // <p> Price: ${jacket.price} </p> 
            // <p> Discounted price: ${jacket.discountedPRice} </p> 


            
console.log("Morning!");

function addToCart(id) {
    console.log("I am the jacket id", id)
}