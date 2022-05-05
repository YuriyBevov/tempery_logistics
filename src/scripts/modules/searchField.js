const searchForm = document.querySelector('.search-field form');

if(searchForm) {
  let searchBtn = document.querySelector('.search-field button[type="submit"');
  let searchField = document.querySelector('.search-field input[type="search"');


  const onClickShowSearchField = (evt) => {
    evt.preventDefault();
    if(!searchField.classList.contains('js-active')) {
      searchField.classList.add('js-active');
    } else {
      searchField.classList.remove('js-active');
      searchField.value = '';
      console.log(searchForm, 'submit')
    }
  }

  searchBtn.addEventListener('click', onClickShowSearchField);
}
