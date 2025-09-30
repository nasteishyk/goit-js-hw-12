import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { perPage, getImagesByQuery } from './js/pixabay-api';
import {
  gallery,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  btnLoadMore
} from './js/render-functions';

const form = document.querySelector('.form');

let page;
let searchElem = '';

hideLoadMoreButton()

form.addEventListener('submit', searchImg);
async function searchImg(event) {
  event.preventDefault();
  hideLoadMoreButton()

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

  try {
    showLoader();
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

    form.reset();

    if(page === (Math.ceil(res.totalHits / perPage))) {
      iziToast.show({
        message:
          "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return
    } else {
      showLoadMoreButton()
    }

    page++
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

btnLoadMore.addEventListener('click', loadMore)
async function loadMore() {
  hideLoadMoreButton();

  try {
    showLoader();
    const res = await getImagesByQuery(searchElem, page);

    createGallery(res.hits);
    smoothScroll();

    page++;

    const totalPages = Math.ceil(res.totalHits / perPage);

    if (page > totalPages || res.hits.length < perPage) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.show({
      message: 'Sorry, there are some problems...',
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height } = gallery
    .firstElementChild
    .getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}