// --- 1. THEME TOGGLE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') themeToggle.innerText = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerText = '☀️';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        themeToggle.innerText = '🌙';
        localStorage.setItem('theme', '');
    }
});

// --- 2. TYPEWRITER EFFECT ---
const textElement = document.getElementById('typing-text');
const words = ["Student.", "Web-Designer.", "Developer."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.innerText = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.innerText = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

document.addEventListener('DOMContentLoaded', type);
