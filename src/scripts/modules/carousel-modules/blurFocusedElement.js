// убераю фокус с кнопок управления, при смене слайдера
let firstFocusableElement = document.querySelector('.navbar-brand');
export function blurFocusedElement() {
  document.activeElement.blur();

  const onKeyDownHandler = (evt) => {
    if(evt.code === 'Tab') {
      firstFocusableElement.focus();
      window.removeEventListener('keydown', onKeyDownHandler);
    }
  }

  window.addEventListener('keydown', onKeyDownHandler);
}
