/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    // Use window.scrollY instead of this.scrollY
    window.scrollY >= 50 ? header.classList.add('scroll-header') 
                         : header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    // Use window.scrollY instead of this.scrollY
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                          : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

// Cart functionality
const cart = {
    items: [],
    total: 0,
    updateCartDisplay: function() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalPrice = document.querySelector('.total-price');
        
        // Clear current items
        cartItemsContainer.innerHTML = '';
        
        // Add new items
        this.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}da</div>
                </div>
                <div class="cart-item-actions">
                    <button onclick="cart.decreaseQuantity('${item.id}')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="cart.increaseQuantity('${item.id}')">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update count and total
        cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        totalPrice.textContent = `${this.total}da`;
    },
    addItem: function(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.total += product.price;
        this.updateCartDisplay();
    },
    decreaseQuantity: function(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity--;
            this.total -= item.price;
            if (item.quantity === 0) {
                this.items = this.items.filter(i => i.id !== id);
            }
            this.updateCartDisplay();
        }
    },
    increaseQuantity: function(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity++;
            this.total += item.price;
            this.updateCartDisplay();
        }
    }
};

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image
        };
        cart.addItem(product);
    });
});

// Debugging: Test if the cart object is accessible
console.log("Cart object initialized:", cart);

// Debugging: Check if buttons are being selected
const addToCartButtons = document.querySelectorAll('.add-to-cart');
console.log("Found buttons:", addToCartButtons.length);

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: true, // Changed 'true' to true

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.querySelector('i').className = isDark ? 'bx bx-sun' : 'bx bx-moon';
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';

