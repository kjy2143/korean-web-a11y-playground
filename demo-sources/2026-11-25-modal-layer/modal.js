const openButton = document.querySelector('#open-guide');
const dialog = document.querySelector('#guide');
const instructions = dialog.querySelector('details');
const firstControl = instructions.querySelector('summary');
const lastControl = dialog.querySelector('button');

openButton.addEventListener('click', () => {
  instructions.open = false;
  dialog.showModal();
});

dialog.addEventListener('close', () => openButton.focus());

// 브라우저 도구 모음으로 넘어가기 전에 모달 양 끝의 초점을 연결한다.
dialog.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.shiftKey && document.activeElement === firstControl) {
    event.preventDefault();
    lastControl.focus();
  } else if (!event.shiftKey && document.activeElement === lastControl) {
    event.preventDefault();
    firstControl.focus();
  }
});
