import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from '/js/render-functions';

export const form = document.querySelector('.form');

form.addEventListener('submit', searchImg);
function searchImg(event) {
  event.preventDefault();

  const searchElem = form.elements['search-text'].value.trim();

  if(searchElem === "") {
    iziToast.show({
      message:
        'Fill in the search bar!',
      color: 'red',
      position: 'topRight',
    })
    return
  }

  clearGallery();

  showLoader()

  getImagesByQuery(searchElem)
    .then(res => {
      if (res.length === 0) {
        iziToast.show({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight',
        });
        return;
      }

      createGallery(res);
    })
    .catch(() => {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: 'red',
        position: 'topRight',
      })
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}


