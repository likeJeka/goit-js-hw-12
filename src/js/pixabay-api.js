import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';
const API_KEY = '44411591-028a91b939914bc74d09bbb4e';

export async function getImages(query, page = 1, perPage = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  const url = `${BASE_URL}${END_POINT}?${params.toString()}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
