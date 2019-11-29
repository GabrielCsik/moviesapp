document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  const urlBegin = "https://api.themoviedb.org/3/search/movie?api_key=";
  const API_KEY = "bbd92ee26b128295e6b83f95ab79c675";
  const inputField = document.getElementById("inputField");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function() {
    const value = inputField.value;
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
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
        }  
    }
    xhr.open("GET", url);
    xhr.send();
  });
}
