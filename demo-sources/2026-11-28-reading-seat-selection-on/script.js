(() => {
  const seats = [...document.querySelectorAll('.seat')];
  const selectionValue = document.querySelector('#selection-value');
  const clearButton = document.querySelector('#clear');
  const reserveButton = document.querySelector('#reserve');
  const notice = document.querySelector('#notice');
  const availableCount = document.querySelector('#available-count');
  let selected = null;

  function render() {
    seats.forEach((seat) => {
      if (seat.disabled) return;
      const active = seat === selected;
      seat.setAttribute('aria-pressed', String(active));
      seat.querySelector('.seat-status').textContent = active ? '현재 선택' : '선택 가능';
    });
    selectionValue.textContent = selected ? `${selected.dataset.seat} 좌석` : '선택된 좌석이 없습니다';
    clearButton.disabled = !selected;
    reserveButton.disabled = !selected;
    availableCount.textContent = seats.filter((seat) => !seat.disabled).length;
  }

  seats.forEach((seat) => seat.addEventListener('click', () => {
    if (seat.disabled) return;
    selected = seat;
    notice.textContent = '';
    render();
  }));
  clearButton.addEventListener('click', () => {
    const previouslySelected = selected;
    selected = null;
    notice.textContent = '';
    render();
    if (previouslySelected) previouslySelected.focus();
  });
  reserveButton.addEventListener('click', () => {
    if (!selected) return;
    const number = selected.dataset.seat;
    selected.disabled = true;
    selected.removeAttribute('aria-pressed');
    selected.querySelector('.seat-status').textContent = '예약 완료';
    selected = null;
    render();
    notice.textContent = `${number} 좌석 예약이 완료되었습니다.`;
    notice.focus();
  });
})();
