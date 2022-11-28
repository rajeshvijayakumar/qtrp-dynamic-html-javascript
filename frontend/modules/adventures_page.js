
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = config.backendEndpoint.concat("/adventures?city=" + city)

  try {
    let response = await fetch(url);
    let adventures = await response.json();
    return adventures;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(adventure => {
    let element = document.createElement('div');
    element.className = 'col-6 col-lg-3 flex mb-5'
    element.innerHTML = `<a id=${adventure.id} href="detail/?adventure=${adventure.id}">
  <div class="category-banner"><h6>${adventure.category}</h6></div>
  <div class="activity-card">
  <img src=${adventure.image}>
  <div class="div-text">
  <div class="label">${adventure.name}</div>
  <div class="price">₹${adventure.costPerHead}</div>
  </div>
  <div class="div-text">
  <div class="label">Duration</div>
  <div class="price">${adventure.duration}</div>
  </div>
  </div>
  </a>`
    document.getElementById("data").appendChild(element);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter((dur) => { 
    return dur.duration > low && dur.duration <= high
  });
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters.category.length != 0){
    list = filterByCategory(list, filters.category);
  }

  if(filters.duration != null && filters.duration != ""){
    let [low,high] = filters.duration.split('-').map(s => parseInt(s));
    list = filterByDuration(list,low,high);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format

  let persistedFilters = JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return persistedFilters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM
function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let category = filters.category;
   
    category.forEach((item)=>{
    let categoryEle = document.createElement('div');
    categoryEle.className= 'category-filter';
    categoryEle.innerHTML=`<span>${item}</span>`;
    document.getElementById('category-list').append(categoryEle);
    });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
