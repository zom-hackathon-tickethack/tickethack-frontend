/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function dispNoTripFound() {
  document.querySelector('#results').innerHTML = `
      <img src = "./images/notfound.png" alt="no trip found">
      <hr>
      <p>No trip found.</p>
  `;
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function dispTheTrain() {
  document.querySelector('#results').innerHTML = `
      <img src = "images/train.png" alt="train">
      <hr>
      <p>It\'s time to book your future trip.</p>
  `;
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function addTrip( travel ) {
  document.querySelector('#results').innerHTML +=
    `<div class="row">
      <div class="text-container" data-id="${travel._id}">
        <span>${travel.departure} \> ${travel.arrival}</span>
        <span>${travel.date}</span>
        <span>${travel.price}€</span>
        <button class="book-button">Book</button>
      </div>
    </div>`;
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
async function addListenerBookBox() {
  const bookBoxes = document.querySelectorAll('.book-button');
  for ( let item of bookBoxes ) {
    item.addEventListener( 'click', async function() {
      const tripId = this.parentNode.dataset.id;
      //console.log( tripId );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { tripId } )
      } );
      const data = await resp.json();
      //console.log( data );
      if (data.result ) {
        window.location.href = 'cart.html';
      }

    } );
  }
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
document.querySelector('#search').addEventListener( 'click',
  async function() {
    const depBox = document.querySelector('#departure');
    const arrBox = document.querySelector('#arrival');
    const datBox = document.querySelector('#date');
    let departure = depBox.value;
    let arrival   = arrBox.value;
    let date      = datBox.value;
    depBox.value = "" ;
    arrBox.value = "" ;
    datBox.value = "" ;

    const params = new URLSearchParams({
        departure: departure,
        arrival: arrival,
        date: date
    });
    //console.log( params );

    const resp = await fetch( `${CONFIG.API_URL_BACK}/travel?${params}` );
    const data = await resp.json();
    //console.log( data );
    if ( data.result && ( data.travels.length > 0 ) ) {
      document.querySelector('#results').innerHTML = '';
      for ( let travel of data.travels ) {
        addTrip( travel );
      }
      addListenerBookBox();
    } else {
        dispNoTripFound();
    }
  }
);


dispTheTrain();
