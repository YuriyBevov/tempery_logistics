import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import gsap from 'gsap';

import { getHeaderHeight } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

//carousel-modules
import { preventAction } from './carousel-modules/debounce.js';
import { fillControlsTitle } from './carousel-modules/fillControlsTitle.js';
import { setControlsTitle } from './carousel-modules/setControlsTitle.js';
import { onSwipeSlideCarousel } from './carousel-modules/swipe.js';
import { isCarouselOffSectionIntersected } from './carousel-modules/observeCarouselOffSection.js';
import { showFakeScroll, hideFakeScroll, isScrollActive } from './carousel-modules/fakeScroll.js';
import { isFullScreenMode } from './carousel-modules/calcScreenMode.js';
import { onScrollSlideCarousel } from './carousel-modules/onScrollSlideCarousel.js';
import { animateSection } from './carousel-modules/carouselAnimation.js';
import { keyboardNavigation } from './carousel-modules/keyboardNavigation.js';
import { onScrollBtnHandler } from './carousel-modules/scrollBtns.js';
import { carouselOffSection } from './carousel-modules/carouselSections.js';
import { carouselTransform, beforeSlideChange } from './carousel-modules/carouselTransformAnimation.js';

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
      if(!preventAction && isFullScreenMode && !isScrollActive) {
        animateSection('intro');
      }
      else if(!preventAction && isFullScreenMode && isScrollActive) {
        scrollIntoView(introCarousel, { behavior: "smooth", block: "start"});
        animateSection('intro');
        showFakeScroll();
      }
      else if ( !isFullScreenMode ) {
        scrollIntoView(introCarousel, { behavior: "smooth", block: "start"});
      }
    }

    //переход к projects
    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();

      hideFakeScroll();
      const coordY = carouselOffSection.offsetTop - window.scrollY - getHeaderHeight();
      scrollBy(window, { behavior: "smooth", top: coordY });
    }

    beforeSlideChange(aboutCarousel);
  }
  aboutCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)
  document.querySelector('.about-carousel-section').classList.add('animation-ready');

  aboutCarousel.addEventListener('slid.bs.carousel', (evt) => {
    if(evt.direction === 'left' && evt.to === carouselItems.length - 1) {
      hideFakeScroll();
    }
    carouselTransform(aboutCarousel);
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
        animateSection('about');
      } else if ( !isFullScreenMode ) {
        scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});
      }
    }
  }

  introCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)

  // gsap initial for first slide
  document.querySelector('.intro-carousel-section').classList.add('animation-ready');
  let title = introCarousel.querySelector('.carousel-item.active .gsap-title');
  let par = introCarousel.querySelector('.carousel-item.active .gsap-text');
  let btn = introCarousel.querySelector('.carousel-item.active .gsap-btn');
  let scrollBtn = introCarousel.querySelector('.intro-carousel-section .gsap-scroll-btn');
  let cards = introCarousel.querySelectorAll('.carousel-item.active .slide-side-card');

  setTimeout(() => {
    if(title) {
      gsap.to(title, {duration: 1.2, opacity: 1, ease: "ease-in"});
      gsap.to(title, {duration: .8, y: 0, ease: "ease-in"});
    }

    if(par) {
      gsap.to(par, {duration: 1.2, delay: 0.2, opacity: 1, ease: "ease-in"});
      gsap.to(par, {duration: .8, delay: 0.2, x: 0, ease: "ease-in"});
      par.classList.add('showBefore');
    }

    if(btn) {
      gsap.to(btn, {duration: 1, delay: 0.2, opacity: 1, ease: "ease-in"});
    }

    gsap.to(scrollBtn, {duration: 0.5, delay: 1.5, height: 100, ease: "ease-in"});
    if(cards) {
      cards.forEach((card,i) => {
        gsap.to(card,{
          duration: 0.8,
          y: 0,
          opacity: 1,
          delay: 1 + (0.3 * i),
          ease: 'ease-in'
        })
      })
    }
  }, 300);

  introCarousel.addEventListener('slid.bs.carousel', () => {
    carouselTransform(introCarousel);
  });
}
