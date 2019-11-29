document.addEventListener("deviceready", onDeviceReady, false);
const urlBegin = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = "bbd92ee26b128295e6b83f95ab79c675";
const inputField = document.getElementById("inputField");
const submitButton = document.getElementById("submitButton");
const moviesSearchable = document.getElementById("movies-searchable");

function onDeviceReady() {
  submitButton.addEventListener("click", InputFieldSearch);
  inputField.addEventListener('keypress', function(e){
      if(e.code === "Enter"){
        console.log("true")
      }
  })
}
function createMoviesContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
    <section class="section">
    ${movieSectionInContainer(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;
  movieElement.innerHTML = movieTemplate;
  return movieElement;
}
function movieSectionInContainer(movies) {
  const moviesShow = movies.map(movie => {
    if (movie.poster_path) {
      return `<img 
    src=${"https://image.tmdb.org/t/p/w500" + movie.poster_path} 
    data-movie-id=${movie.id}/>`;
    }
  });
  return moviesShow;
  //   return moviesArray;
}

function Search(data) {
  moviesSearchable.innerHTML = "";
  const movies = data;
  const movieBlock = createMoviesContainer(movies);
  moviesSearchable.appendChild(movieBlock);
}

function InputFieldSearch(){
    const value = inputField.value;
    inputField.value = "";
    const url = urlBegin + API_KEY + "&query=" + value;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.response.results);
        Search(xhr.response.results);
      }
    };
    xhr.open("GET", url);
    xhr.send();
}
