import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
//Icons..
import LOGO from "../../assets/LOGO.svg";
import HomeIcon from "../../assets/About.svg";
import WishListIcon from "../../assets/Group 14.svg";
import OrdersIcon from "../../assets/Group 15.svg";
import CartIcon from "../../assets/Cart.png";
import Logout from "../../assets/Log Out.png";
import CloseMenu from "../../assets/Vector.svg";
import HamburgerMenu from "../../assets/Vector (1).svg";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { cartCount } = useCart();

  return (
    <>
      <nav
        className="navbar"
        style={{
          justifyContent: "space-evenly",
          boxShadow: "rgb(17 17 26 / 5%) 0px 15px 20px",
        }}
      >
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
              src={click ? CloseMenu : HamburgerMenu}
              style={{ width: "35px", height: "35px", marginTop: "-20px" }}
              alt=""
            />
          </div>
          <ul
            className={click ? "nav-menu active" : "nav-menu"}
            onClick={scrollTop}
          >
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
                <span>
                  <img
                    className="icon_styles"
                    src={CartIcon}
                    alt="Home"
                    onClick={scrollTop}
                  />
                </span>{" "}
                Cart {cartCount ? `(${cartCount})` : ""}
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
                    src={Logout}
                    alt="Home"
                    onClick={scrollTop}
                  />
                </span>{" "}
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
