function scaleNavbarToWidth() {
    const header = document.getElementById("header");
    const hero = document.getElementById("skill-section");
    if (!header || !hero) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const marginRatio = 0.15;

    if (viewportWidth - (viewportWidth * marginRatio) > viewportHeight) {
        header.style.transform = "none";
        hero.style.transform = "none";
        return;
    }

    const scaleFactor = (viewportWidth / header.offsetWidth) * (1 - marginRatio);

    header.style.transformOrigin = "top center";
    hero.style.transformOrigin = "top center";
    header.style.transform = `scale(${scaleFactor})`;
    hero.style.transform = `scale(${scaleFactor})`;

}

window.addEventListener("resize", scaleNavbarToWidth);
window.addEventListener("load", scaleNavbarToWidth);
