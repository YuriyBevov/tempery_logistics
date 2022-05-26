//document.querySelector('body').classList.remove('nojs');

import './modules/accordionLineAnimation.js';
import './modules/pageOffset.js';
import './modules/header.js';
import './modules/carousel.js';
import './modules/searchField.js';
import './modules/sectionAnimation.js';

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const carouselInner = document.querySelector('.carousel-inner');
console.log(carouselInner);

document.addEventListener('DOMContentLoaded', function() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  carouselInner.classList.add('initialized');
});
