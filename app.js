
const productArea =
document.getElementById("product-area");


/* LOAD CATEGORY */

async function loadCategory(category){

productArea.innerHTML =
"<p style='padding:20px'>Loading...</p>";

try{

const res =
await fetch(`data/${category}.json`);

const data = await res.json();

renderProducts(data.products);

}
catch(e){

productArea.innerHTML =
"<p style='padding:20px'>Category Failed</p>";

}

}


/* RENDER PRODUCTS */

function renderProducts(products){

productArea.innerHTML = "";

products.forEach(p => {

const card = document.createElement("div");

card.className="product-card";

card.innerHTML = `
<div>
<div class="product-title">${p.name}</div>

<div class="product-desc">
${p.desc}
</div>
</div>

<div>
<div class="price">${p.price}</div>

<a href="${p.link}"
target="_blank"
rel="nofollow sponsored"
class="buy-btn">
View Deal
</a>
</div>
`;

productArea.appendChild(card);

});

}


/* DEFAULT LOAD */

loadCategory("laptops");