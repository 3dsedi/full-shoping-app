# fullStack Store

## Shopping Website
Welcome to our shopping website! 
This application is built using Node.js and MongoDB for the backend, 
providing features like user management, product handling, and shopping cart functionality.
I have two types of users - admins and regular users.
I use JWT (JSON Web Token) for user authentication and to secure sensitive routes and actions.
The frontend of this shopping website is built using React and Vite for fast and optimized development.
It provides a user-friendly and intuitive interface for shopping and managing products.


## Features
### Admins
Admins can create their own shops and manage their products.
They have the ability to add new products, delete existing ones, and view the number of items sold.
Admins can sort their products to manage them more efficiently.

### Users
Users can view all products available in all shops.
They can browse through various categories of products.
Users can add products to their shopping carts and remove them as well.
They can view the total amount they need to pay for the items in their carts.
Users can sort products based on their categories for better browsing.

## Installation

NOTE:
To run the backend, ensure you have MongoDB installed and running on your system.
The backend requires a connection to a MongoDB database to store and retrieve data. 
In this project, i am providing the MongoDB connection string and JWT Token in a .env file for easy access.

In a production environment, sensitive information like the MongoDB connection string should not be exposed in 
a .env file. Instead, it should be handled securely using environment variables or a configuration management system.
For this demonstration, I have included the .env file in the repository, but please keep in mind that this is
not recommended for production use.

1. Clone the repository:
 ```bash
git clone https://github.com/3dsedi/full-shoping-app
cd full-shoping-app
```
2. Backend Setup:
```bash
cd server
npm start
```

3.Frontend Setup:
```bash
cd client
npm run build
npm run dev
```
Feel free to explore the website and have a great shopping experience! 🛍️
