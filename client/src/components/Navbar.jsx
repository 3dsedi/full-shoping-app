import { Link } from 'react-router-dom';
import { IconButton } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import kitkat from '../pics/kitkat.jpg'
import "./Navbar.css";

function NavBar({ userData }) {
  return (
    <div className="navbar-container">
     <img src={kitkat} alt="logo" className='navbar__adv'/>
<nav className="navbar">
  <ul className="navbar__list navbar__list-left">
    <div className="navbar__logo">
      <Link to="/">
      <IconButton>
        <HomeOutlinedIcon style={{ color: "white", fontSize: "2rem"  }}  />
        </IconButton>
      </Link>
    </div>
  </ul>
  <ul className="navbar__list navbar__list-right">
    {userData.length === 0 ? (
      <>
        <li className="navbar__item">
          <Link to="/login" className="navbar__link">
            Login
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/create-new-user" className="navbar__link">
            Sign up
          </Link>
        </li>
      </>
    ) : (
      <>
        {userData.role === "user" && (
          <li className="navbar__item">
            <Link to="/cart" className="navbar__link">
              <ShoppingCartIcon />
            </Link>
          </li>
        )}
        {userData.role === "cashier" && (
          <li className="navbar__item">
            <Link to="/cashier" className="navbar__link">
              <LocalAtmRoundedIcon />
            </Link>
          </li>
        )}
        <li className="navbar__item">
          <Link to="/logout" className="navbar__link">
            Logout
          </Link>
        </li>
      </>
    )}
  </ul>
</nav>
</div>
 );
}

export default NavBar;
