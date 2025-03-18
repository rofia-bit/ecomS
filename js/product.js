// Sample product data (replace this with your actual data source)
const products = [
    {
        id: 1,
        name: "shirt",
        price: "5600da",
        image: "img/home11.jpg",
        description: "Comfortable and stylish t-shirt.",
        category: "T-shirts",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product1_thumb1.jpg", "img/product1_thumb2.jpg"],
        relatedProducts: [2, 3, 4]
    },
    {
        id: 2,
        name: "Polo Sweatshirt",
        price: "5600da",
        image: "img/featured.jpg",
        description: "Warm and stylish hoodie.",
        category: "Sweaters",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product2_thumb1.jpg", "img/product2_thumb2.jpg"],
        relatedProducts: [1, 3,4]
    },
    {
        id: 3,
        name: "Trackjacket",
        price: "3500da",
        image: "img/featured2.jpg",
        description: "Comfortable and stylish jacket.",
        category: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product3_thumb1.jpg", "img/product3_thumb2.jpg"],
        relatedProducts: [1, 2,6,7]
    },
    {
        id: 4,
        name: "jacket",
        price: "6800da",
        image: "img/featured3.jpg",
        description: "Comfortable and stylish sneakers.",
        category: "Shoes",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product4_thumb1.jpg", "img/product4_thumb2.jpg"],
        relatedProducts: [1, 2,5,6]
    },
    {
        id: 5,
        name: "Baggy Jeans",
        price: "5600da",
        image: "img/product1.jpg",
        description: "Comfortable and stylish baggy jeans.",
        category: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product1_thumb1.jpg", "img/product1_thumb2.jpg"],
        relatedProducts: [6, 7, 6,8,9]
    },
    {
        id: 6,
        name: "Leather Jacket",
        price: "9800da",
        image: "img/product2_thumb1.jpg",
        description: "Stylish leather jacket for a bold look.",
        category: "Jackets",
        sizes: ["S", "M", "L"],
        thumbnails: ["img/product2.jpg", "img/product2_thumb2.jpg"],
        relatedProducts: [5, 7]
    },
    {
        // <button class="products__button add-to-cart" title="Add to cart" data-id="7" data-name="Zip-Up Hoodie" data-price="4500" data-image="img/product3.jpg">
        id: 7,
        name: "Zip-Up Hoodie",
        price: "4500da",
        image: "img/product3.jpg",
        description: "comfy cotton hoodie.",
        category: "Sweaters",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product3_thumb1.jpg", "img/product3_thumb2.jpg"],
        relatedProducts: [5, 6]
    },
    {
        // title="Add to cart" data-id="8" data-name="Sweater" data-price="3500" data-image="img/product4.jpg">
        id: 8,
        name: "Sweater",
        price: "3500da",
        image: "img/product4.jpg",
        description: "comfy cotton sweater to wear everyday.",
        category: "sweaters",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product3_thumb1.jpg", "img/product3_thumb2.jpg"],
        relatedProducts: [7,9]
    },
    {
        // title="Add to cart" data-id="9" data-name="Super Baggy Jeans" data-price="6800" data-image="img/product5.jpg">
        id: 9,
        name: "Sneakers",
        price: "6800da",
        image: "img/product5.jpg",
        description: "super baggy jeans. high quality.",
        category: "jeans",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product3_thumb1.jpg", "img/product3_thumb2.jpg"],
        relatedProducts: [6,10]
    },
    {
        
        id: 10,
        name: "idk jeans",
        price: "6000",
        image: "img/home33.jpg",
        description: " for everyday wear.",
        category: "Shoes",
        sizes: ["S", "M", "L", "XL"],
        thumbnails: ["img/product3_thumb1.jpg", "img/product3_thumb2.jpg"],
        relatedProducts: [9,8,7,6]
    }
    // Add more products here...
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Find the product in the data
const product = products.find(p => p.id == productId);

if (product) {
    // Update breadcrumb
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;

    // Update product details
    document.getElementById('main-product-image').src = product.image;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;

    // Load thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    product.thumbnails.forEach(thumb => {
        const img = document.createElement('img');
        img.src = thumb;
        img.alt = "Thumbnail";
        img.classList.add('thumbnail');
        thumbnailContainer.appendChild(img);
    });

    // Load size options
    const sizeOptions = document.getElementById('size-options');
    product.sizes.forEach(size => {
        const button = document.createElement('button');
        button.textContent = size;
        button.classList.add('size-btn');
        sizeOptions.appendChild(button);
    });

    // Load related products
    const relatedProductsContainer = document.getElementById('related-products-container');
    product.relatedProducts.forEach(relatedId => {
        const relatedProduct = products.find(p => p.id == relatedId);
        if (relatedProduct) {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
                <h3>${relatedProduct.name}</h3>
                <p>${relatedProduct.price}</p>
            `;
            relatedProductsContainer.appendChild(productCard);
        }
    });

    // Add to cart functionality
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        const selectedSize = document.querySelector('.size-btn.active')?.textContent;

        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id == product.id && item.size == selectedSize);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                ...product,
                size: selectedSize,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    });

    // Quantity controls
    document.getElementById('increase-quantity').addEventListener('click', () => {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput.value < 10) quantityInput.value++;
    });

    document.getElementById('decrease-quantity').addEventListener('click', () => {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput.value > 1) quantityInput.value--;
    });

    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
} else {
    // If product not found, redirect to home page
    console.error("Product not found. Redirecting to index.html.");
    window.location.href = 'index.html';
}