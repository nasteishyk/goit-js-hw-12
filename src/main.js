import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll
} from '/js/render-functions';
import { btnLoadMore } from './js/render-functions'

const form = document.querySelector('.form');

let page;
let searchElem = '';

form.addEventListener('submit', searchImg);
async function searchImg(event) {
  event.preventDefault();

  page = 1

  searchElem = form.elements['search-text'].value.trim();

  if (searchElem === '') {
    iziToast.show({
      message: 'Fill in the search bar!',
      color: 'red',
      position: 'topRight',
    });
    return;
  }

  clearGallery();

  showLoader();

  try {
    const res = await getImagesByQuery(searchElem, page);
    if (res.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: 'red',
        position: 'topRight',
      });
      return;
    }

    createGallery(res.hits);

    page++

    if(page === (Math.ceil(res.totalHits / 15))) {
      iziToast.show({
        message:
          "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'topRight',
      });
      return
    } else {
      showLoadMoreButton()
    }
  } catch (error) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

btnLoadMore.addEventListener('click', loadMore)
async function loadMore() {
  hideLoadMoreButton()
  showLoader()
  try {
    const res = await getImagesByQuery(searchElem, page);
    createGallery(res.hits);
    smoothScroll()

    page++

    if(page === (Math.ceil(res.totalHits / 15))) {
      iziToast.show({
        message:
          "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'topRight',
      });
      return
    } else {
      showLoadMoreButton()
    }
  } catch (error) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

