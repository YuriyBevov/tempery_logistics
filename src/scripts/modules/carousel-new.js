import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

//carousel-modules
import { preventAction } from './carousel-modules/debounce.js';
import { fillControlsTitle } from './carousel-modules/fillControlsTitle.js';
import { setControlsTitle } from './carousel-modules/setControlsTitle.js';
import { onSwipeSlideCarousel } from './carousel-modules/swipe.js';
import { isCarouselOffSectionIntersected } from './carousel-modules/observeCarouselOffSection.js';
import { showFakeScroll, hideFakeScroll } from './carousel-modules/fakeScroll.js';
import { isFullScreenMode } from './carousel-modules/calcScreenMode.js';
import { onScrollSlideCarousel } from './carousel-modules/onScrollSlideCarousel.js';
import { animateSection } from './carousel-modules/carouselAnimation.js';
import { keyboardNavigation } from './carousel-modules/keyboardNavigation.js';
import { onScrollBtnHandler } from './carousel-modules/scrollBtns.js';
import { carouselOffSection } from './carousel-modules/carouselSections.js';

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;
const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');

  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });

  // swipe
  onSwipeSlideCarousel(aboutCarousel, aboutCarouselInstance);
  // scroll
  isFullScreenMode ?
  onScrollSlideCarousel(aboutCarousel, aboutCarouselInstance) : null;
  //keyboard
  keyboardNavigation(aboutCarousel, aboutCarouselInstance);
  //scroll-btns
  onScrollBtnHandler(aboutCarousel);

  // первоначальный текст на кнопках
  const carouselItems = aboutCarouselInner.querySelectorAll('.carousel-item');
  const prevControl = aboutCarousel.querySelector('.control-prev');
  const nextControl = aboutCarousel.querySelector('.control-next');

  fillControlsTitle({
    nextControl,
    prevControl,
    nextControlTitle: carouselItems[1].getAttribute("data-title"),
    prevControlTitle: 'Scroll up'
  });

  const onSlideChangeHandler = (evt) => {
    const indicators = aboutCarousel.querySelectorAll('.indicator');
    if(!isCarouselOffSectionIntersected) {
      showFakeScroll();
    }

    // смена цвета индикаторов
    if(evt.to === 1 && window.innerWidth < 1200 || evt.to === 2 && window.innerWidth < 1200 ) {
      indicators.forEach(ind => {
        ind.querySelector('.indicator-inner').style.backgroundColor = '#ffffff';
        ind.classList.contains('indicator-purple') ?
        ind.classList.remove('indicator-purple') : null;
      })
    } else {
      indicators.forEach(ind => {
        ind.querySelector('.indicator-inner').style.backgroundColor = '#664599';
        !ind.classList.contains('indicator-purple') ?
        ind.classList.add('indicator-purple') : null;
      })
    }

    // динамический текст на кнопках
    setControlsTitle({
      items: carouselItems,
      nextControl,
      prevControl,
      isPrevNodeEnabled: true,
      evt: {
        to: evt.to,
        from: evt.from,
        direction: evt.direction
      }
    })

    // отмена смены слайда и скролл в другой блок
    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();
      // переход к intro слайдеру
      if(!preventAction && isFullScreenMode) {
        animateSection('intro');
      } else if ( !isFullScreenMode ) {
        scrollIntoView(introCarousel, { behavior: "smooth", block: "start"});
      }
    }

    if(evt.direction === 'right' || evt.direction === 'left') {

    }

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      console.log('TO PROJECTS', isFullScreenMode)
      if(!isFullScreenMode) {
        const coordY = carouselOffSection.offsetTop - window.scrollY - getHeaderHeight();
        scrollBy(window, { behavior: "smooth", top: coordY });
      }
    }
  }

  aboutCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)

  aboutCarousel.addEventListener('slid.bs.carousel', (evt) => {
    if(evt.direction === 'left' && evt.to === carouselItems.length - 1) {
      hideFakeScroll();
    }
  })
}

if(introCarousel) {
  introCarouselInner = introCarousel.querySelector('.carousel-inner');

  const introCarouselInstance = new bootstrap.Carousel(introCarousel,{
    interval: false
  });
  //swipe
  onSwipeSlideCarousel(introCarousel, introCarouselInstance);
  //scroll
  isFullScreenMode ?
  onScrollSlideCarousel(introCarousel, introCarouselInstance) : null;
  //keyboard
  keyboardNavigation(introCarousel, introCarouselInstance);
  //scroll-btns
  onScrollBtnHandler(introCarousel);

  // первоначальный текст на кнопках
  const carouselItems = introCarouselInner.querySelectorAll('.carousel-item');
  const prevControl = introCarousel.querySelector('.control-prev');
  const nextControl = introCarousel.querySelector('.control-next');

  fillControlsTitle({
    nextControl,
    prevControl,
    nextControlTitle: carouselItems[1].getAttribute("data-title"),
    prevControlTitle: ''
  });

  const onSlideChangeHandler = (evt) => {
    // динамический текст на кнопках
    setControlsTitle({
      items: carouselItems,
      nextControl,
      prevControl,
      //isNextNodeUntitled: true,
      evt: {
        to: evt.to,
        from: evt.from,
        direction: evt.direction
      }
    })

    // отмена смены слайда и скролл в другой блок
    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();
    }

    //переход к about слайдеру
    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();

      if(!preventAction && isFullScreenMode) {
        console.log(preventAction)
        animateSection('about');
      } else if ( !isFullScreenMode ) {
        scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});
      }
    }
  }

  introCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)
}
