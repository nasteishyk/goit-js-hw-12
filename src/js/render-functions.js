import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector(".gallery")
const loader = document.querySelector(".loader")

const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250
})

export function createGallery(images) {
  gallery.innerHTML = images.map(({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
          <li class="gallery-item">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
            </div>
          </li>
        `
    )
    .join("")

    lightbox.refresh()
}

export function clearGallery() {
    gallery.innerHTML = ""
}

export function showLoader() {
    loader.classList.remove("hidden")
}

export function hideLoader() {
    loader.classList.add("hidden")
}