import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  let location = useLocation();

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [slider, setSliderClass] = useState("slider minheight");
  const [header, setHeaderClass] = useState("header minheight");

  const updateMenu = () => {
    if (!isMenuClicked) {
      setSliderClass("slider maxwidth");
      setHeaderClass("header maxheight");
      setBurgerClass("burger-bar clicked");
      setTimeout(() => {
        setMenuClass("menu visible");
      }, 200);
    } else {
      setSliderClass("slider minwidth");
      setHeaderClass("header minheight");
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <>
      <header className={header}>
        <nav>
          <div>
            <div className="logo">inotebook</div>
            <div className="burger-menu" onClick={updateMenu}>
              <div className={burger_class}></div>
              <div className={burger_class}></div>
              <div className={burger_class}></div>
            </div>
            <div className={slider}>
              <div className={menu}>
                <div className="quickLinks">
                  <Link to="/">
                    <span
                      className={`${location.pathname === "/" ? "active" : ""}`}
                    >
                      Home
                    </span>
                  </Link>
                </div>
                <div className="quickLinks">
                  <Link to="/about">
                    <span
                      className={`${
                        location.pathname === "/about" ? "active" : ""
                      }`}
                    >
                      About
                    </span>
                  </Link>
                </div>
                <div className="quickLinks">
                  <Link to="/contact">
                    <span
                      className={`${
                        location.pathname === "/contact" ? "active" : ""
                      }`}
                    >
                      Contact
                    </span>
                  </Link>
                </div>
                <div className="quickLinks">
                  <Link to="/github">Github</Link>
                </div>
                <button className="logout" type="submit">
                  logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div style={{ height: "80px" }}></div>
    </>
  );
};
