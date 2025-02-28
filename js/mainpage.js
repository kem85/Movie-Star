import {getMultiplePages} from './api.js';
let current = 0;
let moviesData;
let popular;
 // Declare a global variable
Promise.all([getMultiplePages(4), getMultiplePages(50, 2)])
    .then(([movies, popularMovies]) => {
        moviesData = movies;
        popular = popularMovies;
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
function createMovieCard(movie) {
    // Create a new div element for the card
    const card = document.createElement("div");
    card.classList.add("movie__list__card");
    card.dataset.id = movie.id;
    // Set inner HTML with dynamic movie data
    card.innerHTML = `
      <div class="movie__list__card__image">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </div>
      <div class="movie__list__card__info">
        <div class="movie__list__card__topside">
          <div class="movie__list__card__rating__container">
            <span class="movie__list__card__rating">
              <svg class="movie__list__card__star" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <g clip-path="url(#clip0)">
                  <path d="M6 10.05L8.91 11.891C9.443 12.2285 10.095 11.73 9.955 11.099L9.1835 7.63601L11.7565 5.30251C12.2265 4.87751 11.974 4.07001 11.357 4.01901L7.9705 3.71801L6.645 0.445008C6.59538 0.314027 6.50708 0.201249 6.39182 0.121663C6.27657 0.0420766 6.13982 -0.000549316 5.99975 -0.000549316C5.85969 -0.000549316 5.72294 0.0420766 5.60769 0.121663C5.49243 0.201249 5.40412 0.314027 5.3545 0.445008L4.0295 3.71001L0.642504 4.01101C0.026004 4.06301 -0.226496 4.87001 0.243004 5.29501L2.8165 7.62801L2.0455 11.091C1.9055 11.722 2.557 12.221 3.0905 11.8835L6 10.05Z" fill="#F5C518"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="12" height="12" fill="#F5C518"/>
                  </clipPath>
                </defs>
              </svg>
              ${movie.vote_average.toFixed(1)}
            </span>
            <span class="movie__list__card__release">${movie.release_date.slice(0,4)}</span>
          </div>
        </div>
        <h3 class="movie__list__card__title">${movie.title}</h3>
      </div>
                <div class="movie__list__card__buttons">
            <svg class="movie__list__card__watchlist" width="113" height="23" viewBox="0 0 113 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="113" height="23" rx="11.5" fill="#4B3E8C"/>
              <path d="M38.7965 16L37.0308 6.98066H38.5627L39.6701 13.1761L41.0236 6.98066H42.8017L44.0998 13.2807L45.238 6.98066H46.7392L44.9427 16H43.3554L41.8788 9.25703L40.4146 16H38.7965ZM48.1788 11.4596L46.893 11.1766C47.0488 10.5162 47.3052 10.0425 47.662 9.75537C48.0229 9.46416 48.5397 9.31855 49.2124 9.31855C49.8112 9.31855 50.2686 9.40264 50.5844 9.5708C50.9002 9.73896 51.1258 9.96865 51.2611 10.2599C51.3965 10.547 51.4642 11.072 51.4642 11.8349L51.4519 13.8528C51.4519 14.4188 51.4744 14.8413 51.5195 15.1202C51.5646 15.395 51.6487 15.6883 51.7718 16H50.369L50.1845 15.2863C49.9425 15.5734 49.682 15.7888 49.4031 15.9323C49.1283 16.0759 48.8351 16.1477 48.5233 16.1477C48.0024 16.1477 47.5759 15.9733 47.2437 15.6247C46.9114 15.272 46.7453 14.8044 46.7453 14.222C46.7453 13.8528 46.813 13.5309 46.9483 13.2561C47.0837 12.9812 47.2744 12.7618 47.5205 12.5978C47.7666 12.4337 48.1604 12.2881 48.7018 12.1609C49.358 12.0092 49.8153 11.8677 50.0737 11.7364C50.0737 11.3755 50.0471 11.1396 49.9938 11.0289C49.9445 10.9141 49.8502 10.8218 49.7107 10.7521C49.5754 10.6782 49.3826 10.6413 49.1324 10.6413C48.8781 10.6413 48.6771 10.6987 48.5295 10.8136C48.3859 10.9284 48.269 11.1437 48.1788 11.4596ZM50.0737 12.8623C49.8933 12.9361 49.6123 13.0223 49.2309 13.1207C48.792 13.2355 48.5049 13.3627 48.3695 13.5021C48.2342 13.6416 48.1665 13.8221 48.1665 14.0436C48.1665 14.2937 48.2403 14.505 48.388 14.6772C48.5397 14.8454 48.7284 14.9295 48.954 14.9295C49.155 14.9295 49.3539 14.8618 49.5508 14.7265C49.7477 14.587 49.883 14.4229 49.9568 14.2343C50.0348 14.0456 50.0737 13.7031 50.0737 13.2068V12.8623ZM55.3155 9.46621V10.8443H54.3496V13.4775C54.3496 14.0477 54.364 14.3778 54.3927 14.4681C54.4501 14.6321 54.567 14.7142 54.7434 14.7142C54.8746 14.7142 55.0633 14.6588 55.3094 14.548L55.4324 15.8893C55.1043 16.0615 54.7331 16.1477 54.3188 16.1477C53.9579 16.1477 53.6688 16.0615 53.4514 15.8893C53.234 15.717 53.0884 15.4688 53.0146 15.1448C52.9571 14.9069 52.9284 14.4229 52.9284 13.6929V10.8443H52.2763V9.46621H52.9284V8.16807L54.3496 7.15908V9.46621H55.3155ZM60.9818 11.398L59.5853 11.7057C59.4827 11.0207 59.1607 10.6782 58.6193 10.6782C58.2707 10.6782 57.9897 10.8259 57.7765 11.1212C57.5632 11.4165 57.4565 11.9148 57.4565 12.6162C57.4565 13.3914 57.5632 13.939 57.7765 14.2589C57.9897 14.5788 58.2748 14.7388 58.6316 14.7388C58.8982 14.7388 59.1177 14.6485 59.2899 14.4681C59.4622 14.2835 59.5853 13.9595 59.6591 13.496L61.0557 13.7852C60.7686 15.3602 59.9421 16.1477 58.5763 16.1477C57.7026 16.1477 57.0546 15.8154 56.6321 15.151C56.2097 14.4865 55.9984 13.6867 55.9984 12.7516C55.9984 11.6318 56.2363 10.7808 56.7121 10.1983C57.192 9.61182 57.8195 9.31855 58.5947 9.31855C59.2223 9.31855 59.7329 9.48467 60.1267 9.81689C60.5245 10.1491 60.8096 10.6762 60.9818 11.398ZM63.4735 6.98066V10.2968C63.6991 9.96865 63.9473 9.72461 64.218 9.56465C64.4928 9.40059 64.7901 9.31855 65.1101 9.31855C65.5366 9.31855 65.8935 9.43135 66.1806 9.65693C66.4677 9.88252 66.6728 10.2024 66.7958 10.6167C66.886 10.9202 66.9312 11.437 66.9312 12.1671V16H65.5161V12.5485C65.5161 11.7487 65.4648 11.2483 65.3623 11.0474C65.2188 10.7767 64.9747 10.6413 64.6302 10.6413C64.2651 10.6413 63.9801 10.789 63.775 11.0843C63.574 11.3755 63.4735 11.923 63.4735 12.727V16H62.0523V6.98066H63.4735ZM68.3708 16V6.98066H69.792V16H68.3708ZM71.2501 8.58027V6.98066H72.6713V8.58027H71.2501ZM71.2501 16V9.46621H72.6713V16H71.2501ZM73.6311 14.1358L75.0522 13.8713C75.1753 14.5562 75.5567 14.8987 76.1966 14.8987C76.537 14.8987 76.7913 14.8331 76.9595 14.7019C77.1276 14.5706 77.2117 14.4004 77.2117 14.1912C77.2117 14.0477 77.1748 13.9349 77.101 13.8528C77.0231 13.7708 76.8692 13.699 76.6396 13.6375C75.4747 13.3299 74.7344 13.0366 74.4186 12.7577C74.0248 12.4091 73.8279 11.9312 73.8279 11.3242C73.8279 10.7172 74.0207 10.2312 74.4063 9.86611C74.7918 9.50107 75.3517 9.31855 76.0858 9.31855C76.7872 9.31855 77.3204 9.45596 77.6855 9.73076C78.0505 10.0015 78.3068 10.4403 78.4545 11.0474L77.1194 11.3488C77.0005 10.8238 76.6642 10.5613 76.1105 10.5613C75.7618 10.5613 75.5137 10.6126 75.366 10.7151C75.2184 10.8136 75.1445 10.9428 75.1445 11.1027C75.1445 11.2463 75.2122 11.3652 75.3476 11.4596C75.4829 11.558 75.9033 11.7057 76.6088 11.9025C77.4004 12.124 77.9377 12.3927 78.2207 12.7085C78.4996 13.0243 78.6391 13.4447 78.6391 13.9697C78.6391 14.6014 78.4217 15.1223 77.9869 15.5324C77.5563 15.9426 76.9595 16.1477 76.1966 16.1477C75.5034 16.1477 74.9374 15.9774 74.4985 15.637C74.0597 15.2925 73.7705 14.7921 73.6311 14.1358ZM82.3243 9.46621V10.8443H81.3584V13.4775C81.3584 14.0477 81.3728 14.3778 81.4015 14.4681C81.4589 14.6321 81.5758 14.7142 81.7522 14.7142C81.8834 14.7142 82.0721 14.6588 82.3182 14.548L82.4412 15.8893C82.1131 16.0615 81.7419 16.1477 81.3276 16.1477C80.9667 16.1477 80.6775 16.0615 80.4602 15.8893C80.2428 15.717 80.0972 15.4688 80.0233 15.1448C79.9659 14.9069 79.9372 14.4229 79.9372 13.6929V10.8443H79.2851V9.46621H79.9372V8.16807L81.3584 7.15908V9.46621H82.3243Z" fill="#EED8CB"/>
              <path d="M16.55 10.95C16.2462 10.95 16 11.1962 16 11.5C16 11.8037 16.2462 12.05 16.55 12.05H26.45C26.7538 12.05 27 11.8037 27 11.5C27 11.1962 26.7538 10.95 26.45 10.95H16.55Z" fill="white"/>
              <path d="M20.9054 16.4797C20.9054 16.7671 21.1383 17 21.4257 17C21.713 17 21.9459 16.7671 21.9459 16.4797V12.0274H20.9054V16.4797Z" fill="white"/>
              <path d="M21.4257 6C21.1383 6 20.9054 6.23293 20.9054 6.52027V10.9726H21.9459V6.52027C21.9459 6.23293 21.713 6 21.4257 6Z" fill="white"/>
              <path d="M20.9054 10.9726H16.5274C16.2361 10.9726 16 11.2087 16 11.5V11.5C16 11.7913 16.2361 12.0274 16.5274 12.0274H20.9054M20.9054 10.9726V6.52027C20.9054 6.23293 21.1383 6 21.4257 6V6C21.713 6 21.9459 6.23293 21.9459 6.52027V10.9726M20.9054 10.9726H21.9459M21.9459 10.9726H26.4726C26.7639 10.9726 27 11.2087 27 11.5V11.5C27 11.7913 26.7639 12.0274 26.4726 12.0274H21.9459M20.9054 12.0274V16.4797C20.9054 16.7671 21.1383 17 21.4257 17V17C21.713 17 21.9459 16.7671 21.9459 16.4797V12.0274M20.9054 12.0274H21.9459" stroke="white"/>
              </svg>
              <svg class="movie__list__card__trailer" width="113" height="23" viewBox="0 0 113 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="113" height="23" rx="11.5" fill="white"/>
                <path d="M27.3333 7.39921V15.6009C27.3333 16.2263 28.0221 16.6063 28.5525 16.2659L34.9967 12.165C35.1095 12.0936 35.2024 11.9949 35.2668 11.8779C35.3312 11.761 35.365 11.6296 35.365 11.4961C35.365 11.3626 35.3312 11.2312 35.2668 11.1143C35.2024 10.9973 35.1095 10.8985 34.9967 10.8271L28.5525 6.73421C28.4331 6.65698 28.2951 6.61341 28.153 6.6081C28.0108 6.60278 27.8699 6.63592 27.7451 6.70402C27.6202 6.77211 27.5161 6.87264 27.4436 6.995C27.3712 7.11736 27.3331 7.25701 27.3333 7.39921Z" fill="black"/>
                <path d="M46.4179 16V8.50645H44.2215V6.98066H50.097V8.50645H47.9067V16H46.4179ZM51.8504 16H50.4292V9.46621H51.7458V10.3952C51.9714 9.96045 52.1724 9.67334 52.3487 9.53389C52.5292 9.39033 52.7363 9.31855 52.9701 9.31855C53.2941 9.31855 53.6038 9.42725 53.8991 9.64463L53.4562 11.152C53.2224 10.9633 53.0009 10.8689 52.7917 10.8689C52.5948 10.8689 52.4205 10.9428 52.2688 11.0904C52.1211 11.234 52.0145 11.4965 51.9488 11.8779C51.8832 12.2594 51.8504 12.9607 51.8504 13.982V16ZM55.5726 11.4596L54.2867 11.1766C54.4426 10.5162 54.6989 10.0425 55.0558 9.75537C55.4167 9.46416 55.9335 9.31855 56.6062 9.31855C57.205 9.31855 57.6623 9.40264 57.9781 9.5708C58.2939 9.73896 58.5195 9.96865 58.6549 10.2599C58.7902 10.547 58.8579 11.072 58.8579 11.8349L58.8456 13.8528C58.8456 14.4188 58.8682 14.8413 58.9133 15.1202C58.9584 15.395 59.0425 15.6883 59.1655 16H57.7628L57.5782 15.2863C57.3362 15.5734 57.0758 15.7888 56.7969 15.9323C56.5221 16.0759 56.2288 16.1477 55.9171 16.1477C55.3962 16.1477 54.9696 15.9733 54.6374 15.6247C54.3052 15.272 54.1391 14.8044 54.1391 14.222C54.1391 13.8528 54.2067 13.5309 54.3421 13.2561C54.4774 12.9812 54.6682 12.7618 54.9143 12.5978C55.1604 12.4337 55.5541 12.2881 56.0955 12.1609C56.7518 12.0092 57.2091 11.8677 57.4675 11.7364C57.4675 11.3755 57.4408 11.1396 57.3875 11.0289C57.3383 10.9141 57.2439 10.8218 57.1045 10.7521C56.9691 10.6782 56.7764 10.6413 56.5262 10.6413C56.2719 10.6413 56.0709 10.6987 55.9232 10.8136C55.7797 10.9284 55.6628 11.1437 55.5726 11.4596ZM57.4675 12.8623C57.287 12.9361 57.0061 13.0223 56.6246 13.1207C56.1857 13.2355 55.8986 13.3627 55.7633 13.5021C55.6279 13.6416 55.5603 13.8221 55.5603 14.0436C55.5603 14.2937 55.6341 14.505 55.7817 14.6772C55.9335 14.8454 56.1222 14.9295 56.3478 14.9295C56.5487 14.9295 56.7477 14.8618 56.9445 14.7265C57.1414 14.587 57.2768 14.4229 57.3506 14.2343C57.4285 14.0456 57.4675 13.7031 57.4675 13.2068V12.8623ZM60.2606 8.58027V6.98066H61.6818V8.58027H60.2606ZM60.2606 16V9.46621H61.6818V16H60.2606ZM63.1399 16V6.98066H64.5611V16H63.1399ZM69.1262 13.9205L70.5351 14.2097C70.3464 14.8659 70.0531 15.354 69.6553 15.6739C69.2574 15.9897 68.7734 16.1477 68.2033 16.1477C67.4117 16.1477 66.8006 15.8831 66.3699 15.354C65.8613 14.7388 65.607 13.8774 65.607 12.77C65.607 11.679 65.8634 10.8054 66.3761 10.1491C66.8108 9.59541 67.3728 9.31855 68.0618 9.31855C68.8288 9.31855 69.4297 9.60156 69.8645 10.1676C70.3648 10.8156 70.615 11.7713 70.615 13.0346L70.6089 13.2314H67.059C67.0672 13.7482 67.182 14.1481 67.4035 14.4312C67.6291 14.7142 67.8998 14.8557 68.2156 14.8557C68.6709 14.8557 68.9744 14.5439 69.1262 13.9205ZM69.2062 12.1732C69.1938 11.6646 69.0852 11.2832 68.8801 11.0289C68.675 10.7705 68.431 10.6413 68.1479 10.6413C67.8485 10.6413 67.5963 10.7746 67.3912 11.0412C67.182 11.3119 67.0795 11.6893 67.0836 12.1732H69.2062ZM73.1252 16H71.704V9.46621H73.0206V10.3952C73.2462 9.96045 73.4472 9.67334 73.6235 9.53389C73.804 9.39033 74.0111 9.31855 74.2449 9.31855C74.5689 9.31855 74.8786 9.42725 75.1739 9.64463L74.731 11.152C74.4972 10.9633 74.2757 10.8689 74.0665 10.8689C73.8696 10.8689 73.6953 10.9428 73.5436 11.0904C73.3959 11.234 73.2893 11.4965 73.2236 11.8779C73.158 12.2594 73.1252 12.9607 73.1252 13.982V16Z" fill="black"/>
                </svg>
                
          </div>
    `;
    const watchlistButton = card.querySelector('.movie__list__card__watchlist');
    watchlistButton.addEventListener('click', () => {
        console.log(`Movie ID: ${card.dataset.id}`);
    });
    const trailerButton = card.querySelector('.movie__list__card__trailer');
    trailerButton.addEventListener('click', () => {
        console.log(`Movie ID: ${card.dataset.id}`);
    });
    return card;
}

function AddMovie(getMovie, id) {
    let movie = getMovie();// Fetch movies dynamically

    // Ensure the container exists
    const container = document.getElementById(id);
    if (movie && movie.length > 0) {
        const filteredmovie = movie.filter((movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id) && !movie.adult);
          filteredmovie.forEach((movie) => {
            const card = createMovieCard(movie);
            container.appendChild(card);
        });
    } else {
        console.warn("Movie list is empty or undefined, retrying...");
        setTimeout(() => AddMovie(getMovie, id), 100); // Retry after 100ms
    }
}

AddMovie(() => popular, "movie__list__container");
