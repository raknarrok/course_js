'use strict'
// Products List & details
const stockProducts = [
  {
    id: 1,
    name: 'Collar de perlas',
    quantity: 0,
    desc: 'Collar de perlas de agua dulce, con cierre de plata 925',
    price: 1200,
    img: '../static/images/productos/collares/perlas.png',
    category: 'collares'
  },
  {
    id: 2,
    name: 'Collar de plata',
    quantity: 1,
    desc: 'Collar de plata 925, con dije de perla de agua dulce',
    price: 1500,
    img: '../static/images/productos/collares/plata.png',
    category: 'collares'
  },
  {
    id: 3,
    name: 'Collar de oro',
    quantity: 1,
    desc: 'Collar de oro 18k, con dije de perla de agua dulce',
    price: 2000,
    img: '../static/images/productos/collares/oro.png',
    category: 'collares'
  },
  {
    id: 4,
    name: 'Collar de diamantes',
    quantity: 1,
    desc: 'Collar de oro 18k, con dije de perla de agua dulce y diamantes',
    price: 3000,
    img: '../static/images/productos/collares/diamantes.png',
    category: 'collares'
  },
  {
    id: 5,
    name: 'Pulsera de perlas',
    quantity: 1,
    desc: 'Pulsera de perlas de agua dulce, con cierre de plata 925',
    price: 800,
    img: '../static/images/productos/pulseras/perlas.png',
    category: 'pulseras'
  },
  {
    id: 6,
    name: 'Pulsera de plata',
    quantity: 1,
    desc: 'Pulsera de plata 925, con dije de perla de agua dulce',
    price: 1000,
    img: '../static/images/productos/pulseras/plata.png',
    category: 'pulseras'
  },
  {
    id: 7,
    name: 'Pulsera de oro',
    quantity: 1,
    desc: 'Pulsera de oro 18k, con dije de perla de agua dulce',
    price: 1500,
    img: '../static/images/productos/pulseras/oro.png',
    category: 'pulseras'
  },
  {
    id: 8,
    name: 'Pulsera de diamantes',
    quantity: 1,
    desc: 'Pulsera de oro 18k, con dije de perla de agua dulce y diamantes',
    price: 2500,
    img: '../static/images/productos/pulseras/diamantes.png',
    category: 'pulseras'
  },
  {
    id: 9,
    name: 'Anillo de perlas',
    quantity: 1,
    desc: 'Anillo de perlas de agua dulce, con cierre de plata 925',
    price: 1000,
    img: '../static/images/productos/anillos/perlas.png',
    category: 'anillos'
  },
  {
    id: 10,
    name: 'Anillo de plata',
    quantity: 1,
    desc: 'Anillo de plata 925, con dije de perla de agua dulce',
    price: 1200,
    img: '../static/images/productos/anillos/plata.png',
    category: 'anillos'
  },
  {
    id: 11,
    name: 'Anillo de oro',
    quantity: 1,
    desc: 'Anillo de oro 18k, con dije de perla de agua dulce',
    price: 1800,
    img: '../static/images/productos/anillos/oro.png',
    category: 'anillos'
  },
  {
    id: 12,
    name: 'Anillo de diamantes',
    quantity: 1,
    desc: 'Anillo de oro 18k, con dije de perla de agua dulce y diamantes',
    price: 3000,
    img: '../static/images/productos/anillos/diamantes.png',
    category: 'anillos'
  }]

// Shopping Cart Variable
let shoppingCart = []

// Get the container
const contaier = document.querySelector('#products_container')
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

// Create the HTML for each product
stockProducts.forEach((product) => {
  // Destructuring
  const { id, name, quantity, desc, price, img, category } = product
  contaier.innerHTML += `
    <div name="${name}" class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top mt-2" alt="${name}">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Precio: $${price}</p>
        <p class="card-text">Cantidad: ${quantity || '<span>Agotados</span>'}</p>
        <p class="card-text">${desc}</p>
        <p class="card-text">Categoria: ${category}</p>
        <button onclick="addProduct(${id})" class="btn btn-primary ${quantity || 'disabled'}">
            Agregar
        </button>
    </div>
    </div>
    `
})

/**
 * Adds a product to the shopping cart based on its ID.
 * If the item is already in the shopping cart, the quantity is increased.
 * @param {number} id - The ID of the product to be added to the shopping cart.
 */
const addProduct = (id) => {
  // Verify if the product is already in the shopping cart
  const isOnCart = shoppingCart.some((product) => product.id === id)

  if (isOnCart) {
    const product = shoppingCart.map((product) => {
      if (product.id === id) {
        product.quantity++
      }
    })
  } else {
    // Search for Item on our stock
    const item = stockProducts.find((product) => product.id === id)

    // If item is already on the shopping cart, increase quantity
    shoppingCart.push(item)
    btnBuy.disabled = false
    btnClean.disabled = false
  }

  // Update the display of the shopping cart
  showShoppingCart()
}

const showShoppingCart = () => {
  const modalBody = document.querySelector('#productAdded')
  modalBody.innerHTML = ''

  shoppingCart.forEach((product) => {
    const { id, name, quantity, desc, price, img, category } = product
    modalBody.innerHTML += `
      <div class="modal-container border">
      <div>
        <img src="${img}" class="card-img-top mt-2" alt="${name}"/>
      </div>
      <div class="mb-1">
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Precio</b> $${price}</p>
          <p><b>Cantidad:</b> ${quantity}</p>
          <p><b>Descripcion:</b> ${desc}</p>
          <p><b>Categoria:</b> ${category}</p>
          <button class="btn btn-danger" onclick="deleteProduct(${id})">
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
    location.href = '/checkout.html'
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
  const cards = document.querySelectorAll('#products_container .card')
  textSearch = textSearch.toLowerCase()

  for (const items in cards) {
    const currentText = cards[items].getAttribute('name')
    if (currentText.toLowerCase().includes(textSearch)) {
      showElements(cards[items])
    } else {
      hideElements(cards[items])
    }
  }
}

// Hide the elements with out the filter value
const hideElements = (element) => {
  element.style.display = 'none'
}

// Show the elements with out the filter value
const showElements = (element) => {
  element.style.display = 'block'
}
