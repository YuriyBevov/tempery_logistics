import { isCarouselOffSectionIntersected } from './observeCarouselOffSection.js';
import { preventAction, setPreventState } from './debounce.js';
// смена слайдов по свайпу
export function onSwipeSlideCarousel(carouselNode, carouselInstance) {
  let entryPosX = null;

  const onMouseUpRemoveListeners = () => {
    window.removeEventListener('mousemove', onMouseMoveChangeSlide);
  }

  const onMouseMoveChangeSlide = (evt) => {
    evt.preventDefault();
    let posX = evt.screenX;

    if(entryPosX - posX > 75 && !isCarouselOffSectionIntersected && !preventAction) {
      carouselInstance.next();
    } else if (posX - entryPosX > 75 && !isCarouselOffSectionIntersected && !preventAction){
      carouselInstance.prev();
    }

    window.addEventListener('mouseup', onMouseUpRemoveListeners);
  }

  const onMouseDownListenMouseMove = (evt) => {
    entryPosX = evt.screenX;

    if(carouselNode.contains(evt.target)) {
      window.addEventListener('mousemove', onMouseMoveChangeSlide);
      window.addEventListener('mouseup', onMouseUpRemoveListeners);
    }
  }

  window.addEventListener('mousedown', onMouseDownListenMouseMove);
}
