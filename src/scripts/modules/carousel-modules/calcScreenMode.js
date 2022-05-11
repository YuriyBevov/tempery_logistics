import { getHeaderHeight, bodyLocker, getWindowWidth } from "../../utils/functions";
import { aboutSection, introSection } from './carouselSections.js';

let windowHeight = document.documentElement.clientHeight;
let sliderHeight = introCarousel.getBoundingClientRect().height;
let isEqualHeight = windowHeight === sliderHeight || sliderHeight - windowHeight === 7 ? true : false;
let windowWidth = getWindowWidth();

let isFullScreenMode = isEqualHeight && windowWidth > 1200 ? true : false;

if(isFullScreenMode) {
  aboutSection.classList.add('full-height');
  introSection.classList.add('full-height');
}

export { isFullScreenMode };
