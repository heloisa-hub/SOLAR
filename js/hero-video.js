(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var video = document.querySelector(".hero-video-media video");
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    var tryPlay = function () {
      var promise = video.play();
      if (promise && promise.catch) promise.catch(function () {});
    };

    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });
  });
})();
