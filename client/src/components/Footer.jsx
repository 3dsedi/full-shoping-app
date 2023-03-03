import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Me</h4>
          <p>I started my journey as a full-stack developer by joining the school of applied technology &lt;salt/&gt;. 
I create this e-commerce application as one of my projects in the &lt;salt/&gt; post-graduation program.</p>

        </div>
        <div className="footer-column-category">
          <h4>Categories</h4>
          <ul>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Home &amp; Garden</a></li>
            <li><a href="#">Sports &amp; Outdoors</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Me</h4>
          <div className="footer-contact">
            <p>Email: <a href="mailto:3d.ghazinezam@gmail.com">3d.ghazinezam@mail.com</a></p>
            <p><a href="https://3dsedi.github.io/sediportfolio/">Sedighe Ghazinezam Portfolio</a></p>
          </div>
          <ul className="social-icons">
            <li><a href="https://www.linkedin.com/in/sedigheh-ghazinezam-3753aa7b/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
            <li><a href="https://www.facebook.com/sedi.ghazinezam" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
            <li><a href="https://www.instagram.com/sedi_ghazinezam/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://github.com/3dsedi" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
