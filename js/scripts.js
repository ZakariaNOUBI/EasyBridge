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

// validation du formulaire envoyer un message


  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[action="#"]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      let valid = true;

      // Réinitialise les erreurs précédentes
      form.querySelectorAll('.error-msg').forEach(el => el.remove());

      const name = form.querySelector('input[name="cand_name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');

      // Validation nom
      if (!name.value.trim()) {
        showError(name, "Le nom est requis.");
        valid = false;
      }

      // Validation email
      if (!validateEmail(email.value)) {
        showError(email, "Adresse email invalide.");
        valid = false;
      }

      // Validation message
      if (message.value.trim().length < 10) {
        showError(message, "Le message doit contenir au moins 10 caractères.");
        valid = false;
      }

      if (!valid) {
        e.preventDefault(); // Empêche l'envoi
      }
    });

    function showError(input, message) {
      const error = document.createElement("p");
      error.className = "error-msg text-sm text-red-600 mt-1";
      error.innerText = message;
      input.insertAdjacentElement("afterend", error);
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
    }
  });

// validation postuler
  document.addEventListener('DOMContentLoaded', () => {
    const formPostuler = document.querySelector('form[action="candidature.php"]');
    if (!formPostuler) return;

    formPostuler.addEventListener('submit', function (e) {
      let valid = true;

      // Supprimer les anciens messages d'erreur
      formPostuler.querySelectorAll('.error-msg').forEach(el => el.remove());

      const name = formPostuler.querySelector('#cand_name');
      const email = formPostuler.querySelector('#cand_email');
      const phone = formPostuler.querySelector('#cand_tel');
      const cv = formPostuler.querySelector('#cand_cv');
      const message = formPostuler.querySelector('[name="cand_message"]');

      // Nom
      if (!name.value.trim()) {
        showError(name, "Le nom est requis.");
        valid = false;
      }

      // Email
      if (!validateEmail(email.value)) {
        showError(email, "Adresse email invalide.");
        valid = false;
      }

      // Téléphone (facultatif, mais si présent : vérifier format)
      if (phone.value && !/^\+?\d{6,15}$/.test(phone.value)) {
        showError(phone, "Numéro de téléphone invalide.");
        valid = false;
      }

      // CV : fichier requis
      if (!cv.value) {
        showError(cv, "Veuillez joindre votre CV.");
        valid = false;
      } else {
        const fileName = cv.value.toLowerCase();
        if (!fileName.endsWith(".pdf") && !fileName.endsWith(".doc") && !fileName.endsWith(".docx")) {
          showError(cv, "Format du CV non supporté. PDF, DOC, DOCX uniquement.");
          valid = false;
        }
      }

      // Message (facultatif mais min. 10 caractères si présent)
      if (message.value.trim() && message.value.trim().length < 10) {
        showError(message, "Le message doit contenir au moins 10 caractères.");
        valid = false;
      }

      if (!valid) {
        e.preventDefault(); // Annuler l'envoi
      }
    });

    function showError(input, message) {
      const error = document.createElement("p");
      error.className = "error-msg text-sm text-red-600 mt-1";
      error.innerText = message;
      input.insertAdjacentElement("afterend", error);
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
    }
  });



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


  // 1er essai PWA 

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

   //<!-- 2eme essai Script PWA -->

    document.addEventListener('DOMContentLoaded', function () {
      let deferredPrompt;
      const installBtn = document.getElementById('installBtn');
      const installBtnMobile = document.getElementById('installBtnMobile');

      [installBtn, installBtnMobile].forEach(btn => {
        if (btn) btn.classList.add('opacity-60', 'pointer-events-none');
      });

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        [installBtn, installBtnMobile].forEach(btn => {
          if (!btn) return;
          btn.classList.remove('opacity-60', 'pointer-events-none', 'hidden');
          btn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const choice = await deferredPrompt.userChoice;
            console.log('Installation:', choice.outcome);
            deferredPrompt = null;
            btn.classList.add('hidden');
          }, { once: true });
        });
      });

      window.addEventListener('appinstalled', () => {
        console.log('PWA installée ✔');
        if (installBtn) installBtn.classList.add('hidden');
        if (installBtnMobile) installBtnMobile.classList.add('hidden');
      });
    });

     // <!-- Service Worker -->

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(() => console.log('Service Worker enregistré'))
          .catch(err => console.error('Erreur SW:', err));
      });
    }
