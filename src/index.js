function handleSearchSubmit(event) {
    event.preventDefault();
        let searchInputElement = document.querySelector("#search-form-input");
      let cityElement = document.querySelector("#weather-city");
      cityElement.innerHTML = searchInputElement.value;
      
       
}


let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); 