# 🛒 LUNOR - E-commerce Website

LUNOR is a modern and responsive e-commerce web application where users can browse products, add items to cart, and place orders seamlessly.

---

## 🚀 Live Demo

🔗 https://lunorr.netlify.app

---

## ✨ Features

- 🛍️ Browse products with clean UI
- 🛒 Add to cart functionality
- 🔐 User authentication (Login / Register)
- 📦 Order management system
- 📱 Fully responsive design
- ⚡ Fast and smooth user experience

---

## 💳 Payment System

This project includes a simple manual payment system for order processing.

- Users can choose between **Cash on Delivery** or **Online Payment**
- When **Online Payment** is selected:
  - Bkash and Nagad payment numbers are displayed
  - Users must complete the payment externally
  - Then provide the **Transaction ID** to confirm the order

⚠️ Note: This is not an integrated payment gateway. It is a manual payment verification system.

---

## 🧑‍💻 Tech Stack

### Frontend:

- ⚛️ React / Next.js
- 🎨 Tailwind CSS
- 🎬 Framer Motion

### Backend:

- 🟢 Node.js
- 🚂 Express.js
- 🗄️ MongoDB

### Others:

- 🔥 Firebase (Auth)
- 🌐 REST API

---

## 📸 Screenshots

![Home Page](./src/assets/Screenshot%20from%202026-04-06%2000-37-58.png)
![Product Page](./src/assets/Screenshot%20from%202026-04-06%2000-38-25.png)
![Product Details Page](./src/assets/Screenshot%20from%202026-04-08%2003-10-03.png)

---

## 📦 Installation & Setup

```bash id="o4u3y9"
# Clone the repository
git clone https://github.com/Sark-Rakib/lunor-client.git

# Go to project folder
cd projects

# Install client dependencies
cd lunor-client
npm install

# Install server dependencies
cd ../lunor-server
npm install

# Run client
npm run dev

# Run server
nodemon index.js
```

---

## 🔐 Environment Variables

Create a `.env` file and add:

```env id="j5p8mz"
MONGODB_URI=your_mongodb_uri
FIREBASE_API_KEY=your_key
```

---

## 🤝 Connect with Me

- 📧 Email: [mdrakibsarkar1@gmail.com](mailto:mdrakibsarkar1@gmail.com)
- 💼 LinkedIn: https://www.linkedin.com/in/rakib-sarker-
- 💻 GitHub: https://github.com/Sark-Rakib

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
