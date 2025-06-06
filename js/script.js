// 🔹 FUNCȚIA SEARCH
document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById('search-icon');
  const navbar = document.querySelector('.navbar');
  const inputBox = document.querySelector(".search-box .input-box input");

  searchIcon.addEventListener('click', function () {
    navbar.classList.toggle('showInput');
    if (navbar.classList.contains('showInput')) {
      inputBox.focus(); // setează focusul direct în input
    }
  });

  inputBox.addEventListener("input", () => {
    const query = inputBox.value.toLowerCase().trim();
    const products = document.querySelectorAll(".mitem");
    let found = false;

    products.forEach(product => {
      const productNameElement = product.querySelector(".mdet .name");
      if (!productNameElement) return;

      const productName = productNameElement.textContent.toLowerCase();
      const match = productName.includes(query);
      product.style.display = match ? "block" : "none";
      if (match) found = true;
    });

    let noProductMessage = document.getElementById("no-product-message");
    if (!noProductMessage) {
      noProductMessage = document.createElement("div");
      noProductMessage.id = "no-product-message";
      Object.assign(noProductMessage.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#ffcccc",
        color: "#990000",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        zIndex: "1000"
      });
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

  let scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//-------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const dropdownLinks = document.querySelectorAll(".dropdown > a");

  dropdownLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Previne navigarea normală

      const parentLi = this.parentElement;
      const submenu = parentLi.querySelector(".submenu");

      // Dacă submenu-ul este vizibil, îl ascundem
      if (submenu.style.display === "flex" || submenu.style.display === "") {
        submenu.style.display = "none";
        parentLi.classList.remove("open");
      } else {
        // Închidem toate submeniurile înainte de a deschide altul
        document.querySelectorAll(".submenu").forEach(sub => {
          sub.style.display = "none";
          sub.parentElement.classList.remove("open");
        });

        // Afișăm submenu-ul acestui link
        submenu.style.display = "flex";
        parentLi.classList.add("open");
      }
    });
  });
});

//--------------------------------


document.querySelector('.nrtf').style.display = 'block';



//FeedBack
document.getElementById('feedbackForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfvUYBxmWUCgDRc5d0w1vF7SCz3PbSzoLdt4ksYO6XjSS4PnQ/formResponse";
  let formData = new FormData();

  // Obține datele din formular
  formData.append("entry.1391475918", document.getElementById('nume').value);
  formData.append("entry.777614839", document.getElementById('prenume').value);
  formData.append("entry.219696843", document.getElementById('email').value);
  formData.append("entry.1850669950", document.getElementById('comentariu').value);
  

  // Trimite formularul la Google Forms
  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    showMessage("Feedback trimis cu succes!", "success");
    document.getElementById('feedbackForm').reset();
  }).catch((error) => {
    showMessage("Eroare la trimiterea feedback-ului. Încercați din nou.", "error");
  });
  // Funcția pentru a arăta mesajele de succes/eroare
  function showMessage(message, type) {
    let messageBox = document.getElementById('message');
    messageBox.textContent = message;

    // Dacă este succes, folosește culoare verde, dacă este eroare, culoare roșie
    if (type === "success") {
      messageBox.style.backgroundColor = "rgba(0, 128, 0, 0.7)";
    } else if (type === "error") {
      messageBox.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    }

    // Arată mesajul
    messageBox.style.display = "block";
    messageBox.style.opacity = "1";

    // Îl face invizibil după 4 secunde
    setTimeout(() => {
      messageBox.style.opacity = "0";
      messageBox.style.bottom = "50px";
    }, 3000);  // Dispare după 3 secunde

    // După ce mesajul dispare, îl ascunde complet
    setTimeout(() => {
      messageBox.style.display = "none";
      messageBox.style.bottom = "30px";  // Îl readuce în poziția inițială
    }, 4000);  // După 4 secunde
  };

});



// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const bottomNavbar = document.querySelector('.bottom-navbar');
  const footer = document.querySelector('footer');
  const mobileSearch = document.getElementById('mobile-search');
  const searchInput = document.getElementById('search-mobile-input');

  function toggleBottomNavbar() {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (footerTop < windowHeight) {
      bottomNavbar.classList.add('hide');
    } else {
      bottomNavbar.classList.remove('hide');
    }
  }

  window.addEventListener('scroll', toggleBottomNavbar);
  window.addEventListener('resize', toggleBottomNavbar);
  toggleBottomNavbar();

  // ➡️ Buton Coș de jos
  document.getElementById('bottom-cart').addEventListener('click', function () {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
  });

  // ➡️ Buton Search de jos
  document.getElementById('bottom-search').addEventListener('click', function () {
    mobileSearch.style.display = mobileSearch.style.display === 'block' ? 'none' : 'block';
    if (mobileSearch.style.display === 'block') {
      searchInput.focus();
    }
  });

  // ✅ Căutare produse din inputul de jos
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const products = document.querySelectorAll(".mitem");
    let found = false;

    products.forEach(product => {
      const productNameElement = product.querySelector(".mdet .name");
      if (!productNameElement) return;

      const productName = productNameElement.textContent.toLowerCase();
      const match = productName.includes(query);
      product.style.display = match ? "block" : "none";
      found = found || match;
    });

    // ✅ Mesaj „Produsul nu a fost găsit”
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

  // 🔻 Închide bara de căutare când dai click în afară
  document.addEventListener('click', function (e) {
    if (
      !mobileSearch.contains(e.target) &&
      !document.getElementById('bottom-search').contains(e.target)
    ) {
      mobileSearch.style.display = 'none';
    }
  });

  // ➡️ Buton Tema (zi/noapte) de jos
  document.getElementById('bottom-theme').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');

    const icon = this.querySelector('i');
    if (body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
});




//----------------------------- Adauga in cos navbar jos
document.addEventListener("DOMContentLoaded", () => {
  const cartFab = document.getElementById("cart-fab");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCart = document.getElementById("close-cart");
  const placeOrder = document.getElementById("place-order");
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const notification = document.getElementById("notification");
  const overlay = document.getElementById("cart-overlay");
  let cart = [];


  // Deschidere coș + overlay
  cartFab.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
  });

  // Închidere coș cu buton X
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Închidere la click în afara sidebarului
  overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Ascunde numărul de produse inițial
  cartCount.style.display = "none";

  // Deschide coșul
  cartFab.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
  });

  // Închide coșul și overlay-ul
  function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
  }

  closeCart.addEventListener("click", closeCartSidebar);
  overlay.addEventListener("click", closeCartSidebar);

  // Adăugare produs în coș
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const mitem = this.closest(".mitem");
      const name = mitem.querySelector(".name").innerText;
      const priceText = mitem.querySelector("h4").innerText;
      const price = parseFloat(priceText.match(/\d+/)[0]);
      const imageSrc = mitem.querySelector("img").src;

      let existingProduct = cart.find((p) => p.name === name);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ name, price, quantity: 1, image: imageSrc });
      }

      updateCart();
      showNotification(`"${name}" a fost adăugat în coș`);
    });
  });

  // Actualizare coș 
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    cart.forEach((product, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${product.image}" class="cart-image">
        <div class="cart-info">
          <span>${product.name}</span>
          <div class="cart-quantity">
            <button class="quantity-btn decrease" data-index="${index}">-</button>
            <span>${product.quantity}</span>
            <button class="quantity-btn increase" data-index="${index}">+</button>
          </div>
          <span>${product.price * product.quantity} lei</span>
          <button class="remove-btn" onclick="removeItem(${index})">✕</button>
        </div>
      `;
      cartItems.appendChild(li);
      total += product.price * product.quantity;
      itemCount += product.quantity;
    });

    cartTotal.textContent = total;

    // Actualizează numărul de produse de pe iconița coșului
    if (itemCount > 0) {
      cartCount.textContent = itemCount;
      cartCount.style.display = "flex";
      cartCount.classList.add("fade-in");
      setTimeout(() => cartCount.classList.remove("fade-in"), 300);
    } else {
      cartCount.style.display = "none";
    }

    attachQuantityButtons();
  }

  function attachQuantityButtons() {
    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        cart[index].quantity++;
        updateCart();
      });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });
    });
  }

  // Plasează comanda
  placeOrder.addEventListener("click", () => {
    if (cart.length > 0) {
      showNotification("Comanda a fost plasată!");
      cart = [];
      updateCart();
      closeCartSidebar();
    } else {
      showNotification("Coșul este gol!");
    }
  });

  // Notificări
  function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 2000);
  }

  // Ștergere produs complet 
  window.removeItem = function (index) {
    const removed = cart.splice(index, 1)[0];
    updateCart();
    showNotification(`"${removed.name}" (${removed.quantity}x) a fost șters din coș`);
  };


  let currentProduct = null;

  // MODAL: deschidere la click pe imagine
  document.querySelectorAll('.mitem .mimg').forEach(img => {
    img.addEventListener('click', function () {
      const card = this.closest('.mitem');
      const name = card.querySelector('.name').textContent;
      const priceText = card.querySelector('h4').textContent;
      const price = parseFloat(priceText.match(/\d+/)[0]);
      const desc = card.getAttribute('data-desc') || "Fără descriere";
      const imgSrc = this.src;

      currentProduct = {
        name: name,
        price: price,
        image: imgSrc
      };

      document.getElementById('modalName').textContent = name;
      document.getElementById('modalPrice').textContent = priceText;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalImage').src = imgSrc;

      document.getElementById('productModal').style.display = 'flex';
    });
  });

  // MODAL: închidere cu X
  document.getElementById("modalClose").addEventListener("click", function () {
    document.getElementById('productModal').style.display = 'none';
  });

  // MODAL: adaugă în coș
  document.getElementById('modalAddToCart').addEventListener('click', function () {
    if (!currentProduct) return;

    let existingProduct = cart.find((p) => p.name === currentProduct.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...currentProduct, quantity: 1 });
    }

    updateCart();
    showNotification(`"${currentProduct.name}" a fost adăugat în coș`);
    document.getElementById('productModal').style.display = 'none';
  });

});

//Swiper
const topSections = document.querySelectorAll('.top-sec');


const swiperContainer = document.createElement('div');
swiperContainer.classList.add('swiper', 'top-swiper');

const swiperWrapper = document.createElement('div');
swiperWrapper.classList.add('swiper-wrapper');


topSections.forEach(section => {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.appendChild(section.cloneNode(true));
  swiperWrapper.appendChild(slide);
  section.remove();
});

swiperContainer.appendChild(swiperWrapper);
document.body.prepend(swiperContainer);



const swiper = new Swiper('.top-swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  effect: 'slide',
  grabCursor: true,
  allowTouchMove: true
});




//Filtru
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".mitem");
  const titles = document.querySelectorAll(".menu-title");
  const breaks = document.querySelectorAll(".br-break");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Scoate clasa activă de la toate butoanele
      buttons.forEach(btn => btn.classList.remove("active"));
      // Adaugă clasa activă butonului apăsat
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Afișează/ascunde produsele
      items.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      // Afișează/ascunde titlurile
      titles.forEach(title => {
        const category = title.classList[1]; // a doua clasă e categoria
        const hasVisibleItems = Array.from(items).some(
          item => item.classList.contains(category) && !item.classList.contains("hidden")
        );

        if (filter === "all" || hasVisibleItems) {
          title.classList.remove("hidden");
        } else {
          title.classList.add("hidden");
        }
      });

      // Afișează/ascunde <br>-urile pe categorii
      breaks.forEach(br => {
        if (filter === "all" || br.classList.contains(filter)) {
          br.classList.remove("hidden");
        } else {
          br.classList.add("hidden");
        }
      });
    });
  });
});



//Sortare

const originalOrders = new Map();

window.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('ul.mlist').forEach((list, index) => {
    originalOrders.set(index, Array.from(list.children));
  });
});

function parsePrice(text) {

  return parseFloat(text.replace(/[^\d.]/g, ''));
}

function animateAndReorder(list, newItems) {

  newItems.forEach(item => item.classList.add('anim-out'));

  setTimeout(() => {
    list.innerHTML = '';
    newItems.forEach(item => {
      item.classList.remove('anim-out');
      item.classList.add('anim-in');
      list.appendChild(item);
    });

    setTimeout(() => {
      newItems.forEach(item => item.classList.remove('anim-in'));
    }, 300);
  }, 200);
}

function sortItems(order) {
  const btnAsc = document.getElementById('sort-asc');
  const btnDesc = document.getElementById('sort-desc');
  const isAscActive = btnAsc.classList.contains('active');
  const isDescActive = btnDesc.classList.contains('active');


  if ((order === 'asc' && isAscActive) || (order === 'desc' && isDescActive)) {
    document.querySelectorAll('ul.mlist').forEach((list, index) => {
      const originalItems = originalOrders.get(index);
      if (originalItems) {
        animateAndReorder(list, originalItems);
      }
    });
    btnAsc.classList.remove('active');
    btnDesc.classList.remove('active');
    return;
  }


  document.querySelectorAll('ul.mlist').forEach(list => {
    const items = Array.from(list.querySelectorAll('li.mitem'));
    const sorted = items.sort((a, b) => {
      const priceA = parsePrice(a.querySelector('h4').textContent);
      const priceB = parsePrice(b.querySelector('h4').textContent);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    animateAndReorder(list, sorted);
  });


  btnAsc.classList.toggle('active', order === 'asc');
  btnDesc.classList.toggle('active', order === 'desc');
};




// Slide Produse populare 
const track = document.querySelector('#populare .slider-track');
const items = Array.from(track.children);

let visible = 4; // default
let index = 0;

function updateVisible() {
  const width = window.innerWidth;
  if (width <= 500) visible = 1;
  else if (width <= 900) visible = 2;
  else visible = 4;
}

function cloneItems() {
  // Ștergem clonele vechi (dacă există)
  const clones = track.querySelectorAll('.clone');
  clones.forEach(c => c.remove());

  // Clonăm noile elemente
  for (let i = 0; i < visible; i++) {
    const clone = items[i].cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  }
}

function moveSlider() {
  index++;
  const item = track.children[0];
  const style = window.getComputedStyle(item);
  const width = item.offsetWidth;
  const marginRight = parseInt(style.marginRight);
  const step = width + marginRight;
  const maxIndex = items.length;

  track.style.transform = `translateX(-${index * step}px)`;

  if (index >= maxIndex) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = 'translateX(0)';
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }, 500);
  }
}

function init() {
  updateVisible();
  cloneItems();
  index = 0;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = 'translateX(0)';
}

window.addEventListener('resize', () => {
  init();
});

init();

setInterval(moveSlider, 3000);
