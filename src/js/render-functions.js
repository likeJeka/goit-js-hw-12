export function imagesTemplate(image) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `
    <li class="gallery-item">
      <a href="${largeImageURL}" class="gallery-link" data-lightbox="gallery">
        <img src="${webformatURL}" alt="${tags}" class="gallery-img">
      </a>
      <div class="gallery-info">
        <p class="tags">Tags: ${tags}</p>
        <ul class="stats">
          <li>Likes: ${likes}</li>
          <li>Views: ${views}</li>
          <li>Comments: ${comments}</li>
          <li>Downloads: ${downloads}</li>
        </ul>
      </div>
    </li>
  `;
}

export function renderImages(images) {
  return images.map(image => imagesTemplate(image)).join('');
}
