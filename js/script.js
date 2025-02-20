document.addEventListener("DOMContentLoaded", function () {
  // 🔹 FUNCȚIA SEARCH
  document.getElementById('search-icon').addEventListener('click', function () {
      document.querySelector('.navbar').classList.toggle('showInput');
  });

  const inputBox = document.querySelector(".search-box .input-box input");

  inputBox.addEventListener("input", () => {
      const query = inputBox.value.toLowerCase().trim();
      const products = document.querySelectorAll(".mitem");
      let found = false;

      products.forEach(product => {
          const productNameElement = product.querySelector(".mdet .name");

          if (!productNameElement) return;

          const productName = productNameElement.textContent.toLowerCase();
          product.style.display = productName.includes(query) ? "block" : "none";
          found = found || productName.includes(query);
      });

      let noProductMessage = document.getElementById("no-product-message");
      if (!noProductMessage) {
          noProductMessage = document.createElement("div");
          noProductMessage.id = "no-product-message";
          noProductMessage.style.position = "fixed";
          noProductMessage.style.bottom = "20px";
          noProductMessage.style.right = "20px";
          noProductMessage.style.background = "#ffcccc";
          noProductMessage.style.color = "#990000";
          noProductMessage.style.padding = "10px";
          noProductMessage.style.borderRadius = "5px";
          noProductMessage.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
          noProductMessage.style.zIndex = "1000";
          document.body.appendChild(noProductMessage);
      }

      noProductMessage.style.display = found || query === "" ? "none" : "block";
      noProductMessage.textContent = "Produsul nu a fost găsit!";
  });

  // 🔹 FUNCȚIA PENTRU HAMBURGER MENU
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".navbar .links");

  menuToggle.addEventListener("change", function () {
      navLinks.classList.toggle("menu-open", menuToggle.checked);
  });

  // 🔹 ÎNCHIDEREA MENIULUI LA CLICK PE LINK (EXCEPȚIE: SUBMENIU)
  const menuItems = document.querySelectorAll('.navbar .links li a');
  menuItems.forEach(item => {
      item.addEventListener('click', function (event) {
          // Verificăm dacă este un dropdown și nu închidem meniul
          if (this.parentElement.classList.contains("dropdown")) {
              event.preventDefault(); // Nu închide meniul dacă e un dropdown
          } else {
              menuToggle.checked = false;
              navLinks.classList.remove("menu-open");
          }
      });
  });

  // 🔹 FUNCȚIA PENTRU MODUL ÎNTUNECAT (DARK MODE)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
  }

  themeToggleBtn.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // 🔹 BUTON SCROLL TO TOP
  let scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Funcția pentru deschiderea și închiderea submeniurilor
document.addEventListener("DOMContentLoaded", function () {
  let dropdowns = document.querySelectorAll(".dropdown > a");

  dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", function (event) {
          event.preventDefault(); // Previne navigarea paginii

          let submenu = this.nextElementSibling; // Găsește submeniul corespunzător
          let parentDropdown = this.parentElement;

          // Verifică dacă submeniul este deja activ
          let isActive = submenu.classList.contains("active");

          // Dacă era activ, îl închidem și rotim săgeata în poziția inițială
          if (isActive) {
              submenu.classList.remove("active");
              parentDropdown.classList.remove("open");
          } else {
              // Dacă nu era activ, îl activăm acum și rotim săgeata
              submenu.classList.add("active");
              parentDropdown.classList.add("open");
          }
      });
  });
});

