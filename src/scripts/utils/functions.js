// работа с классами эл-та
function addClass(el, cl) {
  el.classList.add(cl);
}

function removeClass(el, cl) {
  el.classList.remove(cl);
}

function checkClass(el, cl) {
  return el.classList.contains(cl);
}

function toggleClass(el, cl) {
  el.classList.toggle(cl);
}

// Ограничение длины текста по кол-ву символов
function limitStr( str, n ) {
  if ( str.length > n ) {
      return str.slice(0, n) + '...';
  } else {
      return str
  }
}

// запрет скролла у body
bodyLocker = (bool) => {
  let body = document.querySelector('body');
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

  if(bool) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = paddingOffset;
  } else {
      body.style.overflow = 'auto';
      body.style.paddingRight = '0px';
  }
}

// вычисление поз-и/размеров эл-та
function getBoundingClientRect(elem, side) {
  if(side === 'height') {
      return elem.getBoundingClientRect().height
  }

  if(side === 'width') {
      return elem.getBoundingClientRect().width
  }

  if(side === 'top') {
      return elem.getBoundingClientRect().top
  }

  if(side === 'bottom') {
    return elem.getBoundingClientRect().bottom
  }

  if(side === 'left') {
    return elem.getBoundingClientRect().left
  }

  if(side === 'right') {
    return elem.getBoundingClientRect().right
  }

  if(side === 'x') {
    return elem.getBoundingClientRect().x
  }

  if(side === 'y') {
    return elem.getBoundingClientRect().y
  }
}

export  { limitStr, addClass, removeClass, checkClass, toggleClass, bodyLocker, getBoundingClientRect }
