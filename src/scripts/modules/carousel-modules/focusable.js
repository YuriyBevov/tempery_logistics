/* focusTrap = () => {
  if(this.isInited) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

      const firstFocusableElement = this.modal.querySelectorAll(focusableElements)[0];
      const focusableContent = this.modal.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1];

      let onBtnClickHandler = (evt) => {
          let isTabPressed = evt.key === 'Tab' || evt.key === 9;

          if(evt.key === 'Escape') {
              document.removeEventListener('keydown', onBtnClickHandler);
          }

          if (!isTabPressed) {
              return;
          }

          if (evt.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                  lastFocusableElement.focus();
                  evt.preventDefault();
              }
          } else {
              if (document.activeElement === lastFocusableElement) {
                  firstFocusableElement.focus();
                  evt.preventDefault();
              }
          }
      }

      document.addEventListener('keydown', onBtnClickHandler);

      firstFocusableElement.focus();
  } else {
      console.error('Для инициализации используй new Modal(_modal-selector_).init()')
  }
} */

export const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';


