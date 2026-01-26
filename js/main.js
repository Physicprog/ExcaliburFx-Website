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
const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
path.style.opacity = 0;
path.style.filter = 'blur(0px)';

function animateCircle() {
    path.style.transition = 'stroke-dashoffset 0.5s ease-out, opacity 0.5s ease-out';
    path.style.opacity = 1;
    path.style.strokeDashoffset = 0;
    path.style.filter = 'blur(0px)';

    setTimeout(() => {
        path.style.transition = 'opacity 0.5s ease-out, filter 0.5s ease-out';
        path.style.opacity = 0;
        path.style.filter = 'blur(5px)';
    }, 2000);

    setTimeout(() => {
        path.style.transition = 'none';
        path.style.strokeDashoffset = length;
        path.style.filter = 'blur(0px)';
    }, 2700);
}

animateCircle();
setInterval(animateCircle, 4000);







function compterJusqua(element) {
    const cible = element.getAttribute('data-target');
    let progression = 0;
    const duree = 2000;
    const debut = Date.now();

    const interval = setInterval(() => {
        const temps = Date.now() - debut;
        progression = temps / duree;

        if (progression >= 1) {
            element.textContent = cible + 'K';
            clearInterval(interval);
            return;
        }

        let courbe; //lent rapide lent
        if (progression < 0.5) {
            courbe = 2 * progression * progression;
        } else {
            courbe = 1 - 2 * (1 - progression) * (1 - progression);
        }

        const nombre = Math.floor(courbe * cible);
        element.textContent = nombre + 'K';
    }, 20);
}
// que lorsque l'élément est visible
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
    if (!settingsPanel.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});

const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const value1 = document.getElementById('value1');
const value2 = document.getElementById('value2');

slider1.addEventListener('input', (e) => {
    value1.textContent = e.target.value;
});

slider2.addEventListener('input', (e) => {
    value2.textContent = e.target.value;
});