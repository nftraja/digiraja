/* =====================================================
   DIGIRAJA FINAL UNIVERSAL STORE ENGINE
   Stable Version (NO AUTO IMAGE FETCH)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DRAWER SYSTEM
  =============================== */

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if (menuBtn && drawer && overlay) {

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
     ACTIVE NAV DETECT
  =============================== */

  const currentPath = window.location.pathname;

  document.querySelectorAll(".bottom-item")
  .forEach(item => {
    if (item.getAttribute("href") === currentPath) {
      item.classList.add("active");
    }
  });



  /* =====================================================
     STORE AUTO LOADER
  ===================================================== */

  const storeContainer =
    document.getElementById("storeContainer");

  if (!storeContainer) return;

  const jsonFile =
    storeContainer.dataset.json;

  if (!jsonFile) return;

  fetch(jsonFile, { cache: "no-store" })
    .then(res => res.json())
    .then(data => {

      if (!Array.isArray(data) || !data.length) {

        storeContainer.innerHTML =
          `<div class="glass-card">
             No Products Available
           </div>`;

        return;
      }

      storeContainer.innerHTML =
        data.map(productCard).join("");

    })
    .catch(() => {

      storeContainer.innerHTML =
        `<div class="glass-card">
            Data Load Failed
         </div>`;
    });



  /* =====================================================
     ✅ HIGH CONVERSION PRODUCT CARD
  ===================================================== */

  function productCard(item) {

    const image =
      item.image
      ? item.image
      : "/assets/placeholder.webp";

    return `
    <div class="product-card">

      <div class="product-image">
        <img src="${image}"
             loading="lazy"
             alt="${item.title}">
      </div>

      <div class="product-body">

        <div class="brand">
          ${item.brand || ""}
        </div>

        <div class="title">
          ${item.title || ""}
        </div>

        <div class="rating">
          ⭐ ${item.rating || "4.5"}
        </div>

        <div class="price">
          ${item.price || ""}
        </div>

        <a href="${item.redirect}"
           class="buy-btn">
           View Deal →
        </a>

      </div>

    </div>
    `;
  }



  /* =====================================================
     SAFE EXTERNAL LINKS
  ===================================================== */

  document.querySelectorAll("a[target='_blank']")
    .forEach(link => {
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

});



/* =====================================================
   SERVICE WORKER REGISTER
===================================================== */

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("/sw.js")
      .then(() =>
        console.log("DigiRaja SW Registered")
      )
      .catch(() =>
        console.log("SW Registration Failed")
      );

  });

}