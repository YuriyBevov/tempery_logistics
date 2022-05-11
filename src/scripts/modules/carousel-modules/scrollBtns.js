import { getHeaderHeight } from "../../utils/functions";

import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";
import { activeSlider, animateSection } from "./carouselAnimation";
import { isFullScreenMode } from "./calcScreenMode";
import { aboutSection, introSection, carouselOffSection } from './carouselSections.js';
import { hideFakeScroll } from './fakeScroll.js';

// навигация по кнопкам вверх/вниз
const btns = document.querySelectorAll('.scroll-btn');

function onScrollBtnHandler(carouselNode) {
  const onClickChangeActiveCarousel = (evt) => {

    if(isFullScreenMode) {
      if(carouselNode.contains(evt.target) && activeSlider === introSection) {
          animateSection('about');
      }

      if(carouselNode.contains(evt.target) && activeSlider === aboutSection) {
        const coordY = carouselOffSection.offsetTop - window.scrollY - getHeaderHeight();
        hideFakeScroll();
        scrollBy(window, { behavior: "smooth", top: coordY });
      }
    } else {
      evt.preventDefault();
      const carouselSections = document.querySelectorAll('.carousel-section');
      const lastCarouselSection = carouselSections[carouselSections.length - 1];
      const targetId = evt.currentTarget.getAttribute('data-scroll-to');

      if(targetId !== '#carousel-off-section') {
        const target = document.querySelector(targetId);

        scrollIntoView(target, { behavior: "smooth", block: "start"});
      } else {
        const scrollCoord = lastCarouselSection.nextElementSibling.offsetTop - window.scrollY - getHeaderHeight();

        scrollBy(window, { behavior: "smooth", top: scrollCoord });
      }
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', onClickChangeActiveCarousel);
  })
}

export { onScrollBtnHandler }
