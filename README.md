# 🛍️ ShopEase – Mini E-Commerce Shopping App

ShopEase is a beginner-friendly, interactive mini e-commerce web application built using HTML, CSS and JavaScript. It provides a simple shopping experience where users can explore products, add items to their cart, manage quantities and preview their orders.

## ✨ Features

- Dynamic product catalogue using JavaScript objects.
- Add products to the shopping cart.
- Increase and decrease product quantities.
- Remove products from the cart.
- Automatic cart item count.
- Automatic subtotal and grand total calculation.
- ₹49 delivery fee for non-empty carts.
- Indian currency formatting using `toLocaleString()`.
- Checkout preview using HTML dialog.
- Cart persistence using localStorage.
- Responsive design for mobile, tablet and desktop.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- JavaScript Array Methods (`map`, `find`, `reduce`)
- localStorage

## 📂 Project Structure

```text
ShopEase-Mini-Ecommerce/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/ShopEase-Mini-Ecommerce.git
   ```

2. Open the project folder in VS Code.
3. Open `index.html` using Live Server.
4. Start exploring ShopEase!

## 💰 Cart Calculation

The subtotal is calculated by multiplying each product's price by its quantity and adding the results using JavaScript's `reduce()` method.

```javascript
const subtotal = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const product = products.find(item => item.id === Number(id));
    return sum + (product ? product.price * quantity : 0);
}, 0);
```

The grand total is calculated as:

**Grand Total = Subtotal + Delivery Fee**

A ₹49 delivery fee applies when the cart contains products. The cart is free of delivery charges when empty.

## 🛒 Checkout Preview

The checkout dialog displays selected products, quantities, subtotal, delivery fee and grand total.

**Note:** This is a demonstration project. No actual payment is processed or collected.


## 👩‍💻 Developer

**Deepti Singh**

- GitHub: https://github.com/singhdeepti166

## 📌 Project Information

Developed as part of the **InternCircle Full Stack Web Development Virtual Internship**.

© 2026 ShopEase. All rights reserved.
