import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import { getHeaderHeight } from "../utils/functions";
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

if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');

  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });

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
