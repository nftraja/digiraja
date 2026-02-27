/* =====================================================
   DIGIRAJA UNIVERSAL STORE ENGINE
   Physical + Digital + SaaS + Deals
   JSON Driven Affiliate Store
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DRAWER SYSTEM
  =============================== */

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(menuBtn && drawer && overlay){

    menuBtn.onclick = () => {
      drawer.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    };

    overlay.onclick = () => {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    };
  }


  /* ===============================
     ACTIVE NAV AUTO DETECT
  =============================== */

  const currentPath = window.location.pathname;
  document.querySelectorAll(".bottom-item").forEach(item=>{
    if(item.getAttribute("href") === currentPath){
      item.classList.add("active");
    }
  });


  /* =====================================================
     🔥 DIGIRAJA DISCOVERY AUTO LOADER
  ===================================================== */

  const storeContainer = document.getElementById("storeContainer");

  if(storeContainer){

    const jsonFile = storeContainer.dataset.json;
    const category = storeContainer.dataset.category;

    fetch(jsonFile,{cache:"no-store"})
    .then(res=>res.json())
    .then(data=>{

      let items = data;

      if(category){
        items = data.filter(
          item => item.category === category
        );
      }

      if(!items.length){
        storeContainer.innerHTML =
        `<div class="glass-card">
            No Products Found
         </div>`;
        return;
      }

      storeContainer.innerHTML =
        items.map(productCard).join("");

    })
    .catch(()=>{
      storeContainer.innerHTML =
      `<div class="glass-card">
          Data Load Failed
       </div>`;
    });

  }



  /* =====================================================
     PRODUCT CARD UI
  ===================================================== */

  function productCard(item){

    return `
    <div class="product-card">

        <div class="product-image">
            <img src="${item.image}" 
                 loading="lazy"
                 alt="${item.title}">
            ${item.badge ?
              `<div class="badge">${item.badge}</div>` : ""
            }
        </div>

        <div class="product-body">

            <div class="brand">${item.brand || ""}</div>

            <div class="title">
                ${item.title}
            </div>

            <div class="rating">
                ⭐ ${item.rating || "4.5"}
            </div>

            <div class="price">
                ${item.price || ""}
            </div>

            <a href="${item.redirect}"
               class="buy-btn">
               Buy Now →
            </a>

        </div>

    </div>
    `;
  }



  /* =====================================================
     SAFE EXTERNAL LINKS
  ===================================================== */

  document.querySelectorAll("a[target='_blank']")
  .forEach(link=>{
    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

});



/* =====================================================
   SERVICE WORKER REGISTER
===================================================== */

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>{
    navigator.serviceWorker
    .register("/sw.js")
    .then(()=>console.log("DigiRaja SW Ready"))
    .catch(()=>console.log("SW Failed"));
  });
}