document.addEventListener("deviceready", onDeviceReady, false);
// const urlBegin = "https://api.themoviedb.org/3/search/movie?api_key=";
// const API_KEY = "bbd92ee26b128295e6b83f95ab79c675";
const inputField = document.getElementById("inputField");
const submitButton = document.getElementById("submitButton");
const moviesSearchable = document.getElementById("movies-searchable");
const moviesContainer = document.getElementById("movies-container");

function onDeviceReady() {
  
  submitButton.addEventListener("click", InputFieldSearch);
  inputField.addEventListener("keypress", function(e) {
    if (e.code === "Enter") {
      console.log("true");
    }
  });
  getUpcomingMovies();
  getPopularMovies();
  getTopRatedMovies();
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
      let path = `/movie/${movieID}videos`;
      let url = generateURL(path);

      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          createVideoTemplate(xhr.response, sibling);
        }
      };
      xhr.open("GET", url);
      xhr.send();
    }
    if (target.id === "content-close") {
      let parent = target.parentElement;
      parent.classList.remove("content-display");
    }
  };
}
function createMoviesContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
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
  const movieBlock = createMoviesContainer(movies);
  moviesSearchable.appendChild(movieBlock);
}
function Other(data) {
  moviesSearchable.innerHTML = "";
  const movies = data;
  const movieBlock = createMoviesContainer(movies);
  moviesContainer.appendChild(movieBlock);
}

function InputFieldSearch() {
  const value = inputField.value;
  inputField.value = "";
  let path = "/search/movie";
  const url = generateURL(path) + "&query=" + value;
  searchMovie(value);
  // fetch(url)
  //   .then((res) => res.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.log("error", error);
  //   });
  // const xhr = new XMLHttpRequest();
  // xhr.responseType = "json";
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === XMLHttpRequest.DONE) {
  //     console.log(xhr.response.results);
  //     Search(xhr.response.results);
  //   }
  // };
  // xhr.open("GET", url);
  // xhr.send();
}


function createIframe(video) {
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = "360";
  iframe.height = "315";
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


