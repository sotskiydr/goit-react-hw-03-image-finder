function fetchApi(q, page) {
  const KEY = 'key=23877606-1096bee22002de3079c9510e6';
  const BASE_URL = `https://pixabay.com/api/?q=${q}&page=${page}&${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const fetchData = fetch(BASE_URL).then(r => r.json());
  return fetchData;
}

export default fetchApi;
