import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul className="nav nav-underline" style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Extension">
            Try Extension
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Classification">
            Garbage Classification
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Barcode">
            Know the Carbon Footprint
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
