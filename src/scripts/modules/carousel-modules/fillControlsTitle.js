export function fillControlsTitle(opt) {
  const hideBtn = (btn, bool) => {
    if(bool) {
      btn.style.opacity = 0;
      btn.style.zIndex = -1;
    } else {
      btn.style.opacity = 1;
      btn.style.zIndex = 3;
    }
  }

  let prevTitleNode = opt.prevControl.querySelector('span');
  let nextTitleNode = opt.nextControl.querySelector('span');

  if(opt.prevControlTitle !== '') {
    prevTitleNode.innerHTML = opt.prevControlTitle;
    hideBtn(opt.prevControl, false);
  } else {
    hideBtn(opt.prevControl, true);
  }

  if(opt.nextControlTitle !== '') {
    nextTitleNode.innerHTML = opt.nextControlTitle;
    hideBtn(opt.nextControl, false);
  } else {
    hideBtn(opt.nextControl, true);
  }
}
