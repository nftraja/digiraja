export const UI = {

/* NAVBAR */

navbar(categories, active){

 return `
 <header class="nav">

 ${categories.map(cat => `
   <a 
     class="${cat.slug===active?'active':''}"
     href="?cat=${cat.slug}">
     ${cat.name}
   </a>
 `).join("")}

 </header>
 `;
},

/* CARD */

card(app){

 return `
 <div class="card"
 onclick="window.open('${app.redirect}','_blank')">

   <img src="${app.image}" loading="lazy">

   <h3>${app.name}</h3>

   <p>${app.description}</p>

 </div>
 `;
},

/* GRID */

grid(apps){

 return `
 <main class="grid">
   ${apps.map(this.card).join("")}
 </main>
 `;
},

/* FOOTER */

footer(){

 return `
 <footer class="footer">
   DigiRaja • Discovery Platform
 </footer>
 `;
}

};