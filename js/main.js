function addStarRating() {
    const starsRate = document.getElementById('starsRate');
    if (!starsRate) return;

    const starCount = 5;
    const favSrc = "./../assets/img/fav.png";
    const noFavSrc = "./../assets/img/nofav.png";

    const stars = [];

    for (let i = 0; i < starCount; i++) {
        const img = document.createElement('img');
        img.src = noFavSrc;
        img.classList.add('star');
        img.style.width = '10px';
        img.style.height = '10px';
        starsRate.appendChild(img);
        stars.push(img);
    }

    let index = 0;

    const interval = setInterval(function () {
        stars[index].src = favSrc;
        index = index + 1;

        if (index >= starCount) {
            clearInterval(interval);
        }
    }, 500);
}


async function animateText() {
    const div = document.querySelector('#customText');
    const words = ["construire", "agrandir", "améliorer", "innover", "transformer"];
    const delay = ms => new Promise(res => setTimeout(res, ms));

    while (true) {
        const txt = words[Math.floor(Math.random() * words.length)];
        div.textContent = "";

        for (let char of txt) {
            div.textContent += char;
            await delay(100);
        }

        await delay(1000);

        for (let i = txt.length; i > 0; i--) {
            div.textContent = txt.substring(0, i - 1);
            await delay(50);
        }

        await delay(300);
    }
}


function initLoader() {
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        loader.style.transition = "opacity 1s ease";

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    });
}


function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    if (!carousel) return;

    let position = 0;
    let isRunning = false;

    const slides = Array.from(carousel.children);
    slides.forEach(slide => {
        carousel.appendChild(slide.cloneNode(true));
    });

    const slideWidth = 210;
    const transitionDuration = 800;
    const pauseBetweenSlides = 2000;

    function moveCarousel() {
        if (!isRunning) return;

        carousel.style.transition = `transform ${transitionDuration}ms ease-in-out`;

        position -= slideWidth;
        carousel.style.transform = `translateX(${position}px)`;

        const totalWidth = carousel.scrollWidth / 2;

        setTimeout(() => {
            if (Math.abs(position) >= totalWidth) {
                carousel.style.transition = 'none';
                position = 0;
                carousel.style.transform = `translateX(${position}px)`;

                setTimeout(() => {
                    carousel.style.transition = `transform ${transitionDuration}ms ease-in-out`;
                }, 50);
            }

            if (isRunning) {
                setTimeout(moveCarousel, pauseBetweenSlides);
            }
        }, transitionDuration);
    }

    function checkVisibility() {
        const rect = carousel.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !isRunning) {
            isRunning = true;
            moveCarousel();
        } else if (!isVisible && isRunning) {
            isRunning = false;
        }
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

addStarRating();
animateText();
initLoader();
initCarousel();






const path = document.querySelector('.hand-circle path');
const path2 = document.querySelector('.underline-circle path');
const length = path.getTotalLength();
const length2 = path2.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
path.style.opacity = 0;
path.style.filter = 'blur(0px)';
path2.style.strokeDasharray = length2;
path2.style.strokeDashoffset = length2;
path2.style.opacity = 0;
path2.style.filter = 'blur(0px)';

function animateCircle() {
    path.style.transition = 'stroke-dashoffset 0.5s ease-out, opacity 0.5s ease-out';
    path.style.opacity = 1;
    path.style.strokeDashoffset = 0;
    path.style.filter = 'blur(0px)';

    path2.style.transition = 'stroke-dashoffset 0.5s ease-out, opacity 0.5s ease-out';
    path2.style.opacity = 1;
    path2.style.strokeDashoffset = 0;
    path2.style.filter = 'blur(0px)';
    setTimeout(() => {
        path.style.transition = 'opacity 0.5s ease-out, filter 0.5s ease-out';
        path.style.opacity = 0;
        path.style.filter = 'blur(5px)';
        path2.style.transition = 'opacity 0.5s ease-out, filter 0.5s ease-out';
        path2.style.opacity = 0;
        path2.style.filter = 'blur(5px)';
    }, 2000);

    setTimeout(() => {
        path.style.transition = 'none';
        path.style.strokeDashoffset = length;
        path.style.filter = 'blur(0px)';
        path2.style.transition = 'none';
        path2.style.strokeDashoffset = length2;
        path2.style.filter = 'blur(0px)';
    }, 2700);
}

animateCircle();
setInterval(animateCircle, 4000);






function compterJusqua(element) {
    const cible = parseFloat(element.getAttribute('data-target'));
    const unite = element.textContent.trim(); // 'M' ou 'K'
    const duree = 2000;
    const debut = Date.now();

    const interval = setInterval(() => {
        const temps = Date.now() - debut;
        let progression = temps / duree;
        if (progression > 1) progression = 1;

        let courbe;
        if (progression < 0.5) {
            courbe = 2 * progression * progression;
        } else {
            courbe = 1 - 2 * (1 - progression) * (1 - progression);
        }

        let nombreActuel = courbe * cible;

        if (cible < 10) {
            nombreActuel = nombreActuel.toFixed(1);
        } else {
            nombreActuel = Math.round(nombreActuel);
        }

        element.textContent = nombreActuel + unite;

        if (progression === 1) clearInterval(interval);
    }, 20);
}



window.onload = function () {
    const compteurs = document.querySelectorAll('.number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.deja_anime) {
                compterJusqua(entry.target);
                entry.target.deja_anime = true;
            }
        });
    });

    compteurs.forEach(compteur => observer.observe(compteur));
};




















const settingsIcon = document.querySelector('.settingsIcon');
const settingsPanel = document.querySelector('.settingsPanel');

settingsIcon.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsIcon.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    const hueSlider = document.getElementById("slider1");
    const satSlider = document.getElementById("slider2");
    const hueValue = document.getElementById("value1");
    const satValue = document.getElementById("value2");

    if (!hueSlider || !satSlider || !hueValue || !satValue) {
        console.warn("Sliders de couleur non trouvés");
        return;
    }

    const LIGHTNESS = 55;
    const DEFAULT_HUE = 30;
    const DEFAULT_SAT = 70;

    const savedHue = localStorage.getItem("accentHue") ?? DEFAULT_HUE;
    const savedSat = localStorage.getItem("accentSat") ?? DEFAULT_SAT;

    hueSlider.value = savedHue;
    satSlider.value = savedSat;

    function setAccentColor(h, s) {
        const colorValue = `hsl(${h}, ${s}%, ${LIGHTNESS}%)`;
        root.style.setProperty("--accent-color", colorValue);
        hueValue.textContent = h;
        satValue.textContent = s;

        localStorage.setItem("accentHue", h);
        localStorage.setItem("accentSat", s);
    }

    function updateUI() {
        setAccentColor(hueSlider.value, satSlider.value);
    }

    hueSlider.addEventListener("input", updateUI);
    satSlider.addEventListener("input", updateUI);

    updateUI();

    hueValue.textContent = hueSlider.value;
    satValue.textContent = satSlider.value;
});

document.addEventListener('DOMContentLoaded', () => {
    const disableAOS = document.getElementById("disableAOS");

    if (!disableAOS) {
        console.warn("Checkbox AOS non trouvée");
        return;
    }

    function disableAOSAnimations() {
        document.querySelectorAll("[data-aos]").forEach(el => {
            el.dataset.aosBackup = el.getAttribute("data-aos");
            el.removeAttribute("data-aos");
        });
        if (window.AOS) AOS.refreshHard();
    }

    function enableAOSAnimations() {
        document.querySelectorAll("[data-aos-backup]").forEach(el => {
            el.setAttribute("data-aos", el.dataset.aosBackup);
            delete el.dataset.aosBackup;
        });
        if (window.AOS) AOS.init();
    }

    disableAOS.addEventListener("change", e => {
        e.target.checked ? disableAOSAnimations() : enableAOSAnimations();
    });
});











const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "62fa18fd-3cf0-4a38-abdb-63a9689b731f");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});












const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    burger.classList.toggle('open');
});