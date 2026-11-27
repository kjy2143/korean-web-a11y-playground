(function () {
  var shows = [
    { name: '종이로 만든 풍경', day: '수', time: '14:00', room: '제1전시실' },
    { name: '색으로 읽는 도시', day: '토', time: '11:00', room: '제2전시실' },
    { name: '종이 위의 정원', day: '토', time: '15:00', room: '열린 작업실' },
    { name: '주말에 만나는 판화', day: '일', time: '13:00', room: '제1전시실' }
  ];
  var form = document.getElementById('search-form');
  var q = document.getElementById('q');
  var day = document.getElementById('day');
  var list = document.getElementById('list');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');

  function render() {
    var term = q.value.replace(/\s+/g, '');
    var rows = shows.filter(function (s) {
      return (!day.value || s.day === day.value) &&
        s.name.replace(/\s+/g, '').indexOf(term) !== -1;
    });
    list.textContent = '';
    rows.forEach(function (s) {
      var li = document.createElement('li');
      var h = document.createElement('h2');
      h.textContent = s.name;
      var p = document.createElement('p');
      p.textContent = s.day + '요일 ' + s.time + ' · ' + s.room;
      li.appendChild(h);
      li.appendChild(p);
      list.appendChild(li);
    });
    count.textContent = '총 ' + rows.length + '건';
    empty.hidden = rows.length > 0;
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
  document.getElementById('clear-btn').addEventListener('click', function () {
    form.reset();
    render();
    q.focus();
  });
  render();
})();
