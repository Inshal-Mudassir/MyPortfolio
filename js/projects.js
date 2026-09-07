/* =========================================================
   PROJECT FILTERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-item");

    if (!filterButtons.length || !projects.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Filter projects
            projects.forEach((project) => {
                const categories = project.dataset.category || "";

                const shouldShow =
                    filter === "all" ||
                    categories.split(" ").includes(filter);

                if (shouldShow) {
                    project.classList.remove("project-hidden");

                    // Small entrance animation
                    project.style.animation = "none";

                    requestAnimationFrame(() => {
                        project.style.animation =
                            "projectFilterIn 0.45s ease forwards";
                    });
                } else {
                    project.classList.add("project-hidden");
                }
            });
        });
    });
});


/* =========================================================
   PROJECT FILTER ANIMATION
   ========================================================= */

const projectFilterStyle = document.createElement("style");

projectFilterStyle.textContent = `
    @keyframes projectFilterIn {
        from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

document.head.appendChild(projectFilterStyle);


/* =========================================================
   PROJECT CARD HOVER EFFECT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-item");

    projectCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
});


/* =========================================================
   PROJECT LINK PROTECTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const externalLinks = document.querySelectorAll(
        ".project-links a[target='_blank']"
    );

    externalLinks.forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });
});