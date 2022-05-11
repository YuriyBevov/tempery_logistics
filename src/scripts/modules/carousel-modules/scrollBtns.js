import { activeSlider, animateSection } from "./carouselAnimation";
import { isFullScreenMode } from "./calcScreenMode";
import { aboutSection, introSection } from './carouselSections.js';

// навигация между слайдерами по кнопкам вверх/вниз
const btns = document.querySelectorAll('.scroll-btn');

function onScrollBtnHandler(carouselNode) {
  const onClickChangeActiveCarousel = (evt) => {
    if(carouselNode.contains(evt.target) && activeSlider !== aboutSection && isFullScreenMode) {
      animateSection('about');
    }

    if(carouselNode.contains(evt.target) && activeSlider !== introSection && isFullScreenMode) {
      animateSection('intro');
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', onClickChangeActiveCarousel);
  })
}

export { onScrollBtnHandler }
