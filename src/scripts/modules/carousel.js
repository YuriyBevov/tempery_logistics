import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const header = document.querySelector('header');
const main = document.querySelector('main');
let initialHeaderHeight = header.getBoundingClientRect().height;

const aboutCarousel = document.querySelector('#aboutCarousel');

if(aboutCarousel) {
  main.style.marginTop = `${initialHeaderHeight}px`;
  //aboutCarousel.style.height = `calc(100vh - ${initialHeaderHeight}px)`;

  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });
}

const introCarousel = document.querySelector('#introCarousel');
if(introCarousel) {
  main.style.marginTop = `${initialHeaderHeight}px`;
  //introCarousel.style.height = `calc(100vh - ${initialHeaderHeight}px)`;

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
      main.style.marginTop = `${currentHeaderHeight}px`;
      aboutCarousel.style.height = `calc(100vh - ${currentHeaderHeight}px)`;
    }
    if(introCarousel) {
      main.style.marginTop = `${currentHeaderHeight}px`;
      introCarousel.style.height = `calc(100vh - ${currentHeaderHeight}px)`;
    }
    initialHeaderHeight = currentHeaderHeight
  }
}

//window.addEventListener('resize', onResizeSetCarouselHeight);
