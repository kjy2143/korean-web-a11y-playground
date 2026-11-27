(function () {
  var user = null;
  try { user = sessionStorage.getItem('loginUser'); } catch (e) {}
  if (!user) { location.replace('index.html'); return; }
  document.getElementById('who').textContent = user;
  document.getElementById('logout').addEventListener('click', function () {
    try { sessionStorage.removeItem('loginUser'); } catch (e) {}
    location.href = 'index.html';
  });
})();
