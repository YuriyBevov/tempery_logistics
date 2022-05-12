import { isCarouselExist } from './quard.js';

import { getWindowWidth } from "../../utils/functions";
import { aboutSection, introSection } from './carouselSections.js';

let isFullScreenMode = false;

if(isCarouselExist) {

  let windowHeight = document.documentElement.clientHeight;
  let sliderHeight = introCarousel.getBoundingClientRect().height;
  let isEqualHeight = windowHeight === sliderHeight || sliderHeight - windowHeight === 7 ? true : false;
  let windowWidth = getWindowWidth();

  isFullScreenMode = isEqualHeight && windowWidth > 1200 ? true : false;

  if(isFullScreenMode) {
    aboutSection.classList.add('full-height');
    introSection.classList.add('full-height');
  }
}

export { isFullScreenMode };
