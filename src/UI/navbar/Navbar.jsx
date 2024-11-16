import React, { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const location = useLocation();

  useEffect(() => {
    setIsNavShowing(false);
  }, [location]);

  const handleHover = (e) => {
    const { offsetLeft, offsetWidth } = e.target.closest("li");
    setUnderlineStyle({
      left: offsetLeft,
      width: offsetWidth,
    });
  };

  return (
    <nav
      className="nav-main-container"
      onMouseLeave={() => {
        setUnderlineStyle({ ...underlineStyle, width: 0 });
      }}
    >
      <div
        className={`nav-container ${isNavShowing ? "show-nav" : "hide-nav"}`}
      >
        <Link to="/" className="nav-left-container">
          <div className="logo">Liwia Wagner</div>
        </Link>
        <div className="nav-right-container">
          <ul>
            <li className="nav-link" onMouseEnter={handleHover}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive && !location.hash ? "active" : ""
                }
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-link" onMouseEnter={handleHover}>
              <NavLink
                to="/#view"
                className={({ isActive }) =>
                  isActive && location.hash ? "active" : ""
                }
              >
                PORTFOLIO
              </NavLink>
            </li>
            <li className="nav-link" onMouseEnter={handleHover}>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                ABOUT
              </NavLink>
            </li>
            <li className="nav-link" onMouseEnter={handleHover}>
              <a
                href={require("../../assets/cv_liwia_wagner.pdf")}
                target="_blank"
                rel="noopener noreferrer"
              >
                RESUME
              </a>
            </li>
          </ul>
          <span className="under-line" style={underlineStyle}></span>
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
