/*let search = document.querySelector('.search');
let headerSearch = document.querySelector('.header__search');
let headerBottom = document.querySelector('.header__bottom');
let width = window.innerWidth;

if(search) {
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
                if(!entry.isIntersecting) {
                    if(width > 959) {
                        headerSearch.classList.remove('js-hidden');
                    } else {
                        headerBottom.classList.remove('js-hidden');
                    }
                } else {
                    if(width > 959) {
                        !headerSearch.classList.contains('js-hidden') ?
                        headerSearch.classList.add('js-hidden') : null;
                    } else {
                        !headerBottom.classList.contains('js-hidden') ?
                        headerBottom.classList.add('js-hidden') : null;
                    }

                }

        });
    });

    const onResizeSetWidth = () => {
        width = window.innerWidth;
    }

    window.addEventListener('resize', onResizeSetWidth);

    observer.observe(search);
} else {
    headerSearch.classList.remove('js-hidden');
} */
