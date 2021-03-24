const searchbtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie');
const movieDetailsContent = document.querySelector('.movie-details-content');
const movieCloseBtn = document.getElementById('movie-close-btn');



// Now we will add eventlistenrs to our JS

searchbtn.addEventListener('click', getMovieList);
movieList.addEventListener('click', getMovieDetails);
movieCloseBtn.addEventListener('click', () => {
    movieDetailsContent.parentElement.classList.remove('showMovie');
});


// get movie list that matches with the written title
function getMovieList() {
    let searchInputTxt = document.getElementById('search-input').value;
    var request = new Request("https://imdb8.p.rapidapi.com/title/find?q=" + searchInputTxt, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "Enter your own key",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    });
    fetch(request)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            if (data.results) {
                data.results.forEach(movie => {
                    if (movie.title && movie.image)
                        html += `
                    <div class = "movie-item" data-id = "${movie.title}">
                        <div class = "movie-img">
                        <img src = "${movie.image.url}" alt = "movie">
                        </div>
                        <div class = "movie-name">
                            <h3>${movie.title}</h3>
                            <a href = "#" class = "details-btn">More Details</a>
                        </div>
                    </div>
                `;
                });
                movieList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any movie!";
                movieList.classList.add('notFound');
            }

            movieList.innerHTML = html;
        });
}


// get details of the movie
function getMovieDetails(e) {
    e.preventDefault();
    if (e.target.classList.contains('details-btn')) {
        let movieItem = e.target.parentElement.parentElement;

        fetch(`http://www.omdbapi.com/?t=${movieItem.dataset.id}&apikey=enter your own key=full`)
            .then(response => response.json())
            .then(data => movieDetailsModal(data));
    }
}

// create a modal
function movieDetailsModal(movie) {
    console.log(movie.Title);
    
    if (movie.Title  && movie.Poster) {
        let html = `
        <h2 class = "movie-title">${movie.Title}</h2>
        <p class = "movie-category">${movie.Genre}</p>
        <div class = "movie-plot">
            <h3>Plot:</h3>
            <p>${movie.Plot}</p>
        </div>
        <div class = "movie-poster-img">
            <img src = "${movie.Poster}" alt = "Movie Poster">
        </div>
    `;
        movieDetailsContent.innerHTML = html;
        movieDetailsContent.parentElement.classList.add('showMovie');
    }
}





