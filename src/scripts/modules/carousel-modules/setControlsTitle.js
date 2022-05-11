import { fillControlsTitle } from "./fillControlsTitle";

// смена названий на кнопках слайдера
export function setControlsTitle(opt) {
  if(opt.evt.to < opt.items.length - 1 && opt.evt.from !== opt.items.length - 1 && opt.evt.direction === 'left') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: opt.items[opt.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: opt.items[opt.evt.to - 1].getAttribute("data-title"),
    })
  }

  if(opt.evt.to === opt.items.length - 1 && opt.evt.direction === 'left') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: !opt.isNextNodeUntitled ? 'Scroll down' : '',
      prevControlTitle: opt.items[opt.evt.to - 1].getAttribute("data-title"),
    })
  }

  // влево
  if(opt.evt.from !== 0 && opt.evt.to > 0 && opt.evt.direction === 'right') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: opt.items[opt.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: opt.items[opt.evt.to - 1].getAttribute("data-title"),
    })
  }

  if(opt.evt.to === 0 && opt.evt.direction === 'right') {
    fillControlsTitle({
      nextControl: opt.nextControl,
      prevControl: opt.prevControl,
      nextControlTitle: opt.items[opt.evt.to + 1].getAttribute("data-title"),
      prevControlTitle: opt.isPrevNodeEnabled ? 'Scroll up' : '',
    })
  }
}
