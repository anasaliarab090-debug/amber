(function () {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setInView(visible) {
    hero.classList.toggle("is-inview", visible);
  }

  if (reduced.matches) {
    setInView(true);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setInView(entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(hero);

  reduced.addEventListener("change", (event) => {
    if (event.matches) {
      observer.disconnect();
      setInView(true);
    } else {
      observer.observe(hero);
    }
  });
})();
