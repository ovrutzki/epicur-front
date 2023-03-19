import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";


const Footer: React.FC = () => {
      return (<>
      <footer>
        <NavLink className="footer-link" to="">Contact Us</NavLink>      
        <NavLink className="footer-link" to="">Term of Use</NavLink>      
        <NavLink className="footer-link" to="">Privacy Policy</NavLink>      
      </footer>
        </>
      )
    }

export default Footer;