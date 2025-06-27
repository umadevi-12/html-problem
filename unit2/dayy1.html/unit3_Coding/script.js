const searchBtn = document.getElementById('searchBtn');
const category = document.getElementById('category');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const ProductList = document.getElementById('productList');
const message = document.getElementById('messsage');

searchBtn.addEventListener("click",()=>{
    const cat = category.Value;
    const min = minPrice.Value;
    const max = maxPrice.value;
  
    let url = "https://mockapi.io/products?"
    const params = [];

    if(cat) params.push(`category = ${cat}`);
    if(min) params.push(`minPrice = ${min}`);
    if(max) params.push(`maxPrice = ${max}`);
    params.push(`sort= asc`);

    url += params.join("&");
    fetchProducts(url);
});

async function fetchProducts(url){
    ProductList.innerHTML = '';
    message.textContent = "Loading...;"


try{
    const res = await fetch(url);
    if(!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    if(data.length === 0){
        message.textContent = "No products found";
        return;
        
    }
    message.textContent = '';
    data.forEach((product) => {
        const div = document.createElement('div');
        div.className = "product";
        div.innerHTML = `
        <img src = "${product.image || 'https://via.placeholder.com/150'}"  alt = "${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        `;
        ProductList.appendChild(div);
    });
}catch(err){
    console.log(err);
    message.textContent = "An error occurred. Please try again.";
}
}
