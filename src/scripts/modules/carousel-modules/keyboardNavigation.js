import { activeSlider, animateSection } from './carouselAnimation.js';
import { showFakeScroll, hideFakeScroll, isScrollActive } from './fakeScroll';
import { isCarouselOffSectionIntersected } from './observeCarouselOffSection.js';
import { aboutSection, introSection } from './carouselSections.js';
import { preventAction, setPreventState } from './debounce.js';
import { scrollIntoView } from "seamless-scroll-polyfill";

const footer = document.querySelector('footer');

//навигация по клавиатуре

function keyboardNavigation(carouselNode, carouselInstance) {
  const onClickNavigatePage = (evt) => {
    evt.preventDefault();

    if(evt.code === 'ArrowUp' && !preventAction && !isCarouselOffSectionIntersected && !isScrollActive) {
      let carouselItems = activeSlider.querySelectorAll('.carousel-item');
      let activeSlide = activeSlider.querySelector('.carousel-item.active')

      if( activeSlider.contains(carouselNode)) {
        if(activeSlider === aboutSection) {
          if( activeSlide === carouselItems[0]) {
            animateSection('intro');
          } else {
            carouselInstance.prev();
          }
        }
        if(activeSlider === introSection) {
          if( activeSlide !== carouselItems[0]) {
            carouselInstance.prev();
          }
        }
      }
    }

    if(evt.code === 'ArrowDown' && !preventAction && !isCarouselOffSectionIntersected) {
      let carouselItems = activeSlider.querySelectorAll('.carousel-item');
      let activeSlide = activeSlider.querySelector('.carousel-item.active')

      if( activeSlider.contains(carouselNode)) {
        if(activeSlider === introSection) {
          if( activeSlide === carouselItems[carouselItems.length - 1]) {
            animateSection('about');
          } else {
            carouselInstance.next();
          }
        }

        if(activeSlider === aboutSection) {
          if( activeSlide !== carouselItems[carouselItems.length - 1]) {
            carouselInstance.next();
          }
        }
      }
    }

    if(evt.code === 'ArrowLeft' && !preventAction&& !isCarouselOffSectionIntersected) {
      if(activeSlider.contains(carouselNode)) {
        carouselInstance.prev();
      }
    }

    if(evt.code === 'ArrowRight' && !preventAction && !isCarouselOffSectionIntersected) {
      if(activeSlider.contains(carouselNode)) {
        carouselInstance.next();
      }
    }

    if(evt.code === 'PageUp' && !preventAction && !isScrollActive) {
      if(activeSlider === aboutSection) {
        animateSection('intro');
      }

      if(activeSlider === introSection) {
        animateSection('about');
      }
    }

    if(evt.code === 'PageDown'  && !preventAction && !isScrollActive) {
      if(activeSlider === introSection) {
        animateSection('about');
      }
      if(activeSlider === aboutSection) {
        animateSection('intro');
      }
    }

    if(evt.code === 'Home' && !preventAction) {
      showFakeScroll();
    }

    if(evt.code === 'End' && !preventAction) {
      hideFakeScroll();
      scrollIntoView(footer, { behavior: "smooth", block: "start"});
    }
  }

  window.addEventListener('keyup', onClickNavigatePage);

  let firstFocusableElement = document.querySelector('.navbar-brand');

  const onTabClickHandler = (evt) => {

    let lastFocusableElement = activeSlider.querySelector('.control-next');
    let isTabPressed = evt.key === 'Tab' || evt.key === 9;

    if (!isTabPressed) {
        return;
    }

    let toggler = document.querySelector('.navbar-toggler');
    if (evt.shiftKey) {
        let firstIndicatorBtn = activeSlider.querySelector(' .indicator');
        if (document.activeElement === firstFocusableElement && activeSlider === introSection) {
            lastFocusableElement.focus();
            evt.preventDefault();
        }

        if (document.activeElement === firstIndicatorBtn) {
          toggler.focus();
          evt.preventDefault();
        }
    } else {
        let firstIndicatorBtn = activeSlider.querySelector('.indicator');

        if (document.activeElement === lastFocusableElement && activeSlider === introSection) {
            firstFocusableElement.focus();
            evt.preventDefault();
        }

        if (document.activeElement === lastFocusableElement && activeSlider === aboutSection) {
          hideFakeScroll();
        }

        if (document.activeElement === toggler) {
          firstIndicatorBtn.focus();
          evt.preventDefault();
        }
    }
  }

  document.addEventListener('keydown', onTabClickHandler);
};

export { keyboardNavigation }
