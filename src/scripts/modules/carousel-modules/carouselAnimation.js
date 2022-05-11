import { controlsBlur } from "./controlsBlur";
import { aboutSection, introSection } from './carouselSections.js';
import { preventAction, setPreventState } from './debounce.js';

let activeSlider = document.querySelector('.carousel-section.active');
const nav = document.querySelector('.navbar');

function animateSection(destSection) {
  console.log('activeSlider: ', activeSlider, 'destSection: ', destSection);
  setPreventState(true);
  console.log(preventAction);

  if(destSection === 'about') {
    if(introSection.classList.contains('active')) {
      introSection.classList.remove('active');
      aboutSection.classList.add('active');
    }

    aboutSection.classList.add('transition-on');
    aboutSection.classList.add('active');
    aboutSection.style.position = 'absolute';
    aboutSection.style.zIndex = '3';
    aboutSection.style.top = '0';

    setTimeout(() => {
      setPreventState(false);
      console.log(preventAction);
      activeSlider = aboutSection;
      controlsBlur();

      aboutSection.style.position = 'relative';
      aboutSection.style.zIndex = '1';
      aboutSection.classList.remove('transition-on');

      introSection.style.zIndex  = '-1';
      introSection.style.position = 'absolute';
      introSection.style.top = '-105vh';
    }, 1000);

    nav.classList.remove('main-navbar-black-theme');
    nav.classList.add('main-navbar-white-theme');
  }

  if(destSection === 'intro') {
    if(aboutSection.classList.contains('active')) {
      aboutSection.classList.remove('active');
      introSection.classList.add('active');
    }

    introSection.style.position = 'absolute';
    aboutSection.classList.remove('active');

    introSection.classList.add('transition-on');
    introSection.style.zIndex = '3';
    introSection.style.top = '0';

    setTimeout(() => {
      setPreventState(false);
      activeSlider = introSection;
      controlsBlur();
      introSection.style.position = 'relative';
      introSection.style.zIndex = '1';
      introSection.classList.remove('transition-on');
      aboutSection.style.zIndex  = '-1';
      aboutSection.style.position = 'absolute';
      aboutSection.style.top = '105vh';
    }, 1000);

    setTimeout(() => {
      nav.classList.remove('main-navbar-white-theme');
      nav.classList.add('main-navbar-black-theme');
    }, 700);
  }
}

export { activeSlider, animateSection };
