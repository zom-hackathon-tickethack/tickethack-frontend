/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function dispNoCartFound() {
  document.querySelector('#cart-cont-low').style.display = 'none';
  document.querySelector('#cart-cont-high').innerHTML = `
      <p>No tickets in your cart.</p>
      <p>Why not plan a trip?</p>
  `;
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function addCartRecord( cart ) {
  const date = new Date( cart.trip.date );
  const HrMn = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  document.querySelector('#cart-cont-high').innerHTML +=
    `<div class="cart-row" data-id="${cart._id}">
        <span class="cart-travel">${cart.trip.departure} \> ${cart.trip.arrival}</span>
        <span class="cart-date">${HrMn}</span>
        <span class="cart-price">${cart.trip.price}€</span>
        <div>
          <button class="purchase-button">Purchase</button>
          <button class="del-button">X</button>
        </div>
    </div>`;
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function addCartContLow() {
  let total = 0;
  document.querySelector('#cart-cont-low').style.display = 'flex';
  document.querySelector('#cart-cont-low').innerHTML = `
    <span>Total : ${total}€</span>
    <button class="purchAll-button">Purchase All</button>
  `;
  addListenerPurchaseBox();
  addListenerDeleteBox();
  addListenerPurchAllBox();
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
function addListenerDeleteBox() {
  const delBoxes = document.querySelectorAll('.del-button');
  for ( let item of delBoxes ) {
    item.addEventListener( 'click', async function() {


      const cartId = this.parentNode.parentNode.dataset.id;
      //console.log( cartId );
      const resp = await fetch( `${CONFIG.API_URL_BACK}/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { cartId } )
      } );
      const data = await resp.json();


      this.parentNode.parentNode.remove();
    } )
  }
}


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
async function addListenerPurchaseBox() {
  const bookBoxes = document.querySelectorAll('.purchase-button');
  for ( let item of bookBoxes ) {
    item.addEventListener( 'click', async function() {
      const cartIdList = [];
      cartIdList.push( this.parentNode.parentNode.dataset.id );
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


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
async function addListenerPurchAllBox() {
  const bookAllBox = document.querySelector('.purchAll-button');
    bookAllBox.addEventListener( 'click', async function() {
      const cartIdList = Array.from( document.querySelectorAll('.cart-row') ).map( e => e.dataset.id);
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


/*****************************************************************************/
/**                                                                         **/
/*****************************************************************************/
async function getCart() {
  const resp = await fetch( `${CONFIG.API_URL_BACK}/cart` );
  const data = await resp.json();
  console.log( data );
  if ( data.result && ( data.fullCart.length > 0 ) ) {
    document.querySelector('#cart-cont-high').innerHTML = '<h2>My cart</h2>';
    for ( let cart of data.fullCart ) {
      addCartRecord( cart );
    }
    addCartContLow();
  } else {
      dispNoCartFound();
  }
}


/*****************************************************************************/
/**    Code at page load                                                    **/
/*****************************************************************************/
getCart();
