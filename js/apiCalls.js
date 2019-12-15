function generateURL(path) {
  let newURL = `https://api.themoviedb.org/3${path}?api_key=bbd92ee26b128295e6b83f95ab79c675`;
  return newURL;
}
function requestMovies(url, onComplete) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response.results);
      onComplete(xhr.response.results);
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

function searchMovie(value) {
  let path = "/search/movie";
  const url = generateURL(path) + "&query=" + value;
  const render = Search.bind({ title: "Search Results" });
  requestMovies(url, render);
}
function searchMovieHistory(value) {
  let path = "/search/movie";
  const url = generateURL(path) + "&query=" + value;
  const render = SearchHistory.bind({ title: "Search: " + value });
  requestMovies(url, render);
}
function searchTvShow(value) {
  let path = "/search/tv";
  const url = generateURL(path) + "&query=" + value;
  const render = Search.bind({ title: "Search Results" });
  requestMovies(url, render);
}
function searchTvShowHistory(value) {
  let path = "/search/tv";
  const url = generateURL(path) + "&query=" + value;
  const render = SearchHistory.bind({ title: "Search: " + value });
  requestMovies(url, render);
}
function getUpcomingMovies() {
  let path = "/movie/upcoming";
  const url = generateURL(path);
  const render = Other.bind({ title: "Upcoming Movies" });
  requestMovies(url, render);
}

function getTopRatedMovies() {
  let path = "/movie/top_rated";
  const url = generateURL(path);
  const render = Other.bind({ title: "Top Rated Movies" });
  requestMovies(url, render);
}

function getPopularMovies() {
  let path = "/movie/popular";
  const url = generateURL(path);
  const render = Other.bind({ title: "Most Popular Movies" });
  requestMovies(url, render);
}
function getUpcomingTV() {
  let path = "/tv/latest";
  const url = generateURL(path);
  const render = Other.bind({ title: "Latest TV" });
  requestMovies(url, render);
}
function getTopRatedTV() {
  let path = "/tv/top_rated";
  const url = generateURL(path);
  const render = Other.bind({ title: "Top Rated TV" });
  requestMovies(url, render);
}
function getPopularTV() {
  let path = "/tv/popular";
  const url = generateURL(path);
  const render = Other.bind({ title: "Most Popular TV" });
  requestMovies(url, render);
}

function dropDownInfoForVideo(url, sibling) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // console.log(xhr.response);
        createVideoTemplate(xhr.response, sibling);  
    }
  };
  xhr.open("GET", url);
  xhr.send();
}
function dropDownInfo(url, sibling) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // console.log(xhr.response);
          createInfoTemplate(xhr.response, sibling);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }
