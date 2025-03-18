document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    
    
    // Populate wilayas dropdown
    populateWilayasDropdown();
    
    // Display checkout items
    displayCheckoutItems();
    
    // Calculate and display order summary
    updateOrderSummary();
    
    // Set up event listeners
    setupEventListeners();
    
    // Redirect to home if cart is empty
    const cart = getCart();
    if (cart.length === 0) {
      window.location.href = 'index.html';
    }
});

// Define wilayas array
const wilayas = [
    { code: '01', name: 'Adrar', shipping: 600 },
    { code: '02', name: 'Chlef', shipping: 500 },
    { code: '03', name: 'Laghouat', shipping: 400 },
    { code: '04', name: 'Oum El Bouaghi', shipping: 300 },
    { code: '05', name: 'Batna', shipping: 200 },
    { code: '06', name: 'Béjaïa', shipping: 100 },
    { code: '07', name: 'Biskra', shipping: 900 },
    { code: '08', name: 'Béchar', shipping: 800 },
    { code: '09', name: 'Blida', shipping: 700 },
    { code: '10', name: 'Bouira', shipping: 600 },
    { code: '11', name: 'Tamanrasset', shipping: 500 },
    { code: '12', name: 'Tébessa', shipping: 400 },
    { code: '13', name: 'Tlemcen', shipping: 300 },
    { code: '14', name: 'Tiaret', shipping: 200 },
    { code: '15', name: 'Tizi Ouzou', shipping: 100 },
    { code: '16', name: 'Alger', shipping: 900 },
    { code: '17', name: 'Djelfa', shipping: 800 },
    { code: '18', name: 'Jijel', shipping: 700 },
    { code: '19', name: 'Sétif', shipping: 600 },
    { code: '20', name: 'Saïda', shipping: 500 },
    { code: '21', name: 'Skikda', shipping: 400 },
    { code: '22', name: 'Sidi Bel Abbès', shipping: 300 },
    { code: '23', name: 'Annaba', shipping: 200 },
    { code: '24', name: 'Guelma', shipping: 100 },
    { code: '25', name: 'Constantine', shipping: 900 },
    { code: '26', name: 'Médéa', shipping: 800 },
    { code: '27', name: 'Mostaganem', shipping: 700 },
    { code: '28', name: 'M\'sila', shipping: 600 },
    { code: '29', name: 'Mascara', shipping: 500 },
    { code: '30', name: 'Ouargla', shipping: 400 },
    { code: '31', name: 'Oran', shipping: 300 },
    { code: '32', name: 'El Bayadh', shipping: 200 },
    { code: '33', name: 'Illizi', shipping: 100 },
    // Add more wilayas as needed
];

// Function to populate wilayas dropdown
function populateWilayasDropdown() {
    const wilayaSelect = document.getElementById('wilaya');
    
    // Clear existing options (except the first one)
    while (wilayaSelect.options.length > 1) {
      wilayaSelect.remove(1);
    }
    
    // Add wilaya options
    wilayas.forEach(wilaya => {
      const option = document.createElement('option');
      option.value = wilaya.code;
      option.textContent = wilaya.name;
      option.dataset.shipping = wilaya.shipping;
      wilayaSelect.appendChild(option);
    });
}

// Function to display checkout items
function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const cart = getCart();
    
    // Clear the container first
    checkoutItemsContainer.innerHTML = '';
    
    // Loop through cart items and create checkout item elements
    cart.forEach(item => {
      const checkoutItem = document.createElement('div');
      checkoutItem.className = 'checkout-item';
      
      // Find the product details
      const product = products.find(p => p.id === item.productId);
      
      if (product) {
        checkoutItem.innerHTML = `
          <div class="checkout-item-image">
            <img src="${product.images[0]}" alt="${product.name}">
          </div>
          <div class="checkout-item-details">
            <p class="checkout-item-name">${product.name}</p>
            <p class="checkout-item-size">Size: ${item.size}</p>
            <p class="checkout-item-quantity">Quantity: ${item.quantity}</p>
          </div>
          <div class="checkout-item-price">
            ${formatPrice(product.price * item.quantity)}
          </div>
        `;
        
        checkoutItemsContainer.appendChild(checkoutItem);
      }
    });
}

// Function to update order summary
function updateOrderSummary() {
    const cart = getCart();
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const totalElement = document.getElementById('checkout-total');
    const wilayaSelect = document.getElementById('wilaya');
    const yalidinePrice = document.getElementById('yalidine-price');
    
    // Calculate subtotal
    let subtotal = 0;
    
    cart.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });
    
    // Get shipping cost based on selected wilaya
    let shipping = 0; // Default to 0
    let shippingDA = 600; // Default shipping (600 DA)
    
    if (wilayaSelect.selectedIndex > 0) {
      const selectedOption = wilayaSelect.options[wilayaSelect.selectedIndex];
      shippingDA = parseFloat(selectedOption.dataset.shipping);
      shipping = shippingDA / 139; // Convert DA to USD (approximately)
    }
    
    // Update yalidine price display
    yalidinePrice.textContent = `${shippingDA} DA`;
    
    // Calculate total
    const total = subtotal + shipping;
    
    // Update summary elements
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    totalElement.textContent = formatPrice(total);
}

// Function to set up event listeners
function setupEventListeners() {
    const shippingForm = document.getElementById('shipping-form');
    const wilayaSelect = document.getElementById('wilaya');
    
    // Wilaya select change
    wilayaSelect.addEventListener('change', function() {
      updateOrderSummary();
    });
    
    // Form submission
    shippingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form
      if (!validateForm()) {
        return;
      }
      
      // Get form data
      const formData = new FormData(shippingForm);
      const orderData = {
        customer: {
          fullName: formData.get('fullname'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          wilaya: formData.get('wilaya')
        },
        items: getCart(),
        shippingMethod: formData.get('shipping-method'),
        paymentMethod: formData.get('payment-method')
      };
      
      // Here you would typically send the order data to a server
      console.log('Order placed:', orderData);
      
      // Show confirmation message
      showOrderConfirmation();
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Wait 2 seconds then redirect to the home page
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 2000);
    });
}

// Function to validate the form
function validateForm() {
    const form = document.getElementById('shipping-form');
    return form.checkValidity();
}

// Function to show order confirmation
function showOrderConfirmation() {
    // Create and show a modal or alert
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'order-confirmation';
    confirmationDiv.innerHTML = `
      <div class="confirmation-content">
        <div class="confirmation-icon">✓</div>
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
      </div>
    `;
    
    // Add styles
    const styles = `
      .order-confirmation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      .confirmation-content {
        background-color: white;
        padding: 40px;
        border-radius: 8px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .confirmation-icon {
        width: 60px;
        height: 60px;
        background-color: #4CAF50;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 20px;
        font-size: 30px;
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    
    // Add to the document
    document.body.appendChild(confirmationDiv);
}
