import {activeSlider, animateSection } from './carouselAnimation.js';
import { isScrollActive } from './fakeScroll';
import { isCarouselOffSectionIntersected } from './observeCarouselOffSection.js';
import { aboutSection, introSection } from './carouselSections.js';
import { preventAction, setPreventState } from './debounce.js';

//навигация по клавиатуре

function keyboardNavigation(carouselNode, carouselInstance) {
  const onClickNavigatePage = (evt) => {
    evt.preventDefault();
    //console.log('keyboardNavigation: ', activeSlider, document.activeElement)
    if(evt.code === 'ArrowUp' && !preventAction && !isCarouselOffSectionIntersected) {
      if(activeSlider.contains(carouselNode) && activeSlider !== introSection) {
        if(activeSlider === aboutSection && !isScrollActive) {
          animateSection('intro');
        }
      }
    }
    if(evt.code === 'ArrowDown' /*&& !debounce */&& !isCarouselOffSectionIntersected) {
      if(activeSlider.contains(carouselNode) && activeSlider !== aboutSection) {
        animateSection('about');
      }
    }
    if(evt.code === 'ArrowLeft' /*&& !debounce */&& !isCarouselOffSectionIntersected) {
      //console.log(activeSlider.contains(carouselNode), activeSlider, carouselNode)
      if(activeSlider.contains(carouselNode)) {
        carouselInstance.prev();
      }
    }
    if(evt.code === 'ArrowRight' && !preventAction && !isCarouselOffSectionIntersected) {
      // console.log(activeSlider.contains(carouselNode), activeSlider, carouselNode)
      if(activeSlider.contains(carouselNode)) {
        carouselInstance.next();
      }
    }
    if(evt.code === 'Home'/* && !debounce*/ && !isScrollActive) {
      if(activeSlider === aboutSection) {
        animateSection('intro');
      }
    }
    if(evt.code === 'End' /*&& !debounce */&& !isCarouselOffSectionIntersected) {
      if(activeSlider === introSection) {
        animateSection('about');
      }
    }

    if(evt.code === 'Tab') {
      evt.preventDefault();
      console.log('tab')
    }
  }

  window.addEventListener('keyup', onClickNavigatePage);
};

export { keyboardNavigation }
