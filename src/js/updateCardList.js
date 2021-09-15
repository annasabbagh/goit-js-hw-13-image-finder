import refs from './refs';
import card from '../templates/image-card.hbs';

function updateCardList(data) {
  const markup = card(data);
  refs.listCards.insertAdjacentHTML('beforeend', markup);
}

export default updateCardList;
