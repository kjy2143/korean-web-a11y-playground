(function () {
  var video = document.getElementById('video');
  var btn = document.getElementById('toggle');
  var stage = btn.parentNode;

  function sync() {
    var playing = !video.paused && !video.ended;
    stage.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', playing ? '일시정지' : (video.ended ? '다시 재생' : '재생'));
  }
  function toggle() {
    if (video.paused || video.ended) {
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      video.pause();
    }
  }
  btn.addEventListener('click', toggle);
  video.addEventListener('click', toggle);
  ['play', 'pause', 'ended', 'playing'].forEach(function (e) { video.addEventListener(e, sync); });
  sync();
  // 자동 재생하지 않는다(KWCAG 5.4.2). 영상은 정지 상태로 시작하고 사용자가 재생한다.
})();
