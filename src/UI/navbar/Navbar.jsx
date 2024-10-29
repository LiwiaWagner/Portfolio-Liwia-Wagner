import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import "./navbar.css";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsNavShowing(false);
  }, [location]);

  return (
    <nav className="nav-main-container">
      <div
        className={`nav-container ${isNavShowing ? "show-nav" : "hide-nav"}`}
      >
        <Link to="/" className="nav-left-container">
          <div className="logo">LIWIA WAGNER</div>
        </Link>
        <div className="nav-right-container">
          <ul>
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
            <li className="nav-link">
              <a
                href={require("../../assets/cv_liwia_wagner.pdf")}
                target="_blank"
                rel="noopener noreferrer"
              >
                RESUME
              </a>
            </li>
          </ul>
        </div>

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
