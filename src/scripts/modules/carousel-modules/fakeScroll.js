import { isFullScreenMode } from './calcScreenMode.js';
import { setPaddings } from './setPaddings.js';
import { aboutSection, introSection } from './carouselSections.js';

// fake scrollbar
document.addEventListener('DOMContentLoaded', () => {
  showFakeScroll();
})

const fakeScrollbar = document.getElementById('scrollbar');
let isScrollActive = true;

function showFakeScroll() {
  if(fakeScrollbar.style.display !== 'block' && isFullScreenMode ) {
    console.log('showFakeScroll');
    isScrollActive = false;

    setPaddings(true, aboutSection, introSection);
    fakeScrollbar.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function hideFakeScroll() {
  if(fakeScrollbar.style.display !== 'none') {
    console.log('hideFakeScroll');
    setPaddings(false, aboutSection, introSection);
    fakeScrollbar.style.display = 'none';
    document.body.style.overflow = 'auto';
    isScrollActive = true;
  }
}

export  { showFakeScroll, hideFakeScroll, isScrollActive };
