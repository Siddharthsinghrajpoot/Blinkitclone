Blinkit Clone (Full Stack)

A simplified Blinkit-like application built with React.js (frontend) and Node.js/Express (backend) with MongoDB database. This project allows users to view products, login/signup, and add items to the cart.


Features

Product listing page

Product detail page

Add to cart functionality

View cart with total price

User authentication (signup/login)

Responsive design for mobile and desktop


Tech Stack

Frontend: React.js, Tailwind CSS, Axios, React Router DOM

Backend: Node.js, Express.js

Database: MongoDB

Other: React Context API for state management


Setup & Run
Backend
  Go to backend folder:
   cd backend

Install dependencies:
npm install

Create a .env file with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start server:
npm run dev

Frontend
Go to frontend folder:

cd frontend

Install dependencies:
npm install

Create a .env file with:
VITE_API_URL=http://localhost:5000/

Start frontend:
npm run dev

Users need to signup/login to add items to the cart.

Cart total price and items are visible in the Cart page.

Admin panel is optional and not included.



