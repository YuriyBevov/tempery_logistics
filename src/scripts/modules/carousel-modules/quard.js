const carousel = document.querySelector('.carousel');

let isCarouselExist = false;

carousel ? isCarouselExist = true : false;
console.log(isCarouselExist)

export { isCarouselExist }
