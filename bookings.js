function dispNoBookingFound() {
  document.querySelector('#results').innerHTML = `
      <img src = "./images/notfound.png" alt="no trip found">
      <hr>
      <p>No trip found.</p>
  `;
}




function addBookingRecord( cart ) {
  document.querySelector('#results').innerHTML +=
    `<div class="row">
      <div class="text-container">
        <span>${cart.trip.departure}</span>
        <span>${cart.trip.arrival}</span>
        <span>${cart.trip.date}</span>
        <span>${cart.trip.price}</span>
        <span class="hidden bookingId">${cart._id}</span>
        <button class="del-button">X</button>
      </div>
    </div>`;
  //addListenerBookBox();
  addListenerDeleteBox();
}



function addListenerDeleteBox() {
  const delBoxes = document.querySelectorAll('.del-button');
  for ( let item of delBoxes ) {
    item.addEventListener( 'click', async function() {

      const bookingId = this.parentNode.querySelector('.bookingId').innerHTML;
      console.log( bookingId );
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
  console.log( data );
  document.querySelector('#results').innerHTML = '';
  if ( data.result && ( data.fullBooking.length > 0 ) ) {
    for ( let cart of data.fullBooking ) {
      //console.log( item.textContent );
      //const stylDisp = ( ! pattern.test( item.textContent ) ) ? "none" : "flex";
      //item.parentNode.parentNode.style.display = stylDisp;
      addBookingRecord( cart );
    }
  } else {
      dispNoBookingFound();
  }
  //const msgBoxes = document.querySelectorAll('.row > div > h6');
}


getBooking();
