import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let url = config.backendEndpoint.concat("/reservations/")

  try {
    let response = await fetch(url);
    let reservations = await response.json();

    return reservations;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if(reservations.length==0){
    document.getElementById('no-reservation-banner').style.display = 'block';
    document.getElementById('reservation-table-parent').style.display = 'none';
  } else{
    document.getElementById('no-reservation-banner').style.display = 'none';
    document.getElementById('reservation-table-parent').style.display = 'block';
    let reservationTable = document.getElementById('reservation-table')

      /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format DD/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    reservations.forEach(reservedItem => {
      let row = document.createElement('tr');
      row.innerHTML = `<td>${reservedItem.id}</td>
      <td>${reservedItem.name}</td>
      <td>${reservedItem.adventureName}</td>
      <td>${parseInt(reservedItem.person)}</td>
      <td>${new Date(reservedItem.date).toLocaleDateString("en-IN")}</td>
      <td>${reservedItem.price}</td>
      <td>${new Date(reservedItem.time).toLocaleString("en-IN", {
          year: "numeric",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
      })}</td>
      <td>
        <div class="reservation-visit-button" id=${reservedItem.id}>
          <a href="../detail/?adventure=${reservedItem.adventure}">Visit Adventure</a>
        </div>
      </td>
      ` ;//template string ends
      reservationTable.appendChild(row);
    })
  }

}

export { fetchReservations, addReservationToTable };
