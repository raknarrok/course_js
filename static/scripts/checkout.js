'use strict'

// Shopping Cart Variable
const shoppingCart = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []
const checkOut = sessionStorage.getItem('checkOut') ? JSON.parse(sessionStorage.getItem('checkOut')) : []

// Get the container
const container = document.querySelector('#products_container')
const chkBilling = document.querySelector('#chkBilling')
const chkShipping = document.querySelector('#chkShipping')
const divContinue = document.querySelector('#divContinue')
const btnContinue = document.querySelector('#btnContinue')
const btnBack = document.querySelector('#btnBack')
const divVerify = document.querySelector('#divVerify')
const inputEmailBilling = document.querySelector('#inputEmailBilling')
const inputEmailShipping = document.querySelector('#inputEmailShipping')
const inputAddressBilling = document.querySelector('#inputAddressBilling')
const inputAddressShipping = document.querySelector('#inputAddressShipping')
const inputAddressBilling2 = document.querySelector('#inputAddressBilling2')
const inputAddressShipping2 = document.querySelector('#inputAddressShipping2')
const inputCityBilling = document.querySelector('#inputCityBilling')
const inputCityShipping = document.querySelector('#inputCityShipping')
const selectStateBilling = document.querySelector('#selectStateBilling')
const selectStateShipping = document.querySelector('#selectStateShipping')
const inputZipBilling = document.querySelector('#inputZipBilling')
const inputZipShipping = document.querySelector('#inputZipShipping')
const radioShipping = document.querySelector('input[name="radioShipping"]:checked')
const radioPayment = document.querySelector('input[name="radioPayment"]:checked')
const inputName = document.querySelector('#inputName')
const inputCardNumber = document.querySelector('#inputCardNumber')
const inputExpiry = document.querySelector('#inputExpiry')
const inputCvv = document.querySelector('#inputCvv')
const spnShippingAmount = document.querySelector('#spnShippingAmount')

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
 * Print the states in the container
*/
const printStates = async () => {
  const arrayStates = await fetchStates()
  const selectStateBilling = document.querySelector('#selectStateBilling')
  const selectStateShipping = document.querySelector('#selectStateShipping')

  arrayStates.forEach((state) => {
    const { id, estado } = state
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
  const radioDelivery = document.querySelector('#radioRetireOnLocal')
  if (chkBilling.checked) {
    chkBilling.checked = false
  }
  radioDelivery.checked = true
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
    noBillingMessage.innerHTML = '<b>Sin direccion de facturacion</b>'
    elementShipping.style.display = 'none'
    noBillingMessage.style.display = 'block'
  } else {
    formElement.style.display = 'block'
    elementShipping.style.display = 'block'
    noBillingMessage.style.display = 'none'
    noBillingMessage.innerHTML = ''
  }
}

/**
 * Use Billing address to Shipping address with checkbox
 */
chkShipping.onclick = () => {
  if (chkShipping.checked) {
    inputEmailShipping.value = inputEmailBilling.value
    inputAddressShipping.value = inputAddressBilling.value
    inputAddressShipping2.value = inputAddressBilling2.value
    inputCityShipping.value = inputCityBilling.value
    selectStateShipping.value = selectStateBilling.value
    inputZipShipping.value = inputZipBilling.value
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
 * Save & Update Payment Method & Amount
 */
const radioRetireOnLocal = document.querySelector('#radioRetireOnLocal')
const radioNormalDelivery = document.querySelector('#radioNormalDelivery')
const radioFastDelivery = document.querySelector('#radioFastDelivery')
const radioPremiumDelivery = document.querySelector('#radioPremiumDelivery')

radioRetireOnLocal.onclick = () => {
  checkFields.deliveryMethod.method = radioShipping.value
  spnShippingAmount.textContent = shippingAmount()
  calculateTotal()
}

radioNormalDelivery.onclick = () => {
  checkFields.deliveryMethod.method = radioShipping.value
  spnShippingAmount.textContent = shippingAmount()
  calculateTotal()
}

radioFastDelivery.onclick = () => {
  checkFields.deliveryMethod.method = radioShipping.value
  spnShippingAmount.textContent = shippingAmount()
  calculateTotal()
}

radioPremiumDelivery.onclick = () => {
  checkFields.deliveryMethod.method = radioShipping.value
  spnShippingAmount.textContent = shippingAmount()
  calculateTotal()
}

/**
 * Calculate Subtotal, IVA and Total
 */
const calculateTotal = () => {
  const spnTotalProducts = document.querySelector('#spnTotalProducts')
  const spnSubtotal = document.querySelector('#spnSubtotal')
  const spnIva = document.querySelector('#spnIva')
  const spnTotal = document.querySelector('#spnTotal')

  spnTotalProducts.textContent = `${shoppingCart.reduce((acc, product) => acc + parseInt(product.quantity), 0)}`
  spnSubtotal.textContent = `$${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0)}`
  spnIva.textContent = `$${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0) * 0.16}`
  spnShippingAmount.textContent = `$${shippingAmount()}`
  let totalAmount = shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0) * 1.16
  totalAmount += shippingAmount()
  spnTotal.textContent = `$${totalAmount.toFixed(2)}`

  if (shoppingCart == 0 || shoppingCart === null || shoppingCart == undefined || shoppingCart == '' || totalAmount == 0) {
    btnContinue.disabled = true
    divContinue.style.display = 'none'

    Swal.fire({
      title: 'Oops!!',
      text: 'No tienens ningun producto en tu carrito, por favor agrega al menos un producto para continuar con tu compra',
      icon: 'warning',
      confirmButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '../pages/aplicado.html'
      }
    })
  }
}

/**
 * Shipping Method - Calculate Shipping Amount
 */
const shippingAmount = () => {
  const radioShipping = document.querySelector('input[name="radioShipping"]:checked')

  if (radioShipping.value === 'localRetire' || radioShipping.value === 'normalDelivery') {
    return 0
  } else if (radioShipping.value === 'fastDelivery') {
    return 100
  } else if (radioShipping.value === 'premiumDelivery') {
    return 350
  } else {
    return 0
  }
}

/**
 * Verify Data
 */
const btnVerify = document.querySelector('#btnVerify')
btnVerify.onclick = () => {
  updateSessionStorage()
  const inputName = document.querySelector('#name')
  const inputEmail = document.querySelector('#email')
  const inputOrderDetails = document.querySelector('#comment')
  inputName.value = checkFields.paymentMethod.cardName
  inputEmail.value = checkFields.shippingAddress.email
  inputOrderDetails.value = `Metodo de Pago: ${checkFields.paymentMethod.method} \n
  Metodo de Envio: ${checkFields.deliveryMethod.method} \n
  Direccion de Envio: ${checkFields.shippingAddress.address} \n
  Referencias: ${checkFields.shippingAddress.referencias} \n
  Ciudad: ${checkFields.shippingAddress.city} \n
  Estado: ${checkFields.shippingAddress.state} \n
  Codigo Postal: ${checkFields.shippingAddress.zip} \n
  Cantidad de Productos: ${shoppingCart.reduce((acc, product) => acc + parseInt(product.quantity), 0)} \n
  Subtotal: ${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0)} \n
  IVA: ${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0) * 0.16} \n
  Costo de Envio: ${shippingAmount()} \n
  Total: ${shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0) * 1.16 + shippingAmount()} \n
  Numero de Orden: ${orderNumber}`

  divContinue.style.display = 'block'
  divVerify.style.display = 'none'
}
/**
 * Confirm CheckOut
*/
btnContinue.onclick = () => {
  event.preventDefault()
  const emptyFieldsTracker = new Map()
  let isMissingFields = false

  updateSessionStorage()
  const checkOutTracker = JSON.parse(sessionStorage.getItem('checkOut'))

  for (const key in checkOutTracker) {
    for (const subKey in checkOutTracker[key]) {
      if (checkOutTracker[key][subKey] === '') {
        if (chkBilling.checked && key === 'billingAddress') continue
        if (!radioCard.checked && key === 'paymentMethod') continue
        emptyFieldsTracker.set(key, false)
        isMissingFields = true // Missing Data
        break
      }
    }
    if (isMissingFields) break
  }

  buyProducts(isMissingFields, emptyFieldsTracker)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * Back to Shopping Cart
 */
btnBack.onclick = () => {
  window.location.href = '../pages/aplicado.html'
}

/**
 * @param {*} isMissingFields
 * @returns
 */
const buyProducts = (isMissingFields, emptyFieldsTracker) => {
  return new Promise((resolve, reject) => {
    if (!isMissingFields) {
      Swal.fire({
        title: 'Tu Compra ha sido exitosa',
        text: `Gracias por tu compra, se registro en el sistema, un acesor te contactara para confirmar tu orden es #${orderNumber}`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      })

      const divBack = document.querySelector('#divBack')
      btnContinue.disabled = true
      divBack.style.display = 'block'

      // Delete localStorage & sessionStorage
      localStorage.removeItem('shoppingCart')
      sessionStorage.removeItem('checkOut')
      resolve('OK - Compra completada')
    } else {
      let message = ''
      for (const [key, value] of emptyFieldsTracker) {
        let currentString = key
        if (key === 'billingAddress') currentString = 'Direccion de Facturacion'
        if (key === 'paymentMethod') currentString = 'Informacion de Pago'
        if (!value) {
          message += ` ${currentString} `
        }
      }

      Swal.fire({
        title: 'Disculpa pero no llenaste todos los campos, revisa tus datos para continuar con tu compra',
        text: `Agrega todos los datos requeridos para continuar con tu compra (Revisa la seccion de ${message})`,
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      })
      reject(new Error('ERROR Missing Elements' + message))
    }
  })
}

const updateSessionStorage = () => {
  checkFields.billingAddress.email = inputEmailBilling.value
  checkFields.billingAddress.address = inputAddressBilling.value
  checkFields.billingAddress.referencias = inputAddressBilling2.value
  checkFields.billingAddress.city = inputCityBilling.value
  checkFields.billingAddress.state = selectStateBilling.value
  checkFields.billingAddress.zip = inputZipBilling.value
  checkFields.shippingAddress.email = inputEmailShipping.value
  checkFields.shippingAddress.address = inputAddressShipping.value
  checkFields.shippingAddress.referencias = inputAddressShipping2.value
  checkFields.shippingAddress.city = inputCityShipping.value
  checkFields.shippingAddress.state = selectStateShipping.value
  checkFields.shippingAddress.zip = inputZipShipping.value
  checkFields.deliveryMethod.method = radioShipping.value
  checkFields.deliveryMethod.shippingAmount = shippingAmount()
  checkFields.paymentMethod.method = radioPayment.value
  checkFields.paymentMethod.cardName = inputName.value
  checkFields.paymentMethod.cardNumber = inputCardNumber.value
  checkFields.paymentMethod.cardExpiration = inputExpiry.value
  checkFields.paymentMethod.cardCvv = inputCvv.value
  sessionStorage.setItem('checkOut', JSON.stringify(checkFields))
}

const checkFields = {
  billingAddress: {
    email: '',
    address: '',
    referencias: '',
    city: '',
    state: '',
    zip: ''
  },
  shippingAddress: {
    email: '',
    address: '',
    referencias: '',
    city: '',
    state: '',
    zip: ''
  },
  deliveryMethod: {
    method: '',
    shippingAmount: ''
  },
  paymentMethod: {
    method: '',
    cardName: '',
    cardNumber: '',
    cardExpiration: '',
    cardCvv: ''
  }
}

const orderNumber = ` MX${Math.floor(Math.random() * 1000000000)}`

// sessionStorage Implementation
sessionStorage.setItem('checkOut', JSON.stringify(checkFields))

// Call Methods
printProducts()
printStates()
calculateTotal()
