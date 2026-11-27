(function () {
  var video = document.getElementById('video');
  var btn = document.getElementById('toggle');

  function sync() {
    var playing = !video.paused && !video.ended;
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', playing ? '안내 데스크 호출 벨 영상 일시정지' : '안내 데스크 호출 벨 영상 재생');
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

  // 자동 재생하지 않는다(KWCAG 5.4.2). 사용자가 누를 때만 재생한다.
  sync();
})();
