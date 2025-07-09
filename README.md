MERN E-Commerce with RTK Query
📝 Description
A modern mini e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) featuring Redux Toolkit (RTK) Query for efficient data fetching and state management. The application includes product listings, a shopping cart, checkout functionality, and responsive design.

🚀 Live Demo
View Live Demo on Vercel :- 
https://miniecommercefrontend.vercel.app/

🛠️ Tech Stack
Frontend:

React 18

Redux Toolkit (RTK) with RTK Query

Tailwind CSS

React Router v6

React Icons

Backend:

Node.js

Express.js

MongoDB (with Mongoose)

Dev Tools:

Vite (Frontend Build Tool)

ESLint + Prettier

Husky (Git hooks)

🏃‍♂️ How to Run Locally
Prerequisites
Node.js (v16 or higher)

MongoDB (local instance or MongoDB Atlas)

Git

Setup Instructions
Clone the repository:

bash
git clone https://github.com/FahimAhamed101/miniecommerce
cd mern-ecommerce-rtk
Set up environment variables:

Create .env files in both client and server directories

Example .env for server:

text
PORT=5000
DB_URL=mongodb://localhost:27017/ecommerce

miniecommerce/utils/getbaseurl path must be changed

Install dependencies:

bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Run the application:

bash
# From root directory, run both client and server concurrently
npm run dev
Or separately:

bash
# In one terminal (server)
cd server
npm start

# In another terminal (client)
cd client
npm run dev
Access the application:

Frontend: http://localhost:5173

Backend API: http://localhost:5000/


🔥 Features
Product Catalog:

Browse products with pagination

Product details page


Shopping Cart:

Add/remove items

Adjust quantities

Persistent cart (saved to localStorage)

Checkout Process:

Multi-step checkout

Order confirmation


📚 API Documentation
The backend API follows RESTful principles with these main endpoints:
GET /api/products- Get all products
GET /api/products/create-product - create all products

GET /api/products/:id - Get single product

POST /api/update-product/:id - update product

GET /api/:id - delete product





🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

✉️ Contact
For questions or feedback, please contact:

Your Name - fahimahamedweb@gmail.com

Project Link: https://github.com/FahimAhamed101/miniecommerce