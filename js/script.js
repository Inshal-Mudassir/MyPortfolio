// ============================================================
// Inshal Mudassir — Portfolio interactions
// ============================================================
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 12) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu toggle ---------------- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Active section detection ---------------- */
  const sections = ["home", "about", "skills", "tools", "projects", "education", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Back to top ---------------- */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------------- Tools wall ---------------- */
  const tools = [
    { name: "HTML", short: "HTML", color: "#E4693A" },
    { name: "CSS", short: "CSS", color: "#3E7BFA" },
    { name: "JavaScript", short: "JS", color: "#D9B300" },
    { name: "Tailwind CSS", short: "TW", color: "#33B6C9" },
    { name: "Python", short: "Py", color: "#3E7BFA" },
    { name: "NumPy", short: "Np", color: "#5B8DEF" },
    { name: "Pandas", short: "Pd", color: "#9B7BFF" },
    { name: "Matplotlib", short: "Mpl", color: "#E8746A" },
    { name: "Seaborn", short: "Sns", color: "#33B6C9" },
    { name: "Scikit-learn", short: "SkL", color: "#E68A3A" },
    { name: "MongoDB", short: "Mongo", color: "#3FA65B" },
    { name: "Git", short: "Git", color: "#E4693A" },
    { name: "GitHub", short: "GH", color: "#1C2233" },
    { name: "VS Code", short: "VSC", color: "#3E7BFA" },
    { name: "Linux", short: "Lin", color: "#4B5468" },
    { name: "Jupyter", short: "Jpy", color: "#E68A3A" },
  ];

  const toolsWall = document.getElementById("toolsWall");
  if (toolsWall) {
    const frag = document.createDocumentFragment();
    tools.forEach((tool) => {
      const chip = document.createElement("div");
      chip.className = "tool-chip reveal";
      chip.innerHTML = `
        <div class="tool-chip__icon" style="background:${tool.color}">${tool.short}</div>
        <div class="tool-chip__name">${tool.name}</div>
      `;
      frag.appendChild(chip);
    });
    toolsWall.appendChild(frag);

    // observe newly added reveal elements
    const newReveals = toolsWall.querySelectorAll(".reveal");
    if (prefersReducedMotion) {
      newReveals.forEach((el) => el.classList.add("in-view"));
    } else {
      const obs = new IntersectionObserver(
        (entries, o) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              o.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      newReveals.forEach((el) => obs.observe(el));
    }
  }

  /* ---------------- Project filtering ---------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });

  /* ---------------- Hero typing animation ---------------- */
  const heroTypingEl = document.getElementById("heroTyping");
  if (heroTypingEl && !prefersReducedMotion) {
    const phrase = "model.predict(future)";
    let i = 0;
    function typeChar() {
      if (i <= phrase.length) {
        heroTypingEl.textContent = phrase.slice(0, i);
        i++;
        setTimeout(typeChar, 90);
      } else {
        setTimeout(() => {
          i = 0;
          typeChar();
        }, 2000);
      }
    }
    typeChar();
  } else if (heroTypingEl) {
    heroTypingEl.textContent = "model.predict(future)";
  }

  /* ---------------- Developer terminal typing ---------------- */
  const terminalBody = document.getElementById("terminalBody");
  const terminalScript = [
    { prompt: "$ whoami", out: "Inshal" },
    { prompt: "$ skills", out: "HTML CSS JavaScript Python" },
    { prompt: "$ data", out: "NumPy Pandas Matplotlib" },
    { prompt: "$ focus", out: "Web Development + Data Science + ML" },
    { prompt: "$ status", out: "Always Learning..." },
  ];

  function renderTerminalStatic() {
    terminalBody.innerHTML = terminalScript
      .map(
        (row) =>
          `<div class="line"><span class="prompt">${row.prompt}</span></div><div class="line out">${row.out}</div>`
      )
      .join("");
  }

  if (terminalBody) {
    if (prefersReducedMotion) {
      renderTerminalStatic();
    } else {
      let started = false;
      const termObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !started) {
              started = true;
              typeTerminal();
            }
          });
        },
        { threshold: 0.3 }
      );
      termObserver.observe(terminalBody);

      async function typeTerminal() {
        for (const row of terminalScript) {
          const promptLine = document.createElement("div");
          promptLine.className = "line";
          const promptSpan = document.createElement("span");
          promptSpan.className = "prompt";
          promptLine.appendChild(promptSpan);
          terminalBody.appendChild(promptLine);

          await typeText(promptSpan, row.prompt, 45);
          await wait(280);

          const outLine = document.createElement("div");
          outLine.className = "line out";
          terminalBody.appendChild(outLine);
          await typeText(outLine, row.out, 20);
          await wait(400);
        }
      }

      function typeText(el, text, speed) {
        return new Promise((resolve) => {
          let i = 0;
          (function step() {
            if (i <= text.length) {
              el.textContent = text.slice(0, i);
              i++;
              setTimeout(step, speed);
            } else {
              resolve();
            }
          })();
        });
      }

      function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    }
  }

  /* ---------------- Contact form validation ---------------- */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  function setError(field, message) {
    const row = field.closest(".form-row");
    const errorEl = row.querySelector(".form-error");
    if (message) {
      row.classList.add("error");
      errorEl.textContent = message;
    } else {
      row.classList.remove("error");
      errorEl.textContent = "";
    }
  }

  function validateField(field) {
    if (field.validity.valueMissing) {
      setError(field, "This field is required.");
      return false;
    }
    if (field.type === "email" && field.validity.typeMismatch) {
      setError(field, "Enter a valid email address.");
      return false;
    }
    if (field.validity.tooShort) {
      setError(field, `Please enter at least ${field.minLength} characters.`);
      return false;
    }
    setError(field, "");
    return true;
  }

  if (form) {
    const fields = Array.from(form.querySelectorAll("input, textarea"));
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-row").classList.contains("error")) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let allValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) allValid = false;
      });

      if (allValid) {
        formStatus.textContent =
          "Thanks! This form is front-end only right now — connect a backend or email service to actually receive messages.";
        form.reset();
      } else {
        formStatus.textContent = "Please fix the highlighted fields above.";
      }
    });
  }
})();
