import { getHeaderHeight } from "../utils/functions";
import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

//let headerHeight = getHeaderHeight();
const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');
  const previousAnchor = document.querySelector('.intro');
  //const previousAnchorPosition = ;

  const nextAnchor = document.querySelector('.projects');
  //let nextAnchorPosition = nextAnchor.offsetTop;

  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });

  aboutCarousel.addEventListener('slide.bs.carousel', function (evt) {
    let indicators = aboutCarousel.querySelectorAll('.indicator');

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
    }

    if(evt.direction === 'left' && evt.to === 0) {
      evt.preventDefault();

      scrollTo({
        top: nextAnchor.offsetTop - getHeaderHeight(),
        behavior: 'smooth'
      })
    }

  })
}

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

if(introCarousel) {
  introCarouselInner = introCarousel.querySelector('.carousel-inner');
  let anchor = document.querySelector('.about');
  //let anchorPosition = ;

  const introCarouselInstance = new bootstrap.Carousel(introCarousel,{
    interval: false
  });

  const nextBtn = introCarousel.querySelector('.carousel-control-next');

  introCarousel.addEventListener('slide.bs.carousel', function (evt) {
    console.log('slide', evt.from, evt.to, evt.direction)
    if(evt.direction === 'right' && evt.from === 0) {
      console.log('RIGHT asdf')
      evt.preventDefault();
    }

    if(evt.direction === 'left' && evt.to === 0) {
      console.log('LEFT end')
      evt.preventDefault();

      scrollTo({
        top: anchor.offsetTop,
        behavior: 'smooth'
      })
    }
  })
}
