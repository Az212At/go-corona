const groups = [
  { selector: ".header__container", fade: true },
  { selector: ".get-started__content" },
  { selector: ".get-started__image", delay: 0.15 },
  { selector: ".get-started__video", delay: 0.3 },
  { selector: ".stay-safe__media" },
  { selector: ".stay-safe__content", delay: 0.15 },
  { selector: ".statistics-experts__body" },
  { selector: ".statistics-experts__decor", fade: true, delay: 0.3 },
  { selector: ".experts__content" },
  { selector: ".experts__video", delay: 0.15 },
  { selector: ".healthcare__block-text" },
  { selector: ".healthcare__column", step: 0.15 },
  { selector: ".footer__item", step: 0.15 },
];

const items = [];

groups.forEach(({ selector, fade = false, delay = 0, step = 0 }) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add("reveal");
    if (fade) {
      element.classList.add("reveal_fade");
    }
    element.style.setProperty("--reveal-delay", `${delay + index * step}s`);
    items.push(element);
  });
});

const show = (element) => element.classList.add("reveal_visible");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((element) => observer.observe(element));
} else {
  items.forEach(show);
}

const videoCard = document.querySelector(".video-experts");
const playButton = document.querySelector(".video-experts__play");

if (videoCard && playButton) {
  playButton.addEventListener("click", () => {
    const videoUrl = playButton.dataset.video;

    if (!videoUrl) {
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.title = "Video player";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    videoCard.replaceChildren(iframe);
  });
}
