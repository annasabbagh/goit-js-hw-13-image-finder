const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23195542-0eb2f95c5b68cdf9e894741f1';



export default {
    page: 1,
    inputValue: '',
  
    fetchData() {
      return fetch(
        `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.page}&per_page=12&key=${API_KEY}`,
      )
        .then(res => res.json())
        .then(({ hits }) => {
          this.page += 1;
          return hits;
        });
    },
  
    resetPage() {
      this.page = 1;
    },
    get pageNumber() {
      return this.page;
    },
    set input(value) {
      this.inputValue = value;
    },
  };