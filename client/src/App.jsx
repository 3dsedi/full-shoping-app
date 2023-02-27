import "./App.css";
import { useState, useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from 'react-bootstrap';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fakecart } from "./fakedata/fakecart.js";
import NavBar from "./components/Navbar.jsx";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import StoreProductList from "./components/store/StoreProductList.jsx";
import Cashior from "./components/store/Cashior.jsx";
import AddProductForm from "./components/store/AddProductForm.jsx";
import Home from "./components/Home";

function removeFromCart(productId) {
  console.log("Remove " + productId + " From the App");
  //remove item from the current Cart
}

function getCurrentCart() {
  return fakecart;
  //update to get from localstorage
}

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [storeData, setStoreData] = useState({});
  const [storeProducts, setStoreProducts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);

  const authorizeUser = async (enteredUser) => {
    const { email, password } = enteredUser;
    const reqBody = { email, password };

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setCartData(data.cart);
        setUserData(data.user);
        setStoreData(data.storeData);
        setStoreProducts(data.productData);
        return data;
      } else if (response.status === 404) {
        alert("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/product");
      const products = await response.json();
      setProducts(products);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addUser = async (enteredUser) => {
    const { name, email, password, role } = enteredUser;
    const reqBody = { name, email, password, role };
    console.log(reqBody);
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (userId, productId) => {
    const reqBody = { userId, productId };
    try {
      const response = await fetch("http://localhost:3001/api/cart/additem", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      if (response.status === 200) {
        const data = await response.json();
        setCartData(data.cart);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    addToCart();
  }, []);

  const deleteItemFromCart = async (cartId, productId) => {
    const reqBody = { cartId, productId };
    try {
      const response = await fetch(
        "http://localhost:3001/api/cart/deleteitem",
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setCartData(data.cart);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    deleteItemFromCart();
  }, []);

  const addProduct = async (newProduct) => {
    const {
      title,
      dscdescription,
      imageUrl,
      price,
      quantity,
      category,
      storeId,
    } = newProduct;
    const reqBody = {
      title,
      dscdescription,
      imageUrl,
      price,
      quantity,
      category,
      storeId,
    };
    try {
      const response = await fetch("http://localhost:3001/api/product", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Router>
      <Nav className={className}>
    <div className="container-fluid">
      <NavBar
        userData={userData}
        className="navbar navbar-expand-lg navbar-dark bg-primary"
      />
      </div>
      </Nav>
        {/* <ProfileBar userData={userData}/> */}

        <Routes>
          <Route exact path="/" element={<Home />}>
            {" "}
          </Route>
          <Route
            path="/login"
            element={<LoginForm onLogin={authorizeUser} />}
          ></Route>
          <Route
            path="/products"
            element={
              <ProductList
                products={products}
                userData={userData}
                addToCart={addToCart}
              />
            }
          ></Route>
          <Route
            path="/store"
            element={
              <StoreProductList
                storeData={storeData}
                storeProducts={storeProducts}
              />
            }
          ></Route>
          <Route
            path="/create-new-user"
            element={<NewUserForm addUser={addUser} />}
          ></Route>
          <Route
            path="/create-new-product"
            element={
              <AddProductForm addProduct={addProduct} storeData={storeData} />
            }
          ></Route>
          <Route
            exact
            path="/cart"
            element={
              <Cart
                userData={userData}
                cartData={cartData}
                deleteItemFromCart={deleteItemFromCart}
              />
            }
          ></Route>
          <Route
            exact
            path="/cashier"
            element={<Cashior storeData={storeData} />}
          ></Route>
          <Route exact path="/admin" element={<AdminPage />}></Route>
          <Route exact path="/admin/super" element={<SuperAdminPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
