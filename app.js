import { UI } from "./core/ui.js";

/* -----------------------------
   GET CATEGORY FROM URL
------------------------------*/

function getCategory(){

 const params =
   new URLSearchParams(window.location.search);

 return params.get("cat") || "editing";
}

/* -----------------------------
   LOAD CATEGORY DATA
------------------------------*/

async function loadApps(){

 const category = getCategory();

 const res =
   await fetch(`./data/${category}.json`);

 const apps = await res.json();

 render(apps, category);
}

/* -----------------------------
   LOAD CATEGORY MENU
------------------------------*/

async function loadCategories(){

 const res =
   await fetch("./data/categories.json");

 return await res.json();
}

/* -----------------------------
   RENDER APP
------------------------------*/

async function render(apps, activeCat){

 const categories = await loadCategories();

 document.getElementById("app").innerHTML =
   UI.navbar(categories, activeCat) +
   UI.grid(apps) +
   UI.footer();
}

loadApps();