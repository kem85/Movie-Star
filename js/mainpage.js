import {getMultiplePages} from './api.js';
let current = 0;
let moviesData; // Declare a global variable
getMultiplePages(4)
    .then(movie => {
        moviesData = movie;
        updater();
    })
    .catch(error => {
        console.error(error);
    });

function updater(){
    if(moviesData[current].overview.length > 80){
        document.querySelector('.movie__info').style.transform = 'translate(60%, 75%)';
    } else {
        document.querySelector('.movie__info').style.transform = 'translate(60%, 220%)';
    }
    if (current !== undefined) {
        console.log(moviesData[current]); 
        document.getElementById('overview').textContent = moviesData[current].overview;
        document.getElementById('movie__title').textContent = moviesData[current].title;
        document.getElementById('movie__poster').style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${moviesData[current].poster_path}')`;
        document.getElementById('container__movie__rating__score').textContent = (Math.round(moviesData[current].vote_average * 10) / 10).toFixed(1);
        document.getElementById('container__background').src = `https://image.tmdb.org/t/p/w500${moviesData[current].backdrop_path}`;
    } else {
        setTimeout(updater, 100); // Retry after 100ms if current is not set
    }
}

function forward(){
    if(moviesData && moviesData.length > 0){
        current = (current + 1) % moviesData.length;
        updater();
    }
}

function backward(){
    if(moviesData && moviesData.length > 0){
        if (current === 0) {
            current = moviesData.length - 1;
        } else {
            current = (current - 1 + moviesData.length) % moviesData.length;
        }
        updater();
    }
}

// Add an event listener to the button
document.getElementById('right_button').addEventListener('click', () => {
    forward();
});
document.getElementById('left_button').addEventListener('click', () => {
    backward();
});