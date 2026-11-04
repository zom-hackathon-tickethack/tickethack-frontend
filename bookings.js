function dispNoBookingFound() {
  document.querySelector('#booking-footer').innerHTML = '';
  document.querySelector('#booking-container').innerHTML = `
      <p>No booking yet.</p>
      <p>why not plan a trip?</p>
  `;
}




function addBookingRecord( booking ) {
  document.querySelector('#booking-container').innerHTML +=
    `<div class="booking-row">
        <span class="booking-travel">${booking.trip.departure} \> ${booking.trip.arrival}</span>
        <span class="booking-travel">${booking.trip.date}</span>
        <span class="booking-travel">${booking.trip.price} €</span>
        <span class="hidden bookingId" data-id="${booking._id}"></span>
        <button class="del-button">X</button>
    </div>`;
}




function addBookingFooter() {
  let total = 0;
  document.querySelector('#booking-footer').innerHTML +=
    `<hr>
        <p>Enjoy your travels with Tickethack!</p>
    `;
  addListenerDeleteBox();
}





function addListenerDeleteBox() {
  const delBoxes = document.querySelectorAll('.del-button');
  for ( let item of delBoxes ) {
    item.addEventListener( 'click', async function() {

      const bookingId = this.parentNode.querySelector('.bookingId').dataset.id;
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
    document.querySelector('#booking-container').innerHTML = '<h1>My bookings</h1>';
    for ( let cart of data.fullBooking ) {
      //console.log( item.textContent );
      //const stylDisp = ( ! pattern.test( item.textContent ) ) ? "none" : "flex";
      //item.parentNode.parentNode.style.display = stylDisp;
      addBookingRecord( cart );
    }
    addBookingFooter();
  } else {
      dispNoBookingFound();
  }
  //const msgBoxes = document.querySelectorAll('.row > div > h6');
}


getBooking();
