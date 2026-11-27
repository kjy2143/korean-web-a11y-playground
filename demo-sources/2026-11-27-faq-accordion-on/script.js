document.querySelectorAll('.faq .trigger').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
  });
});
document.querySelectorAll('.panel a[href="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) { e.preventDefault(); });
});
