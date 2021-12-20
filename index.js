// titles : https://omdbapi.com/?s=thor&page=1&apikey=bd97784f
// details : https://omdbapi.com/?i=tt3896198&apikey=bd97784f

// Titles: https://omdbapi.com/?s=thor&page=1&apikey=bd97784f
// details: http://www.omdbapi.com/?i=tt3896198&apikey=bd97784f

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=bd97784f`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}


function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    
    }
    loadMovieDetails();
    bg()
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');

    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=bd97784f`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}


function displayMovieDetails(details){
    let bgImg = details.Poster;
    let preReq = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1))'
    let x = document.getElementsByTagName("BODY")[0];
    x.style.backgroundImage = preReq + ',' + `url(${bgImg})`;
    x.style.backgroundRepeat = "no-repeat";
    x.style.backgroundPosition = "center    ";
    x.style.backgroundAttachment = "fixed";
    x.style.backgroundSize = "cover";



    // x.style.backgroundS.repe

    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;


    // body.setAttribute("style", "background-image: url(${details.Poster}); background-size: cover; background-position: center; position:relative");
    // let backgroundImg =  document.getElementsByTagName("BODY")[0];
    // backgroundImg.style.background = "grren"
    // backgroundImg.setAttribute("style", "background: url('bgImg'))");
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
