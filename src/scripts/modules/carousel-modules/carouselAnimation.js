import { blurFocusedElement } from "./blurFocusedElement";
import { aboutSection, introSection } from './carouselSections.js';
import { setPreventState } from './debounce.js';
// import { focusableElements } from './focusable.js';

let activeSlider = document.querySelector('.carousel-section.active');
const nav = document.querySelector('.navbar');

const startAnimation = (opt) => {
  blurFocusedElement();
  //меняю активный класс между слайдерами
  if(opt.prevSliderNode.classList.contains('active')) {
    opt.prevSliderNode.classList.remove('active');
    opt.currentSliderNode.classList.add('active');
  }
  //ставлю класс для анимации с transition в css
  opt.currentSliderNode.classList.add('transition-on');
  //задаю стили для активного слайдера
  opt.currentSliderNode.style.position = 'absolute';
  opt.currentSliderNode.style.zIndex = '3';
  opt.currentSliderNode.style.top = '0';

  setTimeout(() => {
    setPreventState(false);
    activeSlider = opt.currentSliderNode;
    //убераю класс,чтобы в обратную сторону анимация не работала для этого слайдера
    opt.currentSliderNode.classList.remove('transition-on');
    //обновляю стили для слайдеров
    opt.currentSliderNode.style.position = 'relative';
    opt.currentSliderNode.style.zIndex = '1';
    opt.prevSliderNode.style.zIndex  = '-1';
    opt.prevSliderNode.style.position = 'absolute';
    opt.prevSliderNode.style.top = opt.prevSliderPosY;
  }, 1000);

  let delayTime = opt.isHeaderChangeDelayed ? 700 : 0;
  //меняю шапку
  setTimeout(() => {
    nav.classList.remove(`main-navbar-${opt.headerPrevStyle}-theme`);
    nav.classList.add(`main-navbar-${opt.headerCurrentStyle}-theme`);
  }, delayTime);
}

function animateSection(destSection) {
  setPreventState(true);

  if(destSection === 'about') {
    startAnimation({
      prevSliderNode: introSection,
      currentSliderNode: aboutSection,
      prevSliderPosY: '-105vh',
      isHeaderChangeDelayed: false,
      headerPrevStyle: 'black',
      headerCurrentStyle: 'white',
    })
  }

  if(destSection === 'intro') {
    startAnimation({
      prevSliderNode: aboutSection,
      currentSliderNode: introSection,
      prevSliderPosY: '105vh',
      isHeaderChangeDelayed: true,
      headerPrevStyle: 'white',
      headerCurrentStyle: 'black',
    })
  }
}

export { activeSlider, animateSection };
