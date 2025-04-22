let cartItems = [];
let saleActive = true;

// Initialize application
function init() {
    // Add event listeners
    document.getElementById('banner').addEventListener('click', toggleSale);
    
    // Add to cart buttons
    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', (e) => addToCart(e.target));
    });

    // Initial cart update
    updateCartDisplay();
}

// Toggle sale banner
function toggleSale() {
    const banner = document.getElementById('banner');
    saleActive = !saleActive;
    
    banner.style.backgroundColor = saleActive ? '#4ecdc4' : '#ff6b6b';
    banner.textContent = saleActive 
        ? '🎉 FLASH SALE: 30% OFF SELECTED ITEMS! 🎉' 
        : '⚠️ SALE ENDED - COME BACK SOON!';
}

// Add to cart functionality
function addToCart(button) {
    const productCard = button.closest('.product-card');
    const product = {
        id: productCard.dataset.id,
        name: productCard.querySelector('h3').textContent,
        price: productCard.dataset.price
    };

    cartItems.push(product);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCountSpan = document.getElementById('cartCount');
    
    // Clear current items
    cartItemsDiv.innerHTML = '';
    
    // Add new items
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div>${item.name}</div>
            <div>$${item.price}</div>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cartItems.splice(index, 1);
            updateCartDisplay();
        });

        cartItem.appendChild(removeBtn);
        cartItemsDiv.appendChild(cartItem);
    });

    // Update count
    cartCountSpan.textContent = cartItems.length;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);