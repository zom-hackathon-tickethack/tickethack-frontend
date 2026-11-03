function dispNoCartFound() {
  document.querySelector('#results').innerHTML = `
      <img src = "./images/notfound.png" alt="no trip found">
      <hr>
      <p>No trip found.</p>
  `;
}




function addCartRecord( cart ) {
  document.querySelector('#results').innerHTML +=
    `<div class="row">
      <div class="text-container">
        <span>${cart.trip.departure}</span>
        <span>${cart.trip.arrival}</span>
        <span>${cart.trip.date}</span>
        <span>${cart.trip.price}</span>
        <span class="hidden cartId">${cart._id}</span>
        <button class="del-button">X</button>
        <button class="purch-button">Purchase</button>
      </div>
    </div>`;
  addListenerBookBox();
  addListenerDeleteBox();
}



function addListenerDeleteBox() {
  const delBoxes = document.querySelectorAll('.del-button');
  for ( let item of delBoxes ) {
    item.addEventListener( 'click', async function() {


      const cartId = this.parentNode.querySelector('.cartId').innerHTML;
      console.log( cartId );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { cartId } )
      } );
      const data = await resp.json();


      this.parentNode.remove();
    } )
  }
}




async function addListenerBookBox() {
  const bookBoxes = document.querySelectorAll('.purch-button');
  for ( let item of bookBoxes ) {
    // 'this' ne fonctionne pas avec les fonctions fléchées (=>)
    // item.addEventListener( 'click', () => this.parentNode.remove() } )
    // soit utiliser funtion () {...} , soit utiliser 'item puisque je l'ai !
    // item.addEventListener( 'click', () => item.parentNode.remove() )
    item.addEventListener( 'click', async function() {
      const cartId = this.parentNode.querySelector('.cartId').innerHTML;
      console.log( cartId );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { cartId } )
      } );
      const data = await resp.json();
      console.log( data );
      if (data.result ) {
        window.location.href = 'bookings.html';
      }

    } );
  }
}



async function getCart() {
  /*const depBox = document.querySelector('#departure');
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
*/
  const resp = await fetch( `${CONFIG.API_URL_BACK}/cart` );
  const data = await resp.json();
  console.log( data );
  document.querySelector('#results').innerHTML = '';
  if ( data.result && ( data.fullCart.length > 0 ) ) {
    for ( let cart of data.fullCart ) {
      //console.log( item.textContent );
      //const stylDisp = ( ! pattern.test( item.textContent ) ) ? "none" : "flex";
      //item.parentNode.parentNode.style.display = stylDisp;
      addCartRecord( cart );
    }
  } else {
      dispNoCartFound();
  }
  //const msgBoxes = document.querySelectorAll('.row > div > h6');
}


getCart();


/*
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
*/
