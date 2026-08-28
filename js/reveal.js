(function () {
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isNarrowViewport = window.matchMedia && window.matchMedia("(max-width: 900px)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll(".reveal, .reveal-group");
    if (!items.length) return;

    if (prefersReduced || isNarrowViewport || typeof IntersectionObserver === "undefined") {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  });
})();
