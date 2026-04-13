// ===== SMOOTH NAVIGATION + ACTIVE LINK =====
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".toc-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===== COLLAPSIBLE SECTIONS =====
sections.forEach(section => {
    const title = section.querySelector(".section-title");

    if (title) {
        const btn = document.createElement("button");
        btn.innerText = "Toggle";
        btn.className = "section-toggle";

        title.appendChild(btn);

        btn.addEventListener("click", () => {
            section.classList.toggle("collapsed");
        });
    }
});

// ===== COPY FORMULA BUTTON =====
document.querySelectorAll(".formula-block").forEach(block => {
    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.className = "copy-btn";

    block.appendChild(btn);

    btn.addEventListener("click", () => {
        const text = block.innerText.replace("Copy", "").trim();

        navigator.clipboard.writeText(text);

        btn.innerText = "Copied!";
        setTimeout(() => (btn.innerText = "Copy"), 1500);
    });
});

// ===== CARD CLICK HIGHLIGHT =====
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});

// ===== BACK TO TOP VISIBILITY =====
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// ===== SMOOTH SCROLL (TOC FIX) =====
document.querySelectorAll(".toc-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") {
        window.scrollBy({ top: 200, behavior: "smooth" });
    }
    if (e.key === "ArrowUp") {
        window.scrollBy({ top: -200, behavior: "smooth" });
    }
});

// ===== OPTIONAL: DARK MODE =====
const toggleDark = document.createElement("button");
toggleDark.innerText = "🌙";
toggleDark.style.position = "fixed";
toggleDark.style.top = "20px";
toggleDark.style.right = "20px";
toggleDark.style.zIndex = "999";

document.body.appendChild(toggleDark);

toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        document.body.style.background = "#111";
        document.body.style.color = "#eee";
    } else {
        document.body.style.background = "";
        document.body.style.color = "";
    }
});