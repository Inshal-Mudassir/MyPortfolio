document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initScrollProgress();
    initParallax();
    initCounters();
    initCardTilt();
    initLazyImages();
    initBackToTop();
    initStaggerAnimations();
});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {
    let progressBar = document.querySelector(".scroll-progress");

    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.className = "scroll-progress";
        document.body.appendChild(progressBar);
    }

    const updateProgress = () => {
        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    updateProgress();
}


/* =========================================================
   HERO PARALLAX
   ========================================================= */

function initParallax() {
    const visual = document.querySelector(".hero-visual");

    if (!visual) return;

    const cards = visual.querySelectorAll(".hero-card");

    if (!cards.length) return;

    const supportsHover =
        window.matchMedia("(hover: hover)").matches;

    if (!supportsHover) return;

    visual.addEventListener("mousemove", (event) => {
        const rect = visual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        cards.forEach((card, index) => {
            const strength = (index + 1) * 8;

            card.style.transform = `
                translate(${x * strength}px, ${y * strength}px)
            `;
        });
    });

    visual.addEventListener("mouseleave", () => {
        cards.forEach((card) => {
            card.style.transform = "";
        });
    });
}


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

function initCounters() {
    const counters = document.querySelectorAll(
        "[data-counter]"
    );

    if (!counters.length) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                animateCounter(entry.target);
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.7
        }
    );

    counters.forEach((counter) => {
        observer.observe(counter);
    });
}


function animateCounter(element) {
    const target = parseInt(
        element.dataset.counter,
        10
    );

    if (isNaN(target)) return;

    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        // Smooth easing
        const eased =
            1 - Math.pow(1 - progress, 3);

        const currentValue =
            Math.floor(target * eased);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}


/* =========================================================
   3D CARD TILT
   ========================================================= */

function initCardTilt() {
    const cards = document.querySelectorAll(
        ".skill-card, .detailed-skill-card, .tool-card"
    );

    if (!cards.length) return;

    const supportsHover =
        window.matchMedia("(hover: hover)").matches;

    if (!supportsHover) return;

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}


/* =========================================================
   LAZY LOAD IMAGES
   ========================================================= */

function initLazyImages() {
    const images = document.querySelectorAll(
        "img[data-src]"
    );

    if (!images.length) return;

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const image = entry.target;

                    image.src = image.dataset.src;

                    image.removeAttribute("data-src");

                    image.addEventListener(
                        "load",
                        () => {
                            image.classList.add("loaded");
                        },
                        { once: true }
                    );

                    obs.unobserve(image);
                });
            },
            {
                rootMargin: "100px"
            }
        );

        images.forEach((image) => {
            observer.observe(image);
        });
    } else {
        images.forEach((image) => {
            image.src = image.dataset.src;
            image.removeAttribute("data-src");
        });
    }
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {
    let button = document.querySelector(
        ".back-to-top"
    );

    if (!button) {
        button = document.createElement("button");

        button.className = "back-to-top";
        button.type = "button";
        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        button.innerHTML = "↑";

        document.body.appendChild(button);
    }

    const updateButton = () => {
        if (window.scrollY > 500) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", updateButton, {
        passive: true
    });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    updateButton();
}


/* =========================================================
   STAGGERED GRID ANIMATIONS
   ========================================================= */

function initStaggerAnimations() {
    const grids = document.querySelectorAll(
        ".skills-grid, .detailed-skills-grid, .projects-showcase, .journey-grid, .values-grid, .strengths-grid, .social-grid"
    );

    grids.forEach((grid) => {
        const items = grid.children;

        Array.from(items).forEach((item, index) => {
            item.style.setProperty(
                "--stagger-delay",
                `${index * 80}ms`
            );

            if (
                item.classList.contains("reveal") ||
                item.classList.contains("reveal-scale")
            ) {
                item.style.transitionDelay =
                    `${index * 80}ms`;
            }
        });
    });
};


/* =========================================================
   PAUSE EXPENSIVE ANIMATIONS WHEN TAB IS HIDDEN
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {
        const animatedElements =
            document.querySelectorAll(
                ".hero-visual, .learning-visual, .ml-visual"
            );

        animatedElements.forEach((element) => {
            if (document.hidden) {
                element.style.animationPlayState =
                    "paused";
            } else {
                element.style.animationPlayState =
                    "running";
            }
        });
    }
);


/* =========================================================
   REDUCED MOTION SUPPORT
   ========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (reducedMotion.matches) {
    document.documentElement.classList.add(
        "reduce-motion"
    );
}

reducedMotion.addEventListener(
    "change",
    (event) => {
        document.documentElement.classList.toggle(
            "reduce-motion",
            event.matches
        );
    }
);