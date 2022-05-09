import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight, bodyLocker } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

const carouselOffSection = document.querySelector('#carousel-off-section');
carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

const nav = document.querySelector('.navbar');
const aboutSection = document.querySelector('.about-carousel-section');
const introSection = document.querySelector('.intro-carousel-section');

// при загрузке страницы блокирую скролл
document.addEventListener('DOMContentLoaded', () => {
  showFakeScroll();
})

// отрисовка названий на кнопках слайдера
function fillControlsTitle(opt) {
  const hideBtn = (btn, bool) => {
    if(bool) {
      btn.style.opacity = 0;
      btn.style.zIndex = -1;
    } else {
      btn.style.opacity = 1;
      btn.style.zIndex = 3;
    }
  }

  let prevTitleNode = opt.prevControl.querySelector('span');
  let nextTitleNode = opt.nextControl.querySelector('span');

  if(opt.prevControlTitle !== '') {
    prevTitleNode.innerHTML = opt.prevControlTitle;
    hideBtn(opt.prevControl, false);
  } else {
    hideBtn(opt.prevControl, true);
  }
  nextTitleNode.innerHTML = opt.nextControlTitle;
}

// смена названий на кнопках слайдера
function setControlsTitle(opt) {
  if(opt.evt.to < opt.items.length - 1 && opt.evt.from !== opt.items.length - 1 && opt.evt.direction === 'left') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: opt.items[opt.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: opt.items[opt.evt.to - 1].getAttribute("data-title"),
    })
  }

  if(opt.evt.to === opt.items.length - 1 && opt.evt.direction === 'left') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: 'Scroll down',
      prevControlTitle: opt.items[opt.evt.to - 1].getAttribute("data-title"),
    })
  }

  // влево
  if(opt.evt.from !== 0 && opt.evt.to > 0 && opt.evt.direction === 'right') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: opt.items[opt.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: opt.items[opt.evt.to - 1].getAttribute("data-title"),
    })
  }

  if(opt.evt.to === 0 && opt.evt.direction === 'right') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: opt.items[opt.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: opt.isPrevNodeEnabled ? 'Scroll up' : '',
    })
  }
}

// смена слайдов по свайпу
function onSwipeSlideCarousel(carouselNode, carouselInstance) {
  let entryPosX = null;

  const onMouseUpRemoveListeners = () => {
    window.removeEventListener('mousemove', onMouseMoveChangeSlide);
  }

  const onMouseMoveChangeSlide = (evt) => {
    evt.preventDefault();
    let posX = evt.screenX;

    if(entryPosX - posX > 75 && !isObserve) {
      carouselInstance.next();
    } else if (posX - entryPosX > 75 && !isObserve){
      carouselInstance.prev();
    }

    window.addEventListener('mouseup', onMouseUpRemoveListeners);
  }

  const onMouseDownListenMouseMove = (evt) => {
    entryPosX = evt.screenX;

    if(carouselNode.contains(evt.target)) {
      window.addEventListener('mousemove', onMouseMoveChangeSlide);
      window.addEventListener('mouseup', onMouseUpRemoveListeners);
    }
  }

  window.addEventListener('mousedown', onMouseDownListenMouseMove);
}

//анимация слайдеров
function animateSection(destSection) {
  if(destSection === 'about') {
    aboutSection.classList.add('transition-on');
    aboutSection.classList.add('active');
    aboutSection.style.position = 'absolute';
    aboutSection.style.zIndex = '3';
    aboutSection.style.top = '0';

    setTimeout(() => {
      debounce = false

      aboutSection.style.position = 'relative';
      aboutSection.style.zIndex = '1';
      aboutSection.classList.remove('transition-on');

      introSection.style.zIndex  = '-1';
      introSection.style.position = 'absolute';
      introSection.style.top = '105vh';

    }, 1000);
  }

  if(destSection === 'intro') {
    introSection.style.position = 'absolute';
    aboutSection.classList.remove('active');
    introSection.classList.add('transition-on');
    introSection.style.zIndex = '3';
    introSection.style.top = '0';

    setTimeout(() => {
      debounce = false;
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

//установка паддингов абсолютным блокам, чтобы не прыгал экран
const header = document.querySelector('.main-header');
function setPaddings(isActive) {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

  header.style.paddingRight = isActive ? paddingOffset : '0';
  aboutSection.style.paddingRight = isActive ? paddingOffset : '0';
  introSection.style.paddingRight = isActive ? paddingOffset : '0';
}

function showFakeScroll() {
  setPaddings(true);
  document.getElementById('scrollbar').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function hideFakeScroll() {
  setPaddings(false);
  document.getElementById('scrollbar').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// смена слайдов по скроллу
function onScrollSlideCarousel(carouselNode, carouselInstance) {

  const onMouseWheelChangeSlide = (evt) => {

    let windowHeight = document.documentElement.clientHeight;
    let sliderHeight = carouselNode.getBoundingClientRect().height;
    let isEqualHeight = windowHeight === sliderHeight || sliderHeight - windowHeight === 7 ? true : false;

    if(carouselNode.contains(evt.target) && !isObserve /* && isEqualHeight && !isPageScrolled */) {
      evt.preventDefault();

      if(evt.deltaY > 0) {
        if(!debounce) {
          carouselInstance.next();
        }
      } else {
        if(!debounce) {
          carouselInstance.prev();
        }
      }
    }
  }

  window.addEventListener('wheel', onMouseWheelChangeSlide, { passive: false });
}

// убераю скролл, если вернулся в блок со слайдером
let isPageScrolled = false;
window.addEventListener('scroll', (evt) => {
  isPageScrolled = true;

  if(window.scrollY === 0 && isPageScrolled) {
    showFakeScroll();
    isPageScrolled = false;
  }
})

// наблюдаю, попал ли блок идущий за слайдерами во вьюпорт
let isObserve = false;
if(carouselOffSection) {
  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        isObserve = true;
      } else {
        isObserve = false;
      }
    });
  });
  observer.observe(carouselOffSection);
}

let debounce = false;
if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');
  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });
  // swipe
  onSwipeSlideCarousel(aboutCarousel, aboutCarouselInstance);
  onScrollSlideCarousel(aboutCarousel, aboutCarouselInstance);
  // текст на кнопках
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

    // отмена смены слайда и скролл в другой блок
    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();

      // переход к intro слайдеру
      if(!debounce) {
        debounce = true;
        animateSection('intro');
      }
    }

    // переход к projects
    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      const nextAnchorCoord = carouselOffSection.offsetTop - window.scrollY - getHeaderHeight();
      scrollBy(window, { behavior: "smooth", top: nextAnchorCoord });
      hideFakeScroll();
    }

    // текст на кнопках

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
  }

  aboutCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)
}

if(introCarousel) {
  introCarouselInner = introCarousel.querySelector('.carousel-inner');
  const introCarouselInstance = new bootstrap.Carousel(introCarousel,{
    interval: false
  });
  // swipe
  onSwipeSlideCarousel(introCarousel, introCarouselInstance);
  onScrollSlideCarousel(introCarousel, introCarouselInstance);
  // текст на кнопках
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
    // отмена смены слайда и скролл в другой блок
    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();
    }
    //переход к about слайдеру
    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();

      if(!debounce) {
        debounce = true;
        animateSection('about');
      }

      nav.classList.remove('main-navbar-black-theme');
      nav.classList.add('main-navbar-white-theme');
    }

    // текст на кнопках
    setControlsTitle({
      items: carouselItems,
      nextControl,
      prevControl,
      evt: {
        to: evt.to,
        from: evt.from,
        direction: evt.direction
      }
    })
  }

  introCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)
}
