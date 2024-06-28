import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  const value = e.target.elements.searchQuery.value.trim();

  if (!value) {
    iziToast.show({
      message: 'Please enter a value',
      color: 'red',
    });
    refs.galleryEl.innerHTML = '';
    return;
  }

  currentQuery = value;
  currentPage = 1;
  refs.loadMoreBtn.classList.add('hidden');
  refs.galleryEl.innerHTML = '';

  showLoader();
  try {
    const data = await getImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.show({
        message: 'Sorry, no images found. Please try again!',
        color: 'red',
      });
      return;
    }
    const markup = renderImages(data.hits);
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    if (data.totalHits > currentPage * 15) {
      refs.loadMoreBtn.classList.remove('hidden');
    }

    smoothScrollToGallery();
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.show({
      message: 'Error fetching images. Please try again later.',
      color: 'red',
    });
  } finally {
    hideLoader();
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  showLoader();
  try {
    const data = await getImages(currentQuery, currentPage);
    const markup = renderImages(data.hits);
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    const galleryItemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    smoothScrollToGallery();

    if (currentPage * 15 >= data.totalHits) {
      refs.loadMoreBtn.classList.add('hidden');

      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        color: 'red',
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.show({
      message: 'Error fetching images. Please try again later.',
      color: 'red',
    });
  } finally {
    hideLoader();
  }
});

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function smoothScrollToGallery() {
  const galleryItemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}
