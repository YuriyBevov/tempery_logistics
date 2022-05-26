import { aboutSection, introSection, carouselOffSection } from "./carouselSections";
import { isFullScreenMode } from "./calcScreenMode";

/*let introIndicators, aboutIndicators, introControls, aboutControls;

if(aboutSection) {
  aboutIndicators = aboutSection.querySelector('.carousel-indicators');
  aboutControls = aboutSection.querySelector('.controls');
}

if(introSection) {
  introIndicators = introSection.querySelector('.carousel-indicators');
  introControls = introSection.querySelector('.controls');
}

let isIntroSectionObserved, isAboutSectionObserved, isCarouselOffSectionObserved = false;

function setFixedIndicators() {
  if(!isFullScreenMode) {
    !introIndicators.classList.contains('js-fixed') ?
    introIndicators.classList.add('js-fixed') :null;

    !introControls.classList.contains('js-fixed') ?
    introControls.classList.add('js-fixed') :null;

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

      !introControls.classList.contains('js-fixed') ?
      introControls.classList.add('js-fixed') :null;

      aboutControls.classList.contains('js-fixed') ?
      aboutControls.classList.add('js-fixed') :null;
    }

    if(isAboutSectionObserved) {
      console.log('ABOUT')
      introIndicators.classList.contains('js-fixed') ?
      introIndicators.classList.remove('js-fixed') :null;
      introControls.classList.contains('js-fixed') ?
      introControls.classList.remove('js-fixed') :null;
    }

    if(isAboutSectionObserved && !isCarouselOffSectionObserved) {
      introIndicators.classList.contains('js-fixed') ?
      introIndicators.classList.remove('js-fixed') :null;

      !aboutIndicators.classList.contains('js-fixed') ?
      aboutIndicators.classList.add('js-fixed') : null;

      introControls.classList.contains('js-fixed') ?
      introControls.classList.add('js-fixed') :null;

      !aboutControls.classList.contains('js-fixed') ?
      aboutControls.classList.add('js-fixed') :null;
    }

    if(aboutSection.getBoundingClientRect().y > window.innerHeight / 2 && aboutIndicators.classList.contains('js-fixed')) {
      aboutIndicators.classList.remove('js-fixed');
      aboutControls.classList.remove('js-fixed')
    }

    if(isCarouselOffSectionObserved) {
      aboutIndicators.classList.contains('js-fixed') ?
      aboutIndicators.classList.remove('js-fixed') :null;

      aboutControls.classList.contains('js-fixed') ?
      aboutControls.classList.remove('js-fixed') :null;
    }
  }

  window.addEventListener('scroll', () => {
    setFixed();
  })
}*/

let introControls, aboutControls;

if(aboutSection) {
  aboutControls = aboutSection.querySelector('.slider-controls');
}

if(introSection) {
  introControls = introSection.querySelector('.slider-controls');
}

let isIntroSectionObserved, isAboutSectionObserved, isCarouselOffSectionObserved = false;

function setFixedIndicators() {
  if(!isFullScreenMode) {

    introControls.style.backgroundColor = 'rgba(0,0,0,0.5)';
    aboutControls.style.backgroundColor = 'rgba(255,255,255,0.5)';

    !introControls.classList.contains('js-fixed') ?
    introControls.classList.add('js-fixed') : null;

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

      !introControls.classList.contains('js-fixed') ?
      introControls.classList.add('js-fixed') :null;

      aboutControls.classList.contains('js-fixed') ?
      aboutControls.classList.remove('js-fixed') :null;
    }

    if(isAboutSectionObserved) {
      introControls.classList.contains('js-fixed') ?
      introControls.classList.remove('js-fixed') :null;
    }

    if(isAboutSectionObserved && !isCarouselOffSectionObserved) {
      introControls.classList.contains('js-fixed') ?
      introControls.classList.add('js-fixed') :null;

      !aboutControls.classList.contains('js-fixed') ?
      aboutControls.classList.add('js-fixed') :null;
    }

    if(aboutSection.getBoundingClientRect().y > window.innerHeight / 2 && aboutIndicators.classList.contains('js-fixed')) {
      aboutControls.classList.remove('js-fixed')
    }

    if(isCarouselOffSectionObserved) {
      aboutControls.classList.contains('js-fixed') ?
      aboutControls.classList.remove('js-fixed') :null;
    }
  }

  window.addEventListener('scroll', () => {
    setFixed();
  })
}

export { setFixedIndicators }
