const header = document.querySelector('.inner-header');
const main = document.querySelector('main.page-offset');

if(header) {
  let headerInitialHeight = header.getBoundingClientRect().height;

  console.log(headerInitialHeight);

  main.style.marginTop = `${headerInitialHeight}px`;

  const onResizeSetPageOffset = () => {
    let currentHeaderHeight = header.getBoundingClientRect().height
    if(currentHeaderHeight !== headerInitialHeight) {
      main.style.marginTop = `${currentHeaderHeight}px`;
      headerInitialHeight = currentHeaderHeight;
    }
  }

  window.addEventListener('resize', onResizeSetPageOffset);
}
