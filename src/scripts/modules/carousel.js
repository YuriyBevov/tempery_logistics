import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const header = document.querySelector('header');
//const main = document.querySelector('main');
let initialHeaderHeight = header.getBoundingClientRect().height;

const aboutCarousel = document.querySelector('#aboutCarousel');
let aboutCarouselInner = null;


if(aboutCarousel) {
  aboutCarouselInner = aboutCarousel.querySelector('.carousel-inner');
  //main.style.marginTop = `${initialHeaderHeight}px`;
  //aboutCarouselInner.style.height = `calc(100vh - ${initialHeaderHeight}px)`;

  aboutCarouselInner.style.paddingTop = `${initialHeaderHeight}px`;

  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });
}

const introCarousel = document.querySelector('#introCarousel');
//let introCarouselInner = null;

if(introCarousel) {
  //introCarouselInner = introCarousel.querySelector('.carousel-inner');
  //main.style.marginTop = `${initialHeaderHeight}px`;
  //introCarouselInner.style.height = `calc(100vh - ${initialHeaderHeight}px)`;

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
      //main.style.marginTop = `${currentHeaderHeight}px`;
      //aboutCarouselInner.style.height = `calc(100vh - ${currentHeaderHeight}px)`;
      console.log('resize')
      aboutCarouselInner.style.paddingTop = `${currentHeaderHeight}px`;
    }
    if(introCarousel) {
      //main.style.marginTop = `${currentHeaderHeight}px`;
      //introCarouselInner.style.height = `calc(100vh - ${currentHeaderHeight}px)`;
    }
    initialHeaderHeight = currentHeaderHeight
  }
}

window.addEventListener('resize', onResizeSetCarouselHeight);
