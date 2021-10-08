import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";

//Icons..
import LOGO from "../../assets/LOGO.svg";
import SearchIcon from "../../assets/Search.svg";
import HomeIcon from "../../assets/About.svg";
import WishListIcon from "../../assets/Group 14.svg";
import OrdersIcon from "../../assets/Group 15.svg";
import DefaultUserIcon from "../../assets/user_circle.svg";
import closeMenu from "../../assets/Vector.svg";
import hamburgerMenu from "../../assets/Vector (1).svg";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="navbar" style={{ justifyContent: "space-evenly" }}>
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="navbar-brand">
              <img
                className="cycloo-logo"
                src={LOGO}
                alt="Cycloo"
                onClick={scrollTop}
              />
            </div>
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <img
              src={click ? closeMenu : hamburgerMenu}
              style={{ width: "45px", height: "45px" }}
              alt=""
            />
          </div>
          <ul
            className={click ? "nav-menu active" : "nav-menu"}
            onClick={scrollTop}
          >
            <li className="nav-item active">
              <img
                style={{
                  height: "1.7rem",
                  marginRight: "-50px",
                  position: "relative",
                  marginTop: "0px",
                }}
                src={SearchIcon}
                alt=""
                onClick={scrollTop}
              />
              <input
                type="text"
                className="searchBoxStyles"
                placeholder="Let’s search for your wheels"
              />
            </li>
            <li className="nav-item active">
              <NavLink
                activeClassName="active-links"
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
                exact={true}
              >
                <span>
                  <img
                    className="icon_styles"
                    src={HomeIcon}
                    alt="Home"
                    onClick={scrollTop}
                  />
                </span>{" "}
                Home
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink
                activeClassName="active-links"
                to="/wishlists"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <span>
                  <img
                    className="icon_styles"
                    src={WishListIcon}
                    alt="Home"
                    onClick={scrollTop}
                  />
                </span>{" "}
                My wishlist
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink
                activeClassName="active-links"
                to="/orders"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <span>
                  <img
                    className="icon_styles"
                    src={OrdersIcon}
                    alt="Home"
                    onClick={scrollTop}
                  />
                </span>{" "}
                My orders
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink
                activeClassName="active-links"
                to="/cart"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Cart
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink
                activeClassName="active-links"
                to="/profile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <span>
                  <img
                    className="icon_styles"
                    src={DefaultUserIcon}
                    alt="Home"
                    onClick={scrollTop}
                  />
                </span>{" "}
                User Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
