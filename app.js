/* =====================================================
DIGIRAJA UNIVERSAL APP ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", function(){

/* =========================
DRAWER SYSTEM
========================= */

const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

if(menuBtn && drawer && overlay){

menuBtn.addEventListener("click", function(){
drawer.classList.toggle("active");
overlay.classList.toggle("active");
document.body.classList.toggle("no-scroll");
});

overlay.addEventListener("click", function(){
drawer.classList.remove("active");
overlay.classList.remove("active");
document.body.classList.remove("no-scroll");
});

}


/* =========================
BOTTOM NAV ACTIVE AUTO
========================= */

const bottomItems = document.querySelectorAll(".bottom-item");
const currentPath = window.location.pathname;

bottomItems.forEach(item=>{
const link = item.getAttribute("href");

if(link === currentPath){
item.classList.add("active");
}
});


/* =========================
SAFE EXTERNAL LINKS
========================= */

document.querySelectorAll("a[target='_blank']")
.forEach(link=>{
link.setAttribute("rel","noopener noreferrer");
});

});


/* =====================================================
SOURCE LOGO FETCH ENGINE
ZERO IMAGE HOSTING
===================================================== */

function getSourceLogo(source){

const sources = {

amazon:"amazon.in",
flipkart:"flipkart.com",
envato:"envato.com",
udemy:"udemy.com",
hostinger:"hostinger.in",
shopify:"shopify.com",
canva:"canva.com",
appsumo:"appsumo.com"

};

const domain = sources[source];

if(!domain){
return "https://www.google.com/s2/favicons?sz=128&domain=google.com";
}

return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
}


/* =====================================================
SERVICE WORKER REGISTER
===================================================== */

if("serviceWorker" in navigator){

window.addEventListener("load",function(){

navigator.serviceWorker.register("/sw.js")
.then(()=>{
console.log("DigiRaja SW Registered");
})
.catch(()=>{
console.log("SW Failed");
});

});

}