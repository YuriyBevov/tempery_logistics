import { getHeaderHeight } from "../utils/functions";
import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');

  const previousAnchor = document.querySelector('.intro');
  const nextAnchor = document.querySelector('.projects');

  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });

  /*const carouselItems = aboutCarouselInner.querySelectorAll('.carousel-item');

  const prevControl = aboutCarousel.querySelector('.control-prev');
  /*prevControl.style.opacity = 0;
  prevControl.style.zIndex = -1; */

  /*const prevControlTitle = prevControl.querySelector('span')

  const nextControl = aboutCarousel.querySelector('.control-next');
  const nextControlTitle = nextControl.querySelector('span')

  prevControlTitle.innerHTML = 'UP';
  nextControlTitle.innerHTML = carouselItems[1].getAttribute("data-title");
  console.log(aboutCarouselInstance) */

  //setCarouselControlTitle(carouselItems, 0, 1);

  aboutCarousel.addEventListener('slide.bs.carousel', function (evt) {
    const indicators = aboutCarousel.querySelectorAll('.indicator');

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

    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();
      scrollTo({
        top: previousAnchor.offsetTop,
        behavior: 'smooth'
      })
    } /*else {
        if(evt.from === 1) {
          console.log(evt.from, 'LAST')
          prevControlTitle.innerHTML = 'up';
          nextControlTitle.innerHTML = carouselItems[evt.from].getAttribute("data-title");
        } else {
          console.log('not last', evt.from, evt.to);
          prevControlTitle.innerHTML = carouselItems[evt.from].getAttribute("data-title");
          nextControlTitle.innerHTML = carouselItems[evt.from].getAttribute("data-title");
        }
    }*/

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();
      scrollTo({
        top: nextAnchor.offsetTop - getHeaderHeight(),
        behavior: 'smooth'
      })
    } /*else {
      if(evt.to + 1 < carouselItems.length) {
        prevControlTitle.innerHTML = carouselItems[evt.from].getAttribute("data-title");
        nextControlTitle.innerHTML = carouselItems[evt.to + 1].getAttribute("data-title");
      } else if (evt.to + 1 === carouselItems.length) {
        nextControlTitle.innerHTML = 'Our projects';
      }
    }*/
  })
}

if(introCarousel) {
  introCarouselInner = introCarousel.querySelector('.carousel-inner');
  const anchor = document.querySelector('.about');

  const introCarouselInstance = new bootstrap.Carousel(introCarousel,{
    interval: false
  });

  const nextBtn = introCarousel.querySelector('.carousel-control-next');

  introCarousel.addEventListener('slide.bs.carousel', function (evt) {
    if(evt.direction === 'right' && evt.from === 0) {
      evt.preventDefault();
    }

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();

      scrollTo({
        top: anchor.offsetTop,
        behavior: 'smooth'
      })
    }
  })
}
