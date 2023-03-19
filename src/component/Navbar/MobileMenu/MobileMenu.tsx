import React from "react";
import { NavLink } from "react-router-dom";
import './MobileMenu.css'
const MobileMenu: React.FC = () => {
  return (
    <>
    <div id="mobile-menu">
        <NavLink to="/restaurant">Restaurant</NavLink>
        <NavLink to="/chefs">Chefs</NavLink>
        <hr />
        <NavLink className="footer-link" to="">
          Contact Us
        </NavLink>
        <NavLink className="footer-link" to="">
          Term of Use
        </NavLink>
        <NavLink className="footer-link" to="">
          Privacy Policy
        </NavLink>
    </div>
    </>
  );
};

export default MobileMenu;
