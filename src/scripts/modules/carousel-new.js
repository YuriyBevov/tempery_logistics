import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight, bodyLocker, getWindowWidth } from "../utils/functions";
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

let windowHeight = document.documentElement.clientHeight;
let sliderHeight = introCarousel.getBoundingClientRect().height;
let isEqualHeight = windowHeight === sliderHeight || sliderHeight - windowHeight === 7 ? true : false;
let windowWidth = getWindowWidth();

let isFullScreen = isEqualHeight && windowWidth > 1200 ? true : false;

if(isFullScreen) {
  aboutSection.classList.add('full-height');
  introSection.classList.add('full-height');
}

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

  if(opt.nextControlTitle !== '') {
    nextTitleNode.innerHTML = opt.nextControlTitle;
    hideBtn(opt.nextControl, false);
  } else {
    hideBtn(opt.nextControl, true);
  }
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
      nextControlTitle: !opt.isNextNodeUntitled ? 'Scroll down' : '',
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

// навигация между слайдерами по кнопкам вверх/вниз
const btns = document.querySelectorAll('.scroll-btn');

function onScrollBtnHandler(carouselNode) {
  const onClickChangeActiveCarousel = (evt) => {
    if(carouselNode.contains(evt.target) && activeSlider !== aboutSection && isFullScreen) {
      animateSection('about');
    }

    if(carouselNode.contains(evt.target) && activeSlider !== introSection && isFullScreen) {
      animateSection('intro');
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', onClickChangeActiveCarousel);
  })
}

//навигация по клавиатуре
let activeSlider = document.querySelector('.carousel-section.active');

function keyboardNavigation(carouselNode, carouselInstance) {
  const onClickNavigatePage = (evt) => {
    evt.preventDefault();
    //console.log('keyboardNavigation: ', activeSlider, document.activeElement)
    if(evt.code === 'ArrowUp' && !debounce && !isObserve) {
      if(activeSlider.contains(carouselNode) && activeSlider !== introSection) {
        if(activeSlider === aboutSection && !isScrollActive) {
          animateSection('intro');
        }
      }
    }
    if(evt.code === 'ArrowDown' && !debounce && !isObserve) {
      if(activeSlider.contains(carouselNode) && activeSlider !== aboutSection) {
        animateSection('about');
      }
    }
    if(evt.code === 'ArrowLeft' && !debounce && !isObserve) {
      //console.log(activeSlider.contains(carouselNode), activeSlider, carouselNode)
      if(activeSlider.contains(carouselNode)) {
        carouselInstance.prev();
      }
    }
    if(evt.code === 'ArrowRight' && !debounce && !isObserve) {
      // console.log(activeSlider.contains(carouselNode), activeSlider, carouselNode)
      if(activeSlider.contains(carouselNode)) {
        carouselInstance.next();
      }
    }
    if(evt.code === 'Home' && !debounce && !isScrollActive) {
      if(activeSlider === aboutSection) {
        animateSection('intro');
      }
    }
    if(evt.code === 'End' && !debounce && !isObserve) {
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

/*function tabNavigation(carouselNode, carouselInstance) {

  const onTabNavigatePage = (evt) => {
    if(evt.code === 'Tab' || evt.key === 9) {

      if(activeSlider === introSection) {
        const lastFocusableElement = introSection.querySelector('.control-next');
        const firstFocusableElement = nav.querySelector('.navbar-brand');

        if (evt.shiftKey) {
          if(evt.target === firstFocusableElement) {
            console.log('first')
            lastFocusableElement.focus();
          }
        } else {
          if(evt.target === lastFocusableElement) {
            firstFocusableElement.focus();
          }
        }
      }

      if(activeSlider === aboutSection) {
        const lastFocusableElement = aboutSection.querySelector('.control-next');
        const firstFocusableElement = nav.querySelector('.navbar-brand');

        if (evt.shiftKey) {
          if(evt.target === firstFocusableElement) {
            console.log('first')
            lastFocusableElement.focus();
          }
        } else {
          if(evt.target === lastFocusableElement) {
            firstFocusableElement.focus();
          }
        }
      }
    }
  }

  window.addEventListener('keydown', onTabNavigatePage);
}*/

// убераю фокус с кнопок управления, при смене слайдера
const controls = document.querySelectorAll('.control');
const indicators =  document.querySelectorAll('.indicator');

function controlsBlur() {
  controls.forEach(cntr => {
    cntr.blur();
  });
  indicators.forEach(ind => {
    ind.blur();
  });
}

//анимация слайдеров
function animateSection(destSection) {
  debounce = true;
  console.log('animateSection: ', activeSlider)
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
      debounce = false;
      activeSlider = aboutSection;
      controlsBlur();

      aboutSection.style.position = 'relative';
      aboutSection.style.zIndex = '1';
      aboutSection.classList.remove('transition-on');

      introSection.style.zIndex  = '-1';
      introSection.style.position = 'absolute';
      introSection.style.top = '-105vh';

      //ставлю фокус на активном индикаторе
      //aboutSection.querySelector('.indicator.active').focus();
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
      debounce = false;
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

//установка паддингов абсолютным блокам, чтобы не прыгал экран
const header = document.querySelector('.main-header');
function setPaddings(isActive) {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

  header.style.paddingRight = isActive ? paddingOffset : '0';
  aboutSection.style.paddingRight = isActive ? paddingOffset : '0';
  introSection.style.paddingRight = isActive ? paddingOffset : '0';
}

// fake scrollbar
const fakeScrollbar = document.getElementById('scrollbar');
let isScrollActive = true;
function showFakeScroll() {
  console.log('showFakeScroll');
  if(fakeScrollbar.style.display !== 'block' && isFullScreen ) {
    isScrollActive = false;
    setPaddings(true);
    fakeScrollbar.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function hideFakeScroll() {
  console.log('hideFakeScroll');
  if(fakeScrollbar.style.display !== 'none') {


    setPaddings(false);
    fakeScrollbar.style.display = 'none';
    document.body.style.overflow = 'auto';
    isScrollActive = true;
  }
}
// смена слайдов по скроллу

function onScrollSlideCarousel(carouselNode, carouselInstance) {
  const onMouseWheelChangeSlide = (evt) => {
    //let windowHeight = document.documentElement.clientHeight;
    //let sliderHeight = carouselNode.getBoundingClientRect().height;
    // let isFullScreen = windowHeight === sliderHeight || sliderHeight - windowHeight === 7 ? true : false;

    if(carouselNode.contains(evt.target) && !isObserve ) {
      if(evt.deltaY > 0 && !isScrollActive) {
        evt.preventDefault();
        if(!debounce) {
          carouselInstance.next();
        }
      } else if (evt.deltaY < 0) {
        evt.preventDefault();
        if(!debounce) {
          carouselInstance.prev();
        }
      }
    }
  }

  window.addEventListener('wheel', onMouseWheelChangeSlide, { passive: false });
}

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
  isFullScreen ?
  onSwipeSlideCarousel(aboutCarousel, aboutCarouselInstance) : null;
  // scroll
  isFullScreen ?
  onScrollSlideCarousel(aboutCarousel, aboutCarouselInstance) : null;
  isFullScreen ?
  keyboardNavigation(aboutCarousel, aboutCarouselInstance) : null;
  //tabNavigation(aboutCarousel, aboutCarouselInstance);

  onScrollBtnHandler(aboutCarousel);
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
      if(!debounce && isFullScreen) {
        animateSection('intro');
      } else {
        scrollIntoView(introCarousel, { behavior: "smooth", block: "start"});
      }
    }

    // переход к projects
    if(evt.direction === 'right' && evt.to !== carouselItems.length - 1 && !isObserve) {
      showFakeScroll();
    }

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();

      if(!isFullScreen) {
        const nextAnchor = document.querySelector('#carousel-off-section');
        const nextAnchorCoord = nextAnchor.offsetTop - window.scrollY - getHeaderHeight();
        scrollBy(window, { behavior: "smooth", top: nextAnchorCoord });
      }
    }

    if(evt.direction === 'left' && evt.to === carouselItems.length - 1) {
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
  isFullScreen ?
  onSwipeSlideCarousel(introCarousel, introCarouselInstance) : null;
  isFullScreen ?
  onScrollSlideCarousel(introCarousel, introCarouselInstance) : null;
  isFullScreen ?
  keyboardNavigation(introCarousel, introCarouselInstance) : null;
  // tabNavigation(introCarousel, introCarouselInstance);

  onScrollBtnHandler(introCarousel);
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

      if(!debounce && isFullScreen) {
        animateSection('about');
      } else {
        scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});
      }
    }

    // текст на кнопках
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
  }

  introCarousel.addEventListener('slide.bs.carousel', onSlideChangeHandler)
}
