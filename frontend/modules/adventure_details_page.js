import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const params = new URLSearchParams(search);
  const adventureId = params.get('adventure');

  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = config.backendEndpoint.concat("/adventures/detail/?adventure=" + adventureId)

  try {
    let response = await fetch(url);
    let adventures = await response.json();

    console.log(adventures);
    return adventures;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  let imgGal = document.getElementById('photo-gallery');
  adventure.images.forEach(img => {
    let imgDiv = document.createElement('div');
    imgDiv.className = 'w-100 h-100';
    let imgElm = document.createElement('img');
    imgElm.src = img;
    imgElm.alt = 'Adventure-img';
    imgElm.className = 'activity-card-image w-100 h-100';
    imgDiv.appendChild(imgElm);
    imgGal.appendChild(imgDiv);
  })
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGal = document.getElementById('photo-gallery');
  photoGal.innerHTML = '';
  let imgList = '';
  let divListInner = '';
  let count = -1;
  images.forEach(img => {
    count += 1;
    imgList += `<li data-target="#carouselExampleIndicators" data-slide-to="${count}"></li>`;
    divListInner += `<div class="carousel-item">
                        <img class="activity-card-image d-block w-100" src="${img}" alt="Slide-${count}">
                      </div>`;
  });
  //Carousel section
  photoGal.innerHTML =
    `
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    ${imgList}
  </ol>
  <div class="carousel-inner">
    ${divListInner}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;
  //Setting first child as active per the bootstrap documentation
  let li1 = document.querySelector('#carouselExampleIndicators > ol > li:nth-child(1)');
  li1.className += 'active';
  let div1 = document.querySelector('#carouselExampleIndicators > div > div:nth-child(1)');
  div1.className = div1.className + ' active';
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if (adventure.available) {
    let availableEle = document.getElementById('reservation-panel-available');
    availableEle.style.display = 'block';

    let soldoutEle = document.getElementById('reservation-panel-sold-out');
    soldoutEle.style.display = 'none';

    let reserveCostPerHd = document.getElementById('reservation-person-cost');
    reserveCostPerHd.innerHTML = adventure.costPerHead;
  } else {
    let availableEle = document.getElementById('reservation-panel-available');
    availableEle.style.display = 'none';

    let soldoutEle = document.getElementById('reservation-panel-sold-out');
    soldoutEle.style.display = 'block';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  let totalEle = document.getElementById('reservation-cost');
  totalEle.innerHTML = totalCost;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize() + "&adventure=" + adventure.id;
    let url = config.backendEndpoint + "/reservations/new";
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function (response) {
        alert("Success!");
        window.location.reload();
      },
      error: function () {
        alert("Failed!");
      },
    })
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  let reservedBanner = document.getElementById('reserved-banner');
  if (adventure.reserved) {
    reservedBanner.style.display = 'block';
  } else {
    reservedBanner.style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
