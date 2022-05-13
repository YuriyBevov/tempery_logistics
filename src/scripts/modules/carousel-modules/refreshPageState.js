import { blurFocusedElement } from "./blurFocusedElement";
import { aboutSection, introSection } from './carouselSections.js';
import { setPreventState } from './debounce.js';

let activeSlider = document.querySelector('.carousel-section.active');
const nav = document.querySelector('.navbar');

console.log('refresh')

function refreshPageState() {
  console.log('refreshState')
}

export { refreshPageState }
