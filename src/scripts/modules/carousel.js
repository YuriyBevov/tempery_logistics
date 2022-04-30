import bootstrap from  '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const header = document.querySelector('header');
let initialHeaderHeight = header.getBoundingClientRect().height;

const aboutCarousel = document.querySelector('#aboutCarousel');
if(aboutCarousel) {
  aboutCarousel.style.maxHeight = `calc(100vh - ${initialHeaderHeight}px)`;
  const aboutCarouselInstance = new bootstrap.Carousel(aboutCarousel, {
    interval: false
  });


}

const introCarousel = document.querySelector('#introCarousel');
if(introCarousel) {
  introCarousel.style.maxHeight = `calc(100vh - ${initialHeaderHeight}px)`;

  const introCarouselInstance = new bootstrap.Carousel(introCarousel,{
    interval: false
  });

  const nextBtn = introCarousel.querySelector('.carousel-control-next');

  //let _thisBtn = null;
  introCarousel.addEventListener('slid.bs.carousel', function () {
    /*console.log('test',  introCarouselInstance)

    const onClickScrollDown = (evt) => {
      evt.preventDefault();

      //introCarouselInstance.pause();
      scrollTo({
        top: 850,
        behavior: 'smooth'
      })
      _thisBtn.removeEventListener('click', onClickScrollDown);
    }*/



    /*if(introCarouselInstance._activeElement === introCarouselInstance._items[introCarouselInstance._items.length - 2]) {
      introCarouselInstance.pause();
    } */

    /*if(introCarouselInstance._activeElement === introCarouselInstance._items[introCarouselInstance._items.length - 1]) {
      console.log('the last one');


      //onClickScrollDown()
      _thisBtn = nextBtn;
      _thisBtn.addEventListener('click', onClickScrollDown);

    } else {
      console.log(_thisBtn)
      if(_thisBtn !== null) {
        _thisBtn.removeEventListener('click', onClickScrollDown);
      }
      console.log(introCarouselInstance._activeElement, introCarouselInstance._items[introCarouselInstance._items.length - 1])
    }*/
  })
}

const onResizeSetCarouselHeight = () => {
  let currentHeaderHeight = header.getBoundingClientRect().height;
  if(currentHeaderHeight !== initialHeaderHeight) {
    if(aboutCarousel) {
      aboutCarousel.style.maxHeight = `calc(100vh - ${currentHeaderHeight}px)`;
    }
    if(introCarousel) {
      introCarousel.style.maxHeight = `calc(100vh - ${currentHeaderHeight}px)`;
    }
    initialHeaderHeight = currentHeaderHeight
  }
}

window.addEventListener('resize', onResizeSetCarouselHeight);
