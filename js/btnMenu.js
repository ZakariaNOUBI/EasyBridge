tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#B08E2A",
        secondary: "#203749",
        light: "#FFFFFF",
        whatsapp: "#25D366",
      },
    },
  },
};
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

// validation du formulaire d'inscription



  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorContainer = document.getElementById("form-errors");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      let messages = [];

      const prenom = document.getElementById("prenom");
      const nom = document.getElementById("nom");
      const typeSecondaire = document.getElementById("typeSecondaire");
      const email = document.getElementById("email");
      const tel = document.getElementById("telephone");
      const typeFormation = document.getElementById("typeFormation");
      const pole = document.getElementById("pole");
      const programme = document.getElementById("programme");

      // Validation du prénom
      if (prenom.value.trim() === "") {
        isValid = false;
        messages.push("Le prénom est requis.");
      }

      // Validation du nom
      if (nom.value.trim() === "") {
        isValid = false;
        messages.push("Le nom de famille est requis.");
      }

      // Type secondaire
      if (typeSecondaire.value === "") {
        isValid = false;
        messages.push("Le type de secondaire est requis.");
      }

      // Email
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
        isValid = false;
        messages.push("Adresse email invalide.");
      }

      // Téléphone
      if (!/^\d{10,15}$/.test(tel.value.trim())) {
        isValid = false;
        messages.push("Numéro de téléphone invalide.");
      }

      // Type de formation
      if (typeFormation.value === "") {
        isValid = false;
        messages.push("Le type de formation est requis.");
      }

      // Pôle
      if (pole.value === "") {
        isValid = false;
        messages.push("Le pôle est requis.");
      }

      // Programme
      if (programme.value === "") {
        isValid = false;
        messages.push("Le programme est requis.");
      }

      // Affichage des messages
      if (isValid) {
        errorContainer.innerHTML = ""; // tout est bon
        form.submit();
      } else {
        errorContainer.innerHTML = messages.map(msg => `<p>${msg}</p>`).join("");
      }
    });
  });





// Données programmes
const formations = {
  superieure: {
    "Pôle Gestion": [
      "Bachelor en Management des PME",
      "Master en Management des PME",
      "Bachelor en Management des RH",
      "Master en Management des RH",
    ],
    "Pôle Informatique": [
      "Bachelor en Systèmes et Réseaux Informatiques",
      "Master en Systèmes et Réseaux Informatiques",
      "Bachelor en Développement Logiciel",
      "Master en Développement Logiciel",
    ],
    "Pôle Génie appliqué": [
      "Bachelor en Efficacité énergétique",
      "Master en Efficacité Énergétique",
      "Bachelor en Génie climatique et froid",
      "Master en Génie climatique et froid",
    ],
    "Pôle Logistique": [
      "Bachelor en Logistique et transports",
      "Master en Logistique et transports",
      "Bachelor en Génie Civil et Construction",
      "Master en Génie Civil et Construction",
    ],
  },
  professionnelle: {
    "Formations courtes": [
      "Initiation à l’informatique",
      "Techniques de communication",
      "Gestion de projet agile",
    ],
    "Certificats professionnels": [
      "Comptabilité",
      "Marketing digital",
      "Langues (Anglais / Français)",
    ],
    "Formations techniques": [
      "Électricité et maintenance",
      "Réseaux et cybersécurité",
      "Design et infographie",
    ],
    "Programmes sur mesure": [
      "Leadership",
      "Développement d’équipe",
      "Gestion de crise",
    ],
  },
};

// Charger dynamiquement les pôles et programmes
function updatePoles() {
  const typeFormation = document.getElementById("typeFormation").value;
  const poleSelect = document.getElementById("pole");
  const programmeSelect = document.getElementById("programme");

  // Réinitialiser
  poleSelect.innerHTML = '<option value="">-- Sélectionnez un pôle --</option>';
  programmeSelect.innerHTML =
    '<option value="">-- Sélectionnez un programme --</option>';

  if (typeFormation && formations[typeFormation]) {
    Object.keys(formations[typeFormation]).forEach((pole) => {
      let opt = document.createElement("option");
      opt.value = pole;
      opt.textContent = pole;
      poleSelect.appendChild(opt);
    });
  }
}

function updateProgrammes() {
  const typeFormation = document.getElementById("typeFormation").value;
  const pole = document.getElementById("pole").value;
  const programmeSelect = document.getElementById("programme");

  // Réinitialiser
  programmeSelect.innerHTML =
    '<option value="">-- Sélectionnez un programme --</option>';

  if (typeFormation && pole && formations[typeFormation][pole]) {
    formations[typeFormation][pole].forEach((prog) => {
      let opt = document.createElement("option");
      opt.value = prog;
      opt.textContent = prog;
      programmeSelect.appendChild(opt);
    });
  }
}

//<!-- Script Filtrage  de formation-->

const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".formation-card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    buttons.forEach((b) => b.classList.remove("bg-secondary", "text-white"));
    btn.classList.add("bg-secondary", "text-white");

    cards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
