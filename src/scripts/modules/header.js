const main = document.querySelector('main');
const header = document.querySelector('header');
let pagePosY = main.getBoundingClientRect().top;
const introSlider = document.querySelector('#introCarousel');
console.log(introSlider);

/*console.log(pagePosY);

const onScrollManipulateHeader = () => {
  pagePosY = main.getBoundingClientRect().top;

  console.log(pagePosY);
}

window.addEventListener('scroll', onScrollManipulateHeader);*/

let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {

        if(entry.isIntersecting) {
            if(pagePosY < -50 ) {
                console.log('Убрать шапку')
            } else {
              console.log('Не убирать шапку, пока < 50пх')
            }
        }

    });
});

const onScrollManipulateHeader = () => {
  pagePosY = main.getBoundingClientRect().top;
  console.log(pagePosY);
}

window.addEventListener('scroll', onScrollManipulateHeader);

observer.observe(introSlider);

