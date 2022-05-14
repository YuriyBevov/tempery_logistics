import gsap from 'gsap';

const searchOpener = document.querySelector('.search-opener');
const searchField = document.querySelector('.search-form');
const navItems = document.querySelectorAll('.main-nav .nav-item');
const searchCloser = document.querySelector('.search-closer');

const onClickCloseSearchField = () => {
  gsap.to(searchField, {duration: 1.2, y: -300, ease: 'ease-in'});

  gsap.to(searchOpener, {duration: 0.7, scale: 1, delay: 0.2, ease: 'ease-in'});

  navItems.forEach((item,i) => {
    gsap.to(item, {
      duration: 0.7,
      scale: 1,
      delay: 0.2,
      ease: "ease-in"
    });
  })

  searchCloser.removeEventListener('click', onClickCloseSearchField);
  searchOpener.addEventListener('click', onClickOpenSearchField);
}

const onClickOpenSearchField = () => {

  gsap.to(searchOpener, {duration: 0.5, scale: 0, delay: 0.2, ease: 'ease-in'});

  navItems.forEach((item,i) => {
    gsap.to(item, {
      duration: 0.5,
      scale: 0,
      delay: 0.2 + (0.05 * i),
      ease: "ease-in"
    });
  })

  gsap.to(searchField, {duration: 0.5, y: 0, delay: 0.8, ease: 'ease-in'});

  searchOpener.removeEventListener('click', onClickOpenSearchField);
  searchCloser.addEventListener('click', onClickCloseSearchField);
}

searchOpener.addEventListener('click', onClickOpenSearchField);
