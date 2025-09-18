 tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#B08E2A',
            secondary: '#203749',
            light: '#FFFFFF',
            whatsapp: '#25D366',
          }
        }
      }
    }

const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

function openMenu() {
  // Mesurer la hauteur intérieure
  const content = menu.firstElementChild;
  const targetHeight = content.scrollHeight;
  menu.style.height = targetHeight + "px";
  btn.setAttribute("aria-expanded", "true");

  // Après l'animation, fixer à 'auto' pour suivre le contenu
  const onEnd = () => {
    if (btn.getAttribute("aria-expanded") === "true")
      menu.style.height = "auto";
    menu.removeEventListener("transitionend", onEnd);
  };
  menu.addEventListener("transitionend", onEnd);
}

function closeMenu() {
  // Passer de auto à une valeur fixe pour animer vers 0
  const currentHeight = menu.scrollHeight;
  menu.style.height = currentHeight + "px";
  // forcer le reflow
  menu.getBoundingClientRect();
  menu.style.height = "0px";
  btn.setAttribute("aria-expanded", "false");
}

if (btn && menu) {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  // Fermer après clic sur un lien
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (btn.getAttribute("aria-expanded") === "true") closeMenu();
    });
  });

  // Réinitialiser au resize (>= md)
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      menu.style.height = "auto";
      btn.setAttribute("aria-expanded", "false");
    } else {
      // Replie par défaut en mobile
      menu.style.height = "0px";
    }
  });
}

// Surbrillance du lien actif (desktop + mobile)
(function activeLink() {
  let current = location.pathname.split("/").pop() || "index.html";
  current = current.toLowerCase();
  document.querySelectorAll("header nav a[href]").forEach((a) => {
    let target = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
    if (target === current) a.classList.add("font-semibold", "text-primary");
  });
})();


//<!-- Script Filtrage  de formation-->

  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".formation-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.remove("bg-secondary","text-white"));
      btn.classList.add("bg-secondary","text-white");

      cards.forEach(card => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });


  // PWA 

  let deferredPrompt;
  const installBtn = document.getElementById("installBtn");
  const installBtnMobile = document.getElementById("installBtnMobile");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove("hidden");
    if (installBtnMobile) installBtnMobile.classList.remove("hidden");
  });

  function handleInstall(e, button) {
    e.preventDefault(); // empêche le rechargement du lien
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log("Résultat installation :", choiceResult.outcome);
        deferredPrompt = null;
        button.classList.add("hidden");
      });
    }
  }

  if (installBtn) installBtn.addEventListener("click", (e) => handleInstall(e, installBtn));
  if (installBtnMobile) installBtnMobile.addEventListener("click", (e) => handleInstall(e, installBtnMobile));
