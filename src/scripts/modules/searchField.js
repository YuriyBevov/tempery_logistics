import gsap from 'gsap';

const searchOpener = document.querySelector('.search-opener');
const searchField = document.querySelector('.search-form');
const formBorder = searchField.querySelector('.form-border');
console.log(formBorder);
const navItems = document.querySelectorAll('.main-nav .nav-item');
const searchCloser = document.querySelector('.search-closer');

const onClickCloseSearchField = () => {
  gsap.to(searchField, {duration: 1.2, y: -300, ease: 'ease-in'});
  setTimeout(() => {
    gsap.to(searchField, {duration: 0, y: 0, x: 220, opacity: 0, ease: 'ease-in'});
    searchField.style.zIndex = '-1';
    gsap.to(formBorder, {duration: 0, delay: 0, x: '100%', ease: 'ease-in'});
  }, 1250);




  gsap.to(searchCloser, {duration: 0.5, scale: 0, ease: 'ease-in'});

  setTimeout(() => {
    searchCloser.classList.add('hidden');
    gsap.to(searchOpener, {duration: 0.7, scale: 1, delay: 0.2, ease: 'ease-in'});
  }, 500);

  navItems.forEach((item, i) => {
    gsap.to(item, {
      duration: 0.4,
      scale: 1,
      delay: 0.5,
      ease: "linear"
    });
  })

  searchCloser.removeEventListener('click', onClickCloseSearchField);
  searchOpener.addEventListener('click', onClickOpenSearchField);
}

const onClickOpenSearchField = () => {

  gsap.to(searchOpener, {duration: 0.5, scale: 0, delay: 0.2, ease: 'ease-in'});

  setTimeout(() => {
    searchOpener.classList.add('hidden');
    searchCloser.classList.remove('hidden');
    gsap.to(searchCloser, {duration: 0.5, scale: 1, delay: 0.2, ease: 'ease-in'});
  }, 800);

  navItems.forEach((item,i) => {
    gsap.to(item, {
      duration: 0.4,
      scale: 0,
      delay: 0.2 + (0.05 * i),
      ease: "ease-in"
    });
  })
  searchField.style.zIndex = '1';
  gsap.to(searchField, {duration: 0.5, x: 0, opacity: 1, delay: 0.8, ease: 'ease-in'});
  gsap.to(formBorder, {duration: 0.5, delay: 1, x: 0, ease: 'ease-in'});

  searchOpener.removeEventListener('click', onClickOpenSearchField);
  searchCloser.addEventListener('click', onClickCloseSearchField);
}

searchOpener.addEventListener('click', onClickOpenSearchField);
