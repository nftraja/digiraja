const BASE_PATH="/digiraja/";


/* CATEGORY MASTER */

const categories=[
"laptops",
"mobiles",
"headphones",
"gaming",
"cameras",
"tablets",
"smartwatches",
"studygear",
"accessories"
];


const grid=document.getElementById("category-grid");

categories.forEach(cat=>{

const div=document.createElement("div");

div.className="category-card";
div.innerText=cat.toUpperCase();

div.onclick=()=>loadCategory(cat);

grid.appendChild(div);

});


/* LOAD PRODUCTS */

async function loadCategory(category){

const area=document.getElementById("product-area");

area.innerHTML="Loading...";

try{

const res=await fetch(
BASE_PATH+"data/"+category+".json"
);

const data=await res.json();

area.innerHTML="";

data.products.forEach(p=>{

area.innerHTML+=`
<div class="product-card">
<h3>${p.name}</h3>
<p>${p.desc}</p>
<a href="${p.link}" target="_blank">
View Deal
</a>
</div>
`;

});

}catch{

area.innerHTML="Category Failed";

}

}