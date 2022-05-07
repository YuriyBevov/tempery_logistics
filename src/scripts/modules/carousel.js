import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight, bodyLocker } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

// отрисовка названий на кнопках слайдера
function fillControlsTitle(obj) {
  const hideBtn = (btn, bool) => {
    if(bool) {
      btn.style.opacity = 0;
      btn.style.zIndex = -1;
    } else {
      btn.style.opacity = 1;
      btn.style.zIndex = 3;
    }
  }

  let prevTitleNode = obj.prevControl.querySelector('span');
  let nextTitleNode = obj.nextControl.querySelector('span');

  if(obj.prevControlTitle !== '') {
    prevTitleNode.innerHTML = obj.prevControlTitle;
    hideBtn(obj.prevControl, false);
  } else {
    hideBtn(obj.prevControl, true);
  }
  nextTitleNode.innerHTML = obj.nextControlTitle;
}

// смена названий на кнопках слайдера
function setControlsTitle(obj) {
  if(obj.evt.to < obj.items.length - 1 && obj.evt.from !== obj.items.length - 1 && obj.evt.direction === 'left') {
    fillControlsTitle({
      nextControl: obj.nextControl,
      prevControl: obj.prevControl,
      nextControlTitle: obj.items[obj.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: obj.items[obj.evt.to - 1].getAttribute("data-title"),
    })
  }

  if(obj.evt.to === obj.items.length - 1 && obj.evt.direction === 'left') {
    fillControlsTitle({
      nextControl: obj.nextControl,
      prevControl: obj.prevControl,
      nextControlTitle: 'Scroll down',
      prevControlTitle: obj.items[obj.evt.to - 1].getAttribute("data-title"),
    })
  }

  // влево
  if(obj.evt.from !== 0 && obj.evt.to > 0 && obj.evt.direction === 'right') {
    fillControlsTitle({
      nextControl: obj.nextControl,
      prevControl: obj.prevControl,
      nextControlTitle: obj.items[obj.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: obj.items[obj.evt.to - 1].getAttribute("data-title"),
    })
  }

  if(obj.evt.to === 0 && obj.evt.direction === 'right') {
    fillControlsTitle({
      nextControl: obj.nextControl,
      prevControl: obj.prevControl,
      nextControlTitle: obj.items[obj.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: obj.isPrevNodeEnabled ? 'Scroll up' : '',
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
/*const carouselOffSection = document.querySelector('#carousel-off-section');
/*carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

let isObserve = false;

if(carouselOffSection) {
  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        isObserve = true;
      }
    });
  });

  observer.observe(carouselOffSection);
}*/

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

// смена слайдов по скроллу

function onScrollSlideCarousel(carouselNode, carouselInstance) {

  const onMouseWheelChangeSlide = (evt) => {
    let windowHeight = document.documentElement.clientHeight;
    let sliderHeight = carouselNode.getBoundingClientRect().height;
    let isEqualHeight = windowHeight === sliderHeight ? true : false;

    if(carouselNode.contains(evt.target) /*&& !isObserve*/ && isEqualHeight && !isPageScrolled ) {
      evt.preventDefault();

      if(evt.deltaY > 0) {
        carouselInstance.next();
      } else {
        carouselInstance.prev();
      }
    }

    if(/*isObserve &&*/ window.pageYOffset === 0) {

      //isObserve = false;
      isPageScrolled = false;
      console.log(isPageScrolled)
      //body.style.overflow = 'hidden';
      //bodyLocker(true);
    }
  }



  window.addEventListener('mousewheel', onMouseWheelChangeSlide, { passive: false });
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

  aboutCarousel.addEventListener('slide.bs.carousel', function (evt) {
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
  })
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

  introCarousel.addEventListener('slide.bs.carousel', function (evt) {
    // отмена смены слайда и скролл в другой блок
    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();
    }

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      scrollIntoView(aboutCarousel, { behavior: "smooth", block: "start"});
      isPageScrolled = false;
      console.log('ISPS', isPageScrolled)
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
  })
}
