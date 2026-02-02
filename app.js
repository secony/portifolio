const THEME_STORAGE_KEY = "portfolio-theme";

const getPreferredTheme = () => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
        return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
        return;
    }
    toggle.textContent = theme === "dark" ? "Modo claro" : "Modo escuro";
    toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
    );
};

const initThemeToggle = () => {
    const theme = getPreferredTheme();
    applyTheme(theme);

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_STORAGE_KEY, next);
        applyTheme(next);
    });
};

document.addEventListener("DOMContentLoaded", initThemeToggle);
