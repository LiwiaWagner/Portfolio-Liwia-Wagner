import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import "./navbar.css";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const location = useLocation();

  return (
    <nav>
      <div
        className={`nav-container ${isNavShowing ? "show-nav" : "hide-nav"}`}
      >
        <Link to="/" className="nav-left-container">
          <div>LIWIA WAGNER</div>
        </Link>
        <ul className="nav-right-container">
          <li className="nav-link">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive && !location.hash ? "active" : ""
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/#view"
              className={({ isActive }) =>
                isActive && location.hash ? "active" : ""
              }
            >
              PORTFOLIO
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ABOUT
            </NavLink>
          </li>
          <li className="nav-link">RESUME</li>
        </ul>
        <button
          className="nav-toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <MdClose /> : <MdMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
