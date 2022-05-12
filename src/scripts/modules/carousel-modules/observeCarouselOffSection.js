import { hideFakeScroll } from "./fakeScroll";

// наблюдаю, попал ли блок идущий за слайдерами во вьюпорт
const carouselOffSection = document.querySelector('#carousel-off-section');
let isCarouselOffSectionIntersected = false;

if(carouselOffSection) {
  carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        hideFakeScroll();
        //при возврате нужно уберать скролл если я вернулся в первый слайдер интро
        isCarouselOffSectionIntersected = true;
      } else {
        isCarouselOffSectionIntersected = false;
      }
    });
  });
  observer.observe(carouselOffSection);
}

export {isCarouselOffSectionIntersected}
