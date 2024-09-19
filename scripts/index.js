import menuArray from './data.js';  // Import menuArray from data.js

const menuEl = document.getElementById('menu-container');
const addButton = document.getElementById('add-button')
const yourOrderEl = document.getElementById('your-order')
const orderContainer = document.getElementById('order-container')
const buttons = document.querySelectorAll('button');

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
                    <button class="add-button" id="add-button" data-order-btn="${item.name}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>`
}).join('')

menuEl.innerHTML = menu

document.addEventListener('click', function(e) {
   if(e.target.dataset.orderBtn){
    addToMenu(e.target.dataset.orderBtn)
   }
});


function addToMenu(clickedItem) {
    const orderHtml = ` 
                <div class="ordered-list" id="ordered-list">
                    <div>
                        <p>${item.name}</p>
                        <button class="remove-btn">remove</button>
                    </div>
                    <div>
                        <p>${item.price}</p>
                    </div>
                </div>
                <div class="ordered-list" id="ordered-list">
                    <div>
                        <p>Total price:</p>
                    </div>
                    <div>
                        <p>$30.99</p>
                    </div>
                </div>      
            `
    menuArray.forEach(item =>{
        if(item.name === clickedItem){
            yourOrderEl.innerHTML = orderHtml
        }
    })
}

{/* <div class="ordered-list" id="ordered-list">
                    <div>
                        <p>${item.name}</p>
                        <button class="remove-btn">remove</button>
                    </div>
                    <div>
                        <p>${item.price}</p>
                    </div>
                </div>
                <div class="ordered-list" id="ordered-list">
                    <div>
                        <p>Total price:</p>
                    </div>
                    <div>
                        <p>$30.99</p>
                    </div>
                </div> */}