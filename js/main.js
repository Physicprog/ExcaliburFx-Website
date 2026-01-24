
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

addStarRating();




async function animateText() {
    const div = document.querySelector('#customText');
    const words = ["construire", "agrandir", "améliorer", "innover", "transformer"];
    const delay = ms => new Promise(res => setTimeout(res, ms));

    while (true) {
        const txt = words[Math.floor(Math.random() * words.length)];
        div.textContent = "";

        for (let char of txt) {
            div.textContent += char;
            await delay(200);
        }

        await delay(1000);

        for (let i = txt.length; i > 0; i--) {
            div.textContent = txt.substring(0, i - 1);
            await delay(100);
        }

        await delay(500);
    }
}

animateText();



window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    loader.style.transition = "opacity 1s ease";

    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
});




const videoContainer = document.querySelector('.hero-video');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallax = scrollY * -1;
    videoContainer.style.transform = `translateY(${parallax}px)`;
});


