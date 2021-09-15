import './sass/main.scss';
import refs from './js/refs';
import updateCardList from './js/updateCardList';
import apiData from './js/apiService';

import '@pnotify/core/dist/BrightTheme.css';
import { Stack, error, alert } from '@pnotify/core';


refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    refs.listCards.innerHTML = '';
    refs.btnMore.classList.add('is-hidden');
    apiData.input = event.target.query.value.trim();
    
    if (apiData.input === ''){
        alert ({    
            type: 'error',
            text: 'Please, type a valid name',
            styling: 'brighttheme',
            sticker: false,
            });            
    } 
    apiData.resetPage();
    event.currentTarget.reset();
    
    

    apiData.fetchData().then(data => {
      updateCardList(data);
      if (data.length > 11) refs.btnMore.classList.remove('is-hidden');
      
  
      refs.listCards.addEventListener('click', event => {
        event.stopPropagation();
        if (event.target === event.currentTarget) return;

        
  
        const linkLargeImage = event.target.closest('li.photo-card').dataset
          .largeimgurl;
  
        refs.modal.style.display = 'block';
        refs.modalImg.src = linkLargeImage;
      });
    });      

  });
  
  refs.btnMore.addEventListener('click', event => {
    const viewportHeightScroll = document.querySelector('.gallery').offsetHeight;
    apiData
      .fetchData()
      .then(updateCardList)
      .then(() => {
        window.scrollTo(0, viewportHeightScroll);
      });
  });
  
  refs.modal.addEventListener('click', e => {
    refs.modal.style.display = 'none';
  });