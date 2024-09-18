import menuArray from './data.js';  // Import menuArray from data.js

const menuEl = document.getElementById('menu-container');
const addButton = document.getElementById('add-button')

const menu = menuArray.map(item => {
    return ` <div class="menu-item">
                <div class="menu-item-details">
                    <div class="menu-item-image">
                        <img src="${item.image}">
                    </div>
                    <div class="menu-item-text">
                        <h2>${item.name}</h2>
                        <p>${item.ingredients}</p>
                        <p id="price">$${item.price}</p>
                    </div>
                </div>
                <div class="menu-item-button">
                    <button id="add-button">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>`
}).join('')

menuEl.innerHTML = menu


addButton.addEventListener('click', function(){
    console.log('button clicked')
})