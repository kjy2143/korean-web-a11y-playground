const carousel = document.querySelector('.carousel');
const slides = [...carousel.querySelectorAll('.slide')];
const controls = carousel.querySelector('.controls');
const rotation = carousel.querySelector('[data-rotation]');
const rotationStatus = carousel.querySelector('[data-rotation-status]');
const announcement = carousel.querySelector('[data-slide-announcement]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const rotationInterval = 6000;
let current = 0;
let automatic = !rotation || !reduceMotion.matches;
let hovering = Boolean(rotation && carousel.matches(':hover'));
let timer;

function showSlide(step, announce) {
  slides[current].hidden = true;
  current = (current + step + slides.length) % slides.length;
  const slide = slides[current];
  slide.hidden = false;

  if (announce) {
    const title = slide.querySelector('h3').textContent;
    announcement.textContent = `공지 ${current + 1} / ${slides.length}. ${title}`;
  }
}

function updateRotation() {
  window.clearInterval(timer);

  if (rotation) {
    rotation.textContent = automatic ? '자동 전환 일시 정지' : '자동 전환 시작';
    if (!automatic) {
      rotationStatus.textContent = '자동 전환이 정지되어 있습니다.';
    } else if (hovering) {
      rotationStatus.textContent = '포인터가 배너 위에 있는 동안 전환을 잠시 멈춥니다.';
    } else {
      rotationStatus.textContent = '6초마다 공지를 자동으로 전환합니다.';
    }
  }

  if (automatic && !hovering) {
    timer = window.setInterval(() => showSlide(1, false), rotationInterval);
  }
}

controls.querySelector('[data-previous]').addEventListener('click', () => {
  showSlide(-1, true);
  updateRotation();
});

controls.querySelector('[data-next]').addEventListener('click', () => {
  showSlide(1, true);
  updateRotation();
});

if (rotation) {
  rotationStatus.hidden = false;

  rotation.addEventListener('click', () => {
    automatic = !automatic;
    updateRotation();
  });

  carousel.addEventListener('focusin', event => {
    if (!carousel.contains(event.relatedTarget) && event.target.matches(':focus-visible')) {
      automatic = false;
      updateRotation();
    }
  });

  carousel.addEventListener('mouseenter', () => {
    hovering = true;
    updateRotation();
  });

  carousel.addEventListener('mouseleave', () => {
    hovering = false;
    updateRotation();
  });

  reduceMotion.addEventListener('change', event => {
    if (event.matches) {
      automatic = false;
      updateRotation();
    }
  });
}

controls.hidden = false;
updateRotation();
