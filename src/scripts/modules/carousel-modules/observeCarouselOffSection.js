// наблюдаю, попал ли блок идущий за слайдерами во вьюпорт
const carouselOffSection = document.querySelector('#carousel-off-section');
carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

let isCarouselOffSectionIntersected = false;

if(carouselOffSection) {
  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        isCarouselOffSectionIntersected = true;
        console.log(carouselOffSection)
      } else {
        isCarouselOffSectionIntersected = false;
        console.log(carouselOffSection)
      }
    });
  });
  observer.observe(carouselOffSection);
}

export {isCarouselOffSectionIntersected}
