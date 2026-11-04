function dispNoBookingFound() {
  document.querySelector('#booking-cont-low').style.display = 'none';
  document.querySelector('#booking-cont-high').innerHTML = `
      <p>No booking yet.</p>
      <p>why not plan a trip?</p>
  `;
}



function addBookingRecord( booking ) {
  document.querySelector('#booking-cont-high').innerHTML +=
    `<div class="booking-row" data-id="${booking._id}">
        <span class="booking-travel">${booking.trip.departure} \> ${booking.trip.arrival}</span>
        <span class="booking-travel">${booking.trip.date}</span>
        <span class="booking-travel">${booking.trip.price}€</span>
        <button class="del-button">X</button>
    </div>`;
}




function addBookingContLow() {
  document.querySelector('#booking-cont-low').style.display = 'block';
  document.querySelector('#booking-cont-low').innerHTML =
    `<div id="booking-enjoy"> <hr> <p>Enjoy your travels with Tickethack!</p> </div>`;
  addListenerDeleteBox();
}





function addListenerDeleteBox() {
  const delBoxes = document.querySelectorAll('.del-button');
  for ( let item of delBoxes ) {
    item.addEventListener( 'click', async function() {

      const bookingId = this.parentNode.dataset.id;
      //console.log( bookingId );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/booking`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { bookingId } )
      } );
      const data = await resp.json();

      this.parentNode.remove();
    } )
  }
}


async function getBooking() {
  const resp = await fetch( `${CONFIG.API_URL_BACK}/booking` );
  const data = await resp.json();
  //console.log( data );
  if ( data.result && ( data.fullBooking.length > 0 ) ) {
    document.querySelector('#booking-cont-high').innerHTML = '<h2>My bookings</h2>';
    for ( let cart of data.fullBooking ) {
      addBookingRecord( cart );
    }
    addBookingContLow();
  } else {
      dispNoBookingFound();
  }
}


getBooking();
