import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight, bodyLocker } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

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

    if(entryPosX - posX > 75) {
      carouselInstance.next();
    } else if (posX - entryPosX > 75){
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

//- observer
/* carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

let isObserve = false;

if(carouselOffSection) {

  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        isObserve = true;
        enableScroll();
      } else {
        isObserve = false;
        disableScroll();
      }
    });
  });

  observer.observe(carouselOffSection);
} */


//-
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

  if(window.pageYOffset === aboutCarouselPosY) {
    isPageScrolled = false;
  }
})

/* function showFakeScroll() {
  document.getElementById('scrollbar').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function hideFakeScroll() {
  document.getElementById('scrollbar').style.display = 'none';
  document.body.style.overflow = 'auto';
} */

/*const carouselOffSection = document.querySelector('#carousel-off-section');

let carouselOffSectionOffset = carouselOffSection.offsetTop;
console.log('carouselOffSectionOffset: ', carouselOffSectionOffset);

const onScrollDisableAutoScroll = () => {
  if(window.pageYOffset >= carouselOffSectionOffset - 100) {
    console.log('projects top - отменить авто скролл, вернуть возможность скролла и следить за скроллом вверх');

    window.removeEventListener('scroll', onScrollDisableAutoScroll);
    window.addEventListener('scroll', onScrollEnableAutoScroll);
  }
}

const onScrollEnableAutoScroll = () => {
  if(window.pageYOffset < carouselOffSectionOffset - 200) {
    console.log('прокрутить до about  и вернуть автоскролл');

    scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});

    window.removeEventListener('scroll', onScrollEnableAutoScroll);
    window.addEventListener('scroll', onScrollDisableAutoScroll);
  }
}

window.addEventListener('scroll', onScrollDisableAutoScroll); */

// смена слайдов по скроллу

 function onScrollSlideCarousel(carouselNode, carouselInstance) {

  const onMouseWheelChangeSlide = (evt) => {
    let windowHeight = document.documentElement.clientHeight;
    let sliderHeight = carouselNode.getBoundingClientRect().height;
    let isEqualHeight = windowHeight === sliderHeight ? true : false;

    if(carouselNode.contains(evt.target) && isEqualHeight && !isPageScrolled ) {
      evt.preventDefault();

      if(evt.deltaY > 0) {
        carouselInstance.next();
      } else {
        carouselInstance.prev();
      }
    }

    if(window.pageYOffset === 0) {
      isPageScrolled = false;
      console.log(isPageScrolled)
    }
  }

  window.addEventListener('mousewheel', onMouseWheelChangeSlide, { passive: false });
}

//--
  //--- scroll disabling

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  /*var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) {// older FF
      window.addEventListener('DOMMouseScroll', preventDefault, {passive: false});
    }

    document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, {passive: false});
      }
      document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }*/

  //--- scroll disabling

/*function onScrollSlideCarousel(carouselNode, carouselInstance) {
  const onMouseWheelChangeSlide = (evt) => {
    let windowHeight = document.documentElement.clientHeight;
    let sliderHeight = carouselNode.getBoundingClientRect().height;
    let isEqualHeight = windowHeight === sliderHeight ? true : false;

    if(carouselNode.contains(evt.target) && isEqualHeight && !isPageScrolled ) {
      evt.preventDefault();

      if(evt.deltaY > 0) {
        carouselInstance.next();
      } else {
        carouselInstance.prev();
      }
    }

    if(window.pageYOffset === 0) {
      isPageScrolled = false;
    }
  }

  window.addEventListener('mousewheel', onMouseWheelChangeSlide, { passive: false });
} */

//--
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

      scrollIntoView(introCarousel, { behavior: "smooth", block: "start"});
    }

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      const nextAnchor = document.querySelector('#carousel-off-section');
      const nextAnchorCoord = nextAnchor.offsetTop - window.pageYOffset - getHeaderHeight();

      scrollBy(window, { behavior: "smooth", top: nextAnchorCoord });
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

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});
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
