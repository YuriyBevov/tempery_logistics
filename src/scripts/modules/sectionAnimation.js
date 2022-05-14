import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const sections = document.querySelectorAll('.gsap-animated-section');

if(sections) {
  sections.forEach(section => {
    const title = section.querySelector('.section-animated-title span');
    title.style.width = '0';

    const cards = section.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.transform = 'translateY(200px)';
    });

    gsap.to(title, {
      scrollTrigger: section, // start the animation when ".box" enters the viewport (once)
      width: '60px',
      delay: 0.5,
      duration: 1,
      ease: 'ease-in'
    });

    cards.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: section, // start the animation when ".box" enters the viewport (once)
        y: 0,
        delay: 0.5 + (0.15 * i),
        duration: 0.7,
        ease: 'ease-in'
      });
    });
  });
}


