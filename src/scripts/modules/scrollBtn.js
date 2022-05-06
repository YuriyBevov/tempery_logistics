import { getHeaderHeight } from "../utils/functions";

const btns = document.querySelectorAll('.scroll-btn');
const carouselSections = document.querySelectorAll('.carousel-section');
const lastCarouselSection = carouselSections[carouselSections.length - 1];


btns[btns.length - 1].addEventListener('click', (evt) => {
  evt.preventDefault();
  scrollTo({
    top: lastCarouselSection.nextElementSibling.offsetTop - getHeaderHeight(),
    behavior: 'smooth'
  })
})
