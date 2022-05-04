import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const header = document.querySelector('header');
let initialHeaderHeight = header.getBoundingClientRect().height;

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;

if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');
  //aboutCarouselInner.style.paddingTop = `${initialHeaderHeight}px`;

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
  })
}

const introCarousel = document.querySelector('#introCarousel');
let introCarouselInner = null;

if(introCarousel) {
  introCarouselInner = introCarousel.querySelector('.carousel-inner');
  //introCarouselInner.style.paddingTop = `${initialHeaderHeight}px`;

  const introCarouselInstance = new bootstrap.Carousel(introCarousel,{
    interval: false
  });

  const nextBtn = introCarousel.querySelector('.carousel-control-next');

  introCarousel.addEventListener('slid.bs.carousel', function () {
    console.log('slide')
  })
}

const onResizeSetCarouselHeight = () => {
  let currentHeaderHeight = header.getBoundingClientRect().height;

  if(currentHeaderHeight !== initialHeaderHeight) {
    if(aboutCarousel) {
      aboutCarouselInner.style.paddingTop = `${currentHeaderHeight}px`;
    }
    if(introCarousel) {
      introCarouselInner.style.paddingTop = `${currentHeaderHeight}px`;
    }
    initialHeaderHeight = currentHeaderHeight
  }
}

//window.addEventListener('resize', onResizeSetCarouselHeight);
