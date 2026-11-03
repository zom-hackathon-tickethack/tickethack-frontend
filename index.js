function dispNoTripFound() {
  document.querySelector('#results').innerHTML = `
      <img src = "./images/notfound.png" alt="no trip found">
      <hr>
      <p>No trip found.</p>
  `;
}

function dispTheTrain() {
  document.querySelector('#results').innerHTML = `
      <img src = "images/train.png" alt="train">
      <hr>
      <p>It\'s time to book your future trip.</p>
  `;
}


function addTrip( travel ) {
  document.querySelector('#results').innerHTML +=
    `<div class="row">
      <div class="text-container">
        <span>${travel.departure}</span>
        <span>${travel.arrival}</span>
        <span>${travel.date}</span>
        <span>${travel.price}</span>
        <span class="hidden tripId">${travel._id}</span>
        <button class="book-button">Book</button>
      </div>
    </div>`;
  addListenerBookBox();
}




async function addListenerBookBox() {
  const bookBoxes = document.querySelectorAll('.book-button');
  for ( let item of bookBoxes ) {
    // 'this' ne fonctionne pas avec les fonctions fléchées (=>)
    // item.addEventListener( 'click', () => this.parentNode.remove() } )
    // soit utiliser funtion () {...} , soit utiliser 'item puisque je l'ai !
    // item.addEventListener( 'click', () => item.parentNode.remove() )
    item.addEventListener( 'click', async function() {
      const tripId = this.parentNode.querySelector('.tripId').innerHTML;
      console.log( tripId );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { tripId } )
      } );
      const data = await resp.json();
      console.log( data );
      if (data.result ) {
        window.location.href = 'cart.html';
      }

    } );
  }
}



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
    //console.log( textToCompare );
    //const pattern = new RegExp( textToCompare, "i" );

    const params = new URLSearchParams({
        departure: departure,
        arrival: arrival,
        date: date
    });
    console.log( params );

    const resp = await fetch( `${CONFIG.API_URL_BACK}/travel?${params}` );
    const data = await resp.json();
    console.log( data );
    document.querySelector('#results').innerHTML = '';
    if ( data.result && ( data.travels.length > 0 ) ) {
      for ( let travel of data.travels ) {
        //console.log( item.textContent );
        //const stylDisp = ( ! pattern.test( item.textContent ) ) ? "none" : "flex";
        //item.parentNode.parentNode.style.display = stylDisp;
        addTrip( travel );
      }
    } else {
        dispNoTripFound();
    }
    //const msgBoxes = document.querySelectorAll('.row > div > h6');
  }
);


dispTheTrain();
