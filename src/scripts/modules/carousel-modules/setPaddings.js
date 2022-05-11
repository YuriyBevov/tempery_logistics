
//установка паддингов абсолютным блокам, чтобы не прыгал экран
const header = document.querySelector('.main-header');

function setPaddings(isActive, aboutSection, introSection) {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

  header.style.paddingRight = isActive ? paddingOffset : '0';
  aboutSection.style.paddingRight = isActive ? paddingOffset : '0';
  introSection.style.paddingRight = isActive ? paddingOffset : '0';
}

export {setPaddings}
