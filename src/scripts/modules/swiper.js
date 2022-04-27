import Swiper, { Navigation, Pagination } from 'swiper';

let mainSwiper = document.querySelector('.main-swiper');

if(mainSwiper) {
  new Swiper(mainSwiper, {
      slidesPerView: 1,
      direction: 'vertical'

      /*modules: [Navigation],

      navigation: {
          nextEl: ".news-slider-button-next",
          prevEl: ".news-slider-button-prev",
      },*/

      /*breakpoints: {
          420: {
            slidesPerView: 'auto',
            spaceBetween: 30
          },
          1920: {
            slidesPerView: 3,
            spaceBetween: 40
          }
      } */
  });

  const innerSwipers = document.querySelectorAll('.inner-swiper');

  innerSwipers.forEach(slider => {
    new Swiper(slider, {
        slidesPerView: 1,
    });

  })
}
