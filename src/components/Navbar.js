import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./navbar.css";

export const Navbar = (props) => {
  const { showAlert } = props;
  let location = useLocation();
  let history = useHistory();

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

  const handleLogout = async () => {
    localStorage.removeItem("token");
    history.push("/login");
    updateMenu();
    showAlert("primary", "Successfully logged out!");
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
                {!localStorage.getItem("token") ? (
                  <div>
                    <Link
                      className="authBtn"
                      to={"/login"}
                      onClick={updateMenu}
                    >
                      Login
                    </Link>
                    <Link
                      className="authBtn"
                      to={"/signup"}
                      onClick={updateMenu}
                    >
                      Signup
                    </Link>
                  </div>
                ) : (
                  <button className="authBtn" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div style={{ height: "80px" }}></div>
    </>
  );
};
