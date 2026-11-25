/* 자주 묻는 질문 아코디언
   질문 버튼을 누르면(마우스 클릭, Enter, Space) 그 질문의 답변만 펼치거나 접는다.
   button 요소의 기본 동작을 쓰므로 키보드 처리기를 따로 두지 않고, 초점은 버튼에 남는다.
   초점을 받거나 마우스를 올리는 것만으로는 아무것도 바꾸지 않는다. */

(function () {
  'use strict';

  var buttons = document.querySelectorAll('.accordion__button');

  Array.prototype.forEach.call(buttons, function (button) {
    var panel = button.closest('.accordion__item').querySelector('.accordion__panel');

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });
})();
