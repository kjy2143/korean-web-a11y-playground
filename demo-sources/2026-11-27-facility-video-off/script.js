(function () {
  var video = document.getElementById('video');
  var btn = document.getElementById('toggle');

  function sync() {
    var playing = !video.paused && !video.ended;
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', playing ? '일시정지' : '재생');
  }

  function play() {
    var p = video.play();
    if (p && p.catch) p.catch(sync);
  }

  btn.addEventListener('click', function () {
    if (video.paused || video.ended) play();
    else video.pause();
  });

  ['play', 'playing', 'pause', 'ended'].forEach(function (e) {
    video.addEventListener(e, sync);
  });

  // 소리 포함 자동 재생이 브라우저에서 막히면 재생 아이콘이 그대로 남는다.
  play();
  sync();
})();
