import menuArray from './data.js';  // Import menuArray from data.js

const menuEl = document.getElementById('menu-container');
const yourOrderEl = document.getElementById('your-order-container');
const totalPriceEl = document.getElementById('total-price');
const yourOrderHeading = document.getElementById('your-order-heading');
const completeOrderBtn = document.querySelector('.complete-order-btn');
const cardDetailsPopup = document.getElementById('card-details-popup');
const paymentForm = document.getElementById('payment-form');
const orderSuccessMessage = document.getElementById('order-success-message');
const customerNameDisplay = document.getElementById('customer-name');

// Hide these elements initially
yourOrderHeading.style.display = 'none';
yourOrderEl.style.display = 'none';
totalPriceEl.style.display = 'none';
completeOrderBtn.style.display = 'none';

let orderItems = [];  // To track added items
let totalPrice = 0;   // To track total price

// Show the card details form when the "Complete Order" button is clicked
completeOrderBtn.addEventListener('click', function() {
    cardDetailsPopup.classList.remove('hidden');
});

// Handle form submission
paymentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    
    // Get the name entered by the user
    const name = document.getElementById('name').value;
    
    // Display the success message with the user's name
    customerNameDisplay.textContent = name;
    
    // Hide the card details popup and show the success message
    cardDetailsPopup.classList.add('hidden');
    orderSuccessMessage.classList.remove('hidden');
    
    // Optionally: Add logic to handle payment processing here
    // e.g., sending data to server or payment API

    yourOrderHeading.style.display = 'none';
    yourOrderEl.style.display = 'none';
    totalPriceEl.style.display = 'none';
    completeOrderBtn.style.display = 'none';
});

// Render the menu items
const menu = menuArray.map(item => {
    return ` 
        <div class="menu-item">
            <div class="menu-item-details">
                <div class="menu-item-image">
                    <img src="${item.image}">
                </div>
                <div class="menu-item-text">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <p id="price">$${item.price}</p>
                </div>
            </div>
            <div class="menu-item-button">
                <button class="add-button" data-order-btn="${item.name}">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>`;
}).join('');

menuEl.innerHTML = menu;

// Event listener for adding items to the order
document.addEventListener('click', function(e) {
    if (e.target.dataset.orderBtn) {
        addToMenu(e.target.dataset.orderBtn);
    }
});

function addToMenu(itemName) {
    const selectedItem = menuArray.find(item => item.name === itemName);

    if (selectedItem) {
        // Update total price and order items
        totalPrice += selectedItem.price;
        const existingItem = orderItems.find(item => item.name === itemName);
        
        if (!existingItem) {
            orderItems.push({...selectedItem, quantity: 1});
        } else {
            existingItem.quantity += 1;
        }
        
        renderOrderItems();
        updateTotalPrice();

        // Show the hidden elements when an item is added
        yourOrderHeading.style.display = 'block';
        yourOrderEl.style.display = 'block';
        totalPriceEl.style.display = 'block';
        completeOrderBtn.style.display = 'block';
    }
}

function renderOrderItems() {
    yourOrderEl.innerHTML = '';  // Clear previous items
    orderItems.forEach(item => {
        const orderHtml = `
            <div class="ordered-item" id="ordered-item">
                <div>
                    <p>${item.name} (${item.quantity}) <a class="remove-btn" href="#" data-remove-btn="${item.name}">remove</a></p>                        
                </div>
                <div>
                    <p>$${item.price * item.quantity}</p>
                </div>
            </div>`;
        yourOrderEl.innerHTML += orderHtml;
    });
}

function updateTotalPrice() {
    totalPriceEl.innerHTML = `
                            <div class="total-price" id="total-price">
                            <p>Total price: </p>
                            <p>$${totalPrice}</p>
                            </div>
    `;
}

// Event listener for removing items
document.addEventListener('click', function(e) {
    if (e.target.dataset.removeBtn) {
        removeFromMenu(e.target.dataset.removeBtn);
    }
});

function removeFromMenu(itemName) {
    const selectedItem = orderItems.find(item => item.name === itemName);

    if (selectedItem) {
        totalPrice -= selectedItem.price;
        selectedItem.quantity -= 1;

        if (selectedItem.quantity === 0) {
            orderItems = orderItems.filter(item => item.name !== itemName);
        }

        renderOrderItems();
        updateTotalPrice();

        // Hide order elements if no items left
        if (orderItems.length === 0) {
            yourOrderHeading.style.display = 'none';
            yourOrderEl.style.display = 'none';
            totalPriceEl.style.display = 'none';
            completeOrderBtn.style.display = 'none';
        }
    }
}
