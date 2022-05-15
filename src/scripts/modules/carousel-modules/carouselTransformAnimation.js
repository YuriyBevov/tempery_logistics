import gsap from 'gsap';

function carouselTransform(carousel) {
  let title = carousel.querySelector('.carousel-item.active .gsap-title');
  if(title) {
    gsap.to(title, {duration: 1.2, opacity: 1, ease: "ease-in"});
    gsap.to(title, {duration: .8, y: 0, ease: "ease-in"});
  }

  let par = carousel.querySelector('.carousel-item.active .gsap-text');
  if(par) {
    gsap.to(par, {duration: 1.2, delay: 0.2, opacity: 1, ease: "ease-in"});
    gsap.to(par, {duration: .8, delay: 0.2, x: 0, ease: "ease-in"});
    par.classList.add('showBefore');
  }

  let btn = carousel.querySelector('.carousel-item.active .gsap-btn');

  if(btn) {
    gsap.to(btn, {duration: 1, delay: 0.2, opacity: 1, ease: "ease-in"});
  }

  let sideCards = carousel.querySelectorAll('.carousel-item.active .slide-side-card');
  if(sideCards) {
    sideCards.forEach((card,i) => {
      gsap.to(card,{
        duration: 0.8,
        y: 0,
        opacity: 1,
        delay: 1 + (0.3 * i),
        ease: 'ease-in'
      })
    })
  }

  let imgs = carousel.querySelectorAll('.carousel-item.active .partner-logo');
  if(imgs) {
    imgs.forEach((img,i) => {
      gsap.to(img, {
        duration: 1,
        delay: 0.2 + (0.15 * i),
        opacity: 1,
        y: 0,
        ease: "ease-in"
      });
    })
  }

  let collages = carousel.querySelectorAll('.carousel-item.active .collage-part');
  if(collages) {
    collages.forEach((part,i) => {
      gsap.to(part, {
        duration: 1.5,
        delay: 0.5 + (.25 * i),
        opacity: 1,
        y: 0,
        x: 0,
        ease: "ease-in"
      });
    })
  }

  let cards = carousel.querySelectorAll('.carousel-item.active .card');

  if(cards) {
    cards.forEach((c,i) => {
      gsap.to(c, {
        duration: 1,
        delay: 0.5 + (.15 * i),
        opacity: 1,
        y: 0,
        ease: "ease-in"
      });
    })
  }

  let book = carousel.querySelector('.carousel-item.active .about-slide-bg-box .book-img');

  if(book) {
    gsap.to(book, {duration: 0.6, delay: 0.2, y: 0, opacity: 1, ease: "ease-in"});

    setTimeout(() => {
      var scene = document.getElementById('book-scene');
      new Parallax(scene);
    }, 1000);
  }

  let pen = carousel.querySelector('.carousel-item.active .about-slide-bg-box .pen-img');

  if(pen) {
    gsap.to(pen, {duration: 1, delay: 0.7, opacity: 1, ease: "ease-in"});
  }

  let note = carousel.querySelector('.carousel-item.active .about-slide-bg-box .note-img');

  if(note) {
    gsap.to(note, {duration: 0.6, delay: 0.2, y: 0, opacity: 1, ease: "ease-in"});

    setTimeout(() => {
      var scene = document.getElementById('note-scene');
      new Parallax(scene);
    }, 1500);
  }

  let pencil = carousel.querySelector('.carousel-item.active .about-slide-bg-box .pencil-img');

  if(pencil) {
    gsap.to(pencil, {duration: 0.7, delay: 0.7, y: 0, opacity: 1, ease: "ease-in"});
  }
}

export { carouselTransform }
