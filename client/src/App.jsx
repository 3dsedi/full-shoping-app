import './App.css';
import {useState, useEffect} from 'react';
import { ProtectedRoute } from './components/ProtectedRoute';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import {fakecart} from './fakedata/fakecart.js';
import NavBar from './components/Navbar.jsx';
import Cart from './components/checkout/Cart.jsx';
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from './components/Products/ProductList.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import NewUserForm from './components/login/NewUserForm.jsx';
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import Home from './components/Home';
import { AddStore } from './components/products/AddStore';

function addToCart(productId) {
    console.log("Add " + productId + " From the App")
    //add item to the current Cart
}

function removeFromCart(productId) {
    console.log("Remove " + productId + " From the App")
    //remove item from the current Cart
}

function getCurrentCart() {
    return fakecart;
    //update to get from localstorage
}


function App() {
    const [currentCart, setCurrentCart] = useState(getCurrentCart());
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    
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
    const { name,email,password,role} = enteredUser;
    const reqBody = { name,email,password,role};
    console.log(reqBody)
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        mode: 'cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      
      });
      console.log(response)
    } catch (error) {
      console.error(error);
    }
}

const addStore = async (newStore) => {
  const {name} = newStore
  const reqBody={name}
  try {
    const response = await fetch("http://localhost:3001/api/store", {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    
    });
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}

const authorizeUser = async (enteredUser) => {
    const { email, password } = enteredUser;
    const reqBody = { email, password };
  
    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
  
      if (response.status === 201) {
        const userData = await response.json();
        setUserRole(userData.user.role)
        console.log(userData.user.role)
        return userData
      } else if (response.status === 404) {
        alert("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  



    return (
        <div className="App">
            <Router>
                <header className={"top_header"}>
                    <ProfileBar/>
                    <NavBar/>
                </header>
                <Routes>
                <Route exact path='/'element={< Home />}> </Route>
                <Route path="/login" element={< LoginForm onLogin={authorizeUser}/>}></Route>
                {/* <Route path="/products" element={< ProductList products={products}/>}></Route> */}
                <Route path="/create-new-user"element={< NewUserForm addUser={addUser}/>}></Route>
                <Route path="/create-new-store"element={< AddStore addStore={addStore}/>}></Route>
                <Route exact path='/products' element={<ProtectedRoute element = {<ProductList/>}
                 userRole={userRole} allowedRoles={['user','superadmin']} products={products}/>} />
                

                    {/* <Route exact path='/create-new-user' element={< NewUserForm addUser={addUser}/>}></Route>
                    <Route exact path='/login' element={< LoginForm onLogin={authorizeUser}/>}></Route> */}
                    <Route exact path='/cart'
                           element={< Cart products={currentCart} removeFromCart={removeFromCart}/>}></Route>
                    <Route exact path='/admin' element={< AdminPage/>}></Route>
                    <Route exact path='/admin/super' element={< SuperAdminPage/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;
