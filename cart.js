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
      <div class="trip-container">
        <span>${cart.trip.departure}</span>
        <span>\></span>
        <span>${cart.trip.arrival}</span>
        <span>${cart.trip.date}</span>
        <span>${cart.trip.price}</span>
        <span class="hidden cartId" data-id="${cart._id}"></span>
        <button class="del-button">X</button>
        <button class="purchase-button">Purchase</button>
      </div>
    </div>`;
}

function addPurchaseAllButton() {
  document.querySelector('#results').innerHTML +=
    `<div class="row">
      <div class="text-container">
        <button class="purchAll-button">Purchase All</button>
      </div>
    </div>`;
  addListenerPurchaseBox();
  addListenerDeleteBox();
  addListenerPurchAllBox();
}


function addListenerDeleteBox() {
  const delBoxes = document.querySelectorAll('.del-button');
  for ( let item of delBoxes ) {
    item.addEventListener( 'click', async function() {


      const cartId = this.parentNode.querySelector('.cartId').dataset.id;
      //console.log( cartId );
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




async function addListenerPurchaseBox() {
  const bookBoxes = document.querySelectorAll('.purchase-button');
  for ( let item of bookBoxes ) {
    item.addEventListener( 'click', async function() {
      const cartIdList = [];
      cartIdList.push( this.parentNode.querySelector('.cartId').dataset.id );
      //console.log( cartIdList );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { cartIdList } )
      } );
      const data = await resp.json();
      //console.log( data );
      if (data.result ) {
        window.location.href = 'bookings.html';
      }

    } );
  }
}




async function addListenerPurchAllBox() {
  const bookAllBox = document.querySelector('.purchAll-button');
    bookAllBox.addEventListener( 'click', async function() {
      const cartIdList = Array.from( document.querySelectorAll('.cartId') ).map( e => e.dataset.id);
      //console.log( cartIdList );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { cartIdList } )
      } );
      const data = await resp.json();
      //console.log( data );
      if (data.result ) {
        window.location.href = 'bookings.html';
      }

    } );
}


async function getCart() {
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
    addPurchaseAllButton();
  } else {
      dispNoCartFound();
  }
  //const msgBoxes = document.querySelectorAll('.row > div > h6');
}


getCart();
