/* =========================================================
   MAIN JAVASCRIPT
   Portfolio Website
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initHeaderScroll();
    initActiveNavigation();
    initFooterYear();
    initSmoothScroll();
    initButtonRipple();
    initExternalLinks();
    initContactForm();

    document.body.classList.add("page-loaded");
});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a navigation link
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Close menu when resizing to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function initHeaderScroll() {
    const header = document.querySelector(".header");

    if (!header) return;

    const updateHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");

    if (!navLinks.length) return;

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const linkPage = href.split("/").pop();

        link.classList.remove("active");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });
}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

function initFooterYear() {
    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

function initButtonRipple() {
    const buttons = document.querySelectorAll(
        ".btn, .nav-button, .filter-btn"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const rect = button.getBoundingClientRect();

            const ripple = document.createElement("span");

            ripple.className = "button-ripple";

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}


/* =========================================================
   EXTERNAL LINK SECURITY
   ========================================================= */

function initExternalLinks() {
    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });
}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initContactForm() {
    const form = document.querySelector("#contactForm");
    const status = document.querySelector("#formStatus");

    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        clearFormStatus();

        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const subject = form.querySelector("#subject");
        const message = form.querySelector("#message");

        if (!name || !email || !subject || !message) return;

        // Validate name
        if (name.value.trim().length < 2) {
            showFormStatus(
                "Please enter your name.",
                "error"
            );

            name.focus();
            return;
        }

        // Validate email
        if (!isValidEmail(email.value.trim())) {
            showFormStatus(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();
            return;
        }

        // Validate subject
        if (subject.value.trim().length < 3) {
            showFormStatus(
                "Please enter a subject.",
                "error"
            );

            subject.focus();
            return;
        }

        // Validate message
        if (message.value.trim().length < 10) {
            showFormStatus(
                "Please write a little more about your project.",
                "error"
            );

            message.focus();
            return;
        }

        // Success
        showFormStatus(
            "Thanks! Your message has been prepared successfully. I'll get back to you soon.",
            "success"
        );

        form.reset();
    });


    // Clear error when user starts typing
    form.querySelectorAll("input, textarea, select").forEach((field) => {
        field.addEventListener("input", () => {
            if (status.classList.contains("error")) {
                clearFormStatus();
            }
        });
    });


    function isValidEmail(email) {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }


    function showFormStatus(message, type) {
        status.textContent = message;

        status.classList.remove(
            "success",
            "error"
        );

        status.classList.add(type);

        status.style.display = "block";
    }


    function clearFormStatus() {
        status.textContent = "";

        status.classList.remove(
            "success",
            "error"
        );

        status.style.display = "none";
    }
}


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.body.classList.add("page-hidden");
    } else {
        document.body.classList.remove("page-hidden");
    }
});