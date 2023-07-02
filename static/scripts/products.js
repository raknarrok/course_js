'use strict'

// Shopping Cart Variable
let shoppingCart = []

// Get the container
const container = document.querySelector('#products_container')
const numberProducts = document.querySelector('#numberProducts')
const totalAmount = document.querySelector('#totalAmount')
const btnBuy = document.querySelector('#btnBuy')

/**
 * Load the products from the database to the shopping cart.
 * Converts the JSON string to an array and stores it in the 'shoppingCart' key.
 * If the key does not exist, it creates it.
*/
document.addEventListener('DOMContentLoaded', () => {
  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
  showShoppingCart()
})

/**
 * Adds a product to the shopping cart based on its ID.
 * If the item is already in the shopping cart, the quantity is increased.
 * @param {number} id - The ID of the product to be added to the shopping cart.
 */
const addProduct = async (id) => {
  // Verify if the product is already in the shopping cart
  const isOnCart = shoppingCart.some((product) => product.id === id)

  // Search for Item on our stock
  const arrayProducts = await fetchData()
  const item = arrayProducts.find((product) => product.id === id)

  if (isOnCart) {
    shoppingCart = shoppingCart.map((product) => {
      if (product.id === id) {
        product.quantity++
        if (product.quantity >= item.quantity) {
          Swal.fire({
            title: `Disculpa pero solo tenemos ${item.quantity} productos en stock :(`,
            text: '¿Quieres que te notifiquemos cuando tengamos mas?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si por favor',
            cancelButtonText: 'No, gracias'
          })
          product.quantity = item.quantity
        } else {
          let timerInterval
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado!',
            text: 'Revisa tu carrito',
            timer: 1500,
            timerProgressBar: true,
            showCloseButton: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('Modal Closed')  
            }
          })
        }
      }
      return product
    })
  } else {
    item.quantity = 1 // Increace in 1 the quantity of the product

    let timerInterval
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado!',
      text: 'Revisa tu carrito',
      timer: 1500,
      timerProgressBar: true,
      showCloseButton: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Modal Closed')
      }
    })

    // If item is already on the shopping cart, increase quantity
    shoppingCart.push(item)
    btnBuy.disabled = false
    btnClean.disabled = false
  }

  // Update the display of the shopping cart
  showShoppingCart()
}

const showShoppingCart = async () => {
  const modalBody = document.querySelector('#productAdded')
  modalBody.innerHTML = ''

  const dbArrayData = await fetchData() // Get the products from the database
  shoppingCart.forEach((product) => {
    const { id, name, quantity, desc, price, img, category } = product
    const maxQuantity = dbArrayData.find((product) => product.id === id).quantity

    modalBody.innerHTML += `
      <div class="modal-container border">
      <div>
        <img src="${img}" class="card-img-top mt-2" alt="${name}"/>
      </div>
      <div class="mb-1">
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Precio</b> $${price}</p>
          <p><b>Disponible:</b> <input id="textInput${id}" onchange="catchUpdate(event, '${id}')" type="number" style="width:5em" value="${quantity}" min="1" max="${maxQuantity}"/></p>
          <p><b>Descripcion:</b> ${desc}</p>
          <p><b>Categoria:</b> ${category}</p>
          <button id="btnId${id}" class="btn btn-danger" onclick="deleteProduct(${id})">
            Eliminar
          </button>
        </div>
      </div>
    `
  })

  if (shoppingCart.length === 0) {
    modalBody.innerHTML = `
      <p class="text-center">No hay productos en el carrito</p>
  `
  }

  // Update the total price in the shopping cart
  totalAmount.textContent = shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0)

  numberProducts.textContent = shoppingCart.length
  // Update the total price in the shopping cart
  saveProducts()
}

/**
 * Deletes a product from the shopping cart based on its ID.
 * @param {number} id - The ID of the product to be deleted.
 * @returns {boolean} - Returns true if the product was successfully deleted, false otherwise.
 */
const deleteProduct = (id) => {
  // Find the index of the product in the shopping cart array
  const isOnCart = shoppingCart.findIndex((product) => product.id === id)

  if (shoppingCart[isOnCart].quantity > 1) {
    const product = shoppingCart.map((product) => {
      if (product.id === id) {
        product.quantity--
      }
    })
  } else {
    // Remove the product from the shopping cart by splicing the array
    shoppingCart.splice(isOnCart, 1)
  }

  // Disable the buy/clear button if the shopping cart is empty
  shoppingCart.length === 0 ? btnBuy.disabled = true : btnBuy.disabled = false
  shoppingCart.length === 0 ? btnClean.disabled = true : btnClean.disabled = false

  // If the product is not found, return false
  if (isOnCart === -1) return false

  // Update the display of the shopping cart
  showShoppingCart()

  // Return true to indicate the product was successfully deleted
  return true
}

/**
 * Continue With the buy and checkout
 */
btnBuy.onclick = () => {
  if (shoppingCart.length === 0) {
    Swal.fire({
      title: 'No tienes productos',
      text: 'Agrega productos al carrito para continuar',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    })
  } else {
    location.href = '../pages/checkout.html'
  }
}

/**
 * Save the produces in the shopping cart to the database.
 * Converts the shopping cart array to a JSON string and stores it in the 'shoppingCart' key.
 */
const saveProducts = () => {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

/**
 * Clean the shopping cart.
 * Removes the 'shoppingCart' key from the database.
 */
const btnClean = document.querySelector('#btnClean')
btnClean.onclick = () => {
  const isOriginalValue = shoppingCart.findIndex((product) => product.quantity >= 1)
  if (shoppingCart[isOriginalValue].quantity >= 1) {
    const product = shoppingCart.map((product) => {
      if (product.quantity > 1) {
        product.quantity = 1
      }
    })
  }

  btnBuy.disabled = true
  btnClean.disabled = true
  shoppingCart = []
  showShoppingCart()
}

/**
 * Clear the search field.
 * Restore the filtering of the products.
 */
const btnClearFilter = document.querySelector('#btnClearFilter')
btnClearFilter.onclick = () => {
  const cards = document.querySelectorAll('#products_container .card')

  for (const items in cards) {
    showElements(cards[items])
  }
}

/*
* Hidde Elements not matching with the search
*/
const btnSearch = document.querySelector('#btnSearch')
btnSearch.onclick = () => {
  let textSearch = document.querySelector('#searchText').value
  const cards = Array.from(document.querySelectorAll('#products_container .card'))
  textSearch = textSearch.toLowerCase()

  for (const card of cards) { // Usar bucle for...of para iterar sobre el array
    const currentText = card.getAttribute('name')
    if (currentText.toLowerCase().includes(textSearch)) {
      showElements(card)
    } else {
      hideElements(card)
    }
  }
}

// Hide the elements with out the filter value
const hideElements = (element) => {
  element.style.display = 'none'
  document.querySelector('#searchText').value = ''
}

// Show the elements with out the filter value
const showElements = (element) => {
  if (element && element.style) {
    element.style.display = 'block'
  }
}

const btnCart = document.querySelector('#btnCart')
btnCart.onclick = () => {
  const isOriginalValue = shoppingCart.findIndex((product) => product.quantity >= 1)

  isOriginalValue !== 0 ? btnBuy.disabled = true : btnBuy.disabled = false
  isOriginalValue !== 0 ? btnClean.disabled = true : btnClean.disabled = false
}

/**
 * Retrieve Hardcoded data from the database.
 */
const fetchData = async () => {
  const objResponse = await fetch('../static/scripts/db.js')
  const objJson = await objResponse.json()

  return objJson
}

/**
 * Update the value in the shopping cart.
 */
const catchUpdate = async (event, idElement) => {
  const newValue = event.target.value
  const dbArrayData = await fetchData() // Get the products from the database
  const maxQuantity = dbArrayData.find((product) => product.id == idElement).quantity

  if (newValue > maxQuantity) {
    event.target.value = maxQuantity.quantity
    document.querySelector(`#textInput${idElement}`).value = maxQuantity
    Swal.fire({
      title: `Disculpa pero solo tenemos ${maxQuantity} productos en stock :(`,
      text: '¿Quieres que te notifiquemos cuando tengamos mas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si por favor',
      cancelButtonText: 'No, gracias'
    })
  } else {
    // Update the new element in our localStorage
    const product = shoppingCart.map((product) => {
      if (product.id == idElement) {
        product.quantity = newValue
      }
    })
    // Update the total price in the shopping cart
    totalAmount.textContent = shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
    numberProducts.textContent = shoppingCart.length

    // Update the total price in the shopping cart
    saveProducts()
  }
}

/**
 * print the products in the container. Version 2
 */
const printProducts = async () => {
  const arrayProducts = await fetchData()

  arrayProducts.forEach((product) => {
    const { id, name, quantity, desc, price, img, category } = product
    container.innerHTML += `
    <div name="${name}" class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top mt-2" alt="${name}">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Precio: $${price}</p>
        <p class="card-text">Disponible: ${quantity || '<span>Agotados</span>'}</p>
        <p class="card-text">${desc}</p>
        <p class="card-text">Categoria: ${category}</p>
        <button id="btnId${id}" onclick="addProduct(${id})" class="btn btn-primary" ${quantity || 'disabled'}>
            Agregar
        </button>
    </div>
    </div>
    `
  })
}

printProducts()
