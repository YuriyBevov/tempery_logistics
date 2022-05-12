const linedButtons = document.querySelectorAll('.accordion-item.lined > .accordion-header > .accordion-button');

const onClickAnimateBorder = (evt) => {
  if(evt.currentTarget !== linedButtons[linedButtons.length - 1]) {
    evt.currentTarget.classList.contains('prevent-animation') ?
    evt.currentTarget.classList.remove('prevent-animation') : null;

    linedButtons.forEach(btn => {
      !btn.classList.contains('prevent-animation') ?
      btn.removeEventListener('click', onClickAnimateBorder) : null;
    });
  } else {
    linedButtons.forEach(btn => {

      btn.classList.contains('prevent-animation') ?
      btn.classList.remove('prevent-animation') : null;

      btn.removeEventListener('click', onClickAnimateBorder);
    });
  }
}

if(linedButtons) {
  linedButtons.forEach(btn => {
    btn.classList.add('prevent-animation');
    btn.addEventListener('click', onClickAnimateBorder);
  });
}
