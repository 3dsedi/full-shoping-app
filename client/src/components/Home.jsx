import React from 'react';
import { Link, Route } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import NewUserForm from './login/NewUserForm';



const Home = () => (
  <div>
    <h1>Welcome to the Home page</h1>
    <p>
      Please choose between logging in or signing up:
    </p>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/create-new-user">Sign Up</Link>
      </li>
    </ul>
   
  </div>
);

export default Home;
