import { aboutSection, introSection, carouselOffSection } from "./carouselSections";
import { isFullScreenMode } from "./calcScreenMode";

const introIndicators = introSection.querySelector('.carousel-indicators');
const aboutIndicators = aboutSection.querySelector('.carousel-indicators');

let isIntroSectionObserved, isAboutSectionObserved, isCarouselOffSectionObserved = false;

function setFixedIndicators() {
  if(!isFullScreenMode && window.innerWidth < 992) {
    console.log(isFullScreenMode)
    !introIndicators.classList.contains('js-fixed') ?
    introIndicators.classList.add('js-fixed') :null;

    let introSectionObserver = new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if(entry.isIntersecting) {
          isIntroSectionObserved = true;
        } else {
          isIntroSectionObserved = false;
        }
      });
    });

    if(introSection) {
      introSectionObserver.observe(introSection);
    }

    let aboutSectionObserver = new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if(entry.isIntersecting) {
          isAboutSectionObserved = true;
        } else {
          isAboutSectionObserved = false;
        }
      });
    });

    if(aboutSection) {
      aboutSectionObserver.observe(aboutSection);
    }

    let carouselOffSectionObserver = new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if(entry.isIntersecting) {
          isCarouselOffSectionObserved = true;
        } else {
          isCarouselOffSectionObserved = false;
        }
      });
    });

    if(carouselOffSection) {
      carouselOffSectionObserver.observe(carouselOffSection);
    }
  }

  function setFixed() {
    if(isIntroSectionObserved && !isAboutSectionObserved) {
      !introIndicators.classList.contains('js-fixed') ?
      introIndicators.classList.add('js-fixed') :null;

      aboutIndicators.classList.contains('js-fixed') ?
      aboutIndicators.classList.remove('js-fixed') :null;
    }

    if(isAboutSectionObserved && !isCarouselOffSectionObserved) {
      introIndicators.classList.contains('js-fixed') ?
      introIndicators.classList.remove('js-fixed') :null;

      !aboutIndicators.classList.contains('js-fixed') ?
      aboutIndicators.classList.add('js-fixed') : null;
    }

    if(aboutSection.getBoundingClientRect().y > window.innerHeight / 2 && aboutIndicators.classList.contains('js-fixed')) {
      aboutIndicators.classList.remove('js-fixed');
    }

    if(isCarouselOffSectionObserved) {
      aboutIndicators.classList.contains('js-fixed') ?
      aboutIndicators.classList.remove('js-fixed') :null;
    }
  }

  window.addEventListener('scroll', () => {
    setFixed();
  })
}

export { setFixedIndicators }
