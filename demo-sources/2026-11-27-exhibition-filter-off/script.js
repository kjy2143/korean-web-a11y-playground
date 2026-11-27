(function () {
  var exhibitions = [
    { name: '종이로 만든 풍경', day: '수', time: '14:00', place: '제1전시실' },
    { name: '색으로 읽는 도시', day: '토', time: '11:00', place: '제2전시실' },
    { name: '종이 위의 정원', day: '토', time: '15:00', place: '열린 작업실' },
    { name: '주말에 만나는 판화', day: '일', time: '13:00', place: '제1전시실' }
  ];
  var form = document.getElementById('filter');
  var nameInput = document.getElementById('name');
  var daySelect = document.getElementById('day');
  var list = document.getElementById('list');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');

  function squash(s) { return s.replace(/\s+/g, '').toLowerCase(); }

  function render() {
    var q = squash(nameInput.value);
    var day = daySelect.value;
    var found = exhibitions.filter(function (e) {
      return (!q || squash(e.name).indexOf(q) !== -1) && (!day || e.day === day);
    });
    list.innerHTML = '';
    found.forEach(function (e) {
      var li = document.createElement('li');
      var h = document.createElement('h2');
      h.textContent = e.name;
      var p = document.createElement('p');
      p.textContent = e.day + '요일 ' + e.time + ' · ' + e.place;
      li.appendChild(h);
      li.appendChild(p);
      list.appendChild(li);
    });
    count.textContent = '총 ' + found.length + '건';
    empty.hidden = found.length !== 0;
  }

  form.addEventListener('submit', function (ev) { ev.preventDefault(); render(); });
  form.addEventListener('reset', function () {
    setTimeout(function () { render(); nameInput.focus(); }, 0);
  });
  render();
})();
