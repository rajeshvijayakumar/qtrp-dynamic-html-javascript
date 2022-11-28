import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = config.backendEndpoint.concat("/cities")

  try{
    let response = await fetch(url);
    let cities = await response.json();
    return cities;
    }catch(err){
      return null;
    } 
    
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let gridcolumn = document.createElement("div");
  gridcolumn.className = "col-6 col-lg-3 mb-4";
  gridcolumn.innerHTML = `<a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
  <div class="tile-text text-center">
  <h3>${city}</h3>
  <p>${description}</p>
  </div>
  <img src="${image}" class="tile img img-responsive"> </img>
  </div>
  </a>`
  document.getElementById("data").appendChild(gridcolumn);
}

export { init, fetchCities, addCityToDOM };
