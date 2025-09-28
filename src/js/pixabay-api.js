import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52318112-aedb8ccc797c66be623deef69';

export async function getImagesByQuery(query, currentPage) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15
  };

  try {
    const res = await axios.get(BASE_URL, { params })
    return res.data
  } catch(error) {
    throw error
  }
}
