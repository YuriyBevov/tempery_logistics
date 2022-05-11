const main = document.querySelector('main');
const header = document.querySelector('.main-header');
const aboutSection = document.querySelector('.about');

if(header) {
  const nav = header.querySelector('.navbar');
  let pagePosY = main.getBoundingClientRect().top;
  let isHeaderChanged = false;

  const setHeaderStyle = (style) => {
    setTimeout(() => {
      if(style === 'white') {
        nav.classList.remove('main-navbar-black-theme');
        nav.classList.add('main-navbar-white-theme');
      }

      if(style === 'transparent' && !aboutSection.classList.contains('active')) {
        nav.classList.remove('main-navbar-white-theme');
        nav.classList.add('main-navbar-black-theme');
      }
    }, 400);
  }

  if(pagePosY > -50) {
    nav.classList.remove('main-navbar-white-theme');
    nav.classList.add('main-navbar-black-theme');
    isHeaderChanged = false;
  } else if (pagePosY < -50) {
    nav.classList.remove('main-navbar-black-theme');
    nav.classList.add('main-navbar-white-theme');
    isHeaderChanged = true
  }

  const onScrollManipulateHeader = () => {
    pagePosY = main.getBoundingClientRect().top;

    if(pagePosY < -50 && !isHeaderChanged) {
      setHeaderStyle('white');
      isHeaderChanged = true;
    } else if (pagePosY > -50 && isHeaderChanged) {
      setHeaderStyle('transparent');
      isHeaderChanged = false
    }
  }

  window.addEventListener('scroll', onScrollManipulateHeader);
}
