/* =====================================================
   DIGIRAJA – UNIVERSAL STORE ENGINE
   Physical + Digital + SaaS + Deals
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("productContainer");

  if(!container) return;

  const dataFile = container.dataset.json;

  if(!dataFile) return;


/* =====================================================
   FETCH PRODUCTS
===================================================== */

fetch(dataFile,{cache:"no-store"})
.then(res => res.json())
.then(products => {

if(!Array.isArray(products)) return;

renderProducts(products);

})
.catch(err=>{
console.error("Product Load Error:",err);
});


/* =====================================================
   PRODUCT RENDER
===================================================== */

function renderProducts(products){

container.innerHTML = products.map(product => {

const logo = getLogo(product.link);
const image = getImage(product);

return `

<div class="product-card">

<div class="product-top">

<img 
src="${image}" 
loading="lazy"
onerror="this.src='${logo}'"
>

</div>

<div class="product-body">

<div class="product-title">
${product.name}
</div>

<div class="product-desc">
${product.description}
</div>

<div class="product-bottom">

<a href="/go/${product.slug}.html"
class="buy-btn">

View Deal →

</a>

</div>

</div>

</div>

`;

}).join("");

}


/* =====================================================
   AUTO DOMAIN LOGO FETCH
===================================================== */

function getLogo(url){

try{
const domain = new URL(url).hostname;
return `https://logo.clearbit.com/${domain}`;
}catch{
return "";
}

}


/* =====================================================
   PRODUCT IMAGE FALLBACK
===================================================== */

function getImage(product){

if(product.image && product.image !== "")
return product.image;

return getLogo(product.link);

}


});