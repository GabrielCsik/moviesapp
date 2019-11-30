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
  
  function searchMovie(value){
    let path = "/search/movie";
    const url = generateURL(path) + "&query=" + value;
    requestMovies(url, Search);
  }
  function getUpcomingMovies(){
    let path = "/movie/upcoming";
    const url = generateURL(path);
    requestMovies(url, Other);
  }

  function getTopRatedMovies(){
    let path = "/movie/top_rated";
    const url = generateURL(path);
    requestMovies(url, Other);
  }
  
  function getPopularMovies(){
    let path = "/movie/popular";
    const url = generateURL(path);
    requestMovies(url, Other);
  }