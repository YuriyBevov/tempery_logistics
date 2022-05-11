import { isScrollActive } from './fakeScroll.js';
import { isCarouselOffSectionIntersected } from './observeCarouselOffSection.js';
import { preventAction } from './debounce.js';
// смена слайдов по скроллу

export function onScrollSlideCarousel(carouselNode, carouselInstance) {
  const onMouseWheelChangeSlide = (evt) => {

    if(carouselNode.contains(evt.target) && !isCarouselOffSectionIntersected ) {
      if(evt.deltaY > 0 && !isScrollActive) {
        evt.preventDefault();
        if(!preventAction) {
          carouselInstance.next();
        }
      } else if (evt.deltaY < 0) {
        evt.preventDefault();
        if(!preventAction) {
          carouselInstance.prev();
        }
      }
    }
  }

  window.addEventListener('wheel', onMouseWheelChangeSlide, { passive: false });
}
