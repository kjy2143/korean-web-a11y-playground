document.querySelectorAll('#faq .q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
  });
});
