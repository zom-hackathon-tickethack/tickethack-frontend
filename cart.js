function dispNoCartFound() {
  document.querySelector('#cart-footer').innerHTML = '';
  document.querySelector('#cart-container').innerHTML = `
      <p>No tickets in your cart.</p>
      <p>why not plan a trip?</p>
  `;
}




function addCartRecord( cart ) {
  document.querySelector('#cart-container').innerHTML +=
    `<div class="cart-row">
        <span class="cart-travel">${cart.trip.departure} \> ${cart.trip.arrival}</span>
        <span class="cart-date">${cart.trip.date}</span>
        <span class="cart-price">${cart.trip.price} €</span>
        <span class="hidden cartId" data-id="${cart._id}"></span>
        <button class="del-button">X</button>
        <button class="purchase-button">Purchase</button>
    </div>`;
}

function addCartFooter() {
  let total = 0;
  document.querySelector('#cart-footer').innerHTML +=
    `<div class="row">
        <span>Total : ${total}€</span>
        <button class="purchAll-button">Purchase All</button>
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
  if ( data.result && ( data.fullCart.length > 0 ) ) {
    document.querySelector('#cart-container').innerHTML = '<h1>My cart</h1>';
    for ( let cart of data.fullCart ) {
      //console.log( item.textContent );
      //const stylDisp = ( ! pattern.test( item.textContent ) ) ? "none" : "flex";
      //item.parentNode.parentNode.style.display = stylDisp;
      addCartRecord( cart );
    }
    addCartFooter();
  } else {
      dispNoCartFound();
  }
  //const msgBoxes = document.querySelectorAll('.row > div > h6');
}


getCart();
