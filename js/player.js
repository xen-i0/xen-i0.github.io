document.addEventListener("DOMContentLoaded", function () {
  function fmtTime(sec) {
    if (!isFinite(sec) || isNaN(sec)) return "0:00";
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  document.querySelectorAll(".secure-player").forEach(function (root) {
    var video = root.querySelector(".sp-video");
    if (!video) return;

    var playBtn = root.querySelector(".sp-play");
    var muteBtn = root.querySelector(".sp-mute");
    var seek    = root.querySelector(".sp-seek");
    var volume  = root.querySelector(".sp-volume");
    var curTime = root.querySelector(".sp-current");
    var durTime = root.querySelector(".sp-duration");
    var fsBtn   = root.querySelector(".sp-fullscreen");

    // Play & Pause
    playBtn.addEventListener("click", function () {
      if (video.paused) { 
        video.play().catch(e => console.error("Playback failed:", e)); 
      } else { 
        video.pause(); 
      }
    });

    video.addEventListener("play",  function () { playBtn.textContent = "⏸"; });
    video.addEventListener("pause", function () { playBtn.textContent = "▶"; });

    // Timers & Seeking
    video.addEventListener("loadedmetadata", function () {
      durTime.textContent = fmtTime(video.duration);
    });

    video.addEventListener("timeupdate", function () {
      if (!video.duration) return;
      seek.value = (video.currentTime / video.duration) * 100;
      curTime.textContent = fmtTime(video.currentTime);
    });

    seek.addEventListener("input", function () {
      if (!video.duration) return;
      video.currentTime = (seek.value / 100) * video.duration;
    });

    // Audio & Mute
    muteBtn.addEventListener("click", function () {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? "🔇" : "🔊";
      if (!video.muted && video.volume === 0) video.volume = 1;
      volume.value = video.muted ? 0 : video.volume;
    });

    volume.addEventListener("input", function () {
      video.volume = parseFloat(volume.value);
      video.muted = video.volume === 0;
      muteBtn.textContent = video.muted ? "🔇" : "🔊";
    });

    // Fullscreen fallback support
    fsBtn.addEventListener("click", function () {
      if (root.requestFullscreen) {
          root.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
      }
    });
  });
});