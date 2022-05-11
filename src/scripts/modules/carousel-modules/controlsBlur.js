// убераю фокус с кнопок управления, при смене слайдера
const controls = document.querySelectorAll('.control');
const indicators =  document.querySelectorAll('.indicator');

export function controlsBlur() {
  controls.forEach(cntr => {
    cntr.blur();
  });
  indicators.forEach(ind => {
    ind.blur();
  });
}
