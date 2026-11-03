
const products = [
    { id: 1, name: "Wireless Headphones", price: 1499, category: "Electronics", image: "🎧" },
    { id: 2, name: "Smart Watch", price: 1999, category: "Electronics", image: "⌚" },
    { id: 3, name: "Casual Backpack", price: 899, category: "Accessories", image: "🎒" },
    { id: 4, name: "Running Shoes", price: 2499, category: "Fashion", image: "👟" },
    { id: 5, name: "Mechanical Keyboard", price: 1799, category: "Electronics", image: "⌨️" },
    { id: 6, name: "Sunglasses", price: 699, category: "Fashion", image: "🕶️" },
    { id: 7, name: "Bluetooth Speaker", price: 1299, category: "Electronics", image: "🔊" },
    { id: 8, name: "Desk Lamp", price: 799, category: "Home", image: "💡" }
];

const DELIVERY_FEE = 49;

let cart = {};

const productContainer = document.getElementById("product-list");
const cartContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("grand-total");

const checkoutDialog = document.getElementById("checkout-dialog");
const checkoutSummary = document.getElementById("checkout-summary");

const formatMoney = (amount) => {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR"
    });
};

// Load saved cart
function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem("shopease-cart"));
        if (savedCart && typeof savedCart === "object" && !Array.isArray(savedCart)) {
            cart = Object.fromEntries(
                Object.entries(savedCart).filter(([id, quantity]) =>
                    products.some(product => product.id === Number(id)) &&
                    Number.isInteger(quantity) &&
                    quantity > 0
                )
            );
        }
    } catch (error) {
        cart = {};
    }
}

// Save cart
function saveCart() {
    localStorage.setItem("shopease-cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="price">${formatMoney(product.price)}</p>
            <button class="add-btn" data-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// Add product to cart
function addToCart(id) {
    const product = products.find(item => item.id === Number(id));

    if (!product) return;

    cart[id] = (cart[id] || 0) + 1;

    saveCart();
    renderCart();
}

// Change product quantity
function changeQuantity(id, delta) {
    if (!cart[id]) return;

    cart[id] += delta;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    saveCart();
    renderCart();
}

// Remove product
function removeItem(id) {
    delete cart[id];

    saveCart();
    renderCart();
}

// Calculate subtotal
function calculateSubtotal() {
    return Object.entries(cart).reduce((sum, [id, quantity]) => {
        const product = products.find(item => item.id === Number(id));

        return sum + (product ? product.price * quantity : 0);
    }, 0);
}

// Calculate delivery
function calculateDelivery(subtotal) {
    return subtotal === 0 ? 0 : DELIVERY_FEE;
}

// Render shopping cart
function renderCart() {
    const entries = Object.entries(cart);

    const itemCount = entries.reduce((sum, [, quantity]) => {
        return sum + quantity;
    }, 0);

    cartCount.textContent = itemCount;

    if (entries.length === 0) {
        cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty. Start shopping!
            </p>
        `;
    } else {
        cartContainer.innerHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${entries.map(([id, quantity]) => {
                        const product = products.find(
                            item => item.id === Number(id)
                        );

                        if (!product) return "";

                        return `
                            <tr>
                                <td>${product.image} ${product.name}</td>
                                <td>${formatMoney(product.price)}</td>
                                <td>
                                    <button data-action="decrease" data-id="${id}">−</button>
                                    ${quantity}
                                    <button data-action="increase" data-id="${id}">+</button>
                                </td>
                                <td>${formatMoney(product.price * quantity)}</td>
                                <td>
                                    <button class="remove-btn" data-action="remove" data-id="${id}">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        `;
    }

    const subtotal = calculateSubtotal();
    const delivery = calculateDelivery(subtotal);
    const grandTotal = subtotal + delivery;

    subtotalElement.textContent = formatMoney(subtotal);
    deliveryElement.textContent = formatMoney(delivery);
    totalElement.textContent = formatMoney(grandTotal);
}

// Checkout preview
function openCheckout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const subtotal = calculateSubtotal();
    const delivery = calculateDelivery(subtotal);
    const grandTotal = subtotal + delivery;

    checkoutSummary.innerHTML = `
        <h3>Order Summary</h3>
        ${Object.entries(cart).map(([id, quantity]) => {
            const product = products.find(
                item => item.id === Number(id)
            );

            if (!product) return "";

            return `
                <p>
                    ${product.name} × ${quantity}
                    <strong>${formatMoney(product.price * quantity)}</strong>
                </p>
            `;
        }).join("")}

        <hr>
        <p>Subtotal: ${formatMoney(subtotal)}</p>
        <p>Delivery: ${formatMoney(delivery)}</p>
        <h3>Grand Total: ${formatMoney(grandTotal)}</h3>
        <p>This is a demonstration checkout. No payment will be taken.</p>
    `;

    checkoutDialog.showModal();
}

// Close checkout
function closeCheckout() {
    checkoutDialog.close();
}

// Event delegation for product buttons
productContainer.addEventListener("click", event => {
    const button = event.target.closest(".add-btn");

    if (button) {
        addToCart(button.dataset.id);
    }
});

// Event delegation for cart buttons
cartContainer.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
        changeQuantity(id, 1);
    } else if (action === "decrease") {
        changeQuantity(id, -1);
    } else if (action === "remove") {
        removeItem(id);
    }
});

// Initial setup
loadCart();
renderProducts();
renderCart();
