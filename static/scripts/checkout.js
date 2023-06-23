'use strict'

// Shopping Cart Variable
let shoppingCart = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []

// Get the container
const container = document.querySelector('#products_container')

/**
 * print the products in the container. Version 2
 */
const printProducts = async () => {
  shoppingCart.forEach((product) => {
    const { id, name, quantity, desc, price, img, category } = product
    container.innerHTML += `
    <div name="${name}" class="card" style="width: 18rem; border:none;">
    <img src="${img}" class="card-img-top mt-2" alt="${name}">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Precio: $${price}</p>
        <p class="card-text">Cantidad: ${quantity || '<span>Agotados</span>'}</p>
        <p class="card-text">${desc}</p>
        <p class="card-text">Categoria: ${category}</p>
    </div>
    </div>
    `
  })
}

printProducts()
