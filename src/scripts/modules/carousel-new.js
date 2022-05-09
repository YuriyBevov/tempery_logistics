import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight, bodyLocker } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

//const body = document.querySelector('#aboutCarousel');

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

let isPageScrolled = false;
let aboutCarouselPosY = null;

if(aboutCarousel) {
  aboutCarouselPosY = aboutCarousel.offsetTop;

  window.addEventListener('resize', () => {
    aboutCarouselPosY = aboutCarousel.offsetTop;
  })
}

window.addEventListener('scroll', (evt) => {
  isPageScrolled = true;

  if(window.scrollY === aboutCarouselPosY) {
    isPageScrolled = false;
  }
})

function showFakeScroll() {
  document.getElementById('scrollbar').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function hideFakeScroll() {
  document.getElementById('scrollbar').style.display = 'none';
  document.body.style.overflow = 'auto';
}

if(window.scrollY === 0) {
  //showFakeScroll();

  window.addEventListener('scroll', (evt) => {
    console.log(evt)
  })
}

// смена слайдов по скроллу

function onScrollSlideCarousel(carouselNode, carouselInstance) {

  const onMouseWheelChangeSlide = (evt) => {

    let windowHeight = document.documentElement.clientHeight;
    let sliderHeight = carouselNode.getBoundingClientRect().height;
    let isEqualHeight = windowHeight === sliderHeight || sliderHeight - windowHeight === 7 ? true : false;

    //console.log(carouselNode.contains(evt.target), isEqualHeight, !isPageScrolled, windowHeight, sliderHeight)

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

    if(window.scrollY === 0) {
      isPageScrolled = false;
    }
  }

  window.addEventListener('wheel', onMouseWheelChangeSlide, { passive: false });
}

const carouselOffSection = document.querySelector('#carousel-off-section');

carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

const nav = document.querySelector('.navbar');
let debounce = false;
const aboutSection = document.querySelector('.about');
const introSection = document.querySelector('.intro');

document.addEventListener('DOMContentLoaded', () => {
  // showFakeScroll();
  console.log('showFake')
})

let isObserve = false;

if(carouselOffSection) {

  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        isObserve = true;
      } else {
        isObserve = false;
        //showFakeScroll();
        //aboutSection.style.paddingRight = '0';
        //introSection.style.paddingRight = '0';
      }
    });
  });

  observer.observe(carouselOffSection);
}

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
      //scrollIntoView(introCarousel, { behavior: "smooth", block: "start"});

      // переход к intro слайдеру
      if(!debounce) {
        debounce = true;

        introSection.style.position = 'absolute';
        aboutSection.classList.remove('active');
        //introSection.style.paddingRight = '12px';
        introSection.classList.add('transition-on');
        introSection.style.zIndex = '3';
        introSection.style.top = '0';

        setTimeout(() => {
          debounce = false;
          console.log('to intro')
          introSection.style.position = 'relative';
          //introSection.style.paddingRight = '0';
          introSection.style.zIndex = '1';
          introSection.classList.remove('transition-on');
          aboutSection.style.zIndex  = '-1';
          aboutSection.style.position = 'absolute';
          //aboutSection.style.paddingRight = '12px';
          aboutSection.style.top = '105vh';
        }, 1000);

        setTimeout(() => {
          nav.classList.remove('main-navbar-white-theme');
          nav.classList.add('main-navbar-black-theme');
        }, 700);
      }
    }

    // переход к projects
    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      const nextAnchor = document.querySelector('#carousel-off-section');
      const nextAnchorCoord = nextAnchor.offsetTop - window.scrollY - getHeaderHeight();
      //aboutSection.style.paddingRight = '0'; // если есть скролл
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
      //scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});

      if(!debounce) {
        debounce = true;
        console.log('to about')
        aboutSection.classList.add('transition-on');
        aboutSection.classList.add('active');
        aboutSection.style.position = 'absolute';
        //aboutSection.style.paddingRight = '12px';
        aboutSection.style.zIndex = '3';
        aboutSection.style.top = '0';

        //aboutSection.style.top = '0';
        //aboutSection.classList.add('active');

        setTimeout(() => {
          debounce = false
          aboutSection.style.position = 'relative';
          //aboutSection.style.paddingRight = '0';
          aboutSection.style.zIndex = '1';
          aboutSection.classList.remove('transition-on');

          introSection.style.zIndex  = '-1';
          introSection.style.position = 'absolute';
          //introSection.style.paddingRight = '12px';
          introSection.style.top = '105vh';

        }, 1000);
      }

      nav.classList.remove('main-navbar-black-theme');
      nav.classList.add('main-navbar-white-theme');
      isPageScrolled = false;
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
