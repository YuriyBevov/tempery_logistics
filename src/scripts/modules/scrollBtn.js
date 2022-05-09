import { getHeaderHeight } from "../utils/functions";
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";

const btns = document.querySelectorAll('.scroll-btn');
const carouselSections = document.querySelectorAll('.carousel-section');
const lastCarouselSection = carouselSections[carouselSections.length - 1];

btns.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const targetId = evt.currentTarget.getAttribute('data-scroll-to');

    if( targetId !== '#carousel-off-section') {
      const target = document.querySelector(targetId);

      scrollIntoView(target, { behavior: "smooth", block: "start"});
    } else {
      const scrollCoord = lastCarouselSection.nextElementSibling.offsetTop - window.scrollY - getHeaderHeight();

      scrollBy(window, { behavior: "smooth", top: scrollCoord });
    }
  })
})
