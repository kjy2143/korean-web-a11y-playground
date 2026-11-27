(function () {
  var video = document.getElementById('video');
  var btn = document.getElementById('toggle');
  var stage = btn.parentNode;
  var status = document.getElementById('status');

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

  // 소리와 함께 자동 재생을 시도한다. 브라우저가 막으면 재생 버튼이 보이는 상태로 남는다.
  var p = video.play();
  if (p && p.catch) {
    p.catch(function () {
      sync();
      status.textContent = '브라우저 정책으로 자동 재생되지 않았습니다. 재생 버튼을 눌러 주세요.';
    });
  }
})();
