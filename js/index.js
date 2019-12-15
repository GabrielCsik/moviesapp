document.addEventListener("deviceready", onDeviceReady, false);
// const urlBegin = "https://api.themoviedb.org/3/search/movie?api_key=";
// const API_KEY = "bbd92ee26b128295e6b83f95ab79c675";
const inputField = document.getElementById("inputField");
const submitButton = document.getElementById("submitButton");
const deleteButton = document.getElementById("deleteButton");
const moviesSearchable = document.getElementById("movies-searchable");
const moviesContainer = document.getElementById("movies-container");
const tvshowButton = document.getElementById("tvshowButton");
const movieButton = document.getElementById("movieButton");
const language = document.getElementById("language");
const historyButton = document.getElementById("historyButton");
const title = document.getElementById("title");
var movieOrserial = "movie";
var overview = "Overview";
var rating = "Rating";
var release_date = "Release date";
var runtime = "Runtime";
var NoS = "Number of Seasons";
var NoE = "Number of Episodes";
var lastEp = "Last Episode to Air";
var firstEp = "First Air Date";
var history;
// const history;


function onDeviceReady() {
  tvshowButton.addEventListener("click", showTvShows);
  movieButton.addEventListener("click", showMovies);
  language.addEventListener("click", changeLanguage);
  submitButton.addEventListener("click", InputFieldSearch);
  historyButton.addEventListener('click', showHistory);
  // inputField.addEventListener("keypress", function(e) {
    // localStorage.setItem("yes", "nice");
    // let val = localStorage.getItem("yes");
    // console.log(val);
  //   if (e.code === "Enter") {
  //     console.log("true");
  //   }
  // });

  getPopularMovies();
  getTopRatedMovies();
  getUpcomingMovies();
  // getPopularTV();
  // getTopRatedTV();
  // getUpcomingTV();

  document.onclick = function(e) {
    const target = e.target;
    if (target.tagName.toLowerCase() === "img") {
      console.log("Hey");

      let movieID = target.dataset.movieId;
      console.log(movieID);
      let parent = target.parentElement;
      const sibling = parent.nextElementSibling;
      sibling.classList.add("content-display");

      //get movie videos
      let path = `/${movieOrserial}/${movieID}videos`;
      let xpath2 = `/${movieOrserial}/${movieID}`;
      var path2 = xpath2.substring(0, xpath2.length - 1);
      let url = generateURL(path);
      let url2 = generateURL(path2);
      dropDownInfoForVideo(url, sibling);
      dropDownInfo(url2, sibling);
    }
    if (target.id === "content-close") {
      let parent = target.parentElement;
      parent.classList.remove("content-display");
    }
  };
}
function createMoviesContainer(movies, title = "") {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `  
  <h2>${title}</h2>
  <section class="section">
    ${movieSectionInContainer(movies)}
    </section>
    <div class="content ">
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
  const movieBlock = createMoviesContainer(movies, this.title);
  moviesSearchable.appendChild(movieBlock);
}
function SearchHistory(data) {
  const movies = data;
  const movieBlock = createMoviesContainer(movies, this.title);
  moviesSearchable.appendChild(movieBlock);
}
function Other(data) {
  moviesSearchable.innerHTML = "";
  const movies = data;
  const movieBlock = createMoviesContainer(movies, this.title);
  moviesContainer.appendChild(movieBlock);
}

function InputFieldSearch() {
  const value = inputField.value;
  inputField.value = "";
   
  localStorage.setItem(value, movieOrserial);
  // console.log(localStorage.getItem(value));
  // console.log(history);
  
  
  // let path = "/search/movie";
  // const url = generateURL(path) + "&query=" + value;
  if (movieOrserial === "movie") {
    searchMovie(value);
  } else {
    searchTvShow(value);
  }
  // searchTvShow(value);
}
// function InputFieldSearch2() {
//   const value = inputField.value;
//   inputField.value = "";
//   let path = "/search/movie";
//   const url = generateURL(path) + "&query=" + value;
//   searchMovie(value);
// }

function createIframe(video) {
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  // iframe.width = "360";
  // iframe.height = "225";
  iframe.allowFullscreen = true;
  return iframe;
}

function createVideoTemplate(data, sibling) {
  console.log(data);
  // Search(xhr.response.results);
  sibling.innerHTML = `<p id="content-close">X</p>`;
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement("div");

  for (let i = 0; i < length; i++) {
    let iframe = createIframe(videos[i]);
    iframeContainer.appendChild(iframe);
    sibling.appendChild(iframeContainer);
  }
}
function createInfoTemplate(data, sibling) {
  if (movieOrserial === "movie") {
    console.log(data);
    sibling.innerHTML = `<p id="content-close">X</p>`;
    // const info = document.createElement("div");
    var infoName = `<h2>${data.original_title}</h2>
  <p>${overview}: ${data.overview}</p>
  <p>${rating}: ${data.vote_average}/10</p>
  <p>${release_date}: ${data.release_date}</p>
  <p>${runtime}: ${data.runtime} min</p>`;
    sibling.innerHTML += infoName;
  } else {
    sibling.innerHTML = `<p id="content-close">X</p>`;
    console.log(data);
    var infoName = `<h2>${data.original_name}</h2>
    <p>${overview}: ${data.overview}</p>
    <p>${rating}: ${data.vote_average}</p>
    <p>${firstEp}: ${data.first_air_date}</p>
    <p>${lastEp}: ${data.last_episode_to_air.air_date}</p>
    <p>${NoS}: ${data.number_of_seasons}</p>
    <p>${NoE}: ${data.number_of_episodes}</p>`;
    sibling.innerHTML += infoName;
  }
}

function showTvShows() {
  moviesSearchable.innerHTML = "";
  moviesContainer.innerHTML = "";
  inputField.style.display = "block";
  submitButton.style.display = "block";
  deleteButton.style.display = "none";
  
  getPopularTV();
  getTopRatedTV();
  getUpcomingTV();
  movieOrserial = "tv";
}
function showMovies() {
  moviesSearchable.innerHTML = "";
  moviesContainer.innerHTML = "";
  inputField.style.display = "block";
  submitButton.style.display = "block";
  deleteButton.style.display = "none";
  getPopularMovies();
  getTopRatedMovies();
  getUpcomingMovies();
  movieOrserial = "movie";
}

function changeLanguage() {
  if (language.innerText === "SK") {
    title.innerHTML = "Moja Applikacia na Hladanie Filmov a TV Serialov";
    language.innerText = "EN";
    overview = "Prehľad";
    rating = "Hodnotenie";
    release_date = "Dátum vydania";
    runtime = "Dlžka";
    NoS = "Počet sezón";
    NoE = "Počet častí";
    lastEp = "Posledná epizóda na vyslanie";
    firstEp = "Prvý dátum vysielania";
  } else {
    title.innerHTML = "My App to Find Movies and TV Shows";
    language.innerText = "SK";
    overview = "Overview";
    rating = "Rating";
    release_date = "Release date";
    runtime = "Runtime";
    NoS = "Number of Seasons";
    NoE = "Number of Episodes";
    lastEp = "Last Episode to Air";
    firstEp = "First Air Date";
  }
  if (movieOrserial === "movie") {
    showMovies();
  } else {
    showTvShows();
  }
}
function allStorage() {

  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
      if(localStorage.getItem(keys[i]) === "movie"){
      searchMovieHistory(localStorage.key(i));
      }else{
        searchTvShowHistory(localStorage.key(i));
      }
      console.log(localStorage.key(i));
  }
  
}
function showHistory(){
  moviesSearchable.innerHTML = "";
  moviesContainer.innerHTML = "";
  inputField.style.display = "none";
  submitButton.style.display = "none";
  deleteButton.style.display = "block";
  allStorage();
  deleteButton.addEventListener('click', function(){
    localStorage.clear();
    moviesSearchable.innerHTML = "";
    moviesContainer.innerHTML = "";
  });
  // for(let i = 0; i < history.length; i++){
  //   console.log(history[i]);
  //   searchMovieHistory(history[i]);
  // }
}