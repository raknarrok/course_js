'use strict'

// Shopping Cart Variable
let shoppingCart = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []

// Get the container
const container = document.querySelector('#products_container')
const chkBilling = document.querySelector('#chkBilling')

// Main Methods
/**
 * Retrieve Hardcoded data from the database
 */
const fetchStates = async () => {
  const objResponse = await fetch('../static/scripts/states.js')
  const objJson = await objResponse.json()
  
  return objJson
}

/** 
 *  Print the states in the container
*/
const printStates = async () => {
  const arrayStates = await fetchStates()
  const selectStateBilling = document.querySelector('#selectStateBilling')
  const selectStateShipping = document.querySelector('#selectStateShipping')

  arrayStates.forEach((state) => {
    const {id, estado} = state
    selectStateBilling.innerHTML += `<option value="${id}">${estado}</option>`
    selectStateShipping.innerHTML += `<option value="${id}">${estado}</option>`
  })
}

/**
 * print the products in the container.
 */
const printProducts = async () => {
  shoppingCart.forEach((product) => {
    const { id, name, quantity, desc, price, img, category } = product
    container.innerHTML += `
    <div name="${name}" class="card" style="width: 10rem;">
    <img src="${img}" class="card-img-top mt-2" alt="${name}">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Precio: $${price}</p>
        <p class="card-text">Cantidad: ${quantity}</p>
        <p class="card-text">Categoria: ${category}</p>
    </div>
    </div>
    `
  })
}

// Events
/**
 * Remove check if we reload the page
 */
window.addEventListener('beforeunload', (event) => {
  event.returnValue = ''
  const chkBilling = document.querySelector('#chkBilling')
  const radioCash = document.querySelector('#radioCash')
  if (chkBilling.checked) {
    chkBilling.checked = false
  }
  radioCash.checked = true
})

/**
 * Disable the Billing Form if the checkbox is checked
 */
chkBilling.onclick = () => {
  const formElement = document.querySelector('#formElement')
  const noBillingMessage = document.querySelector('#noBillingMessage')
  const elementShipping = document.querySelector('#elementShipping')

  if (chkBilling.checked) {
    formElement.style.display = 'none'
    noBillingMessage.innerHTML = `<b>Sin direccion de facturacion</b>`
    elementShipping.style.display = 'none'
    noBillingMessage.style.display = 'block'
  } else {
    formElement.style.display = 'block'
    elementShipping.style.display = 'block'
    noBillingMessage.style.display = 'none'
    noBillingMessage.innerHTML = ``
  }
}

/**
 * Show or hidde Payment Info According the button selected
 */
const radioCash = document.querySelector('#radioCash')
const radioCard = document.querySelector('#radioCard')
const radioTransfer = document.querySelector('#radioTransfer')
const infoCash = document.querySelector('#infoCash')
const infoCard = document.querySelector('#infoCard')
const infoTransfer = document.querySelector('#infoTransfer')

radioCash.onclick = () => {
  
  infoCard.style.display = 'none'
  infoTransfer.style.display = 'none'
  $('#infoCash').css('display', 'block')
}

radioCard.onclick = () => {
  infoCash.style.display = 'none'
  infoTransfer.style.display = 'none'
  $('#infoCard').css('display', 'block')
}

radioTransfer.onclick = () => {
  infoCash.style.display = 'none'
  infoCard.style.display = 'none'
  $('#infoTransfer').css('display', 'block')
}

/**
 * Calculate Subtotal, IVA and Total
 */
const calculateTotal = () => {
  const spnTotalProducts = document.querySelector('#spnTotalProducts')
  const spnSubtotal = document.querySelector('#spnSubtotal')
  const spnIva = document.querySelector('#spnIva')
  const spnTotal = document.querySelector('#spnTotal')

  spnTotalProducts.textContent = `${shoppingCart.reduce((acc, product) => acc + product.quantity, 0)}`
  spnSubtotal.textContent = `$${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0)}`
  spnIva.textContent = `$${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0) * 0.16}`
  const totalAmount = shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0) * 1.16
  spnTotal.textContent = `$${totalAmount.toFixed(2)}`
}

// Call Methods
printProducts()
printStates()
calculateTotal()
