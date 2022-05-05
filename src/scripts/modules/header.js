const main = document.querySelector('main');
const header = document.querySelector('.main-header');

if(header) {
  const nav = header.querySelector('.navbar');
  let pagePosY = main.getBoundingClientRect().top;
  let isHeaderChanged = false;

  const animateHeader = () => {
    setTimeout(() => {
      header.classList.add('showing');
      header.classList.remove('hidding');
      setTimeout(() => {
        header.classList.remove('showing');
      }, 500);
    }, 300);
  }

  const setHeaderStyle = (style) => {
    header.classList.add('hidding');
    setTimeout(() => {
      if(style === 'white') {
        nav.classList.remove('main-navbar-black-theme');
        nav.classList.add('main-navbar-white-theme');
      }

      if(style === 'transparent') {
        nav.classList.remove('main-navbar-white-theme');
        nav.classList.add('main-navbar-black-theme');
      }

      animateHeader();
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
