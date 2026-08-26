(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");

    if (toggle && header) {
      toggle.addEventListener("click", function () {
        var isOpen = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    var currentPage = document.body.getAttribute("data-page");
    if (currentPage) {
      var links = document.querySelectorAll(".nav-links a[data-page]");
      links.forEach(function (link) {
        if (link.getAttribute("data-page") === currentPage) {
          link.classList.add("is-active");
        }
      });
    }

    if (header) {
      var scrollThreshold = 40;
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > scrollThreshold);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  });
})();
