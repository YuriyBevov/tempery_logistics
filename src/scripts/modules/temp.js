//- observer
/* carouselOffSection.style.marginTop = '1px'; // без маргина блок попадает в зону видимости

let isObserve = false;

if(carouselOffSection) {

  let observer = new IntersectionObserver(entries => {
    entries.forEach( entry => {
      if(entry.isIntersecting) {
        isObserve = true;
        enableScroll();
      } else {
        isObserve = false;
        disableScroll();
      }
    });
  });

  observer.observe(carouselOffSection);
} */


//-

//--
  //--- scroll disabling

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  /*var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) {// older FF
      window.addEventListener('DOMMouseScroll', preventDefault, {passive: false});
    }

    document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, {passive: false});
      }
      document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }*/

  //--- scroll disabling

/*function onScrollSlideCarousel(carouselNode, carouselInstance) {
  const onMouseWheelChangeSlide = (evt) => {
    let windowHeight = document.documentElement.clientHeight;
    let sliderHeight = carouselNode.getBoundingClientRect().height;
    let isEqualHeight = windowHeight === sliderHeight ? true : false;

    if(carouselNode.contains(evt.target) && isEqualHeight && !isPageScrolled ) {
      evt.preventDefault();

      if(evt.deltaY > 0) {
        carouselInstance.next();
      } else {
        carouselInstance.prev();
      }
    }

    if(window.scrollY === 0) {
      isPageScrolled = false;
    }
  }

  window.addEventListener('mousewheel', onMouseWheelChangeSlide, { passive: false });
} */
